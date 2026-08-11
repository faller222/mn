import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { SITE_URL } from '@/lib/constants'
import { getPostBySlug } from '@/lib/posts'

export const runtime = 'nodejs'
/** Soft cache; busted on post save via revalidatePath in Posts hooks. */
export const revalidate = 300

type Params = { params: Promise<{ slug: string }> }

const WIDTH = 1080
const HEIGHT = 1350
const GOLD = '#dcb63f'

async function loadDisplayFont() {
  const fontPath = path.join(process.cwd(), 'public/fonts/InstrumentSerif-Regular.ttf')
  return readFile(fontPath)
}

function absoluteUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`
}

/** Fetch current cover bytes and embed as data URI — no static preload; always reflects live cover. */
async function coverAsDataUri(coverUrl: string): Promise<string | null> {
  try {
    const res = await fetch(absoluteUrl(coverUrl), {
      // Cache fetch briefly; cover URL / revalidatePath invalidate when the note changes.
      next: { revalidate: 300 },
    })
    if (!res.ok) return null

    const input = Buffer.from(await res.arrayBuffer())
    const jpeg = await sharp(input)
      .rotate()
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer()

    return `data:image/jpeg;base64,${jpeg.toString('base64')}`
  } catch {
    return null
  }
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return new Response('Not found', { status: 404 })
  }

  const fontData = await loadDisplayFont()
  const linkLabel = `nocetti.uy/noticias/${post.slug}`
  const coverSrc = post.coverUrl ? await coverAsDataUri(post.coverUrl) : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#000000',
          overflow: 'hidden',
        }}
      >
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverSrc}
            alt=""
            width={WIDTH}
            height={HEIGHT}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : null}

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '52%',
            backgroundImage:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.88) 70%, rgba(0,0,0,1) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '0 56px 64px',
          }}
        >
          <div
            style={{
              color: GOLD,
              fontFamily: 'Instrument Serif',
              fontSize: 62,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
              maxHeight: 280,
              overflow: 'hidden',
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              color: GOLD,
              fontFamily: 'Instrument Serif',
              fontSize: 28,
              lineHeight: 1.2,
              opacity: 0.92,
              display: 'flex',
            }}
          >
            {linkLabel}
          </div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Instrument Serif',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    },
  )
}
