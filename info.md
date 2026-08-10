# MN — Información para la web

Fuente única de contenidos, datos y voz de marca para el sitio de **Martín Nocetti**.  
Última actualización: 2026-08-09.

Relacionados: `arquitectura.md` (stack + credenciales), `UxUI/` (pantallas).

---

## 0. Cómo usar este archivo

| Sección | Quién la usa | Persona gramatical |
|---|---|---|
| Bio oficial / About / Home (bloque institucional) | Tercera persona | “Martín Nocetti es…” |
| Notas, blog, newsletter, columnas, crónicas | Primera persona | “Hoy me senté con…” / “En esta nota cuento…” |
| Textos comerciales, métricas, CTAs | Neutral / marca MN | “Publicá con MN” |

**Regla editorial (opción ideal):** tercera persona en la página de perfil y en materiales que otros medios puedan copiar; primera persona en el contenido que habla con la audiencia.

---

## 1. Identidad

| Campo | Valor | Estado |
|---|---|---|
| Nombre completo | Martín Nocetti | Confirmado |
| Marca | **MN** — Martín Nocetti | Confirmado |
| Tagline | Periodismo · Entrevistas · Actualidad | Confirmado |
| Ubicación | Maldonado, Uruguay | Confirmado |
| Rol | Periodista, comunicador y publicista | Confirmado |
| Programa | *La mejor manera de comenzar la mañana* | Confirmado |
| Emisora en copy público | **No nombrar** | Decisión de marca |
| Logo | `fotos/mnn-logo-opcion-2-negro-dorado.png` | Confirmado |
| Negro marca | `#000000` | Confirmado |
| Dorado marca | `#DCB63F` | Confirmado |
| Dominio | `nocetti.uy` | Tentativo |
| Contacto V1 | Solo formulario (Formspree) | Sin CTA WhatsApp de contacto |

### Política de radio / stream (interna — no es copy)

Reglas de implementación. No se traducen a texto de UI.

- En hero, nav, About, SEO y press kit: hablar del **programa** y de **MN**, nunca del nombre comercial de la emisora ni de su frecuencia.
- El player puede usar la URL de stream existente; la UI muestra solo MN / nombre del programa.
- No linkear al sitio de la emisora desde menú, hero, About ni footer.
- No explicar en pantalla la procedencia de la señal ni la relación con otra radio.

---

## 2. Enlaces y canales

| Canal | URL / dato | Uso en web |
|---|---|---|
| Dominio | https://nocetti.uy (tentativo) | Principal |
| Instagram | https://www.instagram.com/mnocetti1/ | Footer, About, menú |
| Spotify (podcast) | https://open.spotify.com/show/1WxPXeCzGu3D8dJeTwwAd3 | Home (bajo el fold), About |
| Spotify embed | `https://open.spotify.com/embed/show/1WxPXeCzGu3D8dJeTwwAd3?utm_source=generator` | iframe oficial |
| Stream audio | `https://fmbrava-2.nty.uy` | Solo como fuente técnica del player |
| Formspree | `https://formspree.io/f/xzepdwlp` | Formulario `/contacto` |
| WhatsApp (contacto) | — | **No en `/contacto` V1** |
| Sitio de la emisora | — | **No linkear en UI** |

**Nota Spotify:** show activo; oEmbed reciente *# 179 - Lic Leticia Correa* (~180 entrevistas).

Credenciales técnicas (GA4, Cloudinary, Supabase): ver `arquitectura.md` §11.

---

## 3. Datos que aún faltan

| # | Dato | Para qué | Estado |
|---|---|---|---|
| 1 | Horario exacto del programa (días + franja) | Hero “EN VIVO” vs archivo | **Pendiente** (Martín confirma) |
| 2 | Email público (si se muestra fuera del form) | Bloque “Directo” en Contacto | Opcional si Formspree alcanza |
| 3 | Foto de perfil profesional | About, OG | Pendiente |
| 4 | Dominio comprado / DNS a Vercel | Producción | `nocetti.uy` tentativo |
| 5 | Confirmación invitados citables en About | Prueba social | Lista §5.5 |
| 6 | Password Postgres en env | Payload | Placeholder en arquitectura |
| 7 | Cloudinary API Secret en env | Uploads V2 | No en docs |

---

## 4. Voz y estilo

### 4.1 Tercera persona — About, Home institucional, media kit

**Tono:** autoridad local, sobrio. Destacar programa, acceso, archivo y marca MN — no la emisora.

