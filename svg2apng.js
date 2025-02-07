const puppeteer = require('puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the path to the SVG file as an argument.');
  process.exit(1);
}

const absoluteFilePath = path.resolve(filePath);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${absoluteFilePath}`);

  const frames = 10; // Number of frames to capture
  const delay = 100; // Delay between frames in milliseconds

  for (let i = 0; i < frames; i++) {
    const framePath = `frame-${i}.png`;
    await page.screenshot({ path: framePath });
    console.log(`Captured ${framePath}`);
    await page.evaluate((delay) => new Promise(resolve => setTimeout(resolve, delay)), delay);
  }

  await browser.close();

  try {
    // Assemble PNG frames into an APNG
    execSync('apngasm --force -o output.apng frame-*.png');
    console.log('APNG created successfully: output.apng');
  } catch (error) {
    console.error('Error creating APNG:', error.message);
  }

  // Clean up frame files
  for (let i = 0; i < frames; i++) {
    const framePath = `frame-${i}.png`;
    if (fs.existsSync(framePath)) {
      fs.unlinkSync(framePath);
      console.log(`Deleted ${framePath}`);
    }
  }
})();
