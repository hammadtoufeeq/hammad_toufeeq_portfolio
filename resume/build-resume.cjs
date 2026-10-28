// Renders resume/resume.html to public/Hammad-Toufeeq-Resume.pdf. Run: node resume/build-resume.cjs
const path = require('path')
const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('file://' + path.join(__dirname, 'resume.html'))
  await page.pdf({ path: path.join(__dirname, '..', 'public', 'Hammad-Toufeeq-Resume.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true })
  await browser.close()
  console.log('Resume written to public/Hammad-Toufeeq-Resume.pdf')
})()
