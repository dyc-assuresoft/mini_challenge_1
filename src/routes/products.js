// src/routes/products.js
const { Router } = require('express');
const { randomUUID } = require('crypto');
const products = require('../db/store');

const router = Router();

// GET /products/report — US-07: Reporte de inventario
// Debe ir ANTES de /:id para que Express no lo interprete como un ID
router.get('/report', (req, res) => {
  const totalProducts = products.length;

  const lowStockProducts = products
    .filter((p) => p.stock < 5)
    .map(({ id, name, stock }) => ({ id, name, stock }));

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + p.stock * p.price,
    0
  );

  res.status(200).json({
    totalProducts,
    lowStockProducts,
    totalInventoryValue: parseFloat(totalInventoryValue.toFixed(2)),
  });
});

// GET /products — US-02: Listar todos los productos
router.get('/', (req, res) => {
  res.status(200).json(products);
});

// POST /products — US-01: Registrar un producto
router.post('/', (req, res) => {
  const { name, price, stock, category } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'El campo name es requerido' });
  }
  if (price === undefined || price <= 0) {
    return res.status(400).json({ error: 'El price debe ser mayor a 0' });
  }
  if (stock === undefined || stock < 0) {
    return res.status(400).json({ error: 'El stock debe ser mayor o igual a 0' });
  }

  const newProduct = {
    id: randomUUID(),
    name,
    price,
    stock,
    category: category || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// GET /products/:id — US-03: Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.status(200).json(product);
});

// PUT /products/:id — US-04: Editar un producto
router.put('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { name, price, category } = req.body;

  if (price !== undefined && price <= 0) {
    return res.status(400).json({ error: 'El price debe ser mayor a 0' });
  }

  if (name !== undefined) products[index].name = name;
  if (price !== undefined) products[index].price = price;
  if (category !== undefined) products[index].category = category;
  products[index].updatedAt = new Date().toISOString();

  res.status(200).json(products[index]);
});

// PATCH /products/:id/stock — US-05: Actualizar stock
router.patch('/:id/stock', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ error: 'El campo quantity es requerido' });
  }

  const newStock = product.stock + quantity;
  if (newStock < 0) {
    return res.status(400).json({ error: 'El stock no puede ser negativo' });
  }

  product.stock = newStock;
  product.updatedAt = new Date().toISOString();

  res.status(200).json(product);
});

// DELETE /products/:id — US-06: Eliminar un producto
router.delete('/:id', (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
