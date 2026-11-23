// Renders resume.html to ../Hammad_Toufeeq_Full_Stack_Developer.pdf (needs Playwright + Chromium).
const path = require('path')
const { chromium } = require('playwright')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('file://' + path.join(__dirname, 'resume.html'))
  await page.pdf({ path: path.join(__dirname, '..', 'Hammad_Toufeeq_Full_Stack_Developer.pdf'), format: 'A4', preferCSSPageSize: true, printBackground: true })
  await browser.close()
  console.log('PDF written')
})()
