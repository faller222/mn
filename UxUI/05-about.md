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
| Podcast en Spotify         |
| +------------------------+ |
| | Spotify embed (iframe) | |
| | show MN · lazy load    | |
| | h=152 mobile / 352 desk| |
| +------------------------+ |
| [ Abrir en Spotify -> ]    |
+----------------------------+
| Redes                      |
| [ Instagram ] [ WhatsApp ] |
+----------------------------+
| Archivo                    |
| +180 entrevistas · 100h+   |
| [ Ver entrevistas -> ]     |
+----------------------------+
```

### Anotaciones Técnicas y de UX

**Responsivo**
- Móvil: foto centrada, bio debajo, CTAs apilados; embed Spotify full-width debajo de trayectoria.
- Tablet/Desktop: layout 2 columnas — foto + identidad a izquierda (~40%), bio/trayectoria a derecha; CTAs arriba del fold en desktop; embed Spotify a ancho de la columna de contenido (no sidebar estrecha).

**Spotify (iframe oficial)**
- Mismo show que Home: `https://open.spotify.com/embed/show/1WxPXeCzGu3D8dJeTwwAd3?utm_source=generator`
- En About el embed es más justificable (prueba de archivo/trayectoria). En Home sigue siendo secundario al LIVE.
- `loading="lazy"` + link fallback “Abrir en Spotify”.
- GA4: `click_spotify`.

**Conversión**
- About no es página decorativa: cada sección termina en acción (En vivo / Contactar / Spotify / Ver entrevistas).
- Métricas de archivo (+180) son prueba social para anunciantes; el embed las hace escuchables al instante.

**A11y**
- Foto: `alt="Martín Nocetti, periodista en Maldonado"`.
- Lista de trayectoria semántica (`<ol>` / `<ul>`).
- Enlaces externos: texto claro; no "click aquí".
- iframe con `title="Podcast MN en Spotify"`.

**Interacciones**
- En vivo → player; Contactar → form; Ver entrevistas → lista filtrada `Entrevistas`; Instagram/WhatsApp → outbound + tracking; Spotify → embed + deep link.

---
