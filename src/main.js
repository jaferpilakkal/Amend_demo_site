import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import { createIcons, ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, ShieldCheck, HeartHandshake, Microscope, Menu, X, Info, ScanLine, Scan, Layers, AlignHorizontalSpaceAround, Smile, Sparkles, UserRound, Phone, Clock3, Star, Check, MapPin, MessageCircle, Mail, CalendarDays, MoveHorizontal, Plus } from 'lucide';
import { clinic, treatments, faqs } from './content.js';
import './styles.css';

const iconSet = { ArrowUpRight, ArrowRight, ArrowDown, ArrowUp, ShieldCheck, HeartHandshake, Microscope, Menu, X, Info, ScanLine, Scan, Layers, AlignHorizontalSpaceAround, Smile, Sparkles, UserRound, Phone, Clock3, Star, Check, MapPin, MessageCircle, Mail, CalendarDays, MoveHorizontal, Plus };
const hydrateIcons = () => createIcons({ icons: iconSet, attrs: { 'stroke-width': 1.5, 'aria-hidden': 'true' } });
const configured = value => typeof value === 'string' && value.trim() && !value.includes('[');
const safeWebUrl = value => { try { return /^https?:$/.test(new URL(value).protocol); } catch { return false; } };
let selectedTreatment = 0;

function selectTreatment(index) {
  selectedTreatment = index;
  const treatment = treatments[index];
  document.querySelector('#treatment-feature').innerHTML = `<div class="feature-top"><span>CARE IN FOCUS</span><i data-lucide="${treatment.icon}"></i></div><p class="feature-phrase">${treatment.note}</p><div class="feature-detail"><h3>${treatment.name}</h3><p>${treatment.description}</p><a href="[BOOKING_URL]" data-booking data-treatment="${index}" data-track="treatment-book" class="text-link">Book Consultation <i data-lucide="arrow-up-right"></i></a></div>`;
  document.querySelectorAll('.treatment-row').forEach((button, i) => button.setAttribute('aria-pressed', String(index === i)));
  hydrateIcons();
}
document.querySelector('#treatment-list').innerHTML = treatments.map((treatment, index) => `<button class="treatment-row" data-index="${index}" aria-pressed="${index === 0}" aria-controls="treatment-feature" ${index > 4 ? 'hidden' : ''}><i data-lucide="${treatment.icon}"></i><span>${treatment.name}<small>Explore Treatment</small></span><i data-lucide="arrow-up-right"></i></button>`).join('');
document.querySelectorAll('.treatment-row').forEach(button => button.addEventListener('click', () => selectTreatment(Number(button.dataset.index))));
document.querySelector('#all-treatments').addEventListener('click', event => {
  const button = event.currentTarget;
  const expanded = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(expanded));
  document.querySelectorAll('.treatment-row').forEach((row, i) => row.hidden = !expanded && i > 4);
  button.innerHTML = `${expanded ? 'Show Fewer Treatments' : 'View All Treatments'} <i data-lucide="${expanded ? 'arrow-up' : 'arrow-right'}"></i>`;
  if (!expanded && selectedTreatment > 4) selectTreatment(0);
  hydrateIcons();
});
selectTreatment(0);

