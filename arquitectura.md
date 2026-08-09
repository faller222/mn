# Arquitectura — MN (Martín Nocetti)

Documento de decisiones técnicas del proyecto digital MN.  
Última actualización: 2026-08-09.

---

## 1. Objetivo técnico

Construir la infraestructura de un medio digital personal alrededor de Martín Nocetti:

- presencia web con identidad de marca (MN),
- escucha en vivo (stream de Radio Brava),
- contacto comercial,
- medición de audiencia (GA4) para vender publicidad con datos,
- más adelante: publicación de notas/entrevistas con panel usable por Martín.

La web no es el producto final. El activo es **audiencia propia + métricas**. La arquitectura sirve a eso, no al revés.

---

## 2. Principios

1. **Fases.** Primero sitio medible y vivo; después CMS. No mezclar todo el día uno.
2. **No reinventar un CMS.** Auth, uploads, drafts y panel son problema resuelto.
3. **Martín debe poder publicar solo.** Si el panel requiere al desarrollador, el stack falló.
4. **SEO y velocidad importan.** Es un medio, no una SPA de app interna.
5. **Analytics web desde V1.** Sin datos, la plataforma no mejora la venta publicitaria.
6. **Reusar infraestructura existente** (stream de FM Brava, Spotify, Instagram). No construir radio ni red social.
7. **Evitar tool-loyalty.** No elegir Firebase (u otra cosa) solo porque “ya lo usamos en otros proyectos”.

---

## 3. Stack cerrado

| Pieza | Elección | Rol |
|---|---|---|
| Framework | **Next.js (React)** | Sitio público + admin |
| Hosting | **Vercel** | Deploy del Next/Payload |
| CMS / backend de contenido | **Payload** | Auth admin, API, panel, CRUD de noticias |
| Base de datos | **Supabase (Postgres)** | Persistencia de posts, users, metadata de media |
| Imágenes | **Cloudinary** | Upload, transformaciones, CDN de fotos |
| Contacto | **Formspree** | Formulario → email (V1) |
| Analytics | **GA4** | Visitas, eventos, reportes comerciales |
| Audio en vivo | **Stream / player FM Brava** | Botón “Escuchar en vivo” |

### Stack en una frase

> Next.js en Vercel; backend de contenido = Payload dentro de Next; persistencia = Supabase Postgres; media = Cloudinary; contacto = Formspree; analytics = GA4.

---

## 4. Dónde vive cada cosa

```
Vercel
 └── Next.js
      ├── páginas públicas (/, /noticias/...)
      ├── /admin              ← panel de Martín (Payload)
      └── API Payload         ← auth, CRUD, upload
           ├── Postgres       ← Supabase (noticias, users, URLs)
           └── Cloudinary     ← archivos de imagen
```

| Qué | Dónde | Notas |
|---|---|---|
| Web pública | Vercel | Dominio `.uy` apunta aquí |
| Panel admin | Mismo deploy (`/admin`) | No hay segundo servidor de admin |
| Noticias (texto, fecha, status, slug) | Supabase Postgres | Las escribe Payload, no una API custom |
| Imágenes | Cloudinary | En Postgres solo URL + metadatos |
| Contacto V1 | Formspree | No requiere tabla propia al inicio |
| Métricas | GA4 | No viven en nuestra DB |
| Usuarios del admin | Postgres (vía Payload) | 1–2 usuarios (Martín + admin técnico) |

### Backend: ¿hay uno aparte?

**No.** Payload **es** el backend de contenido. Corre como parte de Next.js en Vercel (server/API routes).  
No se necesita Express/Nest/Firebase Functions para noticias.

Supabase, en este diseño, es **Postgres hospedado**, no un segundo backend a programar.  
No se usan (por ahora) Supabase Auth, Edge Functions ni Realtime para el MVP de contenido.

Formspree cubre el formulario sin BFF propio en V1.

---

## 5. Fases

### V1 — ReadOnly + adquisición

Incluye:

- Landing MN (marca, bio, CTAs).
- Play del stream de Radio Brava.
- Links a Spotify / Instagram (X con cuidado; preferir link sobre iframe frágil).
- Formulario de contacto (Formspree).
- GA4 + eventos mínimos (`play_radio`, `click_whatsapp`, `contact_submit`, etc.).
- SEO básico, dominio, hosting.

**Fuera de V1:**

- Auth de publicación.
- Panel CMS.
- CRUD de noticias.
- Uploads de fotos de notas.
- Firebase / Firestore.

### V2 — Publicación

Modelo mínimo de contenido:

```
User (admin)
Post
  - title
  - slug
  - body          (rich text simple)
  - coverImage    (Cloudinary)
  - publishedAt
  - status        draft | published | hidden
```

- Listado público: `status === published`, orden `publishedAt desc`.
- “Esconder” = `hidden` o volver a `draft`; no borrar por defecto.
- Auth: email/password del admin de Payload. Sin login público de audiencia.
- Sin categorías/tags/autores múltiples hasta que el ritmo de publicación lo justifique.

Horario del player (“mostrar En vivo solo en franja del programa”) = mejora de UI posterior, no infraestructura de radio.

---

## 6. Decisiones: qué SÍ y por qué

