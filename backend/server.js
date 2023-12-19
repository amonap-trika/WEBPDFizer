const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const path = require('path');

//const fetchUrlsFromWebsite = require('./app/library/sitemap');
const website_links = require('./app/controllers/website_link.controller');

// Constants
const PORT = process.env.PORT || 8080;

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));


// var corsOptions = {
//   origin:  "http://localhost:8888/" || '*'
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true });
// console.log("I am here");

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Webpdfizer dfdf" });
});


app.get("/api/cronjob", (req, res) => {
  website_links.findAll({
    limit: 1,
    where: { status: '0' },
}).then(function (result) {

  res.json(result);
 // console.log(result);

  //fetchUrlsFromWebsite
});
  //console.log(result);
 // 
  // res.json(result);
});


require("./app/routes/website_link.routes")(app);
require("./app/routes/website_pdf.routes")(app);


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
