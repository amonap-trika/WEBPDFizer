const https = require('https');
const { parseString } = require('xml2js');

async function getAllUrlsFromSitemapIndex(siteUrl) {
  try {
    const sitemapIndexUrl = `${siteUrl}/sitemap.xml`;
    const sitemapIndexResponse = await fetchContent(sitemapIndexUrl);

    const sitemapIndexXml = sitemapIndexResponse.data;
    const sitemapIndexResult = await parseXml(sitemapIndexXml);
    const sitemapUrls = sitemapIndexResult.sitemapindex.sitemap.map(sitemap => sitemap.loc[0]);
    const fetchSitemapPromises = sitemapUrls.map(url => fetchContent(url));
    const sitemapResponses = await Promise.all(fetchSitemapPromises);

    let allUrls = [];
    for (const response of sitemapResponses) {
      const sitemapResult = await parseXml(response.data);

      if (sitemapResult.urlset && sitemapResult.urlset.url) {
        const sitemapUrls = sitemapResult.urlset.url.map(urlObj => urlObj.loc[0]);
        allUrls = allUrls.concat(sitemapUrls);
      }
    }

    return allUrls;
  } catch (error) {
    throw error;
  }
}

function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let content = '';

      response.on('data', (chunk) => {
        content += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          resolve({ data: content, url });
        } else {
          reject(new Error(`Failed to fetch content from ${url}. Status code: ${response.statusCode}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function parseXml(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Example 
const siteUrl = 'https://www.muralsyourway.com';

getAllUrlsFromSitemapIndex(siteUrl)
  .then(urls => {
    console.log('List of all URLs from sitemaps:');
    console.log(urls);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

  const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

const GENERATED_PDF_FOLDER = 'generatedPDF';

async function convertUrlToPdf(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the viewport to emulate a desktop screen
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 }); // Set timeout to 0 to disable navigation timeout

  // Take a full-page screenshot
  await page.screenshot({ path: `${outputPath}.png`, fullPage: true });

  // Convert screenshot to PDF
  const imageBuffer = await fs.readFile(`${outputPath}.png`);
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(imageBuffer);
  const pageObj = pdfDoc.addPage();
  pageObj.drawImage(image, {
    x: 0,
    y: 0,
    width: pageObj.getWidth(),
    height: pageObj.getHeight(),
  });

  const pdfBytes = await pdfDoc.save();

  // Create the 'generatedPDF' folder if it doesn't exist
  await fs.mkdir(GENERATED_PDF_FOLDER, { recursive: true });

  // Save the PDF file in the 'generatedPDF' folder
  await fs.writeFile(path.join(GENERATED_PDF_FOLDER, `${outputPath}.pdf`), pdfBytes);

  // Remove the screenshot file
  await fs.unlink(`${outputPath}.png`);

  await browser.close();
}

// Example usage
const pdfOutputPath = 'output.pdf';

(async () => {
  const urls = await getAllUrlsFromSitemapIndex(siteUrl);

  const pdfPaths = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const pdfPath = `url_${i + 1}`;
    try {
      await convertUrlToPdf(url, pdfPath);
      pdfPaths.push(path.join(GENERATED_PDF_FOLDER, `${pdfPath}.pdf`));
    } catch (error) {
      console.error(`Error converting ${url} to PDF:`, error.message);
    }
  }

  await mergePdfs(pdfPaths, pdfOutputPath);
  console.log('Merged PDFs:', pdfOutputPath);
})();
