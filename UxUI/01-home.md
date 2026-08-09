## 1. Landing / Home / Index

```
+----------------------------+
| [logo] MN           [> LIVE]|  <- sticky; logo: fotos/mnn-logo-opcion-2-negro-dorado.png
+----------------------------+
|                            |
|  +----------------------+  |
|  |#### HERO / EN VIVO ##|  |
|  |                      |  |
|  |  * EN VIVO AHORA     |  |
|  |  La mejor manera de  |  |
|  |  comenzar la manana  |  |
|  |                      |  |
|  | [ > ESCUCHAR EN VIVO ]| |  <- CTA primario
|  |  FM Brava · streaming|  |
|  +----------------------+  |
|                            |
|  Hoy · Destacados          |
|  +----------------------+  |
|  | [thumb] Entrevista   |  |
|  | Titulo del invitado  |  |
|  | 12 ago · 28 min      |  |
|  +----------------------+  |
|  +----------------------+  |
|  | [thumb] Nota local   |  |
|  | Titulo corto...      |  |
|  | 11 ago · Actualidad  |  |
|  +----------------------+  |
|  +----------------------+  |
|  | [thumb] Historia     |  |
|  | Titulo...            |  |
|  | 10 ago · Historias   |  |
|  +----------------------+  |
|                            |
|      [ Ver todas -> ]      |
|                            |
| Podcast · Entrevistas      |
| +------------------------+ |
| | Spotify embed (iframe) | |  <- NO en hero; debajo del fold
| | show/1WxPXeCzGu3D8d... | |
| | height: 152 (mobile)   | |
| | height: 352 (desktop)  | |
| +------------------------+ |
| [ Abrir en Spotify -> ]    |  <- fallback + tracking
|                            |
| +------------------------+ |
| | Publica con MN         | |
| | Anunciantes · Maldonado| |
| | [ Contactar ] [WhatsApp]| |  <- CTA comercial
| +------------------------+ |
|                            |
| Instagram · About · Contacto|
|                            |
| (c) MN · Contacto · About |
+----------------------------+

Menu hamburguesa (overlay):
+----------------------------+
| X  Navegacion              |
+----------------------------+
|  Inicio                    |
|  En vivo                   |
|  Noticias                  |
|  Sobre Martin              |
|  Contacto                  |
|  -----------------         |
|  [ > Escuchar en vivo ]    |
|  [ WhatsApp ]              |
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: hero full-bleed + stack 1 columna; LIVE sticky en navbar (siempre visible).
- Tablet: hero mantiene full width; grilla destacados pasa a **2 columnas**.
- Desktop (`>=1024`): navbar horizontal (sin hamburguesa); hero a ancho completo con player embebido a la derecha o debajo del título; grilla **3 columnas**; CTA comercial en banda ancha, no card flotante.
- Spotify embed: `width: 100%`; altura **152** en móvil / **352** en tablet-desktop; `loading="lazy"`. Nunca en el primer viewport.

**Spotify (iframe oficial)**
- Tipo: **show** (podcast), no playlist.
- URL: `https://open.spotify.com/embed/show/1WxPXeCzGu3D8dJeTwwAd3?utm_source=generator`
- Show público: `https://open.spotify.com/show/1WxPXeCzGu3D8dJeTwwAd3`
- Atributos: `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`, `frameborder="0"`, `allowfullscreen`, `title="Podcast MN en Spotify"`.
- Fallback obligatorio: link “Abrir en Spotify” por si el iframe falla o el usuario bloquea terceros.

**Conversión (prioridad)**
1. `> LIVE` / Escuchar en vivo → evento GA4 `play_radio`
2. Contactar / WhatsApp → `click_whatsapp` / `contact_submit`
3. Click en card → `click_article`
4. Spotify → `click_spotify` (en el link fallback y, si es posible, al interactuar con el bloque). El embed no da métricas útiles para vender publicidad.

**A11y**
- Contraste mínimo AA (texto sobre hero: overlay oscuro `rgba(0,0,0,.45)` o tipografía sobre zona limpia).
- Botón LIVE: `aria-label="Escuchar en vivo — FM Brava"`, estado `aria-pressed` al reproducir.
- Menú: `button` + `aria-expanded`, foco atrapado en overlay, `Esc` cierra, retorno de foco al hamburguesa.
- Cards: un solo enlace envolvente o título como link principal; thumbnail `alt` descriptivo o vacío si decorativo junto a título.
- iframe Spotify: `title` descriptivo; el link “Abrir en Spotify” debe ser usable solo con teclado sin depender del iframe.

**Interacciones**
- LIVE abre player (mini-bar inferior persistente en toda la sesión). LIVE y Spotify no compiten: vivo = adquisición en tiempo real; Spotify = archivo on-demand.
- "Ver todas" → Visor de Notas.
- Contactar → Contact Me; WhatsApp → deep link externo.
- En franja fuera de aire: hero cambia a “Última entrevista” + CTA al bloque Spotify / “Abrir en Spotify” (no mentir “EN VIVO”).

---