const doctors = [
  ['Dr. Asha Menon', 'Endodontics & Restorative Care', 'BDS, MDS', 'Focused on clear explanations, careful treatment planning, and helping anxious patients feel at ease.', '/assets/doctor-asha.jpg'],
  ['Dr. Nikhil Thomas', 'Implant & Prosthetic Dentistry', 'BDS, MDS', 'Brings a detail-led approach to restoring comfort, function, and natural-looking smiles.', '/assets/doctor-nikhil.jpg'],
  ['Dr. Meera Nair', 'Orthodontics & Family Dentistry', 'BDS, MDS', 'Believes good dental experiences begin with listening, especially for children and first-time patients.', '/assets/doctor-meera.jpg'],
];
document.querySelector('#team-profiles').innerHTML = doctors.map((doctor, index) => `<article class="doctor"><figure class="portrait-placeholder portrait-${index + 1}"><img src="${doctor[4]}" alt="Portrait of ${doctor[0]}" width="720" height="900" loading="lazy" /><span class="portrait-number">0${index + 1}</span></figure><h3>${doctor[0]}</h3><p class="doctor-role">${doctor[1]}</p><p>${doctor[2]}</p><p class="doctor-bio">${doctor[3]}</p></article>`).join('');
const cases = [
  ['Conservative Smile Refinement', 'Uneven edges and small spaces affected smile confidence.', 'A plan using conservative restorative options after assessment.', 'A balanced, natural-looking direction developed around the patient’s preferences.', '/assets/align-before.jpg', '/assets/align-after.jpg'],
  ['Single-Tooth Restoration', 'A damaged tooth caused discomfort while chewing.', 'A diagnostic and restorative pathway focused on preserving healthy tooth structure.', 'Comfort and function reviewed through ongoing follow-up.', '/assets/crown-before.jpg', '/assets/crown-after.jpg'],
  ['Preventive Cleaning Journey', 'Surface staining and gum sensitivity made routine care feel overdue.', 'A preventive pathway centred on hygiene, guidance, and review.', 'A cleaner, calmer direction for ongoing oral health habits.', '/assets/cleaning-before.jpg', '/assets/cleaning-after.jpg'],
];
document.querySelector('#cases').innerHTML = cases.map((item, number) => `<article class="case"><div class="comparison" style="--position:50%"><div class="comparison-layer after"><img src="${item[5]}" alt="After image for case ${number + 1}" width="640" height="500" loading="lazy" /><span>AFTER</span></div><div class="comparison-layer before"><img src="${item[4]}" alt="Before image for case ${number + 1}" width="640" height="500" loading="lazy" /><span>BEFORE</span></div><div class="comparison-handle"><i data-lucide="move-horizontal"></i></div><input type="range" min="0" max="100" value="50" aria-label="Before and after comparison for case ${number + 1}" aria-valuetext="50% before image" /></div><div class="case-info"><p class="eyebrow">CASE 0${number + 1}</p><h3>${item[0]}</h3><dl><div><dt>Concern</dt><dd>${item[1]}</dd></div><div><dt>Approach</dt><dd>${item[2]}</dd></div><div><dt>Outcome</dt><dd>${item[3]}</dd></div></dl></div></article>`).join('');
document.querySelectorAll('.comparison input').forEach(range => range.addEventListener('input', () => {
  range.parentElement.style.setProperty('--position', `${range.value}%`);
  range.setAttribute('aria-valuetext', `${range.value}% before image`);
}));
const reviews = [
  ['The team explained every step calmly. I felt listened to, comfortable, and clear about what came next.', 'Ananya K.'],
  ['A thoughtful experience from the first conversation. The pace never felt rushed.', 'Rahul M.'],
  ['The clinic felt modern and welcoming, and the treatment plan was easy to understand.', 'Fathima S.'],
];
document.querySelector('#review-list').innerHTML = reviews.map(([quote, name]) => `<figure class="review"><span class="quote-mark" aria-hidden="true">“</span><blockquote>${quote}</blockquote><figcaption><span class="review-rule"></span> ${name}</figcaption></figure>`).join('');
document.querySelector('#faq-list').innerHTML = faqs.map(([question, answer]) => `<details><summary>${question}<i data-lucide="plus"></i></summary><div class="faq-answer"><p>${answer}</p></div></details>`).join('');
hydrateIcons();

