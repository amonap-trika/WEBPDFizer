const axios = require('axios');
const { parseString } = require('xml2js');
const cheerio = require('cheerio');

async function fetchSitemap(url) {
  try {
    const response = await axios.get(url);
    const xmlData = response.data;

    return new Promise((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          reject('Error parsing XML:', err);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    throw new Error('Error fetching sitemap:', error.message);
  }
}

async function listUrlsFromSitemap(sitemapUrl) {
  try {
    const result = await fetchSitemap(sitemapUrl);

    if (result && result.urlset && result.urlset.url) {
      return result.urlset.url.map(urlObj => urlObj.loc[0]);
    } else {
      console.error('Invalid sitemap structure:', result);
      return [];
    }
  } catch (error) {
    console.error('Error processing sitemap:', error.message);
    return [];
  }
}

async function fetchUrlsFromWebsite(websiteUrl) {
  try {
    const sitemapUrl = `${websiteUrl}/sitemap.xml`;
    const urlsFromSitemap = await listUrlsFromSitemap(sitemapUrl);

    // Example: Fetching additional URLs from the homepage
    const homepageHtml = await axios.get(websiteUrl);
    const $ = cheerio.load(homepageHtml.data);
    const additionalUrls = [];
    
    // Modify the following logic based on your website's structure
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      if (href && href.startsWith(websiteUrl)) {
        additionalUrls.push(href);
      }
    });

    return [...urlsFromSitemap, ...additionalUrls];
  } catch (error) {
    console.error('Error fetching URLs from the website:', error.message);
    return [];
  }
}

const runPuppeteerScript = async (url) => {
  
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 5,
    monitor: true,
    puppeteerOptions: {
        headless: true,
        defaultViewport: null, // Defaults to an 800x600 viewport
        args: ['--start-maximized']
    }
});

if (!fsSync.existsSync(TARGET_DIR_PATH)) {
    fsSync.mkdirSync(TARGET_DIR_PATH);
}

// Function to handle errors and save to error file
const handleError = async (url) => {
    const errorCsvContent = csv.stringify([[url]]);
    await fs.appendFile(ERROR_FILE_PATH, errorCsvContent);
    console.error(`Error occurred while processing: ${url}`);
};

cluster.task(async ({ page, data: url }) => {
    try {
          // Wait for page to load
          await page.goto(url, { waitUntil: 'networkidle2' });

          // Set screen size
          await page.setViewport({ width: 1600, height: 1200 });

          // Introduce a delay so the entire page loads
          await page.evaluate(async () => {
              await new Promise(function (resolve) {
                  setTimeout(resolve, 5000);
              });
          });

          // Emulate a screen
          await page.emulateMediaType('screen');

          // Get title of the page
          const pageTitle = await page.title();
          const filePath = path.join(TARGET_DIR_PATH, `${pageTitle}.pdf`);
          const buffer = await page.pdf({ format: 'A4', printBackground: true, displayHeaderFooter: false });

          // Write buffer to disk
          await fs.writeFile(filePath, buffer);
      } catch (error) {
          // If an error occurs, handle and save to error file immediately
          await handleError(url);
      }
  });

  const sourceFile = SOURCE_DIR_PATH;
  const records = csv.parse(fsSync.readFileSync(sourceFile), {
      skip_empty_lines: true
  });

  if (records) {
      for (const record of records) {
          const url = record[0];
          await cluster.queue(url);
      }
  }

  // Wait for all tasks to finish
  await cluster.idle();
  await cluster.close();
  console.log(`Running Puppeteer script for URL: ${url}`);
  // Modify this function to use the provided URL
};
// Example usage
const websiteUrl = 'https://www.example.com';
fetchUrlsFromWebsite(websiteUrl).then(urls => {
  console.log('List of URLs:', urls);
});
