# Prompts Usados con LLM — Inventory API

Registro de consultas realizadas al asistente de IA durante el desarrollo del challenge.

---

## Prompt 1

**Objetivo:** Definir el alcance del producto antes de escribir el vision.md.

**Prompt:**
> Estoy haciendo una app de inventario para pequeños emprendedores. El usuario puede agregar productos con nombre, precio, stock y categoría. También quiero reportes básicos como total de productos y productos con stock bajo. No va a tener ventas ni facturación. ¿Me ayudas a revisar si me falta algo importante en el alcance antes de escribir el vision document?

**Resultado:** El revisor sugirió definir el umbral de "stock bajo" (se definió como < 5 unidades) y aclarar si la categoría sería texto libre o lista fija (se decidió texto libre).

---

## Prompt 2

**Objetivo:** Revisar el borrador del vision.md.

**Prompt:**
> Aquí está mi borrador del vision.md para la Inventory API. ¿Hay algo que le falte o que esté mal definido? [se adjuntó borrador]

**Resultado:** El revisor sugirió agregar explícitamente que el almacenamiento es en memoria y que no hay autenticación en esta versión.

---

## Prompt 3

**Objetivo:** Validar que los criterios Gherkin de US-05 cubren todos los casos del stock.

**Prompt:**
> En mi US-05 para actualizar stock tengo estos escenarios: aumentar, reducir con resultado >= 0, reducir con resultado < 0, y producto no existe. ¿Me falta algún caso borde importante?

**Resultado:** El revisor confirmó que los 4 escenarios cubren los casos necesarios para esta versión.

---

## Prompt 4

**Objetivo:** Resolver duda puntual sobre el orden de rutas en Express.

**Prompt:**
> En Express, si tengo GET /products/report y GET /products/:id, ¿en qué orden debo definirlas para que /report no sea interpretado como un :id?

**Resultado:** Se confirmó que /report debe definirse antes de /:id en el archivo de rutas.

---

## Prompt 5

**Objetivo:** Revisar que el openapi.yaml tenga los status codes correctos según las user stories.

**Prompt:**
> Revisa si los status codes en mi openapi.yaml coinciden con los definidos en user-stories.md. [se adjuntó el yaml]

**Resultado:** Se confirmó la consistencia. Se ajustó el PATCH /stock para dejar claro en la descripción que quantity positivo aumenta y negativo reduce.
