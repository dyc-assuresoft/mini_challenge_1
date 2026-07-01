# User Stories — Inventory API

---

## US-01: Registrar un producto

**Como** emprendedor,  
**quiero** registrar un nuevo producto con nombre, precio, stock y categoría,  
**para** tenerlo disponible en mi inventario.

### Criterios de Aceptación

```gherkin
Feature: Registrar producto

  Scenario: Registrar un producto exitosamente
    Given el usuario envía un POST a /products
    And el body contiene name, price mayor a 0 y stock mayor o igual a 0
    When la solicitud es procesada
    Then la respuesta tiene status 201
    And el body contiene el producto creado con un id generado

  Scenario: Registrar un producto con price inválido
    Given el usuario envía un POST a /products
    And el body contiene un price menor o igual a 0
    When la solicitud es procesada
    Then la respuesta tiene status 400
    And el body contiene un mensaje de error

  Scenario: Registrar un producto sin name
    Given el usuario envía un POST a /products
    And el body no contiene el campo name
    When la solicitud es procesada
    Then la respuesta tiene status 400
    And el body contiene un mensaje de error
```

---

## US-02: Listar todos los productos

**Como** emprendedor,  
**quiero** ver todos mis productos registrados,  
**para** tener una visión general de mi inventario.

### Criterios de Aceptación

```gherkin
Feature: Listar productos

  Scenario: Obtener lista cuando existen productos
    Given el usuario envía un GET a /products
    And existen productos registrados
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el body es un array con todos los productos

  Scenario: Obtener lista cuando no hay productos
    Given el usuario envía un GET a /products
    And no existen productos registrados
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el body es un array vacío
```

---

## US-03: Obtener un producto por ID

**Como** emprendedor,  
**quiero** consultar el detalle de un producto específico,  
**para** ver su información completa.

### Criterios de Aceptación

```gherkin
Feature: Obtener producto por ID

  Scenario: Obtener un producto existente
    Given el usuario envía un GET a /products/:id
    And existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el body contiene el producto con ese id

  Scenario: Obtener un producto que no existe
    Given el usuario envía un GET a /products/:id
    And no existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 404
    And el body contiene un mensaje de error
```

---

## US-04: Editar un producto

**Como** emprendedor,  
**quiero** editar el nombre, precio o categoría de un producto,  
**para** mantener su información actualizada.

### Criterios de Aceptación

```gherkin
Feature: Editar producto

  Scenario: Actualizar un producto exitosamente
    Given el usuario envía un PUT a /products/:id
    And existe un producto con ese id
    And el body contiene campos válidos
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el body contiene el producto con los datos actualizados

  Scenario: Actualizar con price inválido
    Given el usuario envía un PUT a /products/:id
    And el body contiene un price menor o igual a 0
    When la solicitud es procesada
    Then la respuesta tiene status 400
    And el body contiene un mensaje de error

  Scenario: Actualizar un producto que no existe
    Given el usuario envía un PUT a /products/:id
    And no existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 404
    And el body contiene un mensaje de error
```

---

## US-05: Actualizar stock de un producto

**Como** emprendedor,  
**quiero** aumentar o reducir el stock de un producto,  
**para** reflejar entradas y salidas de mercadería.

### Criterios de Aceptación

```gherkin
Feature: Actualizar stock

  Scenario: Aumentar stock exitosamente
    Given el usuario envía un PATCH a /products/:id/stock
    And el body contiene quantity positivo
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el stock del producto aumenta en la cantidad indicada

  Scenario: Reducir stock exitosamente
    Given el usuario envía un PATCH a /products/:id/stock
    And el body contiene quantity negativo
    And el stock resultante es mayor o igual a 0
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el stock del producto se reduce en la cantidad indicada

  Scenario: Reducir stock por debajo de cero
    Given el usuario envía un PATCH a /products/:id/stock
    And el body contiene quantity negativo
    And el stock resultante sería menor a 0
    When la solicitud es procesada
    Then la respuesta tiene status 400
    And el body contiene un mensaje de error

  Scenario: Actualizar stock de un producto que no existe
    Given el usuario envía un PATCH a /products/:id/stock
    And no existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 404
    And el body contiene un mensaje de error
```

---

## US-06: Eliminar un producto

**Como** emprendedor,  
**quiero** eliminar un producto de mi inventario,  
**para** mantener la lista actualizada.

### Criterios de Aceptación

```gherkin
Feature: Eliminar producto

  Scenario: Eliminar un producto exitosamente
    Given el usuario envía un DELETE a /products/:id
    And existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 204
    And el producto ya no existe en el sistema

  Scenario: Eliminar un producto que no existe
    Given el usuario envía un DELETE a /products/:id
    And no existe un producto con ese id
    When la solicitud es procesada
    Then la respuesta tiene status 404
    And el body contiene un mensaje de error
```

---

## US-07: Ver reporte de inventario

**Como** emprendedor,  
**quiero** ver un reporte con métricas básicas de mi inventario,  
**para** tomar decisiones sobre reposición y valor de stock.

### Criterios de Aceptación

```gherkin
Feature: Reporte de inventario

  Scenario: Obtener reporte exitosamente
    Given el usuario envía un GET a /products/report
    When la solicitud es procesada
    Then la respuesta tiene status 200
    And el body contiene totalProducts con el número total de productos
    And el body contiene lowStockProducts con productos con stock menor a 5
    And el body contiene totalInventoryValue con la suma de stock por precio de cada producto
```