> Martín Nocetti es periodista y comunicador en Maldonado, Uruguay. Conduce *La mejor manera de comenzar la mañana* y mantiene un archivo público de entrevistas en Spotify…

### 4.2 Primera persona — Notas, blog, newsletter

> Llevo años cubriendo Maldonado. En esta nota te dejo lo que surgió de la conversación con…

### 4.3 Lo que no hacer

- No mezclar “yo” y “Martín Nocetti es” en el mismo párrafo.
- No nombrar la emisora ni su frecuencia en copy público.
- No poner CTA/número de WhatsApp de contacto hasta nueva decisión (share de notas: sí).
- No inventar premios, ratings ni “líder de audiencia”.
- No vender el sitio como portal genérico de noticias.

---

## 5. Biografías listas para pegar

### 5.1 Bio corta (≈ 40 palabras)

> Martín Nocetti es periodista y comunicador en Maldonado, Uruguay. Conduce *La mejor manera de comenzar la mañana* y publica entrevistas de actualidad, política y comunidad en MN y Spotify.

### 5.2 Bio media (≈ 90 palabras)

> Martín Nocetti es periodista, comunicador y publicista en Maldonado. Conduce *La mejor manera de comenzar la mañana*, un espacio de entrevistas y actualidad donde pasan autoridades, referentes sociales y voces de la comunidad.  
> Su archivo en Spotify supera las 180 entrevistas y las 100 horas de material. En MN concentra periodismo, historias locales y una propuesta comercial clara para anunciantes que buscan llegada real en el este del país.

### 5.3 Bio larga / About completo

> Martín Nocetti es un periodista y comunicador radicado en Maldonado, Uruguay. Su trabajo se centra en la actualidad local, las entrevistas en profundidad y el vínculo entre instituciones, deporte, cultura y ciudadanía.  
>  
> Conduce *La mejor manera de comenzar la mañana*, un programa matutino de interés general. Allí recibe a actores de la vida pública departamental y nacional, referentes sociales y figuras de la cultura. El material se conserva y distribuye en Spotify, donde el archivo público supera las 180 entrevistas y las 100 horas de contenido.  
>  
> Además del periodismo, Martín desarrolla actividad comercial como publicista: menciones, pautas y campañas puntuales —incluida publicidad callejera cuando el cliente lo requiere— siempre con la premisa de separar con claridad lo editorial de lo publicitario.  
>  
> MN es su plataforma digital: marca propia, archivo vivo y canal para escuchar el programa en vivo, leer notas y contactar por pautas o entrevistas. El foco geográfico es Maldonado y la región; el alcance, el que permita internet.

### 5.4 Trayectoria (lista para About)

- **Programa** — *La mejor manera de comenzar la mañana* (emisión en vivo + streaming en MN).
- **Spotify** — Podcast / archivo on-demand (~180 episodios).
- **MN (nocetti.uy)** — Plataforma digital propia: notas, archivo, contacto comercial.
- **Cobertura comunitaria** — Deporte local, organizaciones sociales, agenda departamental.
- **Reconocimiento institucional** — Labor referida en ámbitos locales (Junta Departamental de Maldonado / actas). *(Validar redacción con Martín.)*

### 5.5 Invitados / prueba social

Usar como “han pasado por su micrófono”, no como endosos:

- Ministro José Carlos Mahia — Ministro de Estado / Político y legislador
- Oscar De los Santos — Exintendente de Maldonado y exlegislador
- Rodrigo Blas — Senador de la República
- Dr. Darío Pérez — Médico y referente político histórico de Maldonado
- Joaquín Garlo — Diputado nacional
- Marita Araujo — Diputada nacional
- Dr. Álvaro Villegas — Secretario General de la IDM
- Miguel Abella — Intendente de Maldonado
- José "Pepe" Rapetti — Escribano, histórico dirigente político y exintendente interino
- Andrés Rapetti — Director de Cultura de la IDM
- José Martín Hualde — Prosecretario de la IDM
- Juan Pígola — Director de Movilidad de la IDM
- Fernando Álvez — Director de Deportes de la IDM
- Verónica Robaina — Presidenta de la JDM
- Silvana Amoroso — Presidenta del Frente Amplio en Maldonado
- Damián Tort — Alcalde de Maldonado
- Javier Carballal — Alcalde de Punta del Este
- Dr. Pablo Chalar — Edil (Partido Nacional)
- Eduardo Elinger — Edil (Partido Colorado)
- Juan Urdangaray — Edil (Frente Amplio)
- Luis Artola — Edil (Partido Nacional)
- Javier Ramírez — Edil (Frente Amplio)
- Matheo Caraptsias — Edil (Partido Nacional)
- Gabriel Cedrés — Exfutbolista profesional
- Damián Macaluso — Exfutbolista profesional
- Pablo Aníbal De León — Director técnico de fútbol
- Sebastián Barrios — Gestor cultural
- Ignacio Zuloaga — Artista plástico (La Barra / Punta del Este)
- Toto Núñez Pallas — Dirigente del Frente Amplio (San Carlos)

