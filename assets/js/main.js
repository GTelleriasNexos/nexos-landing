/* ==========================================================
   NEXOS — landing
   Edit CONFIG with your real contact data before publishing.
   ========================================================== */
const CONFIG = {
  // Demo requests go to every address here (first = main recipient, rest = CC).
  emails: ['gtellerias@nexostechs.com', 'aacosta@nexostechs.com'],
  whatsapp: '18295631041',            // country code + number, digits only
  phone: '+1 829 563 1041',
  address: 'Av. Winston Churchill, Santo Domingo',
  // FormSubmit (formsubmit.co) delivers the form by email, no server needed.
  // After activation you can replace the address in the URL with the random
  // alias FormSubmit sends you, so the email is not visible in the code.
  formEndpoint: 'https://formsubmit.co/ajax/gtellerias@nexostechs.com',
  // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Empty = no analytics.
  ga4: ''
};

document.documentElement.classList.add('js');

/* ---------- analytics (optional) ---------- */
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
const track = (name, params = {}) => { if (CONFIG.ga4) gtag('event', name, params); };
if (CONFIG.ga4) {
  const s = document.createElement('script');
  s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.ga4;
  document.head.appendChild(s);
  gtag('js', new Date()); gtag('config', CONFIG.ga4, { anonymize_ip: true });
}
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- contact channels ---------- */
(() => {
  const set = (k, text, href) => $$(`[data-contact="${k}"]`).forEach(a => {
    a.textContent = text;
    if (href) a.href = href;
  });
  $$('[data-contact="emails"]').forEach(el => {
    el.innerHTML = CONFIG.emails.map(m => `<a href="mailto:${m}">${m}</a>`).join('<br>');
  });
  set('whatsapp', formatPhone(CONFIG.whatsapp), `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hola, quiero ver una demo de NEXOS.')}`);
  set('phone', CONFIG.phone, `tel:${CONFIG.phone.replace(/[^\d+]/g, '')}`);
  set('address', CONFIG.address);
  $('#year').textContent = new Date().getFullYear();

  function formatPhone(d) {
    const m = d.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    return m ? `+1 ${m[1]} ${m[2]} ${m[3]}` : '+' + d;
  }
})();

