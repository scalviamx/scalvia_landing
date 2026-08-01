import { expect, test } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "https://www.scalvia.mx";
const isWorkersPreview = baseUrl.includes(".workers.dev");

const pages = [
  "/",
  "/contacto",
  "/vitelas",
  "/rotunno-interiores",
  "/nutricionpamcastro",
];

const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const hiddenRoutes = ["/lalanuda", "/otunno-interiores", "/cliente-falso"];

test.describe(`smoke parity: ${baseUrl}`, () => {
  for (const viewport of viewports) {
    for (const path of pages) {
      test(`${path} renders without console errors on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const consoleErrors: string[] = [];
        page.on("console", (message) => {
          const text = message.text();
          if (
            message.type() === "error" &&
            !text.includes("upgrade-insecure-requests") &&
            !text.includes("report-only policy")
          ) {
            consoleErrors.push(text);
          }
        });
        page.on("pageerror", (error) => {
          consoleErrors.push(error.message);
        });

        const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "domcontentloaded" });
        expect(response?.status(), path).toBe(200);
        await expect(page.locator("body")).toBeVisible();
        expect(consoleErrors, path).toEqual([]);

        if (isWorkersPreview) {
          expect(response?.headers()["x-robots-tag"]).toContain("noindex");
        }
      });
    }
  }

  for (const path of hiddenRoutes) {
    test(`${path} remains hidden`, async ({ request }) => {
      const response = await request.get(`${baseUrl}${path}`);
      expect(response.status(), path).toBe(404);
      if (isWorkersPreview) {
        expect(response.headers()["x-robots-tag"]).toContain("noindex");
      }
    });
  }

  test("robots and sitemap respond", async ({ request }) => {
    const robots = await request.get(`${baseUrl}/robots.txt`);
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toMatch(/user-agent/i);

    const sitemap = await request.get(`${baseUrl}/sitemap.xml`);
    expect(sitemap.status()).toBeLessThan(500);
    if (isWorkersPreview) {
      expect(sitemap.status()).toBe(200);
      expect(sitemap.headers()["x-robots-tag"]).toContain("noindex");
    }
  });

  test("contact challenge API responds", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/contact/challenge`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("submittedAt");
    expect(body).toHaveProperty("submittedSig");
  });
});
