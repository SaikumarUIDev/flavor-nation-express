# Spice Nation premium restaurant website

## Direction
Build one responsive, cinematic scrolling website that follows the requested story sequence. The visual system will use charcoal, warm ivory, spice-saffron, muted earth, and restrained brass tones, pairing an editorial serif with a clean sans-serif. Food photography will carry the experience, supported by subtle handcrafted spice linework and restrained motion.

## Build
- Replace the blank home page with a reusable section-based React composition and sticky transparent-to-solid navigation.
- Generate a cohesive set of editorial food and dining photographs for the hero, signatures, biryani feature, experience, gallery, and final call-to-action.
- Add hero reveals, scroll-triggered section/image reveals, subtle parallax, number counters, category transitions, hover details, and reduced-motion fallbacks without adding a heavy animation dependency.
- Build interactive menu tabs with the supplied dishes, dietary markers, prices presented as representative restaurant pricing, mobile horizontal browsing, and smooth content transitions.
- Build the spice-trail horizontal story, signature dish layout, atmosphere section, masonry gallery with keyboard-accessible fullscreen lightbox, review carousel, statistics, location panel, and premium footer.
- Add a full-screen animated mobile menu, sticky mobile menu/order bar after the hero, mobile call button, and back-to-top control.
- Wire menu links to the menu section, phone actions to `tel:07013486961`, and directions to the supplied address in Google Maps. Since no official booking or ordering URL was supplied, Reserve will scroll to Contact and Order Online will open the menu rather than inventing an external destination.

## Content, accessibility, and discoverability
- Use only the supplied restaurant facts and review wording; do not invent opening hours, reviewer identities, social links, or claims.
- Add semantic landmarks, one H1, useful alt text, visible focus states, keyboard controls, touch-friendly sizing, lazy loading, and `prefers-reduced-motion` support.
- Add route-specific title, description, social metadata, canonical URL, and Restaurant structured data with the supplied address, cuisine, price range, rating, review count, and telephone. Omit unverified opening hours and menu URL.

## Verification
- Check the live page at desktop and mobile sizes for layout, overflow, interactions, lightbox controls, menu transitions, mobile navigation, and console errors.
- Confirm the generated images load, CTA destinations work, metadata renders, and reduced-motion behavior is respected.
