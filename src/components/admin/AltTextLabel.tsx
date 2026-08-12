'use client'

import { FieldLabel } from '@payloadcms/ui'
import type { TextFieldLabelClientComponent } from 'payload'
import { HelpTip } from './HelpTip'

export const AltTextLabel: TextFieldLabelClientComponent = ({ field, path }) => {
  return (
    <div className="mn-field-label-row">
      <FieldLabel
        label={field?.label}
        localized={field?.localized}
        path={path}
        required={field?.required}
      />
      <HelpTip label="Por qué importa el texto alternativo">
        <p>
          El <strong>texto alternativo (alt)</strong> describe la imagen cuando no se puede
          ver: lectores de pantalla, carga lenta, o si la imagen falla.
        </p>
        <p>
          También ayuda al SEO: los buscadores no “ven” la foto; leen este texto para
          indexarla y asociarla al contenido.
        </p>
        <p>
          <strong>Cómo escribirlo bien:</strong>
        </p>
        <ul>
          <li>describí lo relevante de la imagen en 1 frase corta</li>
          <li>incluí nombres si son la persona fotografiada</li>
          <li>no empieces con “imagen de…” ni “foto de…”</li>
          <li>no copies el título de la nota si la imagen aporta otra info</li>
        </ul>
        <p>
          Ejemplo: <em>Leticia Correa en el estudio de MN durante la entrevista</em>.
        </p>
      </HelpTip>
    </div>
  )
}
