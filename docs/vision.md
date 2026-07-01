# Vision Document — Inventory API

## 1. Descripción del Producto

**Inventory API** es una API REST que permite a pequeños emprendedores gestionar su inventario de productos digitalmente, desde cualquier dispositivo móvil o web. Cada emprendedor gestiona su propio inventario de forma independiente.

---

## 2. Problema que Resuelve

Los pequeños emprendedores llevan su inventario de forma manual (cuadernos, hojas de cálculo, memoria), lo que genera errores, pérdida de información y dificultad para saber cuándo reponer stock. Esta API provee la base para digitalizar ese proceso de forma simple y accesible.

---

## 3. Usuarios Objetivo

| Usuario | Descripción |
|---|---|
| Emprendedor | Persona que gestiona su propio inventario de productos |
| Desarrollador cliente | Quien consume esta API para construir una app móvil o web |

---

## 4. Qué Puede Hacer el Usuario

- Registrar nuevos productos con nombre, precio, stock inicial y categoría
- Consultar todos sus productos registrados
- Consultar un producto específico por ID
- Editar la información de un producto (nombre, precio, categoría)
- Aumentar o reducir el stock de un producto
- Eliminar un producto del inventario
- Ver reportes básicos:
  - Total de productos registrados
  - Productos con stock bajo (menos de 5 unidades)
  - Valor total del inventario (stock × precio)

---

## 5. Fuera del Alcance

- Ventas o facturación electrónica
- Autenticación y manejo de sesiones (no requerido en esta versión)
- Imágenes de productos
- Categorías predefinidas (la categoría es texto libre)

---

## 6. Criterios de Éxito

- El usuario puede registrar un producto y consultarlo después
- El usuario puede actualizar el stock de un producto (aumentar o reducir)
- El sistema rechaza stock negativo y precios menores o iguales a cero
- El usuario puede ver cuántos productos tiene con stock bajo
- El usuario puede eliminar un producto existente
