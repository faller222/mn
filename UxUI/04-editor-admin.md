## 4. Editor de Noticias (Payload CMS / Admin)

```
Movil — sidebar colapsado:
+----------------------------+
| = MN Admin    Martin v    |
+----------------------------+
| Editar nota                |
| * Borrador · guardado 12:41|
+----------------------------+
| Titulo *                   |
| +------------------------+ |
| | Entrevista a...        | |
| +------------------------+ |
|                            |
| Slug                       |
| +------------------------+ |
| | entrevista-a-...   [link]| |
| +------------------------+ |
| auto desde titulo · editable|
|                            |
| Categoria                  |
| +------------------------+ |
| | Entrevistas          v | |
| +------------------------+ |
|                            |
| Imagen destacada           |
| +------------------------+ |
| |  + Subir / Cloudinary  | |
| |  [preview 16:9]        | |
| +------------------------+ |
|                            |
| Contenido                  |
| +------------------------+ |
| | B I U  H2  "  *  link >| |
| +------------------------+ |
| |                        | |
| |  Rich Text...          | |
| |                        | |
| |                        | |
| +------------------------+ |
|                            |
| +--------+ +-------------+ |
| |Borrador| |  Publicar   | |
| +--------+ +-------------+ |
|      [ Previsualizar ]     |
+----------------------------+

Sidebar (drawer =):
+------------------+
| MN Admin        |
| Dashboard        |
| Noticias      <- |
| Media            |
| Usuarios         |
| -----------      |
| Ver sitio ->     |
| Cerrar sesion    |
+------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: sidebar = drawer overlay; acciones Publish/Draft en barra inferior sticky (pulgar).
- Tablet: sidebar icon-rail colapsable (64px) + formulario.
- Desktop: sidebar fijo 240px; canvas editor a la derecha; preview puede abrir split o nueva pestaña `/noticias/[slug]?preview=1`.

**Flujo editorial (Payload)**
- Estados: `draft | published | hidden` (alineado a `arquitectura.md`).
- Publicar exige: Título, Slug único, Contenido no vacío; imagen recomendada con warning, no bloqueante al inicio.
- Slug: autogenerado; conflicto → error inline.
- Preview: draft token, no indexable (`noindex`).

**A11y (admin)**
- Labels visibles en todos los campos; errores asociados con `aria-describedby`.
- Toolbar rich text: botones con `aria-label`, shortcuts documentados.
- No atrapar foco del drawer sin `Esc` + return focus.
- Confirmación al publicar / salir con cambios sin guardar.

**Interacciones**
- Guardar borrador → toast + timestamp.
- Publicar → lista admin + URL pública.
- Previsualizar → Visor de NOTA en modo preview.
- Media → upload Cloudinary; DB solo URL/metadatos.

**Scope:** si no hay ritmo de publicación estable, este editor es V2. No construirlo antes de que Home + LIVE + Contacto midan algo.

---
