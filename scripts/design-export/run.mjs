#!/usr/bin/env node

import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'

const DEFAULT_HOST = '127.0.0.1'
const DEFAULT_PORT = 4173
const DEFAULT_WAIT_MS = 120_000

function parseArgs(argv) {
  const parsed = {
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
    waitMs: DEFAULT_WAIT_MS,
    releaseId: null,
    branch: null,
    commitSha: null,
    outputRoot: 'design-export',
    timeoutMs: 60_000,
    stabilizeMs: 350,
    baseUrl: null,
    skipServer: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (!arg.startsWith('--')) continue

    const [key, inlineValue] = arg.split('=', 2)
    const value = inlineValue ?? argv[i + 1]

    switch (key) {
      case '--host':
        parsed.host = value
        if (!inlineValue) i += 1
        break
      case '--port':
        parsed.port = Number(value)
        if (!inlineValue) i += 1
        break
      case '--wait-ms':
        parsed.waitMs = Number(value)
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
      case '--output-root':
        parsed.outputRoot = value
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
      case '--base-url':
        parsed.baseUrl = value
        if (!inlineValue) i += 1
        break
      case '--skip-server':
        parsed.skipServer = true
        break
      default:
        break
    }
  }

  return parsed
}

async function waitForUrl(url, timeoutMs) {
  const startedAt = Date.now()

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 2000)
      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)

      if (response.ok) {
        return
      }
    } catch {
      // retry
    }

    await new Promise((resolve) => setTimeout(resolve, 900))
  }

  throw new Error(`timeout waiting for ${url}`)
}

function runCapture(args) {
  return new Promise((resolve, reject) => {
    const captureScript = path.join(process.cwd(), 'scripts/design-export/capture.mjs')
    const captureArgs = [captureScript, '--base-url', args.baseUrl, '--output-root', args.outputRoot, '--timeout-ms', String(args.timeoutMs), '--stabilize-ms', String(args.stabilizeMs)]

    if (args.releaseId) captureArgs.push('--release-id', args.releaseId)
    if (args.branch) captureArgs.push('--branch', args.branch)
    if (args.commitSha) captureArgs.push('--commit-sha', args.commitSha)

    const child = spawn(process.execPath, captureArgs, {
      stdio: 'inherit',
      env: process.env,
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`capture exited with code ${code}`))
      }
    })
  })
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  args.baseUrl = args.baseUrl || `http://${args.host}:${args.port}`

  if (args.skipServer) {
    await runCapture(args)
    return
  }

  const devServer = spawn('npm', ['run', 'dev', '--', '--hostname', args.host, '--port', String(args.port)], {
    stdio: 'pipe',
    env: process.env,
  })

  devServer.stdout.on('data', (chunk) => process.stdout.write(`[next-dev] ${chunk}`))
  devServer.stderr.on('data', (chunk) => process.stderr.write(`[next-dev] ${chunk}`))

  try {
    await waitForUrl(args.baseUrl, args.waitMs)
    await runCapture(args)
  } finally {
    devServer.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error('[design-export-run] fatal_error:', error?.message ?? error)
  process.exitCode = 1
})
