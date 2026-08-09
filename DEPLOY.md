# Manual de deploy — MN

Checklist ordenado. Si salteás pasos, el sitio se rompe en silencio o queda abierto cuando no debería.

## 0. Mental model (las patas)

| Pata | Servicio | Para qué |
|---|---|---|
| App | Vercel + Next.js | Sitio + `/admin` Payload |
| DB | Supabase Postgres | Posts, users Payload |
| Media | Cloudinary | Covers de notas |
| Contacto | Formspree | Formulario `/contacto` |
| Analytics | GA4 | Eventos comerciales |
| Audio | URL de stream | Botón En vivo (UI = MN) |
| Gate | Env + cookie | Candado pre-lanzamiento |
| Dominio | `nocetti.uy` | DNS → Vercel |

No hay backend aparte. Payload **es** el backend de contenido.

---

## 1. Secrets locales

```bash
cp .env.example .env.local
```

Completá **antes** de `npm run dev`:

- `SITE_GATE_PASSWORD` — la que le pasás a Martín
- `SITE_GATE_SECRET` — string largo random (firma de cookie)
- `PAYLOAD_SECRET` — otro string largo random
- `DATABASE_URL` — Postgres de Supabase con password real
- `CLOUDINARY_API_SECRET` — secret de Cloudinary

`SITE_GATE_ENABLED=true` por defecto. **No lo apagues** hasta el OK de Martín.

Generar secrets:

```bash
openssl rand -base64 32
```

---

## 2. Supabase (Postgres)

Proyecto de referencia: `lxxikqonisrcqppvdrhx` (ver `arquitectura.md` §11).

1. En Supabase → Project Settings → Database → copiá la connection string.
2. Pegá el password real en `DATABASE_URL`.
3. En **Vercel**, preferí el pooler (Supabase “Transaction” / puerto `6543`) y, si hace falta, `?sslmode=require`.
4. Payload crea/migra tablas al levantar con el adapter de Postgres.

Si `DATABASE_URL` está mal, `/admin` y las queries de noticias fallan. El front público degrada a listados vacíos; no asumas que “funciona”.

---

## 3. Cloudinary

| Campo | Valor |
|---|---|
| Cloud name | `sswxkhoq` |
| API Key | (en env) |
| API Secret | **solo env** |

En `.env` / Vercel:

```
CLOUDINARY_CLOUD_NAME=sswxkhoq
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Sin secret, el plugin Cloudinary **no se activa** (el código lo deshabilita a propósito). Uploads quedan locales/rotos en serverless. No publiques notas con foto hasta verificar upload en `/admin`.

---

## 4. Formspree

Endpoint V1: `https://formspree.io/f/xzepdwlp`

1. Confirmá que el form entrega al email correcto.
2. Probá un envío real desde `/contacto`.
3. Verificá en GA4 el evento `contact_submit` (solo en éxito).

Sin WhatsApp de contacto en esta página. No lo agregues “por las dudas”.

---

## 5. GA4

Measurement ID: `G-RHQPTDD0RN`

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RHQPTDD0RN
```

Eventos mínimos:

- `play_radio`
- `contact_submit`
- `click_spotify`
- `view_article` / `click_article`

Usá DebugView mientras validás. Tráfico detrás del gate es interno: no lo vendas como audiencia.

---

## 6. Stream

```
NEXT_PUBLIC_STREAM_URL=https://fmbrava-2.nty.uy
```

- UI: “Escuchar en vivo” / nombre del programa. **Nunca** el nombre de la emisora.
- `NEXT_PUBLIC_ON_AIR=true` fuerza hero “EN VIVO”. Default `false` (ARCHIVO) hasta confirmar horario con Martín.
- Autoplay de browsers puede bloquear play hasta gesto de usuario: el botón ya es el gesto.

---

## 7. Gate de pre-lanzamiento (crítico)

En Vercel (Preview **y** Production):

```
SITE_GATE_ENABLED=true
SITE_GATE_PASSWORD=...
SITE_GATE_SECRET=...
```

Test obligatorio post-deploy:

1. Ventana privada → cualquier URL → redirect a `/acceso`.
2. Password incorrecta → error, sin cookie.
3. Password correcta → entra al sitio y a `/admin`.
4. Sin `SITE_GATE_PASSWORD`/`SECRET` con gate enabled → **bloqueado** (fail-closed).

Segunda capa recomendada: **Vercel → Deployment Protection** (password en Preview/Production). El middleware es la capa de app; Vercel es el cinturón.

Mientras el gate esté on, el sitio manda `robots: noindex`.

---

## 8. Vercel

1. Importá el repo.
2. Framework: Next.js (detectado).
3. Cargá **todas** las envs de `.env.example` (valores reales).
4. Deploy.
5. Abrí la URL de Vercel → debe pedir `/acceso`.

Comandos locales equivalentes:

```bash
npm run build
npm run start
```

---

## 9. Dominio `nocetti.uy`

1. Comprá/asegurá el dominio.
2. En Vercel → Project → Domains → agregá `nocetti.uy` (+ `www` si aplica).
3. DNS:
   - Apex: A/ALIAS según indique Vercel, **o**
   - `www` CNAME → `cname.vercel-dns.com`
4. Actualizá `NEXT_PUBLIC_SITE_URL=https://nocetti.uy`.
5. Redeploy para que metadata/OG usen la URL correcta.

