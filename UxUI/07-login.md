## 7. Login (Admin)

```
+----------------------------+
|                            |
|           MN              |
|        Administracion      |
|                            |
| +------------------------+ |
| |                        | |
| | Email                  | |
| | +--------------------+ | |
| | | martin@...         | | |
| | +--------------------+ | |
| |                        | |
| | Contrasena             | |
| | +--------------------+ | |
| | | ********        [o]| | |
| | +--------------------+ | |
| |                        | |
| | [    Ingresar    ]     | |
| |                        | |
| | Olvidaste tu clave?    | |
| |                        | |
| +------------------------+ |
|                            |
| <- Volver al sitio         |
|                            |
+----------------------------+

Error:
| ! Credenciales invalidas   |
|   Intentos restantes...    |
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil/Tablet/Desktop: misma UI centrada; en desktop card max ~400px centrada en viewport; fondo quieto (marca, sin clutter de dashboard).
- Sin navbar pública ni LIVE aquí (reduce ruido y superficie de error).

**Seguridad UX**
- Solo admin Payload (1–2 users). Sin registro público.
- Rate limit / mensaje genérico ("Credenciales inválidas") — no revelar si el email existe.
- Recuperación: flujo email mágico/reset de Payload; pantalla simple "Revisá tu correo".
- HTTPS, autofill correcto (`username` / `current-password`), opción mostrar/ocultar password.

**A11y**
- Formulario con labels; error con `role="alert"`.
- Foco inicial en Email.
- Contraste AA; hit area botones >= 44px.

**Interacciones**
- Éxito → Editor / lista de Noticias admin.
- "Volver al sitio" → Home pública.
- Sesión expirada en editor → redirect a Login con `returnTo`.

---
