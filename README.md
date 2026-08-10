# MN — Martín Nocetti

Sitio del medio digital **MN**: presencia de marca, escucha en vivo, contacto comercial, noticias (Payload) y métricas (GA4).

Stack: **Next.js + Payload + Supabase Postgres + Cloudinary + Formspree + GA4**, hosteado en **Vercel**. Dominio: `nocetti.uy`.

Fuentes de producto: [`info.md`](info.md), [`arquitectura.md`](arquitectura.md), [`UxUI/`](UxUI/).

## Desarrollo local

```bash
cp .env.example .env.local
# Completar: PAYLOAD_SECRET, DATABASE_URL, CLOUDINARY_API_SECRET

npm install
npm run dev
```

Abrí `http://localhost:3000`.

| Script | Qué hace |
|---|---|
| `npm run dev` | Next + Payload en local |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |
| `npm run generate:types` | Regenera `payload-types.ts` |
| `npm run generate:importmap` | Regenera import map del admin |

## Estructura

```
src/
  app/
    (site)/           # Home, Sobre, Contacto, Noticias
    (payload)/        # /admin + API Payload (PWA iPhone)
  collections/        # Users, Media, Posts, InboxEmails
  components/
  lib/
    resend/           # Cliente Resend (list/get/send/webhook)
public/brand/         # logo + foto de Martín
public/admin/         # manifest + iconos PWA del panel
```

## Admin como app (PWA, solo `/admin`)

**iPhone (Safari):** `/admin` → Compartir → **Agregar a pantalla de inicio**.

**Android (Chrome):** `/admin` → menú ⋮ → **Instalar app** / **Agregar a pantalla de inicio**.  
(Hay service worker mínimo en `/admin/sw.js` para que Chrome lo ofrezca.)

El login de edición es el de Payload (`/admin`).

## Live

El hero “EN VIVO” se activa por horario interno (no se publica en la web). Override de test: `NEXT_PUBLIC_ON_AIR=force` u `off`.

## Modelo editorial (Posts)

`title`, `slug`, `body`, `coverImage`, `publishedAt`, `status` (`draft` | `published` | `hidden`).

Público: solo `published`.

## Email / Inbox (Resend)

Env (nombres tal cual en `secrets`):

- `RESEND_API_KEY` — send + receiving
- `RESEND_WEBHOOK_SECRET` — signing secret del webhook

Admin: grupo **Email → Bandeja de entrada**. Botón **Sincronizar con Resend** o `POST /api/inbox/sync` (sesión admin).

Webhook inbound: `POST /api/webhooks/resend` (evento `email.received`).

## Reglas de marca

- Marca **MN** / programa; **nunca** nombrar la emisora de origen del stream.
- Contacto = Formspree. Sin CTA WhatsApp en `/contacto`.
- Compartir notas por WhatsApp / X / Threads / Instagram Stories sí.
- Copy institucional en tercera persona; notas en primera.

## Deploy

Manual de patas: **[`DEPLOY.md`](DEPLOY.md)**.