Hasta que el DNS no apunte, el dominio tentativo es solo copy.

---

## 10. Primer usuario Payload + primera nota

1. Entrá con el gate.
2. Abrí `/admin`.
3. Creá el primer usuario (Martín o admin técnico).
4. Subí una imagen de prueba a **Media** (Cloudinary).
5. Creá un **Post**:
   - status `draft` → preview interno
   - status `published` + `publishedAt` → aparece en `/` y `/noticias`
6. Para “esconder”: `hidden` (no borres por defecto).

Si Martín no puede publicar solo, el stack falló — no parches con “te lo subo yo”.

---

## 11. Go-live (solo con OK explícito de Martín)

En este orden:

1. Confirmá horario del programa → `NEXT_PUBLIC_ON_AIR` o lógica de franja.
2. `SITE_GATE_ENABLED=false` en Production.
3. Quitá / relajá Vercel Deployment Protection en Production.
4. Redeploy (o wait por env propagation).
5. Verificá que `/` abre sin `/acceso`.
6. Verificá que ya no manda `noindex`.
7. Smoke: play → Formspree → Spotify → una nota publicada → GA4.

### Rollback en un flip

```
SITE_GATE_ENABLED=true
```

Redeploy/propagate. El sitio vuelve a `/acceso`. También podés reactivar Deployment Protection.

---

## 12. Tabla de envs

### Públicas (`NEXT_PUBLIC_*`)

| Variable | Notas |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical / OG |
| `NEXT_PUBLIC_STREAM_URL` | Solo URL técnica |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Form ID `xzepdwlp` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-RHQPTDD0RN` |
| `NEXT_PUBLIC_ON_AIR` | `true`/`false` |
| `NEXT_PUBLIC_SUPABASE_URL` | Opcional hoy |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Opcional hoy |

### Secretas (nunca al frontend, nunca al git)

| Variable | Notas |
|---|---|
| `SITE_GATE_PASSWORD` | Candado pre-lanzamiento |
| `SITE_GATE_SECRET` | Firma cookie |
| `SITE_GATE_ENABLED` | `true` hasta OK |
| `PAYLOAD_SECRET` | Sesiones admin |
| `DATABASE_URL` | Postgres password adentro |
| `CLOUDINARY_API_SECRET` | Uploads |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_CLOUD_NAME` | Server-side plugin |

---

## 13. Seguridad / higiene

- Si el repo es o será público: **rotá** password de Postgres y cualquier secret que haya aparecido en docs históricos.
- No commitees `.env.local`.
- El gate por password compartida **no** es seguridad bancaria: evita curiosos e indexación accidental. No sustituye secrets bien guardados.
- `/admin` sigue necesitando usuario Payload aunque el gate esté off.

---

## 14. Smoke checklist final

- [ ] Sin cookie → `/acceso`
- [ ] Gate password OK → home
- [ ] LIVE reproduce stream y dispara `play_radio`
- [ ] `/contacto` envía a Formspree
- [ ] Spotify embed + link fallback
- [ ] `/admin` login Payload
- [ ] Upload Cloudinary OK
- [ ] Post `published` sale en home/noticias
- [ ] Post `hidden`/`draft` no sale
- [ ] Hero no miente “EN VIVO” si `ON_AIR=false`
- [ ] Ningún copy nombra la emisora
- [ ] Sin CTA WhatsApp en contacto
