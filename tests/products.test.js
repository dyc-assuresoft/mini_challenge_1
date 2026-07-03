// tests/products.test.js
const request = require('supertest');
const app = require('../src/app');
const products = require('../src/db/store');

beforeEach(() => {
  products.length = 0;
});

// ─────────────────────────────────────────────
// US-01: Registrar un producto
// ─────────────────────────────────────────────
describe('US-01: Registrar un producto', () => {
  test('Registra un producto exitosamente', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 40, category: 'ropa' });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe('Polo blanco');
    expect(res.body.price).toBe(25);
    expect(res.body.stock).toBe(40);
    expect(res.body.category).toBe('ropa');
  });

  test('Retorna 400 si no se envía name', async () => {
    const res = await request(app)
      .post('/products')
      .send({ price: 25, stock: 10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('Retorna 400 si price es 0', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Producto', price: 0, stock: 10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('Retorna 400 si price es negativo', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Producto', price: -5, stock: 10 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('Retorna 400 si stock es negativo', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Producto', price: 10, stock: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

// ─────────────────────────────────────────────
// US-02: Listar todos los productos
// ─────────────────────────────────────────────
describe('US-02: Listar todos los productos', () => {
  test('Retorna array vacío cuando no hay productos', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('Retorna todos los productos existentes', async () => {
    await request(app).post('/products').send({ name: 'P1', price: 10, stock: 5 });
    await request(app).post('/products').send({ name: 'P2', price: 20, stock: 3 });

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────
// US-03: Obtener un producto por ID
// ─────────────────────────────────────────────
describe('US-03: Obtener un producto por ID', () => {
  test('Retorna el producto si existe', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 10 });

    const res = await request(app).get(`/products/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  test('Retorna 404 si el producto no existe', async () => {
    const res = await request(app).get('/products/id-inexistente');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

// ─────────────────────────────────────────────
// US-04: Editar un producto
// ─────────────────────────────────────────────
describe('US-04: Editar un producto', () => {
  test('Actualiza el nombre y precio correctamente', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 10 });

    const res = await request(app)
      .put(`/products/${created.body.id}`)
      .send({ name: 'Polo negro', price: 30 });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Polo negro');
    expect(res.body.price).toBe(30);
  });

  test('Retorna 400 si price actualizado es 0 o negativo', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 10 });

    const res = await request(app)
      .put(`/products/${created.body.id}`)
      .send({ price: -1 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('Retorna 404 si el producto no existe', async () => {
    const res = await request(app)
      .put('/products/id-inexistente')
      .send({ name: 'Nuevo nombre' });

    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────
// US-05: Actualizar stock
// ─────────────────────────────────────────────
describe('US-05: Actualizar stock', () => {
  test('Aumenta el stock correctamente', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 10 });

    const res = await request(app)
      .patch(`/products/${created.body.id}/stock`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.stock).toBe(15);
  });

  test('Reduce el stock correctamente', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 10 });

    const res = await request(app)
      .patch(`/products/${created.body.id}/stock`)
      .send({ quantity: -3 });

    expect(res.status).toBe(200);
    expect(res.body.stock).toBe(7);
  });

  test('Retorna 400 si el stock resultante sería negativo', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'Polo blanco', price: 25, stock: 2 });

    const res = await request(app)
      .patch(`/products/${created.body.id}/stock`)
      .send({ quantity: -5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('Retorna 404 si el producto no existe', async () => {
    const res = await request(app)
      .patch('/products/id-inexistente/stock')
      .send({ quantity: 5 });

    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────
// US-06: Eliminar un producto
// ─────────────────────────────────────────────
describe('US-06: Eliminar un producto', () => {
  test('Elimina un producto existente y retorna 204', async () => {
    const created = await request(app)
      .post('/products')
      .send({ name: 'A eliminar', price: 10, stock: 5 });

    const res = await request(app).delete(`/products/${created.body.id}`);
    expect(res.status).toBe(204);

    const check = await request(app).get(`/products/${created.body.id}`);
    expect(check.status).toBe(404);
  });

  test('Retorna 404 al eliminar un producto que no existe', async () => {
    const res = await request(app).delete('/products/id-inexistente');
    expect(res.status).toBe(404);
  });
});

// ─────────────────────────────────────────────
// US-07: Reporte de inventario
// ─────────────────────────────────────────────
describe('US-07: Reporte de inventario', () => {
  test('Retorna reporte con métricas correctas', async () => {
    await request(app).post('/products').send({ name: 'P1', price: 10, stock: 2 });
    await request(app).post('/products').send({ name: 'P2', price: 20, stock: 10 });
    await request(app).post('/products').send({ name: 'P3', price: 5, stock: 4 });

    const res = await request(app).get('/products/report');

    expect(res.status).toBe(200);
    expect(res.body.totalProducts).toBe(3);
    // P1 (stock 2) y P3 (stock 4) tienen stock < 5
    expect(res.body.lowStockProducts).toHaveLength(2);
    // (10*2) + (20*10) + (5*4) = 20 + 200 + 20 = 240
    expect(res.body.totalInventoryValue).toBe(240);
  });

  test('Retorna reporte vacío si no hay productos', async () => {
    const res = await request(app).get('/products/report');

    expect(res.status).toBe(200);
    expect(res.body.totalProducts).toBe(0);
    expect(res.body.lowStockProducts).toHaveLength(0);
    expect(res.body.totalInventoryValue).toBe(0);
  });
});
