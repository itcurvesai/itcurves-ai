# Project: Nissan GT-R Test Drive Reservation Website

## Objective
Build a modern, visually stunning, and fully responsive website for showcasing the Nissan GT-R in RED color. The website should focus on converting visitors into test drive reservations.

---

## Core Requirements

### 1. Design & UI
- Create a **premium, professional automotive theme**
- Color palette:
  - Primary: Red (#C00000 or similar)
  - Secondary: Black, Dark Grey
  - Accent: White
- Typography:
  - Bold, modern fonts (e.g., Poppins, Montserrat)
- UI should feel like a **luxury car landing page**

---

### 2. Section 1 — Title Section (Hero, MOST IMPORTANT)
- **No video background** — pure black with subtle red ambient glow
- Centred layout — **not** a 25/75 split, **not** a left-to-right animation
- Headline: **"The New Experience BORN"** (Montserrat 900, large centred display)
  - Line 1: "The New Experience" — white
  - Line 2: "BORN" — red, wide letter-spacing, red glow shadow
- Subtext: "Reserve Your Test Drive Today"
- CTA Buttons: horizontal row, centred, never overlapping any section
  - "Book Test Drive" (red solid)
  - "View Specs ↓" (ghost outline)
- Reveal: **fade-up** stagger (not left-to-right), fires 200 ms after page load
- Scroll cue centred at bottom

---

### 2b. Section 2 — Video Section (Scroll-Triggered, Full-Screen)
- **Immediately after** the title section, before Stats Band
- `100vh` full-screen video — first video the user sees on scroll
- **Clip-path reveal**: collapses to thin centre bar → expands full-screen on scroll-in
- **Cinematic zoom-out**: video `scale(1.1)` → `scale(1)` as clip opens
- **Seamless loop**: `vid.pause()` on exit (no reset) → resumes mid-loop on re-entry
- **Re-triggers** every time section enters view (scroll up or down)
- Text ("Engineered to Dominate") fades up with 0.65 s delay
- Red corner bracket lines fade in after 1 s
- `prefers-reduced-motion` skips animation, video still plays

---

### 3. Car Showcase Section
- Display **Red Nissan GT-R**
- Include:
  - High-quality image
  - Specs:
    - Engine
    - Horsepower
    - 0-60 mph
    - Top Speed
- Add subtle hover animations

---

### 4. Reservation Section (Conversion Focus)
- Clean, modern form:
  - Name
  - Email
  - Phone
  - Preferred Date
  - Preferred Time
- CTA: "Reserve Your Seat"
- Add validation + success message

---

### 5. Features Section
- Highlight:
  - Performance
  - Design
  - Technology
- Use icons + short descriptions

---

### 6. Footer
- Contact details
- Social links
- Minimal and elegant design

---

## Technical Requirements

### 1. Stack
- Pure:
  - HTML5
  - CSS3
  - Vanilla JavaScript
- No frameworks unless necessary

---

### 2. Responsiveness
- Must work perfectly on:
  - Mobile phones
  - Tablets
  - Desktop browsers
- Use:
  - Flexbox / CSS Grid
  - Media Queries

Breakpoints:
- Mobile: < 768px
- Tablet: 768px – 1024px
- Desktop: > 1024px

---

### 3. CSS Requirements
- Write **complete CSS**
- Include:
  - Animations (hover, transitions)
  - Responsive layout
  - Clean spacing system
- Use:
  - Variables for colors
  - Smooth transitions

---

### 4. Video Implementation
- Use HTML5 `<video>`:
  - Autoplay
  - Muted
  - Loop
  - Cover full screen
- Add fallback image

---

### 5. Performance
- Optimize:
  - Images
  - Video loading
- Use lazy loading where possible

---

### 6. Accessibility
- Proper labels for forms
- Alt text for images
- Good contrast

---

## Output Requirements

- Provide:
  1. `index.html`
  2. `styles.css`
  3. `script.js`
- Code should be:
  - Clean
  - Well commented
  - Production-ready

---

## Extra Enhancements (if possible)
- Smooth scrolling
- Sticky navigation bar
- Subtle parallax effect
- Button hover glow effect (red accent)

---

## Tone & Feel
- Premium
- Fast
- Powerful
- Automotive luxury experience

---

## Important Notes
- Do NOT skip CSS — write full styling
- Ensure mobile-first design
- Keep layout clean and conversion-focused
- Prioritize user experience for booking a test drive