### 5.6 Primera persona — newsletter / columna

> Soy Martín Nocetti. Desde Maldonado conduzco *La mejor manera de comenzar la mañana* y acá en MN comparto las entrevistas, las notas y el contexto que no entra en un titular. Si querés escucharme en vivo, el botón está arriba. Si querés pautar o proponerme una entrevista, usá el formulario de contacto.

---

## 6. Copy de pantallas

### 6.1 Home — Hero (en aire)

| Elemento | Texto |
|---|---|
| Eyebrow | EN VIVO AHORA |
| Título | La mejor manera de comenzar la mañana |
| Sub | Streaming · MN |
| CTA primario | Escuchar en vivo |
| Aria | Escuchar en vivo — programa de Martín Nocetti |

### 6.2 Home — Hero (fuera de aire)

| Elemento | Texto |
|---|---|
| Eyebrow | ARCHIVO |
| Título | Escuchá la última entrevista |
| Sub | El programa vuelve [HORARIO — pendiente confirmar] |
| CTA | Abrir en Spotify / Ver entrevistas |

### 6.3 Home — Secciones

| Bloque | Título | CTA |
|---|---|---|
| Destacados | Hoy · Destacados | Ver todas |
| Podcast | Podcast · Entrevistas | Abrir en Spotify |
| Comercial | Publicá con MN | Contactar |
| Footer | © MN · nocetti.uy · Maldonado | Contacto · Sobre Martín |

**Microcopy comercial:**
> Anunciantes en Maldonado y la región. Entrevistas, web y presencia en un mismo paquete.

### 6.4 About (`/sobre`)

| Elemento | Texto |
|---|---|
| H1 | Martín Nocetti |
| Sub | Periodismo · Maldonado |
| CTAs | En vivo · Contactar |
| Biografía | §5.3 |
| Trayectoria | §5.4 |
| Podcast | Spotify embed |
| Redes | Instagram |
| Archivo | +180 entrevistas · +100 horas |

### 6.5 Contacto (`/contacto`)

| Elemento | Texto |
|---|---|
| H1 | Contacto |
| Intro | Para pautas, entrevistas y consultas. |
| Directo | Maldonado, Uruguay · Instagram |
| Form | Formspree → `https://formspree.io/f/xzepdwlp` |
| Campos | Nombre * · Email * · Asunto * · Mensaje * |
| Asuntos | Publicidad · Entrevista · Otro |
| Submit | Enviar mensaje |
| Éxito | Mensaje enviado. Te respondemos a la brevedad. |
| Error | No se pudo enviar. Revisá los campos o intentá de nuevo. |

**Prefill:** `/contacto?asunto=Publicidad`  
**Contacto V1:** solo formulario (sin número/CTA de WhatsApp en la página).

### 6.6 Nota — CTA final

> ¿Querés pautar en MN?  
> [ Contactar ]

### 6.7 Meta / SEO

| Campo | Texto |
|---|---|
| Title Home | MN — Martín Nocetti \| Periodismo y entrevistas en Maldonado |
| Description Home | Periodismo, entrevistas y actualidad desde Maldonado. Escuchá en vivo a Martín Nocetti y explorá el archivo en MN. |
| Canonical base | https://nocetti.uy |
| Title About | Sobre Martín Nocetti \| MN |
| Title Contacto | Contacto y pautas \| MN |
| Author | Martín Nocetti |

---

## 7. Hechos del proyecto (internos)

**No publicar** facturación, costo de radio ni margen en la web.

| Hecho | Dato | ¿Web? |
|---|---|---|
| Entrevistas / semana | ~8 | Blando |
| Archivo Spotify | ~180 | Sí |
| Horas archivo | +100 h | Sí |
| Anunciantes | ~20 | Kit privado |
| Facturación | ~US$50k/año | **No** |
| Costo radio | ~US$1.250/mes | **No** |
| Target independencia | ~US$5k/mes | **No** |
| WhatsApp de contacto | No en V1 | — |
| Dominio | nocetti.uy | Tentativo |
| Foco | Maldonado / este | Sí |

