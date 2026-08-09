# Arquitectura — MN (Martín Nocetti)

Documento de decisiones técnicas del proyecto digital MN.  
Última actualización: 2026-08-09.

---

## 1. Objetivo técnico

Construir la infraestructura de un medio digital personal alrededor de Martín Nocetti:

- presencia web con identidad de marca (MN),
- escucha en vivo (retransmisor de señal, sin brandear la radio de origen),
- contacto comercial (formulario; sin WhatsApp en V1),
- medición de audiencia (GA4) para vender publicidad con datos,
- más adelante: publicación de notas/entrevistas con panel usable por Martín.

La web no es el producto final. El activo es **audiencia propia + métricas**. La arquitectura sirve a eso, no al revés.

**Dominio tentativo:** `nocetti.uy`

---

## 2. Principios

1. **Fases.** Primero sitio medible y vivo; después CMS. No mezclar todo el día uno.
2. **No reinventar un CMS.** Auth, uploads, drafts y panel son problema resuelto.
3. **Martín debe poder publicar solo.** Si el panel requiere al desarrollador, el stack falló.
4. **SEO y velocidad importan.** Es un medio, no una SPA de app interna.
5. **Analytics web desde V1.** Sin datos, la plataforma no mejora la venta publicitaria.
6. **Reusar infraestructura de señal** (URL de stream existente) sin promocionar la marca de la radio de origen. Spotify e Instagram sí son canales propios a potenciar.
7. **Evitar tool-loyalty.** No elegir Firebase (u otra cosa) solo porque “ya lo usamos en otros proyectos”.
8. **La web es marca MN / Nocetti**, no landing de la emisora. El retransmisor es utilidad temporal con disclaimer.

---

## 3. Stack cerrado

| Pieza | Elección | Rol |
|---|---|---|
| Framework | **Next.js (React)** | Sitio público + admin |
| Hosting | **Vercel** | Deploy del Next/Payload |
| Dominio | **nocetti.uy** (tentativo) | Apunta a Vercel |
| CMS / backend de contenido | **Payload** | Auth admin, API, panel, CRUD de noticias |
| Base de datos | **Supabase (Postgres)** | Persistencia de posts, users, metadata de media |
| Imágenes | **Cloudinary** | Upload, transformaciones, CDN de fotos |
| Contacto | **Formspree** | Formulario → email (V1). Sin WhatsApp por ahora |
| Analytics | **GA4** | Visitas, eventos, reportes comerciales |
| Audio en vivo | **Retransmisor (URL de stream)** | Botón “Escuchar en vivo” + disclaimer al pie |

### Stack en una frase

> Next.js en Vercel (`nocetti.uy`); backend de contenido = Payload dentro de Next; persistencia = Supabase Postgres; media = Cloudinary; contacto = Formspree; analytics = GA4; audio = retransmisor con disclaimer.

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
| Web pública | Vercel | Dominio `nocetti.uy` (tentativo) apunta aquí |
| Panel admin | Mismo deploy (`/admin`) | No hay segundo servidor de admin |
| Noticias (texto, fecha, status, slug) | Supabase Postgres | Las escribe Payload, no una API custom |
| Imágenes | Cloudinary (`sswxkhoq`) | En Postgres solo URL + metadatos |
| Contacto V1 | Formspree `xzepdwlp` | Sin WhatsApp en UI por ahora |
| Métricas | GA4 `G-RHQPTDD0RN` | Cuenta técnica: faller222 |
| Audio en vivo | Retransmisor `https://fmbrava-2.nty.uy` | No brandear emisora en UI; disclaimer al pie |
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
- Play del retransmisor (señal externa) **sin nombrar la emisora** en hero/nav; disclaimer al pie.
- Links a Spotify / Instagram (X con cuidado; preferir link sobre iframe frágil).
- Formulario de contacto (Formspree). **Sin botón WhatsApp** por ahora.
- GA4 + eventos mínimos (`play_radio`, `contact_submit`, `click_spotify`, etc.).
- SEO básico, dominio `nocetti.uy`, hosting.

**Fuera de V1:**

- WhatsApp en UI.
- Auth de publicación.
- Panel CMS.
- CRUD de noticias.
- Uploads de fotos de notas.
- Firebase / Firestore.
- Branding o deep-links a la radio de origen.

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
| **Retransmitir señal existente (sin brandear la radio)** | Ya hay URL de stream. Construir radio propia ahora es ego técnico. La UI vende MN, no la emisora; disclaimer al pie cubre la procedencia técnica. |
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
| **Brandear la emisora de origen en la web MN** | Objetivo: audiencia propia. El retransmisor es puente técnico, no marketing cruzado hacia la radio. |
| **WhatsApp público en V1** | Decisión de producto: contacto solo por formulario (Formspree) por ahora. |

---

## 8. Vue vs React (cierre)

