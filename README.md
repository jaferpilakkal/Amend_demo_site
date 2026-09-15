# Amend Dental Clinic

Responsive one-page dental website using Vite, semantic HTML, native CSS, Lucide icons and self-hosted Instrument Serif / DM Sans fonts.

## Local Development
`npm install` then `npm run dev`. Production build: `npm run build`.

## Content and Connections
- `src/content.js`: central booking destinations, treatment concepts and FAQs.
- `index.html`: page copy, contact placeholders, metadata and placeholder Dentist schema.
- The logo is the original supplied PNG, copied without alteration.
- The clinic image is a generated architectural concept, explicitly captioned as a placeholder. Replace with approved real clinic photography before launch.
- Treatment text and care philosophy are supplied editable concepts, not confirmed clinic claims.
- Doctors, testimonials, case details, before/after imagery, contacts and policies are marked placeholders. No clinical outcomes or reviews are simulated.
- Booking links use `[BOOKING_URL]`; in preview they navigate to the consultation form. Set `clinic.bookingUrl` to enable an external booking service.
- Until `[BOOKING_EMAIL]` is configured, submitting the form explicitly says nothing was sent. With an email configured, it opens a user-reviewed email draft; this is not a server submission or confirmed appointment.
- WhatsApp, phone and social placeholders show an honest connection notice. Replace both configuration and visible placeholder text with approved clinic data.
- No appointment slots or availability are invented. Date and time fields record preferences only.
- CTA tracking dispatches `amend:cta` custom browser events. Events never contain personal data. Connect a consent-appropriate analytics adapter separately.
- Replace schema placeholders and remove `noindex, nofollow` only after clinic approval and completing content. Add approved privacy terms and a reliable booking backend before public launch.

## Accessibility and Motion
Native dialog with Escape dismissal, visible focus, skip navigation, semantic landmarks, labelled form controls, keyboard-operable comparison sliders and accordions, reduced-motion support, and reserved image dimensions.

## Visual Reference
https://royaaleo.com/ was studied for general treatment discovery and booking flow. No branding, copy, patient data, images, or distinctive assets were copied.