---

## 8. Producto editorial

1. Entrevistas · 2. Historias · 3. Actualidad · 4. Opinión (marcada).

Modelo Post V2: `title, slug, body, coverImage, publishedAt, status`.

---

## 9. CTAs y eventos GA4

ID: `G-RHQPTDD0RN`

| Prioridad | Acción UI | Evento |
|---|---|---|
| 1 | Escuchar en vivo | `play_radio` |
| 2 | Enviar formulario | `contact_submit` |
| 3 | Abrir Spotify | `click_spotify` |
| 4 | Vista / click nota (V2) | `view_article` / `click_article` |
| — | WhatsApp contacto | Diferido (no V1) |

---

## 10. Integraciones (estado)

| Pieza | Valor | Estado |
|---|---|---|
| Stream | `https://fmbrava-2.nty.uy` | Listo (solo técnico) |
| Spotify | `1WxPXeCzGu3D8dJeTwwAd3` | Listo |
| Instagram | `@mnocetti1` | Listo |
| Formspree | `https://formspree.io/f/xzepdwlp` | Listo |
| GA4 | `G-RHQPTDD0RN` | Listo |
| Dominio | `nocetti.uy` | Tentativo |
| Cloudinary | cloud `sswxkhoq` | Ver arquitectura |
| Supabase | `lxxikqonisrcqppvdrhx` | Ver arquitectura |
| WhatsApp contacto | — | Fuera de V1 |
| Horario programa | — | Pendiente |

---

## 11. Navegación

| Ruta | Contenido |
|---|---|
| `/` | Hero vivo + destacados + Spotify + CTA comercial |
| `/sobre` | Bio 3ª persona + trayectoria + Instagram + archivo |
| `/contacto` | Formulario Formspree |
| `/noticias` | Lista (V2) |
| `/noticias/[slug]` | Nota 1ª persona |
| `/admin` | Payload |

Menú: Inicio · En vivo · Noticias · Sobre Martín · Contacto (+ Escuchar en vivo).

---

## 12. Textos legales (borrador)

**Separación editorial:**
> El contenido periodístico de MN se diferencia claramente de la publicidad y los contenidos patrocinados, que se identifican como tales.

**Privacidad del form:**
> Los datos del formulario se usan solo para responder tu consulta. No se venden ni se ceden a terceros con fines de marketing.

---

## 13. Assets

| Archivo | Uso |
|---|---|
| `fotos/mnn-logo-opcion-2-negro-dorado.png` | Logo oficial |
| `fotos/mnn-logo-opcion-2-negro-dorado-colores.txt` | Tokens |
| Foto de Martín aprobada | **Falta** |

---

## 14. Frases

Usar:

- “La voz de la mañana en Maldonado.”  
- “Entrevistas que marcan la agenda local.”  
- “Del micrófono al archivo: periodismo que queda.”  
- “MN — periodismo, entrevistas y actualidad.”  
- “Escuchalo en vivo. Después, en Spotify. Siempre en MN.”

Evitar:

- Nombrar emisora / frecuencia (regla interna §1).  
- Explicar en UI la procedencia del stream o la relación con otra radio.  
- “El más escuchado de Uruguay” sin métrica.  
- CTA de WhatsApp de contacto hasta nueva decisión (compartir por WhatsApp en notas sí está permitido).

---

## 15. Press kit (terceros)

> **Martín Nocetti** es periodista y comunicador en Maldonado, Uruguay. Conduce *La mejor manera de comenzar la mañana* y publica un archivo de entrevistas en Spotify con más de 180 episodios. Su plataforma digital **MN** ([nocetti.uy](https://nocetti.uy)) reúne streaming, notas y contacto comercial. Temas: actualidad, política local, comunidad, deporte y cultura. Contacto: formulario en el sitio · Instagram [@mnocetti1](https://www.instagram.com/mnocetti1/).

---

## 16. Próximos pasos reales

1. Confirmar horario del programa (sin eso, “EN VIVO” es ruleta).  
2. Comprar / apuntar `nocetti.uy` a Vercel.  
3. Foto de perfil aprobada.  
4. Meter secrets en env (Postgres password, Cloudinary secret) — no en el repo.  
5. Confirmar invitados citables en About.

El resto del stack (Formspree, GA4, Cloudinary cloud, Supabase URL) ya está en `arquitectura.md`.
)
