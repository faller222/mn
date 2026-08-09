## 6. Contact Me

```
+----------------------------+
| =  MN              [> LIVE]|
+----------------------------+
| Contacto                   |
| Para pautas, entrevistas   |
| y consultas.               |
+----------------------------+
| Directo                    |
| Maldonado, Uruguay         |
| Instagram @mnocetti1       |
+----------------------------+
| Escribinos                 |
|                            |
| Nombre *                   |
| +------------------------+ |
| |                        | |
| +------------------------+ |
| Email *                    |
| +------------------------+ |
| |                        | |
| +------------------------+ |
| Asunto *                   |
| +------------------------+ |
| | Publicidad v / Otro    | |
| +------------------------+ |
| Mensaje *                  |
| +------------------------+ |
| |                        | |
| |                        | |
| |                        | |
| +------------------------+ |
|                            |
| [      Enviar mensaje     ]|
|                            |
| Los datos se usan solo     |
| para responder tu consulta.|
+----------------------------+

EXITO:
+----------------------------+
| OK Mensaje enviado         |
| Te respondemos a la        |
| brevedad.                  |
| [ Volver al inicio ]       |
+----------------------------+

ERROR:
+----------------------------+
| ! No se pudo enviar        |
| Revisa los campos o        |
| intenta de nuevo.          |
| Email: formato invalido    |
| [ Reintentar ]             |
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: form full width (único CTA de contacto en V1).
- Desktop: 2 columnas — datos directos izquierda, form derecha; max-width del form ~480px.

**Formspree**
- Endpoint: `https://formspree.io/f/xzepdwlp`
- POST nativo; honeypot anti-spam.
- Validación client-side + mensajes server-side.
- Prefill desde query: `?asunto=Publicidad`.
- GA4: `contact_submit` solo en éxito real (no en click).

**Estados**
- Idle / Validating / Submitting (botón disabled + spinner) / Success / Error de red / Error de campo.
- Success reemplaza el form (evita reenvío doble).

**A11y**
- Cada input con `<label for>`.
- Errores: `aria-invalid="true"` + `aria-describedby` al texto de error.
- Success/Error en `role="status"` / `alert`.
- Orden de tab lógico; botón Enviar no solo por color.

**Interacciones**
- Tras éxito, ofrecer LIVE o últimas entrevistas (retención).

**Notas de implementación (no UI)**
- Contacto V1: solo formulario. Sin número ni CTA de WhatsApp en esta página.
- Compartir por WhatsApp en notas (otra pantalla) es independiente de esta regla.

---
