# NEXOS — landing

Sitio estático (HTML + CSS + JS, sin build). Listo para GitHub Pages.

```
index.html
favicon.ico
assets/css/styles.css
assets/js/main.js        ← CONFIG de contacto arriba del archivo
assets/brand/            ← logo NEXOS Solutions y favicons
assets/shots/*.webp      ← capturas del mockup
.nojekyll
```

Colores de marca (de `assets/brand`): grafito `#18181B`, coral HR `#E05638`, verde Finance `#166534`.
Las capturas del mockup siguen en índigo; si la app adopta la paleta de marca, hay que volver a capturarlas.

## Antes de publicar

1. **Datos de contacto** — edita `CONFIG` en `assets/js/main.js` (correo, WhatsApp, teléfono, dirección).
2. **Formulario** — GitHub Pages no procesa formularios. Opciones:
   - Crea un formulario gratis en [formspree.io](https://formspree.io), copia el endpoint (`https://formspree.io/f/xxxx`) y pégalo en `CONFIG.formEndpoint`.
   - Si lo dejas vacío, el botón abre el correo del visitante con la solicitud ya escrita.
   - El formulario pregunta dónde está la información del cliente hoy (Excel, otro sistema, papel), para cotizar la migración.
3. **Revisa los textos comerciales** marcados abajo: son propuestas, no datos del mockup.

### Textos que conviene confirmar
- Precios "desde" (tomados del mockup): Starter RD$285, Professional RD$420, Enterprise a medida. Se presentan como referencia; la propuesta final se ajusta por cliente.
- Implementación y migración: se cotiza aparte según el origen de los datos (Excel, otro sistema, papel). Sección Precios y FAQ.
- "ITBIS no incluido".
- FAQ: plazos de implementación, archivo de la TSS, archivos de pago bancarios, hosting y respaldos.
- Contacto: "En 30 minutos corremos un mes de tu empresa…".
- Simulador del hero: usa las tasas del mockup (AFP 2.87%/7.10%, SFS 3.04%/7.09%, SRL 1.10%, INFOTEP 1%) y la escala ISR 2026 de la DGII. No aplica topes de cotización; el texto lo aclara.

## Publicar en GitHub Pages

El repo ya está inicializado en la rama `main`. Falta el primer commit y el remoto:

```bash
git commit -m "Landing NEXOS"
git remote add origin https://github.com/TU-USUARIO/nexos-landing.git
git push -u origin main
```

Luego en GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
La página queda en `https://TU-USUARIO.github.io/nexos-landing/`.

Para un dominio propio (ej. `nexos.do`), agrega un archivo `CNAME` con el dominio y configura el DNS según la guía de GitHub Pages.
