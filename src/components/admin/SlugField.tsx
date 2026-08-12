'use client'

import { FieldLabel, TextInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { useCallback, type ChangeEvent } from 'react'
import { maskSlugInput } from '@/lib/slug'
import { HelpTip } from './HelpTip'

export const SlugField: TextFieldClientComponent = ({
  field,
  path: pathFromProps,
  readOnly,
  validate,
}) => {
  const {
    admin: { className, description, placeholder } = {},
    label,
    localized,
    required,
  } = field

  const memoizedValidate = useCallback(
    (value: unknown, options: Record<string, unknown>) => {
      if (typeof validate === 'function') {
        return validate(value as never, options as never)
      }
      return true
    },
    [validate],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string>({
    potentiallyStalePath: pathFromProps,
    validate: memoizedValidate,
  })

  const stringValue = typeof value === 'string' ? value : ''

  return (
    <TextInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      Description={Description}
      Error={Error}
      Label={
        Label !== undefined ? (
          Label
        ) : (
          <div className="mn-field-label-row">
            <FieldLabel label={label} localized={localized} path={path} required={required} />
            <HelpTip label="Qué es el slug">
              <p>
                El <strong>slug</strong> es el identificador corto de la nota en la URL
                (ej. <code>/noticias/entrevista-leticia-correa</code>).
              </p>
              <p>
                Ayuda al SEO: Google y otros buscadores leen esas palabras para entender de
                qué trata la página. También es mnemotécnico: se recuerda y se comparte mejor
                que un ID numérico.
              </p>
              <p>
                <strong>Cómo escribirlo:</strong>
              </p>
              <ul>
                <li>minúsculas, sin tildes ni eñes</li>
                <li>palabras separadas por guiones</li>
                <li>sin espacios ni signos raros</li>
              </ul>
              <p>El campo corrige solo lo que escribas o pegues.</p>
            </HelpTip>
          </div>
        )
      }
      className={className}
      description={description}
      htmlAttributes={{ autoComplete: 'off' }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(maskSlugInput(e.target.value))
      }}
      path={path}
      placeholder={
        typeof placeholder === 'string' ? placeholder : 'entrevista-nombre-apellido'
      }
      readOnly={Boolean(readOnly || disabled)}
      required={required}
      showError={showError}
      value={stringValue}
    />
  )
}
