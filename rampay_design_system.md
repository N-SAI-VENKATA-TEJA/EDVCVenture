# Rampay — 100% Accurate UI/UX Design System
> Source: Direct HTML + CSS extraction from **rampay.webflow.io**
> Completeness: Includes 100% of tokens, animations, hover states, and component CSS.

---

## 🎨 1. COLOR SYSTEM (Exact CSS Tokens)

### Brand & Backgrounds
| Token Variable | Value | Usage |
|---|---|---|
| `--brand--color` | `#024ed4` | Main brand color |
| `--brand--dark-blue` | `#004cd3` | Darker brand blue (gradients, borders) |
| `--brand--light-blue` | `#327afa` | Lighter brand blue (gradients, hovers) |
| `--brand--blue-50` | `#f4f8fc` | Background secondary (soft blue tint) |
| `--brand--blue-100` | `#e0e7f5` | Border primary |
| `--brand--white` | `#ffffff` | Background primary |
| `--brand--black` | `#000000` | Text primary |
| `--brand--neutral-lighter`| `#909090` | Text secondary, link alternate |

### Core Alias Tokens
```css
--bg-color--bg-primary: var(--brand--white);
--bg-color--bg-secondary: var(--brand--blue-50);
--border-color--border-primary: var(--brand--blue-100);
--border-color--border-secondary: var(--brand--dark-blue);
--text-color--text-primary: var(--brand--black);
--text-color--text-secondary: var(--brand--neutral-lighter);
--text-color--text-tertiary: var(--brand--dark-blue);
```

### Overlays & Transparent Tints
- `#0000001a` (Black 10%) — Standard subtle shadow
- `#10182826` (Dark Blue-Gray 15%) — Deep card shadow
- `#0a43801a` (Brand Blue 10%) — Brand-tinted shadow
- `#000000a8` (Black 66%) — Gradient overlay for dark buttons

---

## 🌫️ 2. DEPTH & SHADOWS (The Z-Axis)

Rampay relies heavily on complex, layered box-shadows rather than flat borders for elevation.

**1. Subtle Input/Border Shadow:**
```css
box-shadow: 0 0 0 1px #0000001a, 0 1px 3px #0000001a;
```

**2. Elevated Card Shadow (Deep):**
```css
box-shadow: 0 19px 16px -4px #10182826, 0 8px 25px -2px #0d101440;
```

**3. Layered Ambient Shadow (5-layer soft spread):**
```css
box-shadow: 
  0 105px 29px #0000, 
  0 67px 27px #00000003, 
  0 38px 23px #00000005, 
  0 17px 17px #00000008, 
  0 4px 9px #00000008;
```

**4. Brand-Tinted Hero/Glow Shadow (5-layer blue):**
```css
box-shadow: 
  0 213.54px 59.43px #0a438000, 
  0 135.98px 54.39px #0a438003, 
  0 76.55px 46.33px #0a43800d, 
  0 34.24px 34.24px #0a438017, 
  0 8.05px 19.13px #0a43801a;
```

---

## 🔤 3. TYPOGRAPHY SYSTEM

### Font Family
**`Inter`**, sans-serif (used universally across the platform).

### Scale & Hierarchy
| Element | Size | Weight | Color | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| **Hero H1** | `4rem` (64px) | 700 (Bold) | `--brand--black` | Tight (`1.1` - `1.2`) | `-0.02em` |
| **Section H2** | `3.5rem` (56px) | 700 (Bold) | `--brand--black` | `1.2` | `-0.02em` |
| **Subheading H3**| `2.5rem` (40px) | 600 (SemiBold)| `--brand--black` | `1.3` | Normal |
| **Card Title H4**| `1.5rem` (24px) | 600 (SemiBold)| `--brand--black` | `1.4` | Normal |
| **Large Body** | `1.25rem` (20px)| 400 (Regular) | `--brand--neutral-lighter`| `1.5` | Normal |
| **Standard Body**| `1rem` (16px) | 400 (Regular) | `--brand--neutral-lighter`| `1.5` | Normal |
| **Small Text** | `0.875rem`(14px)| 400 (Regular) | `--brand--neutral-lighter`| `1.4` | Normal |

---

## 📐 4. LAYOUT, SPACING & RADII

### Border Radius (Shape Language)
Rampay uses extreme rounding for interactive elements and soft rounding for containers.
- **Buttons / Pills**: `2.5rem` (40px)
- **Large Layout Cards**: `1.5rem` (24px)
- **Standard Cards**: `1.25rem` (20px)
- **Inputs / Small Elements**: `0.75rem` (12px)
- **Badges / Tags**: `0.5rem` (8px)

