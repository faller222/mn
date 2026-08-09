## 3. Visor de NOTA (Artículo individual)

```
+----------------------------+
| <- Noticias         [> LIVE]|
+----------------------------+
| ENTREVISTAS                |
|                            |
| Titulo largo de la nota    |
| que puede ocupar 2-3       |
| lineas sin truncar.        |
|                            |
| Martin Nocetti · 12 ago    |
| 8 min lectura · 28 min audio|
+----------------------------+
| +------------------------+ |
| |#### IMAGEN DESTACADA ##| |
| |      (full-bleed)      | |
| +------------------------+ |
| Pie de foto / credito      |
+----------------------------+
| +------------------------+ |
| | >  Audio / Video       | |
| | ########----  12:40    | |
| | [ -15s ] [ > ] [ +15s ]| |
| +------------------------+ |
+----------------------------+
|                            |
| Parrafo de lectura...      |
| measure ~65-75 ch en desk. |
|                            |
| Subtitulo / intertitulo    |
| Mas cuerpo. Citas en bloque|
| con tipografia distintiva. |
|                            |
| * Lista si aplica          |
|                            |
+----------------------------+
| Compartir                  |
| [WA] [X] [FB] [Copiar link]|
+----------------------------+
| Relacionadas               |
| +------+ +------+          |
| |thumb | |thumb |          |
| |titulo| |titulo|          |
| +------+ +------+          |
+----------------------------+
| Queres pautar en MN?      |
| [ Contactar ]              |
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: tipografía ~17–18px / line-height 1.6; imagen full-bleed edge-to-edge; player sticky inferior opcional si el usuario scrollea el body.
- Tablet: contenido centrado max-width ~680px.
- Desktop: columna de lectura `max-width: 680–720px` centrada; share puede ser rail vertical sticky a la izquierda del artículo; relacionadas en 3 columnas debajo.

**Lectura**
- Un solo H1 (título). Categoría como eyebrow, no como H1.
- Sin sidebars de "más noticias" compitiendo en el primer viewport.
- OG tags + canonical por slug para share.

**A11y**
- Player: controles nativos o custom con teclado (Space play/pause, flechas seek); `aria-label` en cada control.
- Imagen: `alt` real (no "imagen1").
- Share: botones con nombre accesible ("Compartir por WhatsApp"); "Copiar link" confirma con `aria-live`.
- Contraste de citas y metadata >= 4.5:1.

**Interacciones**
- <- → lista (con filtros previos si existían en query).
- Relacionadas → otra nota.
- CTA pautar → Contacto con `?asunto=Publicidad` prefilled.
- Evento `view_article` al 50% de scroll o 15s.

---
