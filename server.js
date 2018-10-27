// Import packages and their necessary functionalities
const express = require('express');
const path = require('path');
const db = require("./models");


// Give app access to express package
const app = express();


// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 8080;


// Sets up server to parserequest body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Sets server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));


// Routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);


// Starts our server on the predefined PORT
db.sequelize.sync().then(function () {
  console.log("Db is synced");
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });

  db.Products.findAll({}).
    then(function (rows) {
      console.log(JSON.stringify(rows, null, 2));
    }).catch(function (error) {
      console.log('Error', error);
    })
  })
