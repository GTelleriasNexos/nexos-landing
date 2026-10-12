# NEXOS — landing

Sitio estático (HTML + CSS + JS, sin build). Listo para GitHub Pages.

```
index.html
privacidad.html          ← política de privacidad (Ley 172-13)
favicon.ico
assets/css/styles.css
assets/js/main.js        ← CONFIG de contacto arriba del archivo
assets/brand/            ← logo NEXOS Solutions y favicons
assets/shots/*.webp      ← capturas del mockup
assets/og.png            ← imagen al compartir en WhatsApp/LinkedIn
.nojekyll
```

Colores de marca (de `assets/brand`): grafito `#18181B`, coral HR `#E05638`, verde Finance `#166534`.
Las capturas del mockup siguen en índigo; si la app adopta la paleta de marca, hay que volver a capturarlas.

## Antes de publicar

1. **Datos de contacto** — en `CONFIG`, al principio de `assets/js/main.js`: correos de demo, WhatsApp/teléfono (829-563-1041) y dirección.
2. **Formulario** — se envía con [FormSubmit](https://formsubmit.co) (gratis, sin servidor):
   - Le llega a `gtellerias@nexostechs.com`, con copia a `aacosta@nexostechs.com` (`CONFIG.emails`).
   - **Activación:** la primera solicitud enviada desde el sitio publicado dispara un correo de FormSubmit a `gtellerias@nexostechs.com`. Hay que pulsar **Activate Form**; hasta entonces no llegan las solicitudes.
   - Después de activar, FormSubmit envía un alias aleatorio (ej. `https://formsubmit.co/ajax/a1b2c3…`). Conviene ponerlo en `CONFIG.formEndpoint` para que el correo no se vea en el código ni reciba spam.
   - El botón "Responder" del correo responde directo al cliente (`_replyto`).
   - Si `formEndpoint` queda vacío, el botón abre el correo del visitante con la solicitud ya escrita.
   - El formulario pregunta dónde está la información del cliente hoy (Excel, otro sistema, papel), para cotizar la migración.
3. **Métricas (opcional)** — crea una propiedad de Google Analytics 4 y pega el ID (`G-XXXXXXXXXX`) en `CONFIG.ga4`. Se registran las solicitudes de demo (`generate_lead`) y los clics a WhatsApp o teléfono (`contact_click`).
4. **Revisa los textos comerciales** marcados abajo: son propuestas, no datos del mockup.

### Textos que conviene confirmar
- **Empresas fundadoras:** 10 cupos, migración desde Excel incluida, precio fijo por 12 meses, WhatsApp directo y mes en paralelo. Son compromisos comerciales.
- **Calendario:** TSS el tercer día hábil, IR-3 el día 10, Navidad antes del 20 de diciembre, bonificación entre 90 y 120 días después del cierre fiscal. Validar con el contador.
- **Reportes oficiales:** DGT-3 (anual), DGT-4 (con cada novedad), autodeterminación de la TSS e IR-3.
- **Seguridad:** "cifrado en tránsito y en reposo, respaldos diarios" y SSO en Enterprise.
- **Privacidad:** razón social (hoy dice "NEXOS Solutions"), retención de 24 meses y respuesta en 10 días hábiles.
- Precios "desde" (tomados del mockup): Starter RD$285, Professional RD$420, Enterprise a medida. Se presentan como referencia; la propuesta final se ajusta por cliente.
- Implementación y migración: se cotiza aparte según el origen de los datos (Excel, otro sistema, papel). Sección Precios y FAQ.
- "ITBIS no incluido".
- FAQ: plazos de implementación, archivo de la TSS, archivos de pago bancarios, hosting y respaldos.
- Contacto: "En 30 minutos corremos un mes de tu empresa…".
- Simulador del hero: usa las tasas del mockup (AFP 2.87%/7.10%, SFS 3.04%/7.09%, SRL 1.10%, INFOTEP 1%) y la escala ISR 2026 de la DGII. No aplica topes de cotización; el texto lo aclara.

## Publicación

- Repo: https://github.com/GTelleriasNexos/nexos-landing (rama `main`, raíz).
- GitHub Pages publica cada push a `main` en **https://nexostechs.com** (archivo `CNAME`).
- DNS en GoDaddy: cuatro registros A `@` → 185.199.108.153, .109, .110 y .111; CNAME `www` → `gtelleriasnexos.github.io`. No tocar los registros MX, TXT ni los CNAME de Microsoft 365.

Para publicar cambios:

```bash
git add -A && git commit -m "Describe el cambio" && git push
```
