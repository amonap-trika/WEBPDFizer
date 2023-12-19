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
const siteUrl = 'https://www.paragonsports.com';

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

async function convertUrlToPdf(url, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.setViewport({ width: 1940, height: 1080 });

  // Take a screenshot
  await page.screenshot({ path: `${outputPath}.png` });

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
  await fs.writeFile(`generatedFiles/${outputPath}.pdf`, pdfBytes);

  await browser.close();
}

async function mergePdfs(pdfPaths, outputPath) {
  const mergedPdf = await PDFDocument.create();

  for (const pdfPath of pdfPaths) {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  await fs.writeFile(outputPath, mergedPdfBytes);
}

module.exports = getAllUrlsFromSitemapIndex;