const _ = require('lodash');
const fs = require('fs').promises;
const fsSync = require('fs');
const csv = require('csv/sync');
const path = require('path');
const { Cluster } = require('puppeteer-cluster');
const express = require("express");
const cron = require("node-cron");

const app = express();

const SOURCE_DIR_PATH = 'src/links.csv';
const TARGET_DIR_PATH = 'target';
const ERROR_FILE_PATH = 'error.csv'; // Path to error file

const runPuppeteerScript = async () => {
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
};


// Define a route that triggers the script
app.get('/run-script', async (req, res) => {
    await runPuppeteerScript();
    res.send('Script executed successfully');
});

// Schedule the route to be called every minute
cron.schedule('* * * * *', async () => {
    console.log('Running script...');
    await runPuppeteerScript();
});

// Start the Express app on a specific port (e.g., 3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
