# Inside Out Portfolio — Control Center

An interactive portfolio inspired by *Inside Out*'s Personality Islands. The
landing page is a Control Center where a chibi character (back view) walks
toward the window your cursor approaches. Click a glowing window to fly
through to its island.

## Design system

Built with the **Apple-anchored DESIGN.md** from
[Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md) as the
foundation for UI chrome:

- **Typography:** Inter (SF Pro substitute), 17 px body, negative letter
  spacing on display sizes.
- **Color:** Single Action Blue (#0066cc) for every interactive element.
  Light canvas (#fff), parchment (#f5f5f7), and near-black tile
  (#272729) alternate as the section divider.
- **Buttons:** Pill primary, ghost pill secondary, `scale(0.95)` press.
- **Elevation:** No shadows on chrome. The single product shadow
  (`3px 5px 30px rgba(0,0,0,0.22)`) is reserved for the scene art and
  island renders.
- **Radii:** 0 (full-bleed tiles), 8 px utility, 18 px utility cards,
  pill CTAs.

The whimsical pastel scene is the "product photography" — quiet UI sits
around it.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- SVG-based scene & character art (no PNG dependencies)

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Routes

| Path        | Page                                       |
| ----------- | ------------------------------------------ |
| `/`         | Control Center landing (cursor-driven)     |
| `/work`     | Work Island — case study gallery popup     |
| `/me`       | Me Island — about / bio popup              |
| `/connect`  | Connect Island — contact form popup        |

## Project structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Control Center landing
│   ├── work/page.tsx
│   ├── me/page.tsx
│   └── connect/page.tsx
├── components/
│   ├── ControlCenter.tsx     # Cursor → character, window glow, fly-through
│   ├── CustomCursor.tsx
│   ├── GlobalNav.tsx
│   ├── SubNav.tsx
│   ├── Footer.tsx
│   ├── IslandHero.tsx
│   ├── CaseStudyGallery.tsx
│   ├── AboutPopup.tsx
│   ├── ContactPopup.tsx
│   └── art/
│       ├── ControlRoom.tsx
│       ├── CharacterBack.tsx
│       ├── WorkIsland.tsx
│       ├── MeIsland.tsx
│       └── ConnectIsland.tsx
├── data/caseStudies.ts
└── styles/globals.css
```
