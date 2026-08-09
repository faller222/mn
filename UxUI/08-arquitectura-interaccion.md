## Arquitectura de interacción

```
                    [> LIVE mini-bar global]
                              ^
Home ---> Lista Notas ---> Nota
 |            ^            |
 |            +------------+
 +---> About ---> Contacto <-> WhatsApp
 +---> Contacto (Formspree)
 +---> (footer) Admin Login ---> Payload Editor
                                      |
                                      +-- Preview --> Nota (?preview)
```

### Prioridad de construcción

| Orden | Pantalla | Por qué |
|------:|----------|---------|
| 1 | Home + LIVE | Adquisición y métrica `play_radio` |
| 2 | Contacto | Conversión comercial con clientes actuales |
| 3 | About | Credibilidad para anunciantes |
| 4 | Lista + Nota | Solo cuando haya ritmo de publicación |
| 5 | Login + Editor | V2; Martín debe publicar solo |

---
