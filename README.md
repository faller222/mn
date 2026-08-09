# MN — Martín Nocetti

Sitio del medio digital **MN**: presencia de marca, escucha en vivo, contacto comercial, noticias (Payload) y métricas (GA4).

Stack: **Next.js + Payload + Supabase Postgres + Cloudinary + Formspree + GA4**, hosteado en **Vercel**. Dominio tentativo: `nocetti.uy`.

Fuentes de producto: [`info.md`](info.md), [`arquitectura.md`](arquitectura.md), [`UxUI/`](UxUI/).

## Estado de acceso

El sitio arranca **detrás de un gate de contraseña** (`SITE_GATE_ENABLED=true`).

- Visitantes ven `/acceso` hasta ingresar la contraseña compartida.
- Con el gate activo, las páginas van con `noindex`.
- Cuando Martín dé el OK de lanzamiento: `SITE_GATE_ENABLED=false` en Vercel (ver [`DEPLOY.md`](DEPLOY.md)).
- El login de edición es aparte: `/admin` (Payload). También queda detrás del gate.

Esto **no** es auth de audiencia permanente. Es un candado de pre-lanzamiento.

## Desarrollo local

```bash
cp .env.example .env.local
# Completar: SITE_GATE_*, PAYLOAD_SECRET, DATABASE_URL, CLOUDINARY_API_SECRET

npm install
npm run dev
```

Abrí `http://localhost:3000` → deberías caer en `/acceso`.

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
    acceso/           # Gate de pre-lanzamiento
    (site)/           # Home, Sobre, Contacto, Noticias
    (payload)/        # /admin + API Payload
  collections/        # Users, Media, Posts
  components/         # Header, player, forms, cards
  lib/                # gate, posts, GA, constants
public/brand/         # logo + foto de Martín
```

## Modelo editorial (Posts)

`title`, `slug`, `body` (rich text), `coverImage` (Cloudinary vía Media), `publishedAt`, `status` (`draft` | `published` | `hidden`).

Público (detrás del gate): solo `published`.

## Reglas de marca (no negociables en UI)

- Marca **MN** / programa; **nunca** nombrar la emisora de origen del stream.
- Contacto V1 = Formspree. Sin CTA/número de WhatsApp en `/contacto`.
- Compartir una nota por WhatsApp sí está permitido.
- Copy institucional en tercera persona; notas en primera.

## Deploy

Manual completo de patas (Supabase, Cloudinary, Formspree, GA4, gate, DNS, go-live): **[`DEPLOY.md`](DEPLOY.md)**.

## Honestidad operativa

Sin `DATABASE_URL` real y sin secrets de Cloudinary, el admin/CMS no sirve en serio. El front puede renderizar páginas vacías de noticias, pero publicar requiere esas patas configuradas. No finjas que “ya está en prod” solo porque el repo existe.