/* ---------- header + mobile menu ---------- */
(() => {
  const top = $('.top'), burger = $('#burger'), menu = $('#menu');
  const onScroll = () => top.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const close = () => { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('a', menu).forEach(a => a.addEventListener('click', close));
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

/* ---------- payslip simulator ----------
   Rates as shown in the product mockup. ISR uses the DGII annual scale
   applied to salary minus AFP and SFS. Illustrative only. */
(() => {
  const RATE = { afp: .0287, sfs: .0304, afpE: .071, sfsE: .0709, srl: .011, inf: .01 };
  const ISR = [ // annual brackets (RD$)
    { from: 0,         rate: 0,   base: 0 },
    { from: 416220.00, rate: .15, base: 0 },
    { from: 624329.00, rate: .20, base: 31216 },
    { from: 867123.00, rate: .25, base: 79776 }
  ];
  const input = $('#sal'), range = $('#sal-range');
  const fmt = n => 'RD$ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const out = $$('[data-out]').reduce((o, el) => (o[el.dataset.out] = el, o), {});

  function isrMonthly(taxable) {
    const annual = taxable * 12;
    let b = ISR[0];
    for (const x of ISR) if (annual > x.from) b = x;
    return (b.base + (annual - b.from) * b.rate) / 12;
  }

  function calc(gross, flash) {
    const afp = gross * RATE.afp, sfs = gross * RATE.sfs;
    const isr = isrMonthly(gross - afp - sfs);
    const v = {
      afp: -afp, sfs: -sfs, isr: -isr,
      net: gross - afp - sfs - isr,
      afpE: gross * RATE.afpE, sfsE: gross * RATE.sfsE, srl: gross * RATE.srl, inf: gross * RATE.inf
    };
    v.cost = gross + v.afpE + v.sfsE + v.srl + v.inf;
    for (const k in v) {
      const n = Math.round(v[k] * 100) / 100;
      out[k].textContent = (n < 0 ? '– ' : '') + fmt(Math.abs(n));
    }
    if (flash) ['net', 'cost'].forEach(k => {
      out[k].classList.remove('flash'); void out[k].offsetWidth; out[k].classList.add('flash');
    });
  }

  const parse = s => Number(String(s).replace(/[^\d.]/g, '')) || 0;
  input.addEventListener('input', () => {
    const n = parse(input.value);
    range.value = Math.min(Math.max(n, +range.min), +range.max);
    calc(n);
  });
  input.addEventListener('blur', () => { input.value = parse(input.value).toLocaleString('en-US'); });
  range.addEventListener('input', () => {
    input.value = (+range.value).toLocaleString('en-US');
    calc(+range.value);
  });
  range.addEventListener('change', () => calc(+range.value, true));
  calc(parse(input.value));
})();

/* ---------- product showcase ---------- */
(() => {
  const SCREENS = {
    rrhh: [
      { img: 'dashboard', url: 'panel', t: 'Panel', d: 'Plantilla, asistencia del día y todo lo que espera tu aprobación.', alt: 'Panel de RRHH con empleados activos, asistencia del día y aprobaciones pendientes' },
      { img: 'employee', url: 'empleados/nx-0027', t: 'Expediente del empleado', d: 'Datos personales, contrato, compensación y su historial en una sola ficha.', alt: 'Perfil de una empleada con información personal, laboral y compensación' },
      { img: 'attendance', url: 'asistencia', t: 'Asistencia', d: 'Entradas, tardanzas y horas extra por día, con correcciones auditadas.', alt: 'Tabla de asistencia diaria con horas de entrada y salida por empleado' },
      { img: 'timeoff', url: 'vacaciones', t: 'Vacaciones y licencias', d: 'Calendario del equipo y balances calculados según antigüedad.', alt: 'Calendario de vacaciones del equipo y solicitudes pendientes' },
      { img: 'recruitment', url: 'reclutamiento', t: 'Reclutamiento', d: 'Candidatos por etapa, de la postulación a la oferta firmada.', alt: 'Tablero de reclutamiento con candidatos organizados por etapa' }
    ],
    nomina: [
      { img: 'payroll', url: 'nomina', t: 'Resumen de nómina', d: 'Costo del mes, estado del ciclo y alertas antes de aprobar.', alt: 'Resumen de nómina con costo mensual, estado del ciclo y alertas' },
      { img: 'payroll-run', url: 'nomina/corridas/2026-08', t: 'Corrida de nómina', d: 'Seis pasos guiados, del período a la aprobación.', alt: 'Corrida de nómina, paso de período' },
      { img: 'payslip', url: 'nomina/volantes/nx-0027', t: 'Volante de pago', d: 'Cada ingreso y descuento con su base, listo para enviar en PDF.', alt: 'Volante de pago con ingresos, deducciones AFP, SFS, ISR y aportes del empleador' },
      { img: 'approvals', url: 'aprobaciones', t: 'Aprobaciones', d: 'Vacaciones, ajustes y nóminas esperando firma, en una sola bandeja.', alt: 'Bandeja de aprobaciones pendientes' },
      { img: 'ley-16-92', url: 'configuracion/ley-16-92', t: 'Parámetros Ley 16-92', d: 'Jornada, recargos y prestaciones con el artículo que los respalda.', alt: 'Parámetros de la Ley 16-92 con artículos del Código de Trabajo' }
    ]
  };
  const show = $('.show'), tabs = $('#show-tabs'), img = $('#show-img'), url = $('#frame-url');
  let app = 'rrhh';

  // Preload the other screens once the page is idle.
  const preload = () => Object.values(SCREENS).flat().forEach(s => { new Image().src = `assets/shots/${s.img}.webp`; });
  ('requestIdleCallback' in window) ? requestIdleCallback(preload) : setTimeout(preload, 1500);

  function select(i, focus) {
    const s = SCREENS[app][i];
    $$('button', tabs).forEach((b, j) => {
      b.setAttribute('aria-selected', String(i === j));
      b.tabIndex = i === j ? 0 : -1;
    });
    if (focus) $$('button', tabs)[i].focus();
    img.classList.add('swapping');
    const next = new Image();
    next.onload = () => {
      img.src = next.src; img.alt = s.alt; url.textContent = 'app.nexos.do/' + s.url;
      requestAnimationFrame(() => img.classList.remove('swapping'));
    };
    next.src = `assets/shots/${s.img}.webp`;
  }

  function renderApp(a) {
    app = a;
    show.dataset.app = a;
    $$('[data-app-btn]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.appBtn === a)));
    tabs.innerHTML = SCREENS[a].map((s, i) =>
      `<li><button role="tab" aria-selected="false" tabindex="-1"><b>${s.t}</b><span>${s.d}</span></button></li>`).join('');
    $$('button', tabs).forEach((b, i) => b.addEventListener('click', () => select(i)));
    select(0);
  }

  tabs.addEventListener('keydown', e => {
    const btns = $$('button', tabs), i = btns.indexOf(document.activeElement);
    if (i < 0) return;
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step) { e.preventDefault(); select((i + step + btns.length) % btns.length, true); }
  });
  $$('[data-app-btn]').forEach(b => b.addEventListener('click', () => renderApp(b.dataset.appBtn)));
  renderApp('rrhh');
})();

/* ---------- plan buttons prefill the form ---------- */
$$('[data-plan]').forEach(a => a.addEventListener('click', () => { $('#plan-select').value = a.dataset.plan; }));
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="https://wa.me"], a[href^="tel:"]');
  if (a) track('contact_click', { method: a.href.startsWith('tel:') ? 'phone' : 'whatsapp' });
});

