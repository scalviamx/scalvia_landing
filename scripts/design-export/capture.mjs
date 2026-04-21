#!/usr/bin/env node

import crypto from 'node:crypto'
import { execSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from '@playwright/test'
import { MANIFEST_SCHEMA_VERSION, ROUTES, VIEWPORTS, WORKFLOW } from './config.mjs'

const DEFAULT_BASE_URL = 'http://127.0.0.1:3000'
const DEFAULT_OUTPUT_ROOT = 'design-export'
const DEFAULT_TIMEOUT_MS = 60_000
const DEFAULT_STABILIZE_MS = 350

function parseArgs(argv) {
  const parsed = {
    baseUrl: DEFAULT_BASE_URL,
    outputRoot: DEFAULT_OUTPUT_ROOT,
    releaseId: null,
    branch: null,
    commitSha: null,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    stabilizeMs: DEFAULT_STABILIZE_MS,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith('--')) continue

    const [key, inlineValue] = arg.split('=', 2)
    const value = inlineValue ?? argv[i + 1]

    switch (key) {
      case '--base-url':
        parsed.baseUrl = value
        if (!inlineValue) i += 1
        break
      case '--output-root':
        parsed.outputRoot = value
        if (!inlineValue) i += 1
        break
      case '--release-id':
        parsed.releaseId = value
        if (!inlineValue) i += 1
        break
      case '--branch':
        parsed.branch = value
        if (!inlineValue) i += 1
        break
      case '--commit-sha':
        parsed.commitSha = value
        if (!inlineValue) i += 1
        break
      case '--timeout-ms':
        parsed.timeoutMs = Number(value)
        if (!inlineValue) i += 1
        break
      case '--stabilize-ms':
        parsed.stabilizeMs = Number(value)
        if (!inlineValue) i += 1
        break
      default:
        break
    }
  }

  return parsed
}

function safeGit(cmd, fallback) {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return fallback
  }
}

