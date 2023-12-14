const PDFMerger = require('pdf-merger-js');
const fs = require('fs');
const path = require('path');

var merger = new PDFMerger();

async function combinePdf(pdfPaths) {

    const pdfPathsToCombine = pdfPaths.slice(0, 90);

    for (const path of pdfPathsToCombine) {
        await merger.add(`/media/ds/DE50AB7150AB4ED9/${path}`);
    }
    await merger.save('/media/ds/DE50AB7150AB4ED9/allpdf/final.pdf');
}


async function fetchPdfName() {

    const folderPath = '/media/ds/DE50AB7150AB4ED9';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }

        const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
        combinePdf(pdfFiles)
        console.log('PDF Files in the folder:');
        pdfFiles.forEach(pdfFile => {
            console.log(pdfFile);
        });
    });
}



 fetchPdfName();






