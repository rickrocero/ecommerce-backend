const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/products", (req,res) => {
  Product.findAll().then(data => {
    res.json(data);
  })
})

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});