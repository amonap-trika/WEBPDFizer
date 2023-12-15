module.exports = app => {
    const website_links = require("../controllers/website_link.controller.js");

    var router = require("express").Router();
  
    // Create a new website_link
    router.post("/", website_links.create);
  
    // Retrieve all website_links
    router.get("/", website_links.findAll);
  
    // Retrieve all published website_links
    router.get("/published", website_links.findAllPublished);
  
    // Retrieve a single website_link with id
    router.get("/:id", website_links.findOne);
  
    // Update a website_link with id
    router.put("/:id", website_links.update);
  
    // Delete a website_link with id
    router.delete("/:id", website_links.delete);
  
    // Delete all website_links
    router.delete("/", website_links.deleteAll);
  
    app.use('/api/website_links', router);
  };
  