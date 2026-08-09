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
| Email: hola@...            |
| WhatsApp  [Abrir chat]     |
| Maldonado, Uruguay         |
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
| Formspree · privacidad...  |
+----------------------------+

EXITO:
+----------------------------+
| OK Mensaje enviado         |
| Te respondemos a la        |
| brevedad.                  |
| [ Volver al inicio ]       |
| [ WhatsApp ]               |
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
- Móvil: form full width; WhatsApp arriba del form (conversión más corta).
- Desktop: 2 columnas — contacto directo izquierda, form derecha; max-width del form ~480px.

**Formspree**
- POST nativo al endpoint Formspree; honeypot anti-spam.
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
- WhatsApp paralelo al form.
- Tras éxito, ofrecer LIVE o últimas entrevistas (retención).

---
