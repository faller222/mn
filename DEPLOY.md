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
| Dominio | `nocetti.uy` | DNS → Vercel |

No hay backend aparte. Payload **es** el backend de contenido.

**Estado go-live:** el gate de pre-lanzamiento fue retirado. El sitio es público e indexable. `/admin` sigue con login Payload.

---

## 1. Secrets locales

```bash
cp .env.example .env.local
```

Completá **antes** de `npm run dev`:

- `PAYLOAD_SECRET` — string largo random
- `DATABASE_URL` — Postgres pooler de Supabase
- `CLOUDINARY_API_SECRET` — secret de Cloudinary

Generar secrets:

```bash
openssl rand -base64 32
```

---

## 2. Supabase (Postgres)

Proyecto de referencia: `lxxikqonisrcqppvdrhx` (ver `arquitectura.md` §11).

1. En Supabase → Project Settings → Database → connection string.
2. En **Vercel**, usá el pooler Transaction (`aws-0-sa-east-1.pooler.supabase.com:6543`).
3. Payload crea/migra tablas al levantar.

---

## 3. Cloudinary

```
CLOUDINARY_CLOUD_NAME=sswxkhoq
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Sin secret, el plugin Cloudinary no se activa.

---

## 4. Formspree

Endpoint: `https://formspree.io/f/xzepdwlp`

---

## 5. GA4

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-RHQPTDD0RN
```

Eventos: `play_radio`, `contact_submit`, `click_spotify`, `view_article`, `click_article`, `click_share`.

---

## 6. Stream + Live

```
NEXT_PUBLIC_STREAM_URL=https://fmbrava-2.nty.uy
```

- UI: “Escuchar en vivo” / programa. Nunca el nombre de la emisora.
- Horario Live: **interno** Lun–Vie 08:00–11:00 `America/Montevideo`. No se publica en UI.
- Override: `NEXT_PUBLIC_ON_AIR=force` u `off`.

---

## 7. Vercel

1. Proyecto `faller/mn`.
2. Cargá envs de `.env.example` (valores reales).
3. `NEXT_PUBLIC_SITE_URL=https://nocetti.uy`.
4. Deploy production.

---

## 8. Dominio `nocetti.uy`

1. En Vercel → Domains → `nocetti.uy` (+ `www` redirect al apex).
2. En el registrar, los registros que indique Vercel (A/ALIAS apex + CNAME `www`).
3. Actualizá `NEXT_PUBLIC_SITE_URL=https://nocetti.uy` y redeploy.
4. Smoke: home pública, `/admin`, share URLs con dominio final.

---

## 9. Primer usuario Payload + nota

1. Abrí `/admin`.
2. Creá usuario (Martín o admin técnico).
3. Media → Cloudinary; Post `published` → aparece en home/noticias.

### Admin en iPhone

Safari → `https://nocetti.uy/admin` → Compartir → **Agregar a pantalla de inicio**.

---

## 10. Tabla de envs

### Públicas

| Variable | Notas |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://nocetti.uy` |
| `NEXT_PUBLIC_STREAM_URL` | Solo URL técnica |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Form ID `xzepdwlp` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-RHQPTDD0RN` |
| `NEXT_PUBLIC_ON_AIR` | vacío / `force` / `off` |
| `NEXT_PUBLIC_SUPABASE_URL` | Opcional |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Opcional |

### Secretas

| Variable | Notas |
|---|---|
| `PAYLOAD_SECRET` | Sesiones admin |
| `DATABASE_URL` | Postgres pooler |
| `CLOUDINARY_API_SECRET` | Uploads |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_CLOUD_NAME` | Server-side |

### Histórico (retirado)

`SITE_GATE_*` ya no se usa. Podés borrarlas de Vercel.

---

## 11. Smoke checklist

- [ ] `/` abre sin redirect a `/acceso`
- [ ] LIVE según horario (o override)
- [ ] `/contacto` → Formspree
- [ ] Spotify + redes (iconos IG / X / Threads)
- [ ] Share en nota (WA / X / Threads / IG)
- [ ] `/admin` login Payload + PWA en iPhone
- [ ] Upload Cloudinary OK
- [ ] `nocetti.uy` resuelve a Vercel
- [ ] Ningún copy nombra la emisora
- [ ] Sin CTA WhatsApp en contacto
