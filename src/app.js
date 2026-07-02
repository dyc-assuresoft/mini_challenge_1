// src/app.js
const express = require('express');
const productRoutes = require('./routes/products');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Inventory API corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
