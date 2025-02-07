const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///path/to/your/animated.svg');

  const frames = 10; // Number of frames to capture
  const delay = 100; // Delay between frames in milliseconds

  for (let i = 0; i < frames; i++) {
    await page.screenshot({ path: `frame-${i}.png` });
    await page.evaluate((delay) => new Promise(resolve => setTimeout(resolve, delay)), delay);
  }

  await browser.close();

  // Assemble PNG frames into an APNG
  execSync('apngasm output.apng frame-*.png');

  // Clean up frame files
  for (let i = 0; i < frames; i++) {
    fs.unlinkSync(`frame-${i}.png`);
  }
})();

