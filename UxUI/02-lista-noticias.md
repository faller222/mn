## 2. Visor de Notas (Lista)

```
+----------------------------+
| <- Noticias         [> LIVE]|
+----------------------------+
| [Buscar] Buscar entrevistas|
+----------------------------+
| [Todas][Entrevistas][Notas]|  <- chips scroll-x
| [Historias][Actualidad]    |
+----------------------------+
| 24 resultados · Recientes v|
+----------------------------+
| +------------------------+ |
| |#### thumb 16:9 ########| |
| | ENTREVISTAS            | |
| | Titulo completo de la  | |
| | pieza editorial...     | |
| | Extracto de 2 lineas   | |
| | que no corte sentido.  | |
| | 12 ago 2026 · 28 min   | |
| +------------------------+ |
| +------------------------+ |
| |#### thumb -------------| |
| | ACTUALIDAD             | |
| | Titulo...              | |
| | Extracto...            | |
| | 11 ago 2026            | |
| +------------------------+ |
| +------------------------+ |
| | ...                    | |
| +------------------------+ |
|                            |
|   o Cargando mas...        |  <- infinite scroll
|   -- o --                  |
|   [ <- 1  2  3  ... -> ]   |  <- fallback SEO
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: 1 columna; filtros en scroll horizontal.
- Tablet: 2 columnas; filtros pueden pasar a fila wrap.
- Desktop: 3 columnas; sidebar opcional de filtros a izquierda (sticky); buscador más ancho.

**Paginación vs scroll**
- **UX primaria:** infinite scroll con sentinel + skeleton (mejor engagement móvil).
- **SEO/accesibilidad:** paginación real en URL (`?page=2`) o "Cargar más" con enlace crawlable. No depender solo de scroll infinito para indexación.
- Estado vacío: "No hay resultados" + limpiar filtros.

**A11y**
- Buscador: `<label>` visible o `aria-label`; anunciar resultados con `aria-live="polite"` ("24 resultados").
- Chips: `role="tablist"`/`tab` o botones toggle con `aria-pressed`.
- Orden ("Recientes"): `<select>` nativo o listbox accesible.
- Focus visible en cada card; no poner click solo en el thumbnail.

**Interacciones**
- Tap card → Visor de NOTA (`/noticias/[slug]`).
- LIVE sticky sigue disponible.
- Breadcrumb implícito: "<-" vuelve a Home preservando scroll si es SPA/soft nav.

**Nota de producto:** categorías en V2 solo si hay ritmo real de publicación. Si hay pocas notas por semana, los filtros vacíos dañan credibilidad. Empezar con "Todas / Entrevistas".

---
