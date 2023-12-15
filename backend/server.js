const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin:  "http://localhost:8888/" || '*'
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");

// db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome todsd Webpdfizer" });
});


require("./app/routes/turorial.routes")(app);
require("./app/routes/website_link.routes")(app);
require("./app/routes/website_pdf.routes")(app);


// set port, listen for requests
const PORT = 8900;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
