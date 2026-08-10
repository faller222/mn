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
  collections/        # Users, Media, Posts
  components/
  lib/
public/brand/         # logo + foto de Martín
public/admin/         # manifest + iconos PWA del panel
```

## Admin en el iPhone (PWA)

1. Abrí `https://nocetti.uy/admin` en Safari.
2. Compartír → **Agregar a pantalla de inicio**.
3. Se instala como “MN Admin” (solo scope `/admin`).

El login de edición es el de Payload (`/admin`).

## Live

El hero “EN VIVO” se activa por horario interno (no se publica en la web). Override de test: `NEXT_PUBLIC_ON_AIR=force` u `off`.

## Modelo editorial (Posts)

`title`, `slug`, `body`, `coverImage`, `publishedAt`, `status` (`draft` | `published` | `hidden`).

Público: solo `published`.

## Reglas de marca

- Marca **MN** / programa; **nunca** nombrar la emisora de origen del stream.
- Contacto = Formspree. Sin CTA WhatsApp en `/contacto`.
- Compartir notas por WhatsApp / X / Threads / Instagram Stories sí.
- Copy institucional en tercera persona; notas en primera.

## Deploy

Manual de patas: **[`DEPLOY.md`](DEPLOY.md)**.