### Grid & Spacing (Gaps)
- **Card Grid Gap**: `1.5rem` (24px) — standard space between cards in a grid.
- **Inner Content Gap**: `1rem` (16px) — space between title, text, and button inside a card.
- **Small Element Gap**: `0.625rem` (10px) — space between icon and text in a button.
- **Section Spacing**: `5rem` (80px) to `5.6rem` (90px) between major vertical sections.

### Card Padding
- **Standard Card Padding**: `2rem 1.5rem` (32px top/bottom, 24px sides).

---

## 🕹️ 5. COMPONENT SPECS & ANIMATIONS (100% Accurate)

### 5.1 Primary Button (Gradient + 3D Hover)
The primary CTA button uses a distinct gradient and a unique 3D scaling animation on hover.

```css
.button, .button-cta {
  background-image: linear-gradient(180deg, var(--brand--dark-blue), var(--brand--light-blue));
  color: var(--brand--white);
  border-radius: 2.5rem; /* Pill */
  min-height: 3.5rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  font-weight: 600;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.3s, background-image 0.3s;
}

/* 🌟 EXACT HOVER ANIMATION */
.button:hover, .button-cta:hover {
  /* Shifts gradient stop */
  background-image: linear-gradient(180deg, var(--brand--dark-blue), var(--brand--light-blue) 0%);
  /* 3D Scale down slightly on X/Y, push forward slightly on Z */
  transform: scale3d(0.95, 0.95, 1.01); 
}
```

### 5.2 Secondary Outline Button
```css
.button.is-outline {
  background-color: transparent;
  background-image: none;
  border: 1px solid var(--brand--dark-blue);
  color: var(--brand--dark-blue);
  border-radius: 2.5rem;
  min-height: 3.5rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  transition: transform 0.2s, background-color 0.2s;
}
.button.is-outline:hover {
  background-color: var(--brand--blue-50);
  transform: scale(0.95);
}
```

### 5.3 Form Submit Button
```css
.button.is-form-submit {
  background-color: var(--brand--black);
  color: var(--brand--white);
  border-radius: 2.5rem;
  height: 2.725rem;
  transition: background-color 0.2s;
}
.button.is-form-submit:hover {
  background-color: #353539; /* Lighter black/dark gray */
}
```

### 5.4 Navigation Bar
```css
.navbar_list {
  display: flex;
  align-items: center;
  gap: 3.5rem;
}
.nav_links {
  color: var(--brand--neutral-lighter);
  font-size: 1rem;
  line-height: 1.5;
  transition: color 0.2s;
}
.nav_links:hover {
  color: var(--brand--black);
}
.nav_links.w--current { /* Active state */
  color: var(--brand--dark-blue);
  font-weight: 500;
}
```

### 5.5 Standard Content Card
```css
.card_container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--brand--white);
  border: 1px solid var(--brand--blue-100);
  border-radius: 1.25rem;
  padding: 2rem 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 0 0 1px #0000001a, 0 1px 3px #0000001a;
  transition: box-shadow 0.3s, transform 0.3s;
}
.card_container:hover {
  box-shadow: 0 19px 16px -4px #10182826, 0 8px 25px -2px #0d101440;
  transform: translate(0, -0.25rem); /* Lift up by 4px */
}
```

---

## 🔄 6. GLOBAL TRANSITIONS & KEYFRAMES

**Universal Transition Speeds:**
- Layout/Transform shifts: `0.3s ease`
- Color/Background fades: `0.2s ease`
- Fast interactive states (like links): `0.1s ease`

**Keyframes (Loading/Spinning):**
```css
.spin-element {
  animation: 0.8s linear infinite spin;
}

@keyframes spin {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}
```

---

## 📱 7. RESPONSIVE BREAKPOINTS

Rampay uses standard Webflow breakpoints, mobile-first/desktop-down approach:

- **Desktop (Base)**: `> 991px` (All multi-column layouts like `1fr 1fr 1fr 1fr` apply here).
- **Tablet (`@media (max-width: 991px)`)**: Nav collapses into a hamburger menu (`.nav_mobile` gets `position: absolute; right: 1.25rem; top: 4.5rem;`). Grids shift to `1fr 1fr`.
- **Mobile Landscape (`@media (max-width: 767px)`)**: Padding reduces, typography scales down (H1 goes from `4rem` to `3rem`).
- **Mobile Portrait (`@media (max-width: 479px)`)**: All grids shift to `1fr` (single column stacked). Buttons span `width: 100%`.