/* ---------- contact form ---------- */
(() => {
  const form = $('#contact-form'), status = $('#form-status'), btn = $('button[type="submit"]', form);
  const say = (msg, cls = '') => { status.textContent = msg; status.className = 'f-status ' + cls; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let firstBad = null;
    $$('[required]', form).forEach(f => {
      const ok = f.checkValidity();
      f.closest('.f').classList.toggle('invalid', !ok);
      if (!ok && !firstBad) firstBad = f;
    });
    if (firstBad) {
      say('Completa nombre, empresa, un correo válido y la cantidad de empleados.', 'err');
      firstBad.focus();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return;

    // Readable labels: these become the rows of the email the team receives.
    const fields = {
      'Nombre': data.nombre,
      'Empresa': data.empresa,
      'Correo': data.correo,
      'Teléfono / WhatsApp': data.telefono || '—',
      'Empleados': data.empleados,
      'Plan de interés': data.plan,
      'Datos actuales en': data.origen_datos,
      'Cómo calculan la nómina hoy': data.mensaje || '—'
    };
    const subject = 'Solicitud de demo NEXOS — ' + data.empresa;
    const [to, ...cc] = CONFIG.emails;

    if (!CONFIG.formEndpoint) {
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
      location.href = `mailto:${CONFIG.emails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      say('Abrimos tu correo con la solicitud lista para enviar.', 'ok');
      return;
    }

    btn.disabled = true; say('Enviando…');
    try {
      const r = await fetch(CONFIG.formEndpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...fields,
          _subject: subject,
          _cc: cc.join(','),
          _replyto: data.correo,
          _template: 'table',
          _captcha: 'false'
        })
      });
      const res = await r.json().catch(() => ({}));
      if (!r.ok || String(res.success) !== 'true') throw new Error(res.message || r.status);
      track('generate_lead', { plan: data.plan, empleados: data.empleados });
      form.reset();
      say('Solicitud enviada. Te escribimos hoy para agendar la demo.', 'ok');
    } catch {
      say(`No se pudo enviar. Escríbenos a ${to} o por WhatsApp al ${CONFIG.phone}.`, 'err');
    } finally {
      btn.disabled = false;
    }
  });
  $$('input,select', form).forEach(f => f.addEventListener('input', () => f.closest('.f')?.classList.remove('invalid')));
})();

/* ---------- reveal on scroll ---------- */
(() => {
  const els = $$('.sec-head, .frame, .steps, .law-list, .filing-list, .vs, .cal, .sec-list, .founders-list, .feats, .plans, .faq, .phones, .form');
  if (!('IntersectionObserver' in window)) return;
  els.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();
