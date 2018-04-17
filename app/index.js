process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, p);
    process.exit(1);
});

const fs = require('fs');
const puppeteer = require('puppeteer');
const filenamify = require('filenamify')

const urls = require('./urls.js');
const devices = require('./devices.js');

(async () => {
    let screenshotDirectory = './screenshots/';
    if (!fs.existsSync(screenshotDirectory)){
        fs.mkdirSync(screenshotDirectory);
    }

    let browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    let page = await browser.newPage();

    for (let i = 0, len = devices.length; i < len; i++) {
      let device = devices[i];

      // Set device options
      await page.setViewport({
          width: device.width,
          height: device.height,
          isMobile: device.mobile,
          hasTouch: device.touch,
          deviceScaleFactor: device.deviceScaleFactor
      });
      await page.setUserAgent(device.userAgent)

      let deviceDirectory = screenshotDirectory + filenamify(device.deviceName, {replacement: '_'}) + '/';
      if (!fs.existsSync(deviceDirectory)){
          fs.mkdirSync(deviceDirectory);
      }

      for (let j = 0, len = urls.length; j < len; j++) {
          let url = urls[j];
          let imageName = filenamify(url, {replacement: '_'}) + '.png';

          // Load page and create full page screenshot
          await page.goto(url, {waitUntil: 'networkidle2'});
          // scroll the page to capture lazyload
          await page.evaluate(_ => {
            window.scrollBy(0, document.body.scrollHeight);
          });

        
          // await page.screenshot({path: deviceDirectory + imageName, fullPage: true});
          
          // breakup pages longer than 16384px

          const {contentSize} = await page._client.send('Page.getLayoutMetrics');
          const dpr = page.viewport().deviceScaleFactor || 1;
          const maxScreenshotHeight = Math.floor(16 * 1024 / dpr); // Hardcoded max texture size of 16,384 (crbug.com/770769)
          
          for (let ypos = 0; ypos < contentSize.height; ypos += maxScreenshotHeight) {
            const height = Math.min(contentSize.height - ypos, maxScreenshotHeight);
            await page.screenshot({
              path: deviceDirectory + imageName,
              clip: {
                x: 0,
                y: ypos,
                width: contentSize.width,
                height
              }
            });
        }
    }
    }

    await browser.close();
})();