- **Con este stack (Payload): Next.js / React.**
- **Vue no está prohibido en abstracto**, pero **no entra en la Opción A**.
- Si en el futuro se priorizara Vue, habría que **cambiar el CMS** (Nuxt + Sanity/Directus/Strapi), no “pegar” Vue a Payload.

Opción A (elegida): Next + Payload + Supabase + Cloudinary.  
Opción B (alternativa descartada por ahora): Nuxt + CMS headless.

---

## 9. Eventos GA4 mínimos (V1)

Measurement ID: `G-RHQPTDD0RN` (cuenta técnica faller222).

```js
gtag('config', 'G-RHQPTDD0RN');
```

Implementar al menos:

- `play_radio`
- `contact_submit`
- `click_spotify`
- (opcional / más adelante) `click_whatsapp` — **no en V1**
- (V2) `view_article` / `click_article`

Objetivo comercial: poder decir alcance, engagement del vivo y conversiones de contacto — no solo “tengo llegada”.

---

## 10. Criterios de éxito técnicos

1. Martín publica, edita u oculta una nota con foto **sin ayuda del desarrollador**.
2. Las notas públicas son indexables y compartibles (SEO + OG).
3. GA4 muestra visitas y eventos útiles para negociación con anunciantes.
4. El play “En vivo” funciona como CTA claro de MN (disclaimer al pie; sin CTA hacia la emisora).
5. No existe un segundo backend ni Firebase “por las dudas”.
6. Contacto V1 convierte por Formspree sin depender de WhatsApp.

---

## 11. Credenciales y configuración de servicios

> **Importante:** la contraseña de Postgres y el `API Secret` de Cloudinary **nunca** van al frontend ni a commits públicos. Usar variables de entorno en Vercel / `.env.local`. Lo de abajo es inventario del proyecto; rotar si el repo se vuelve público.

### Dominio

| Campo | Valor |
|---|---|
| Dominio | `nocetti.uy` (tentativo) |

### Formspree

| Campo | Valor |
|---|---|
| Endpoint | `https://formspree.io/f/xzepdwlp` |
| Form ID | `xzepdwlp` |

### Cloudinary

| Campo | Valor |
|---|---|
| Cloud name | `sswxkhoq` |
| API Key | `673474521998275` |
| API Secret | *(solo en env — no documentar en claro)* |

Env sugerido:

```
CLOUDINARY_CLOUD_NAME=sswxkhoq
CLOUDINARY_API_KEY=673474521998275
CLOUDINARY_API_SECRET=
```

### Google Analytics 4

| Campo | Valor |
|---|---|
| Measurement ID | `G-RHQPTDD0RN` |
| Cuenta / propiedad | faller222 |
| Snippet | `gtag('config', 'G-RHQPTDD0RN');` |

Env sugerido:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RHQPTDD0RN
```

### Supabase (Postgres)

| Campo | Valor |
|---|---|
| Project URL | `https://lxxikqonisrcqppvdrhx.supabase.co` |
| Host DB | `db.lxxikqonisrcqppvdrhx.supabase.co` |
| Publishable key | `sb_publishable_7HTl-zKoV_48ZZot4o1eAQ_uJZpGTFV` |
| Connection string | `postgresql://postgres:[YOUR-PASSWORD]@db.lxxikqonisrcqppvdrhx.supabase.co:5432/postgres` |

Env sugerido:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.lxxikqonisrcqppvdrhx.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://lxxikqonisrcqppvdrhx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_7HTl-zKoV_48ZZot4o1eAQ_uJZpGTFV
```

Payload usa sobre todo `DATABASE_URL` (Postgres). La publishable key queda disponible si más adelante se usa el client de Supabase; no es requisito del CMS en V1/V2.

### Stream (retransmisor)

| Campo | Valor |
|---|---|
| URL audio | `https://fmbrava-2.nty.uy` |
| UI | Label “Escuchar en vivo” / programa — **sin nombre de emisora** |
| Disclaimer (pie) | Ver `info.md` § stream |

Env sugerido:

```
NEXT_PUBLIC_STREAM_URL=https://fmbrava-2.nty.uy
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xzepdwlp
```

---

## 12. Resumen ejecutivo

| Pregunta | Respuesta |
|---|---|
| ¿Dónde se hostea? | **Vercel** (Next + Payload) |
| ¿Dominio? | **nocetti.uy** (tentativo) |
| ¿Dónde se guardan las noticias? | **Supabase Postgres** (vía Payload) |
| ¿Dónde se guardan las imágenes? | **Cloudinary** `sswxkhoq` (URL en Postgres) |
| ¿Hay backend aparte? | **No** — Payload dentro de Next es el backend de contenido |
| ¿Contacto? | **Formspree** `https://formspree.io/f/xzepdwlp` (sin WhatsApp V1) |
| ¿Analytics? | **GA4** `G-RHQPTDD0RN` |
| ¿Audio en vivo? | Retransmisor + disclaimer; sin brandear emisora |
| ¿Firebase? | **No** para este producto |
| ¿CMS a mano? | **No** |
| ¿Base64? | **No** |
)
