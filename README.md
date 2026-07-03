# Inventory API

API REST para gestionar el inventario de productos de pequeños emprendedores. Construida con Node.js y Express.

---

## Requisitos

- Node.js >= 18
- npm >= 9

---

## Instalación

```bash
npm install
```

---

## Ejecutar el servidor

```bash
npm start
```

Corre en `http://localhost:3000`.

---

## Ejecutar los tests

```bash
npm test
```

---

## Endpoints

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/products` | Listar todos los productos |
| POST | `/products` | Registrar un nuevo producto |
| GET | `/products/report` | Ver reporte de inventario |
| GET | `/products/:id` | Obtener un producto por ID |
| PUT | `/products/:id` | Editar un producto |
| DELETE | `/products/:id` | Eliminar un producto |
| PATCH | `/products/:id/stock` | Actualizar stock (aumentar o reducir) |

Consultar `docs/openapi.yaml` para el contrato completo.

---

## Validación de User Stories

| User Story | Cómo validarla |
|---|---|
| US-01: Registrar producto | `POST /products` con name, price > 0 y stock >= 0 → 201 |
| US-02: Listar productos | `GET /products` → 200 con array |
| US-03: Obtener por ID | `GET /products/:id` → 200 con producto |
| US-04: Editar producto | `PUT /products/:id` con campos a actualizar → 200 |
| US-05: Actualizar stock | `PATCH /products/:id/stock` con quantity positivo o negativo → 200 |
| US-06: Eliminar producto | `DELETE /products/:id` → 204 |
| US-07: Reporte | `GET /products/report` → 200 con totalProducts, lowStockProducts, totalInventoryValue |

### Ejemplo con curl

```bash
# Registrar producto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Polo blanco","price":25,"stock":40,"category":"ropa"}'

# Ver reporte
curl http://localhost:3000/products/report

# Reducir stock (reemplaza {id} con el ID real)
curl -X PATCH http://localhost:3000/products/{id}/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity":-5}'
```

---

## Estructura del proyecto

```
inventory-api/
├── docs/
│   ├── vision.md
│   ├── user-stories.md
│   ├── data-model.md
│   └── openapi.yaml
├── src/
│   ├── app.js
│   ├── routes/
│   │   └── products.js
│   └── db/
│       └── store.js
├── tests/
│   └── products.test.js
├── prompts.md
├── package.json
└── README.md
```
