<div align="center">

<br/>

```
 ██╗   ██╗██╗███████╗██╗    ██╗████████╗██╗   ██╗██████╗ ███████╗
 ██║   ██║██║██╔════╝██║    ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
 ██║   ██║██║█████╗  ██║ █╗ ██║   ██║   ██║   ██║██████╔╝█████╗  
 ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║   ██║   ██║   ██║██╔══██╗██╔══╝  
  ╚████╔╝ ██║███████╗╚███╔███╔╝   ██║   ╚██████╔╝██████╔╝███████╗
   ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝    ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝
```

### A modern, fully-featured YouTube clone UI — built with zero frameworks.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Frameworks](https://img.shields.io/badge/No%20Frameworks-00C853?style=for-the-badge&logo=checkmarx&logoColor=white)
![100DaysOfCode](https://img.shields.io/badge/100DaysOfCode-Day%204-FF0033?style=for-the-badge)

<br/>

</div>

---

## 📌 Overview

**ViewTube** is a production-grade YouTube clone UI built entirely with **vanilla HTML, CSS, and JavaScript** — no React, no Vue, no Tailwind, no libraries of any kind.

Every pixel, interaction, animation, and layout was handcrafted to replicate the YouTube experience, while pushing the limits of what's possible with pure web fundamentals.

> Built as part of my **#100DaysOfCode** challenge to master frontend fundamentals before moving into React & full-stack development.

---

## ✨ Features

### 🎨 UI & Design
- **Dark mode** (default) + **Light mode** toggle with smooth transitions
- **Glassmorphism navbar** with `backdrop-filter` blur effect
- **16 unique hand-crafted SVG thumbnails** — each themed to a content category (space, gaming, food, code, AI, travel, finance and more)
- Hover scale & lift animations on video cards
- **Skeleton loading screens** that shimmer while content loads
- Custom scrollbars styled with CSS
- Fully responsive across mobile, tablet & desktop

### 📐 Layout
| Section | Details |
|---|---|
| **Navbar** | Logo, search bar with suggestions, voice icon, upload button, notifications, avatar |
| **Sidebar** | Collapsible with smooth animation, nav links, subscription list, live channel indicator |
| **Video Grid** | Auto-fill responsive grid with 16:9 thumbnail cards |
| **Category Bar** | Sticky filter bar — All, Music, Gaming, News, Tech, Sports, Cooking, Education, Travel, Comedy |
| **Video Player** | Full player page with controls, progress bar, volume, fullscreen |
| **Suggested Sidebar** | Right-rail suggested video list (desktop) |
| **Comments** | Fully interactive comments section — post new comments live |

### ⚡ Interactions & Features
- 🔍 **Search** with live suggestions dropdown and filter by query
- 👍 **Like / Dislike** with animated feedback
- 🔔 **Subscribe / Unsubscribe** toggle
- 📺 **Mini player** — picture-in-picture style, bottom-right corner
- 📱 **Shorts UI** — vertical scroll snap, just like YouTube Shorts
- 🔑 **Keyboard shortcuts** — full list below
- 🪟 **Login modal** with email/password + Google sign-in UI
- 🍞 **Toast notifications** for all user actions
- 🧩 **Modular JS** — clean state management, event delegation, no global pollution

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `K` | Play / Pause |
| `M` | Mute / Unmute |
| `F` | Toggle Fullscreen |
| `I` | Open Mini Player |
| `T` | Toggle Dark / Light Mode |
| `/` | Focus Search Bar |
| `?` | Show Shortcuts Panel |
| `ESC` | Close Modal / Go Back |

---

## 🗂️ Project Structure

```
viewtube/
│
├── index.html        # Full semantic HTML — all pages & modals
├── style.css         # ~800 lines — CSS variables, dark/light themes,
│                     # responsive layout, animations, components
└── app.js            # ~1600 lines — data, state, DOM rendering,
                      # event handling, player logic, SVG thumbnails
```

### Architecture Highlights

```
app.js
 ├── DUMMY DATA        → Channels, video titles, 16 SVG thumbnail designs
 ├── STATE             → Single source of truth object
 ├── DOM REFS          → All element references in one place
 ├── UTILS             → Toast, navigation, page transitions
 ├── THEME             → Dark/light toggle
 ├── SIDEBAR           → Collapse/expand + mobile overlay
 ├── VIDEO GRID        → Render, skeleton loader, category filter
 ├── VIDEO PLAYER      → Open video, fake progress, play/pause
 ├── COMMENTS          → Render + live post
 ├── SUGGESTED         → Dynamic sidebar generation
 ├── SHORTS            → Vertical scroll UI
 ├── SEARCH            → Suggestions + filter
 ├── MINI PLAYER       → PIP-style floating player
 ├── MODAL             → Login form + Google UI
 └── KEYBOARD          → Global shortcut handler
```

---

## 🖼️ SVG Thumbnail Gallery

All 16 thumbnails are **fully inline SVGs** — no image files needed.

| # | Theme | Scene |
|---|-------|-------|
| 0 | 🌑 Space / Black Hole | Radial glow, accretion disc, star field |
| 1 | 💻 GPU / Circuit Board | PCB traces, chip with pins, neon blue |
| 2 | 🍽️ Food / Cooking | Plated dish, fork, animated steam |
| 3 | 🎮 Gaming | Full controller with ABXY buttons, tron grid |
| 4 | 💰 Challenge / MrBeast | $1 vs $100K stacked bills, red energy |
| 5 | 🔬 Science | DNA helix + atom with electron orbits |
| 6 | 🌄 Travel | Sunset mountain landscape, reflection |
| 7 | 👨‍💻 Programming | Syntax-highlighted code editor, blinking cursor |
| 8 | 🧠 AI / Neural Net | Glowing node layers, active connections |
| 9 | 📈 Finance | Live stock chart with uptrend fill |
| 10 | 📱 Tech Review | Two phones side-by-side with VS badge |
| 11 | 🎬 Documentary | Globe with film-strip border, sepia tone |
| 12 | ⛏️ Minecraft | Pixel-art Creeper, blocky sky & terrain |
| 13 | 🏠 Smart Home | Glowing house with WiFi + device icons |
| 14 | 📲 Social Media | Phone screen, app grid, like explosions |
| 15 | 🌐 Internet / Network | Globe with animated data packet nodes |

---

## 🚀 Getting Started

No build steps. No installs. No dependencies.

```bash
# 1. Clone the repo
git clone https://github.com/Abdulkalam143/viewtube.git

# 2. Open in browser
cd viewtube
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or just **drag `index.html` into any browser** — it works instantly.

> ⚠️ Keep all three files (`index.html`, `style.css`, `app.js`) in the same folder.

---

## 🧠 What I Learned

Building this project from scratch taught me things that no tutorial could — here's what stood out:

- **CSS architecture at scale** — using CSS custom properties (`--variables`) for theming made dark/light mode trivial to implement
- **SVG as a design tool** — drawing 16 themed thumbnails entirely in SVG deepened my understanding of paths, gradients, transforms, and even SVG animations
- **DOM performance** — batch-rendering cards with `innerHTML` vs. individual `appendChild` calls, and why it matters at scale
- **State management without a framework** — a single `state` object + pure functions is surprisingly powerful and maintainable
- **Event delegation** — attaching one listener to a parent vs. hundreds of listeners on children
- **Responsive design from first principles** — building a grid that genuinely works from 320px to 1440px without a CSS framework

---

## 🔮 What's Next

This is a frontend-only UI. Here's what I'm planning to build on top of it:

- [ ] Convert to a **React + TypeScript** version (next big project)
- [ ] Add a **Node.js + Express backend** with real video metadata
- [ ] Integrate **YouTube Data API v3** for real video content
- [ ] Add **user authentication** with JWT
- [ ] **Deploy** on Vercel / Netlify

---

## 👤 Author

**Shaik Abdul Kalam**
Frontend Developer · #100DaysOfCode

[![GitHub](https://img.shields.io/badge/GitHub-Abdulkalam143-181717?style=flat-square&logo=github)](https://github.com/Abdulkalam143)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**⭐ If you found this useful, please star the repo — it helps a lot!**

*Built with ❤️ and zero frameworks*

</div>
