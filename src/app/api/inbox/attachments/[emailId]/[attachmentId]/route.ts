import config from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { getResendClient } from '@/lib/resend'

export const runtime = 'nodejs'

type Params = { params: Promise<{ emailId: string; attachmentId: string }> }

/** Auth-only proxy to Resend attachment download URL. */
export async function GET(_req: Request, { params }: Params) {
  const { emailId, attachmentId } = await params

  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await getHeaders() })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resend = getResendClient()
    const { data, error } = await resend.emails.receiving.attachments.get({
      emailId,
      id: attachmentId,
    })

    if (error || !data?.download_url) {
      return NextResponse.json(
        { error: error?.message || 'Attachment not found' },
        { status: 404 },
      )
    }

    return NextResponse.redirect(data.download_url)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Attachment proxy failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
