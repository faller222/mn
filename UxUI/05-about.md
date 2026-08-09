## 5. About Me (Sobre el Periodista)

```
+----------------------------+
| =  MN              [> LIVE]|
+----------------------------+
|                            |
|      +------------+        |
|      |############|        |
|      |# FOTO #####|        |
|      |# PERFIL ###|        |
|      +------------+        |
|                            |
|      Martin Nocetti        |
|  Periodismo · Maldonado    |
|                            |
| [> En vivo] [Contactar]    |
+----------------------------+
| Biografia                  |
|                            |
| Parrafo 1: quien es y      |
| que hace (radio, entrevistas|
| comunidad).                |
|                            |
| Parrafo 2: enfoque local / |
| actualidad / deporte.      |
+----------------------------+
| Trayectoria                |
| * FM Brava — Programa...   |
| * Podcast Spotify — ...    |
| * Cobertura comunitaria... |
+----------------------------+
| Redes                      |
| [ Instagram ] [ Spotify ]  |
| [ WhatsApp  ]              |
+----------------------------+
| Archivo                    |
| +180 entrevistas · 100h+   |
| [ Ver entrevistas -> ]     |
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: foto centrada, bio debajo, CTAs apilados.
- Tablet/Desktop: layout 2 columnas — foto + identidad a izquierda (~40%), bio/trayectoria a derecha; CTAs arriba del fold en desktop.

**Conversión**
- About no es página decorativa: cada sección termina en acción (En vivo / Contactar / Ver entrevistas).
- Métricas de archivo son prueba social para anunciantes.

**A11y**
- Foto: `alt="Martín Nocetti, periodista en Maldonado"`.
- Lista de trayectoria semántica (`<ol>` / `<ul>`).
- Enlaces externos: texto claro; no "click aquí".

**Interacciones**
- En vivo → player; Contactar → form; Ver entrevistas → lista filtrada `Entrevistas`; redes → outbound + tracking.

---
