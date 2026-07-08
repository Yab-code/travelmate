---
name: TravelMate Narrative
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424656'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#006e2a'
  on-secondary: '#ffffff'
  secondary-container: '#5cfd80'
  on-secondary-container: '#00732c'
  tertiary: '#a33200'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4204'
  on-tertiary-container: '#fff6f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#69ff87'
  secondary-fixed-dim: '#3ce36a'
  on-secondary-fixed: '#002108'
  on-secondary-fixed-variant: '#00531e'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832600'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  booking-blue: '#003580'
  accent-yellow: '#FFB700'
  surface-gray: '#F8FAFC'
  border-subtle: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
---

## Brand & Style

The design system is engineered for a premium travel and event planning experience. It strikes a balance between the high-utility efficiency of a modern SaaS dashboard and the aspirational, inviting nature of travel photography. The brand personality is professional, reliable, and optimistic, ensuring users feel both organized and inspired.

The design style follows a **Modern Corporate** aesthetic with a strong emphasis on **SaaS-inspired clarity**. It utilizes generous whitespace, high-fidelity travel imagery, and subtle layering to create a sense of openness. The interface remains unobtrusive to allow destination content to shine, while maintaining a rigorous systematic structure for complex planning tools.

## Colors

The palette is anchored by "Travel Blue" (#0066FF), a vibrant and modern primary shade that communicates trust and digital fluency. "Nature Green" (#00C853) is used strategically for success states, confirmation actions, and "eco-friendly" travel indicators.

The neutral system relies on a soft Slate gray scale. The background is a crisp white (#FFFFFF), with a very light "Surface Gray" (#F8FAFC) used to differentiate background sections from card elements. The "Booking Blue" from the reference material is reserved for high-contrast footers or deep-navigational elements to provide a sense of heritage and stability.

## Typography

This design system uses **Inter** exclusively to ensure a systematic, utilitarian feel that remains highly readable across all platforms. The typographic hierarchy is designed to handle dense information (like itineraries and flight details) while providing high-impact headlines for destination marketing.

- **Display & Headlines:** Use tight letter-spacing and bold weights to create a strong visual anchor.
- **Body Text:** Standard weight for maximum legibility. Use `body-md` for general content and `body-sm` for secondary metadata.
- **Labels:** Used for buttons, tags, and small navigation items. All-caps is permissible for `label-sm` to create distinction in UI density.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width of 1280px for desktop screens to prevent line lengths from becoming unreadable. A 12-column system is used for desktop/tablet, collapsing to a single column on mobile.

Spacing is based on an 8px base unit. 
- **Desktop:** 40px outer margins and 24px gutters.
- **Mobile:** 16px outer margins and 16px gutters.

Large vertical sections should be separated by 80px to 120px to maintain the "premium" feel and allow the layout to breathe.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layers** and **Ambient Shadows**. 

1.  **Level 0 (Base):** The main background using #FFFFFF or #F8FAFC.
2.  **Level 1 (Cards):** Raised using a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)).
3.  **Level 2 (Interactive):** Hover states on cards or dropdowns use a more pronounced shadow (0px 8px 30px rgba(0, 0, 0, 0.08)).
4.  **Level 3 (Modals/Overlays):** High elevation with a backdrop blur (12px) on the obscured content to maintain focus.

Avoid heavy borders; use subtle #E2E8F0 outlines for UI elements on light backgrounds to define boundaries without adding visual noise.

## Shapes

The design system utilizes a **Rounded** shape language to appear friendly and approachable. 

- **Cards & Major Containers:** 16px (`rounded-lg`) is the standard for travel cards, image containers, and modals.
- **Buttons & Inputs:** 8px (`rounded-md`) for a balanced, professional look.
- **Chips & Tags:** Fully pill-shaped (`rounded-full`) to distinguish them from interactive buttons.

This consistent rounding helps soften the technical nature of the SaaS dashboard components.

## Components

- **Buttons:** Primary buttons use the Travel Blue background with white text. Secondary buttons use a subtle gray stroke or a light blue ghost style.
- **Cards:** Always feature a 16px corner radius. Image-heavy cards (destinations) should use a subtle gradient overlay at the bottom to ensure white typography is legible over imagery.
- **Inputs:** High-contrast 8px rounded fields with 1px border. Focus states use a 2px Travel Blue glow.
- **Chips:** Used for "Tags" (e.g., "Free Cancellation", "Top Rated"). Use light tinted backgrounds with darkened text for better accessibility.
- **Lists:** Clean, border-less lists with 16px padding and horizontal dividers in #E2E8F0.
- **Specialty Components:** 
    - **Date Pickers:** Should be large and touch-friendly, mirroring the clean aesthetic of modern booking platforms.
    - **Progress Steppers:** Use Nature Green for completed steps in the planning process to encourage user momentum.