const menu = document.querySelector('#mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() { menu.close(); }
menuToggle.addEventListener('click', () => { menu.showModal(); document.body.classList.add('menu-open'); menuToggle.setAttribute('aria-expanded', 'true'); });
document.querySelector('.menu-close').addEventListener('click', closeMenu);
menu.addEventListener('close', () => { document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.focus({ preventScroll: true }); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
const syncHeader = () => document.querySelector('#header').classList.toggle('scrolled', window.scrollY > 16);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const notification = document.querySelector('#notification');
function notify(message) { notification.querySelector('p').textContent = message; notification.hidden = false; }
notification.querySelector('button').addEventListener('click', () => notification.hidden = true);
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const tracking = link.dataset.track;
  if (tracking) window.dispatchEvent(new CustomEvent('amend:cta', { detail: { action: tracking, section: link.closest('section')?.id || 'navigation' } }));
  if (link.hasAttribute('data-booking')) {
    event.preventDefault();
    if (configured(clinic.bookingUrl) && safeWebUrl(clinic.bookingUrl)) { window.location.assign(clinic.bookingUrl); return; }
    if (link.dataset.treatment !== undefined) document.querySelector('#concern').value = treatments[Number(link.dataset.treatment)].concern;
    document.querySelector('#booking').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('#full-name').focus({ preventScroll: true });
  }
  if (link.dataset.contact) {
    event.preventDefault();
    const type = link.dataset.contact;
    const value = type === 'whatsapp' ? clinic.whatsappUrl : type === 'phone' ? clinic.phone : clinic.email;
    if (!configured(value)) { notify(`${value} is awaiting the clinic’s details. No contact link is connected yet.`); return; }
    if (type === 'whatsapp' && safeWebUrl(value)) window.open(value, '_blank', 'noopener,noreferrer');
    else if (type === 'phone') window.location.href = `tel:${value.replace(/[^+\d]/g, '')}`;
    else if (type === 'email') window.location.href = `mailto:${encodeURIComponent(value)}`;
  }
  if (link.dataset.placeholder) { event.preventDefault(); notify(`${link.dataset.placeholder} is awaiting the clinic’s confirmed link.`); }
});

const date = document.querySelector('#preferred-date');
const now = new Date();
date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
const form = document.querySelector('#booking-form');
const phoneInput = document.querySelector('#phone');
const nameInput = document.querySelector('#full-name');
phoneInput.addEventListener('input', () => {
  const digits = phoneInput.value.replace(/\D/g, '');
  phoneInput.setCustomValidity(digits.length >= 7 && digits.length <= 15 ? '' : 'Enter a phone number containing 7 to 15 digits.');
});
nameInput.addEventListener('input', () => nameInput.setCustomValidity(nameInput.value.trim() ? '' : 'Please enter your full name.'));
form.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.hidden = false;
  if (!configured(clinic.bookingEmail)) {
    status.textContent = 'Your request has not been sent yet. The booking email is not connected. Your entries remain here while you review this page.';
    status.focus({ preventScroll: true });
    status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    return;
  }
  const data = new FormData(form);
  const body = [...data.entries()].map(([key, value]) => `${key}: ${value}`).join('\n');
  window.location.href = `mailto:${encodeURIComponent(clinic.bookingEmail)}?subject=${encodeURIComponent('Consultation request - Amend Dental Clinic')}&body=${encodeURIComponent(body)}`;
  status.textContent = 'An email draft has been requested in your email app. Please send it there to contact the clinic.';
});

// Do not collect names, phone numbers, concerns, or form values in tracking events.
form.querySelector('[type="submit"]').addEventListener('click', () => window.dispatchEvent(new CustomEvent('amend:cta', { detail: { action: 'consultation-request', section: 'booking' } })));
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
if (configured(clinic.siteUrl) && safeWebUrl(clinic.siteUrl)) {
  const origin = clinic.siteUrl.replace(/\/$/, '');
  for (const [property, content] of [['og:url', origin], ['og:image', `${origin}/assets/amend-logo.png`]]) {
    const meta = document.createElement('meta'); meta.setAttribute('property', property); meta.content = content; document.head.append(meta);
  }
}

/* ===== Hero 3D parallax + particle field (added) ===== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  const fx = document.querySelector('#hero-fx');
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('in')));
  if (!hero || !fx || reduce) return;

  const layers = [...fx.querySelectorAll('.orb-layer')];
  let raf = 0, tx = 0, ty = 0, cx = 0, cy = 0;
  const apply = () => {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
    layers.forEach(layer => {
      const d = Number(layer.dataset.depth) || 40;
      const f = d / 100;
      layer.style.transform = `translate3d(${cx * f * 46}px,${cy * f * 46}px,0)`;
    });
    fx.style.transform = `rotateX(${cy * -5}deg) rotateY(${cx * 6}deg)`;
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(apply);
    else raf = 0;
  };
  const onMove = e => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (!raf) raf = requestAnimationFrame(apply);
  };
  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(apply); });

  // Lightweight particle constellation
  const canvas = document.querySelector('#hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2), dots = [], pointer = { x: -999, y: -999 };
  const NAVY = '23,58,115';
  const resize = () => {
    const r = hero.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(52, w / 26));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8
    }));
  };
  const tick = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of dots) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - pointer.x, dy = p.y - pointer.y, dist = Math.hypot(dx, dy);
      if (dist < 120) { p.x += dx / dist * 1.4; p.y += dy / dist * 1.4; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${NAVY},.5)`; ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 118) {
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${NAVY},${0.16 * (1 - d / 118)})`; ctx.lineWidth = 1; ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  };
  hero.addEventListener('pointermove', e => { const r = hero.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer.x = -999; pointer.y = -999; });
  const ro = new ResizeObserver(resize); ro.observe(hero);
  resize(); tick();
})();

