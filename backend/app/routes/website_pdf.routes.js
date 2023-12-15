module.exports = app => {
    const website_pdfs = require("../controllers/website_pdf.controller.js");

    var router = require("express").Router();

    // Create a new website_pdf
    router.post("/", website_pdfs.create);

    // Retrieve all website_pdfs
    router.get("/", website_pdfs.findAll);

    // Retrieve all published website_pdfs
    router.get("/published", website_pdfs.findAllPublished);

    // Retrieve a single website_pdf with id
    router.get("/:id", website_pdfs.findOne);

    // Update a website_pdf with id
    router.put("/:id", website_pdfs.update);

    // Delete a website_pdf with id
    router.delete("/:id", website_pdfs.delete);

    // Delete all website_pdf
    router.delete("/", website_pdfs.deleteAll);

    app.use('/api/website_pdfs', router);
};
