const db = require("../models");
const Website_pdf = db.website_pdfs;
const Op = db.Sequelize.Op;

// Create and Save a new Website_pdf
exports.create = (req, res) => {
  // Validate request
  if (!(req.body.url)) {
    res.status(400).send({
      message: "Website url is required"
    });
    return;
  }

  // Create a Website_pdf
  const website_pdf = {
    title: req.body.title,
    url: req.body.url,
    status:'0',
    user_id:1
  };

  // Save Website_pdf in the database
  Website_pdf.create(website_pdf)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Website_pdf."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Website_pdf.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving website_pdfs."
      });
    });
};

// Find a single Website_pdf with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Website_pdf.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Website_pdf with id=" + id
      });
    });
};

// Update a Website_pdf by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Website_pdf.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Website_pdf was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Website_pdf with id=${id}. Maybe Website_pdf was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Website_pdf with id=" + id
      });
    });
};

// Delete a Website_pdf with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Website_pdf.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Website_pdf was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Website_pdf with id=${id}. Maybe Website_pdf was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Website_pdf with id=" + id
      });
    });
};

// Delete all Website_pdf from the database.
exports.deleteAll = (req, res) => {
    Website_pdf.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Website_pdf were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all website_pdfs."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
    Website_pdf.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving website_pdfs."
      });
    });
};
