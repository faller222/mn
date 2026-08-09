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
| +------------------------+ |
| | Publica con MN        | |
| | Anunciantes · Maldonado| |
| | [ Contactar ] [WhatsApp]| |  <- CTA comercial
| +------------------------+ |
|                            |
| Spotify · Instagram · Bio  |
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

**Conversión (prioridad)**
1. `> LIVE` / Escuchar en vivo → evento GA4 `play_radio`
2. Contactar / WhatsApp → `click_whatsapp` / `contact_submit`
3. Click en card → `click_article`

**A11y**
- Contraste mínimo AA (texto sobre hero: overlay oscuro `rgba(0,0,0,.45)` o tipografía sobre zona limpia).
- Botón LIVE: `aria-label="Escuchar en vivo — FM Brava"`, estado `aria-pressed` al reproducir.
- Menú: `button` + `aria-expanded`, foco atrapado en overlay, `Esc` cierra, retorno de foco al hamburguesa.
- Cards: un solo enlace envolvente o título como link principal; thumbnail `alt` descriptivo o vacío si decorativo junto a título.

**Interacciones**
- LIVE abre player (mini-bar inferior persistente en toda la sesión).
- "Ver todas" → Visor de Notas.
- Contactar → Contact Me; WhatsApp → deep link externo.
- En franja fuera de aire: hero cambia a "Última entrevista" + CTA Spotify (no mentir "EN VIVO").

---