function sanitize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function routePathToDir(pathname) {
  if (pathname === '/') return 'home'
  return pathname.replace(/^\//, '').replace(/\//g, '-')
}

function captureId(routeKey, viewportKey, type, sectionKey = 'full') {
  return `${routeKey}__${viewportKey}__${type}__${sectionKey}`
}

function toRel(from, to) {
  return path.relative(from, to).split(path.sep).join('/')
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function hashFile(filePath) {
  const buffer = await fs.readFile(filePath)
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

function hashString(value) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function normalizeError(error) {
  if (!error) return 'unknown_error'
  const raw = String(error?.message ?? error)
  return raw.replace(/\s+/g, ' ').trim().slice(0, 300)
}

async function disableMotion(page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }
    `,
  })
}

async function installDeterministicRuntime(context) {
  await context.addInitScript(() => {
    let seed = 1337
    Math.random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
  })
}

async function findSelector(page, selectors) {
  for (const selector of selectors) {
    const count = await page.locator(selector).count()
    if (count > 0) return selector
  }
  return null
}

async function extractSectionSnapshot(page, selector) {
  const locator = page.locator(selector).first()
  return locator.evaluate((node) => {
    const normalize = (value) => (value ?? '').replace(/\s+/g, ' ').trim()

    const headings = Array.from(node.querySelectorAll('h1, h2, h3, h4'))
      .map((el) => normalize(el.textContent))
      .filter(Boolean)
      .slice(0, 4)

    const ctas = Array.from(node.querySelectorAll('a, button'))
      .map((el) => normalize(el.textContent))
      .filter(Boolean)
      .slice(0, 6)

    const body = normalize(node.textContent).slice(0, 260)
    const rect = node.getBoundingClientRect()

    return {
      box: {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      headings,
      ctas,
      body_sample: body,
    }
  })
}

async function extractFullPageSnapshot(page) {
  return page.evaluate(() => {
    const normalize = (value) => (value ?? '').replace(/\s+/g, ' ').trim()

    const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((el) => normalize(el.textContent))
      .filter(Boolean)
      .slice(0, 20)

    const ctas = Array.from(document.querySelectorAll('a, button'))
      .map((el) => normalize(el.textContent))
      .filter(Boolean)
      .slice(0, 30)

    const sections = Array.from(document.querySelectorAll('section')).map((el, index) => {
      return {
        order: index + 1,
        id: el.id || null,
        class_name: normalize(el.className),
      }
    })

    return {
      title: document.title,
      headings,
      ctas,
      sections,
      section_count: sections.length,
    }
  })
}

async function compareWithPreviousRelease(outputRootAbs, currentReleaseId, currentManifest) {
  const entries = await fs.readdir(outputRootAbs, { withFileTypes: true })
  const candidateIds = entries
    .filter((entry) => entry.isDirectory() && entry.name !== currentReleaseId)
    .map((entry) => entry.name)
    .sort()

  const previousReleaseId = [...candidateIds].reverse().find((id) => {
    const manifestPath = path.join(outputRootAbs, id, 'manifest.json')
    return Boolean(safeGit(`test -f "${manifestPath}" && echo yes`, ''))
  })

  if (!previousReleaseId) {
    return {
      previous_release_id: null,
      changed: [],
      unchanged: [],
      new: [],
      missing: [],
      summary: {
        changed: 0,
        unchanged: 0,
        new: 0,
        missing: 0,
      },
    }
  }

  const previousManifestPath = path.join(outputRootAbs, previousReleaseId, 'manifest.json')
  const previousManifestRaw = await fs.readFile(previousManifestPath, 'utf-8')
  const previousManifest = JSON.parse(previousManifestRaw)

  const prevMap = new Map(previousManifest.captures.map((capture) => [capture.capture_id, capture]))
  const currMap = new Map(currentManifest.captures.map((capture) => [capture.capture_id, capture]))

  const changed = []
  const unchanged = []
  const created = []
  const missing = []

  for (const [id, curr] of currMap) {
    const prev = prevMap.get(id)
    if (!prev) {
      created.push({ capture_id: id, route: curr.route, viewport: curr.viewport, status: curr.status })
      continue
    }

    const sameHash = prev.hash && curr.hash && prev.hash === curr.hash
    const sameStatus = prev.status === curr.status

    if (sameHash && sameStatus) {
      unchanged.push({ capture_id: id, route: curr.route, viewport: curr.viewport, status: curr.status })
    } else {
      changed.push({
        capture_id: id,
        route: curr.route,
        viewport: curr.viewport,
        previous_hash: prev.hash,
        current_hash: curr.hash,
        previous_status: prev.status,
        current_status: curr.status,
      })
    }
  }

  for (const [id, prev] of prevMap) {
    if (!currMap.has(id)) {
      missing.push({ capture_id: id, route: prev.route, viewport: prev.viewport, status: prev.status })
    }
  }

  return {
    previous_release_id: previousReleaseId,
    changed,
    unchanged,
    new: created,
    missing,
    summary: {
      changed: changed.length,
      unchanged: unchanged.length,
      new: created.length,
      missing: missing.length,
    },
  }
}

function csvEscape(value) {
  const str = String(value ?? '')
  if (!/[",\n]/.test(str)) return str
  return `"${str.replaceAll('"', '""')}"`
}

function toCsv(rows) {
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n') + '\n'
}

async function writeNotionAssets(manifest, diff, packageDirAbs) {
  const notionDir = path.join(packageDirAbs, 'notion')
  await ensureDir(notionDir)

  const releasesRows = [
    ['Release ID', 'Fecha', 'Branch', 'Commit', 'Estado', 'Resumen'],
    [
      manifest.release_id,
      manifest.captured_at,
      manifest.branch,
      manifest.commit_sha,
      'Exportado',
      `Capturas ${manifest.captures.length} · errores ${manifest.summary.capture_failed + manifest.summary.selector_missing}`,
    ],
  ]

  const pageRoutes = [...new Set(manifest.routes.map((item) => item.path))]
  const pagesRows = [
    ['Page ID', 'Route', 'Owner', 'Prioridad', 'Release ID'],
    ...pageRoutes.map((route) => [
      `${manifest.release_id}::${route}`,
      route,
      '',
      'Media',
      manifest.release_id,
    ]),
  ]

  const capturesRows = [
    ['Capture ID', 'Tipo', 'Viewport', 'Imagen', 'Hash', 'Image Hash', 'Route', 'Section', 'Status', 'Release ID'],
    ...manifest.captures.map((capture) => [
      capture.capture_id,
      capture.type,
      capture.viewport,
      capture.file_path ?? '',
      capture.hash ?? '',
      capture.image_hash ?? '',
      capture.route,
      capture.section_key ?? '',
      capture.status,
      manifest.release_id,
    ]),
  ]

  const changeSeeds = [...diff.changed, ...diff.new, ...diff.missing].slice(0, 200)
  const changesRows = [
    ['Titulo', 'Descripcion', 'Tipo', 'Estado', 'Impacto', 'Release detectado', 'Route', 'Capture ID', 'Owner'],
    ...changeSeeds.map((item) => [
      `Revisar ${item.capture_id}`,
      diff.missing.includes(item)
        ? 'Capture presente en release previo y ausente en release actual.'
        : 'Cambio detectado en comparación contra release previo.',
      'UI',
      WORKFLOW.changes[0],
      'Medio',
      manifest.release_id,
      item.route,
      item.capture_id,
      '',
    ]),
  ]

  const suggestionsRows = [
    ['Hipotesis', 'Razonamiento', 'Prioridad', 'Estado', 'Owner', 'Change titulo'],
  ]

  await fs.writeFile(path.join(notionDir, 'releases.csv'), toCsv(releasesRows), 'utf-8')
  await fs.writeFile(path.join(notionDir, 'pages.csv'), toCsv(pagesRows), 'utf-8')
  await fs.writeFile(path.join(notionDir, 'captures.csv'), toCsv(capturesRows), 'utf-8')
  await fs.writeFile(path.join(notionDir, 'changes.csv'), toCsv(changesRows), 'utf-8')
  await fs.writeFile(path.join(notionDir, 'suggestions.csv'), toCsv(suggestionsRows), 'utf-8')

  const notionReadme = `# Notion Import (${manifest.release_id})

1. Importa en este orden: \
   \`releases.csv\`, \`pages.csv\`, \`captures.csv\`, \`changes.csv\`, \`suggestions.csv\`.
2. En Notion, conecta relaciones entre bases según \`design-export/notion/schema.md\`.
3. Las imágenes en \`captures.csv\` apuntan a rutas locales; súbelas o usa almacenamiento compartido antes de cerrar tracking.
4. Workflow de cambios: ${WORKFLOW.changes.join(' -> ')}.
`

  await fs.writeFile(path.join(notionDir, 'README.md'), notionReadme, 'utf-8')
}

async function writeNotes(manifest, diff, packageDirAbs) {
  const lines = []

  lines.push(`# Design Export Notes · ${manifest.release_id}`)
  lines.push('')
  lines.push(`- Branch: \`${manifest.branch}\``)
  lines.push(`- Commit: \`${manifest.commit_sha}\``)
  lines.push(`- Captured at: \`${manifest.captured_at}\``)
  lines.push(`- Base URL: \`${manifest.source.base_url}\``)
  lines.push(`- Viewports: ${manifest.viewports.map((v) => `${v.key}(${v.width}x${v.height})`).join(', ')}`)
  lines.push('')

  lines.push('## Coverage Summary')
  lines.push('')
  lines.push('| Route | Viewport | Expected | OK | Selector Missing | Capture Failed |')
  lines.push('|---|---:|---:|---:|---:|---:|')

  for (const route of manifest.routes) {
    lines.push(`| ${route.path} | ${route.viewport} | ${route.captures_expected} | ${route.captures_ok} | ${route.selector_missing} | ${route.captures_failed} |`)
  }

  lines.push('')
  lines.push('## Totals')
  lines.push('')
  lines.push(`- Expected captures: **${manifest.summary.expected}**`)
  lines.push(`- OK captures: **${manifest.summary.ok}**`)
  lines.push(`- Selector missing: **${manifest.summary.selector_missing}**`)
  lines.push(`- Capture failed: **${manifest.summary.capture_failed}**`)
  lines.push('')

  lines.push('## Diff vs Previous Release')
  lines.push('')
  if (!diff.previous_release_id) {
    lines.push('- No se encontró release previo con `manifest.json` para comparar.')
  } else {
    lines.push(`- Previous release: **${diff.previous_release_id}**`)
    lines.push(`- Changed: **${diff.summary.changed}**`)
    lines.push(`- New: **${diff.summary.new}**`)
    lines.push(`- Missing: **${diff.summary.missing}**`)
    lines.push(`- Unchanged: **${diff.summary.unchanged}**`)
  }

  const issues = manifest.captures.filter((capture) => capture.status !== 'ok')
  lines.push('')
  lines.push('## Issues')
  lines.push('')

  if (issues.length === 0) {
    lines.push('- Sin issues de captura en este release.')
  } else {
    for (const issue of issues) {
      lines.push(`- [${issue.status}] ${issue.capture_id} (${issue.route} · ${issue.viewport}) ${issue.error ? `→ ${issue.error}` : ''}`)
    }
  }

  lines.push('')
  lines.push('## Operational Workflow')
  lines.push('')
  lines.push('1. Ejecutar script de captura por release.')
  lines.push('2. Revisar `manifest.json` y `notes.md`.')
  lines.push('3. Importar CSVs en Notion y vincular relaciones.')
  lines.push(`4. Gestionar cambios con estado: ${WORKFLOW.changes.join(' -> ')}.`)

  await fs.writeFile(path.join(packageDirAbs, 'notes.md'), `${lines.join('\n')}\n`, 'utf-8')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const branch = args.branch || safeGit('git branch --show-current', 'unknown-branch')
  const commitSha = args.commitSha || safeGit('git rev-parse --short HEAD', 'unknown-sha')
  const releaseId = args.releaseId || `${todayIsoDate()}_${sanitize(branch)}`

  const cwd = process.cwd()
  const outputRootAbs = path.resolve(cwd, args.outputRoot)
  const packageDirAbs = path.join(outputRootAbs, releaseId)
  const screenshotsDirAbs = path.join(packageDirAbs, 'screenshots')
  const diffsDirAbs = path.join(packageDirAbs, 'diffs')

  await ensureDir(screenshotsDirAbs)
  await ensureDir(diffsDirAbs)

  const manifest = {
    schema_version: MANIFEST_SCHEMA_VERSION,
    release_id: releaseId,
    branch,
    commit_sha: commitSha,
    captured_at: new Date().toISOString(),
    source: {
      base_url: args.baseUrl,
      framework: 'nextjs',
      mode: 'semi-automatic',
    },
    workflow: {
      changes: WORKFLOW.changes,
      suggestions: WORKFLOW.suggestions,
    },
    viewports: VIEWPORTS,
    routes: [],
    captures: [],
    content_snapshots: [],
    summary: {
      expected: 0,
      ok: 0,
      selector_missing: 0,
      capture_failed: 0,
    },
  }

  const browser = await chromium.launch({ headless: true })

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
      })
      await installDeterministicRuntime(context)

      for (const route of ROUTES) {
        const page = await context.newPage()
        const targetUrl = new URL(route.path, args.baseUrl).toString()
        const routeDirAbs = path.join(screenshotsDirAbs, viewport.key, routePathToDir(route.path))
        await ensureDir(routeDirAbs)

        const routeSummary = {
          path: route.path,
          route_key: route.route_key,
          page_title: '',
          viewport: viewport.key,
          captures_expected: 1 + route.sections.length,
          captures_ok: 0,
          selector_missing: 0,
          captures_failed: 0,
        }

        manifest.summary.expected += routeSummary.captures_expected

        let navigationError = null

        try {
          await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: args.timeoutMs })
          await disableMotion(page)
          await page.waitForTimeout(args.stabilizeMs)
          routeSummary.page_title = await page.title()
        } catch (error) {
          navigationError = normalizeError(error)
        }

        const fullCaptureId = captureId(route.route_key, viewport.key, 'full')
        const fullPathAbs = path.join(routeDirAbs, 'full.png')

        if (navigationError) {
          manifest.summary.capture_failed += 1
          routeSummary.captures_failed += 1

          manifest.captures.push({
            capture_id: fullCaptureId,
            type: 'full',
            section_key: null,
            route: route.path,
            route_key: route.route_key,
            viewport: viewport.key,
            selector: null,
            file_path: null,
            hash: null,
            image_hash: null,
            status: 'capture_failed',
            error: `navigation_failed: ${navigationError}`,
            copy_snapshot: null,
          })

          for (const section of route.sections) {
            const failedSectionCaptureId = captureId(route.route_key, viewport.key, 'section', section.section_key)
            manifest.summary.capture_failed += 1
            routeSummary.captures_failed += 1

            manifest.captures.push({
              capture_id: failedSectionCaptureId,
              type: 'section',
              section_key: section.section_key,
              route: route.path,
              route_key: route.route_key,
              viewport: viewport.key,
              selector: section.selectors.join(' | '),
              file_path: null,
              hash: null,
              image_hash: null,
              status: 'capture_failed',
              error: `navigation_failed: ${navigationError}`,
              copy_snapshot: null,
            })
          }

          manifest.routes.push(routeSummary)
          await page.close()
          continue
        }

        try {
          await page.screenshot({ path: fullPathAbs, fullPage: true, animations: 'disabled' })
          const relPath = toRel(packageDirAbs, fullPathAbs)
          const imageHash = await hashFile(fullPathAbs)
          const fullSnapshot = await extractFullPageSnapshot(page)
          const structuralHash = hashString(JSON.stringify(fullSnapshot))

          manifest.summary.ok += 1
          routeSummary.captures_ok += 1

          manifest.captures.push({
            capture_id: fullCaptureId,
            type: 'full',
            section_key: null,
            route: route.path,
            route_key: route.route_key,
            viewport: viewport.key,
            selector: null,
            file_path: relPath,
            hash: structuralHash,
            image_hash: imageHash,
            status: 'ok',
            error: null,
            copy_snapshot: fullSnapshot,
          })
        } catch (error) {
          manifest.summary.capture_failed += 1
          routeSummary.captures_failed += 1

          manifest.captures.push({
            capture_id: fullCaptureId,
            type: 'full',
            section_key: null,
            route: route.path,
            route_key: route.route_key,
            viewport: viewport.key,
            selector: null,
            file_path: null,
            hash: null,
            image_hash: null,
            status: 'capture_failed',
            error: normalizeError(error),
            copy_snapshot: null,
          })
        }

        const routeContent = {
          path: route.path,
          route_key: route.route_key,
          viewport: viewport.key,
          page_title: routeSummary.page_title,
          sections: [],
        }

        for (const section of route.sections) {
          const selector = await findSelector(page, section.selectors)
          const sectionCaptureId = captureId(route.route_key, viewport.key, 'section', section.section_key)

          if (!selector) {
            manifest.summary.selector_missing += 1
            routeSummary.selector_missing += 1

            manifest.captures.push({
              capture_id: sectionCaptureId,
              type: 'section',
              section_key: section.section_key,
              route: route.path,
              route_key: route.route_key,
              viewport: viewport.key,
              selector: section.selectors.join(' | '),
              file_path: null,
              hash: null,
              image_hash: null,
              status: 'selector_missing',
              error: null,
              copy_snapshot: null,
            })

            routeContent.sections.push({
              section_key: section.section_key,
              selector: section.selectors,
              status: 'selector_missing',
              snapshot: null,
            })
            continue
          }

          const fileName = `${section.section_key}.png`
          const sectionPathAbs = path.join(routeDirAbs, fileName)

          try {
            const locator = page.locator(selector).first()
            await locator.scrollIntoViewIfNeeded()
            await page.waitForTimeout(120)
            const snapshot = await extractSectionSnapshot(page, selector)
            await locator.screenshot({ path: sectionPathAbs, animations: 'disabled' })
            const relPath = toRel(packageDirAbs, sectionPathAbs)
            const imageHash = await hashFile(sectionPathAbs)
            const structuralHash = hashString(
              JSON.stringify({
                selector,
                snapshot,
              }),
            )

            manifest.summary.ok += 1
            routeSummary.captures_ok += 1

            manifest.captures.push({
              capture_id: sectionCaptureId,
              type: 'section',
              section_key: section.section_key,
              route: route.path,
              route_key: route.route_key,
              viewport: viewport.key,
              selector,
              file_path: relPath,
              hash: structuralHash,
              image_hash: imageHash,
              status: 'ok',
              error: null,
              copy_snapshot: snapshot,
            })

            routeContent.sections.push({
              section_key: section.section_key,
              selector,
              status: 'ok',
              snapshot,
            })
          } catch (error) {
            manifest.summary.capture_failed += 1
            routeSummary.captures_failed += 1

            manifest.captures.push({
              capture_id: sectionCaptureId,
              type: 'section',
              section_key: section.section_key,
              route: route.path,
              route_key: route.route_key,
              viewport: viewport.key,
              selector,
              file_path: null,
              hash: null,
              image_hash: null,
              status: 'capture_failed',
              error: normalizeError(error),
              copy_snapshot: null,
            })

            routeContent.sections.push({
              section_key: section.section_key,
              selector,
              status: 'capture_failed',
              snapshot: null,
              error: normalizeError(error),
            })
          }
        }

        manifest.routes.push(routeSummary)
        manifest.content_snapshots.push(routeContent)

        await page.close()
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  const diff = await compareWithPreviousRelease(outputRootAbs, releaseId, manifest)

  await fs.writeFile(path.join(packageDirAbs, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8')
  await fs.writeFile(path.join(packageDirAbs, 'content-map.json'), `${JSON.stringify(manifest.content_snapshots, null, 2)}\n`, 'utf-8')
  await fs.writeFile(path.join(diffsDirAbs, 'summary.json'), `${JSON.stringify(diff, null, 2)}\n`, 'utf-8')

  const diffMd = [
    `# Diffs · ${manifest.release_id}`,
    '',
    diff.previous_release_id
      ? `Comparación contra **${diff.previous_release_id}**`
      : 'Sin release previo para comparar.',
    '',
    `- Changed: ${diff.summary.changed}`,
    `- New: ${diff.summary.new}`,
    `- Missing: ${diff.summary.missing}`,
    `- Unchanged: ${diff.summary.unchanged}`,
    '',
  ]

  await fs.writeFile(path.join(diffsDirAbs, 'README.md'), `${diffMd.join('\n')}\n`, 'utf-8')

  await writeNotes(manifest, diff, packageDirAbs)
  await writeNotionAssets(manifest, diff, packageDirAbs)

  const summaryLine = [
    `release=${manifest.release_id}`,
    `expected=${manifest.summary.expected}`,
    `ok=${manifest.summary.ok}`,
    `selector_missing=${manifest.summary.selector_missing}`,
    `capture_failed=${manifest.summary.capture_failed}`,
  ].join(' ')

  console.log(summaryLine)
  console.log(`package_dir=${packageDirAbs}`)
}

main().catch((error) => {
  console.error('[design-export] fatal_error:', normalizeError(error))
  process.exitCode = 1
})