| Decisión | Por qué |
|---|---|
| **Next.js (React), no SPA Vite pura** | Payload se integra de forma natural; SSR/SSG ayudan SEO de notas; un solo repo para sitio + admin. |
| **Vercel** | Deploy simple de Next, preview por PR, edge/CDN para el front. |
| **Payload como CMS** | Auth, admin UI, collections, uploads y API sin armar un CMS a mano. Self-hosted en el proyecto: menos dependencia de SaaS de contenido. |
| **Supabase como Postgres** | DB gestionada, connection string clara para Payload, backups y consola SQL si hace falta. No implica adoptar todo el ecosistema Supabase. |
| **Cloudinary para imágenes** | Upload desde el admin, transformaciones (thumb/webp), CDN. Evita guardar binarios en la DB. |
| **Formspree para contacto V1** | Cero backend propio para un form. Suficiente hasta que exista volumen o CRM. |
| **GA4 desde el día uno** | El negocio necesita métricas vendibles (visitas, origen, plays, clics). Firestore/DB analytics no reemplazan audiencia web. |
| **Reusar stream de FM Brava** | Ya existe la señal. Construir radio propia ahora es ego técnico y costo sin audiencia. |
| **V1 ReadOnly antes del CMS** | Primero presencia + medición + hábito. El CMS solo tiene sentido con ritmo real de publicación. |
| **Modelo editorial chico** | El diferencial son entrevistas/historias/identidad, no competir por volumen de portal genérico. |

---

## 7. Decisiones: qué NO y por qué

| Decisión | Por qué no |
|---|---|
| **Firebase / Firestore como CMS o backend de noticias** | Obligaría a inventar admin, reglas, drafts, SEO y uploads. Tool-loyalty, no requisito del producto. |
| **CMS casero “de 0”** | Semanas de trabajo + deuda eterna para un CRUD que Payload ya resuelve. Martín necesita publicar, no un experimento de backend. |
| **Fotos en base64 en la DB** | Infla Postgres, empeora performance, rompe cache/CDN y complica thumbnails. Las fotos van a Cloudinary; en DB solo la URL. |
| **Backend aparte (Express/Nest) solo para posts** | Redundante: Payload ya expone API y escribe en Postgres. |
| **Vue/Nuxt + Payload en el mismo producto** | El admin de Payload es React. Mezclar Vue + Payload suma dos mundos sin beneficio en este tamaño de proyecto. |
| **Vue “porque sí” manteniendo este stack** | Si el stack es Payload, el front natural es Next. Vue implica cambiar el CMS (p.ej. Sanity/Directus), no forzar Payload. |
| **Supabase Auth / Realtime para el MVP de notas** | El auth del admin lo resuelve Payload. Realtime no es necesidad del medio en V1/V2. |
| **Señal de radio / streaming propio ahora** | Sin audiencia digital consolidada, es costo e infraestructura prematura. |
| **Portal genérico de noticias a gran escala** | Mala guerra de volumen; diluye la marca personal y atrasa el MVP. |
| **Depender solo de “analytics de base de datos”** | No responden “quién visitó, de dónde, qué playeó”. Eso es GA4 (y eventos). |
| **Abandonar la radio en la arquitectura V1** | La radio sigue siendo canal de adquisición; la web la complementa, no la reemplaza de entrada. |

---

## 8. Vue vs React (cierre)

- **Con este stack (Payload): Next.js / React.**
- **Vue no está prohibido en abstracto**, pero **no entra en la Opción A**.
- Si en el futuro se priorizara Vue, habría que **cambiar el CMS** (Nuxt + Sanity/Directus/Strapi), no “pegar” Vue a Payload.

Opción A (elegida): Next + Payload + Supabase + Cloudinary.  
Opción B (alternativa descartada por ahora): Nuxt + CMS headless.

---

## 9. Eventos GA4 mínimos (V1)

Implementar al menos:

- `play_radio`
- `click_whatsapp`
- `contact_submit`
- (V2) `view_article` / `click_article`

Objetivo comercial: poder decir alcance, engagement del vivo y conversiones de contacto — no solo “tengo llegada”.

---

## 10. Criterios de éxito técnicos

1. Martín publica, edita u oculta una nota con foto **sin ayuda del desarrollador**.
2. Las notas públicas son indexables y compartibles (SEO + OG).
3. GA4 muestra visitas y eventos útiles para negociación con anunciantes.
4. El play de Brava funciona como CTA claro de “en vivo”.
5. No existe un segundo backend ni Firebase “por las dudas”.

---

## 11. Resumen ejecutivo

| Pregunta | Respuesta |
|---|---|
| ¿Dónde se hostea? | **Vercel** (Next + Payload) |
| ¿Dónde se guardan las noticias? | **Supabase Postgres** (vía Payload) |
| ¿Dónde se guardan las imágenes? | **Cloudinary** (URL en Postgres) |
| ¿Hay backend aparte? | **No** — Payload dentro de Next es el backend de contenido |
| ¿Contacto? | **Formspree** |
| ¿Analytics? | **GA4** |
| ¿Firebase? | **No** para este producto |
| ¿CMS a mano? | **No** |
| ¿Base64? | **No** |
)
