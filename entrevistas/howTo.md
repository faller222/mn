# HowTo: de Spotify a notas HTML para MN

Pipeline para sacar **varias noticias** a partir de una entrevista del podcast *La mejor manera de comenzar la mañana* (Martín Nocetti).

## 1. Entrada

En `entrevistas/` dejar un archivo por episodio:

```
{numero} - {Nombre del invitado}.md
```

Ejemplos:

- `164 - Javier Carballal.md`
- `177 - Homenaje a José Hualde.md`
- `180 - Prof César López.md`

Contenido del archivo (mínimo):

1. **Línea 1:** URL del episodio en Spotify  
   `https://open.spotify.com/episode/...`
2. **Línea en blanco**
3. **Resto:** HTML de la transcripción de Spotify (copiar/pegar desde el player web)

La transcripción es automática: nombres, fechas y cargos pueden salir mal. **Antes de publicar, contrastar hechos sensibles con el audio.**

## 2. Qué producir

Por cada entrevista: **3 noticias distintas** (ángulos diferentes del mismo episodio).

Salida en `noticias/`, **HTML vivo** (documento completo para abrir en el navegador), un archivo por nota:

```
{invitado-kebab}-{tema-corto}.html
```

Además generar / mantener `noticias/index.html` como índice clickeable de todas las notas.

Abrís el `.html` en Chrome/Safari → a la izquierda de cada campo hay un botón que **copia al clipboard** → pegás en el admin al crear la nota.

### Campos (inputs readonly + botón copiar)

| Campo | Uso |
|---|---|
| `title` | Título de la nota |
| `slug` | Slug de URL (único, kebab-case) |
| `excerpt` | Resumen corto para listados/cards |
| `publishedAt` | Fecha de publicación (ver formato abajo) |
| `spotify` | URL del episodio |
| `invitado` | Nombre del invitado |
| `episodio` | Número de episodio |

Además:

- **Copiar cuerpo HTML** → pega el interior del `<article>` (con `<p>`, `<b>`, `<i>`, `<a>…`) en el editor rich text / HTML del CMS.
- **Copiar cuerpo texto** → versión plain text si hace falta.

## 3. Fecha `publishedAt`

- Tomar la **fecha de publicación del episodio en Spotify** (`music:release_date` / `releaseDate` del open.spotify).
- Las 3 notas del mismo episodio van **en el pasado relativo a hoy**, escalonadas a partir de esa fecha (mismo día o días siguientes).
- **Meses en inglés** (para copypaste al admin), aunque el contenido de la nota esté en español.

Formato exacto:

```
Aug 5, 2026 4:00 PM
```

Abreviaturas: `Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec`.

## 4. Formato del archivo HTML (vivo)

Documento completo con `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`.

Estructura conceptual:

1. Bloque de metadatos: cada valor en `<input readonly>` o `<textarea readonly>`, con **botón de copiar a la izquierda**.
2. Toolbar: copiar cuerpo HTML / texto.
3. `<article id="cuerpo">` con la nota renderizada (preview + fuente a copiar).

### Reglas del cuerpo

- **No Markdown.** El cuerpo va en HTML: `<h1>`, `<p>`, `<b>`, `<i>`, `<a>`.
- **Nombres de programa / sección → negrita:** `<b>La mejor manera de comenzar la mañana</b>`, `<b>Historias que contar</b>`.
- **Citas textuales del entrevistado → cursiva con comillas adentro del tag:** `<i>“frase citada”</i>` (no `“<i>frase</i>”`).
- No al revés: no poner el programa en italic ni las citas en bold.
- **Todo link** como `<a href="..." target="_blank" rel="noopener noreferrer">texto</a>`.
- Cierre obligatorio: “Escuchá la nota completa en Spotify” con el `<a>` al episodio.

El JS/CSS puede ir inline (así el archivo funciona abriéndolo desde disco con `file://`).

## 5. Criterio editorial de las 3 notas

Elegir **3 ángulos** que puedan vivir solos como noticia local (no tres resúmenes del mismo audio):

1. Hecho / anuncio / balance concreto  
2. Tema humano o de impacto cotidiano  
3. Obra, proyecto, legado o conclusión fuerte  

Tono: periodismo local de Maldonado, directo, sin relleno. Longitud: ~3–4 párrafos cortos + CTA Spotify.

## 6. Checklist rápido

1. [ ] Archivo en `entrevistas/` con URL + transcripción  
2. [ ] Fecha Spotify confirmada  
3. [ ] 3 ángulos distintos  
4. [ ] HTML vivo con inputs readonly + botón copiar a la izquierda  
5. [ ] `title`, `slug`, `excerpt`, `publishedAt` (meses EN, ej. `Aug 5, 2026 4:00 PM`)  
6. [ ] Cuerpo: programas en `<b>`, citas en `<i>`, links `<a target="_blank">`  
7. [ ] Botón “Copiar cuerpo HTML”  
8. [ ] CTA Spotify  
9. [ ] Revisar hechos contra el audio  

## 7. Prompt corto para repetir

> En `entrevistas/` hay N entrevistas (URL Spotify + transcripción). Armá 3 noticias por cada una en `noticias/` como **HTML vivo** (`<!DOCTYPE html>` + body): metadatos en inputs readonly con botón copiar a la izquierda; `publishedAt` con meses en inglés (`Aug 5, 2026 4:00 PM`); cuerpo en `<article>` con **programas en `<b>`** y **citas en `<i>`**, links `<a target="_blank" rel="noopener noreferrer">`; botón para copiar el cuerpo HTML. Cada nota cierra con “Escuchá la nota completa en Spotify”. Seguí `entrevistas/howTo.md`.
