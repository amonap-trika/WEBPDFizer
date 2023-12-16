const db = require("../models");
const Website_link = db.website_links;
const Op = db.Sequelize.Op;

// Create and Save a new Website_link
exports.create = (req, res) => {
  // Validate request
  if (!req.body.url) {
    res.status(400).send({
      message: "url should be there"
    });
    return;
  }

  // Create a Website_link
  const website_link = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Website_link in the database
  Website_link.create(website_link)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Website_link."
      });
    });
};

// Retrieve all Website_links from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Website_link.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving website_link."
      });
    });
};

// Find a single Website_link with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Website_link.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Website_link with id=" + id
      });
    });
};

// Update a Website_link by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Website_link.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Website_link was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Website_link with id=${id}. Maybe Website_link was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Website_link with id=" + id
      });
    });
};

// Delete a Website_link with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Website_link.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Website_link was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Website_link with id=${id}. Maybe Website_link was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Website_link with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Website_link.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Website_link were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all website_links."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Website_link.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving website_links."
      });
    });
};
