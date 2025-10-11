# Creative Portfolio

A production-ready React portfolio showcasing WebGL animations and interactive design components.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── BubbleMenu.tsx      # Animated navigation menu
│   ├── DarkVeil.tsx        # WebGL shader hero background
│   ├── FlyingPosters.tsx   # 3D floating project images
│   ├── ScrollFloat.tsx     # Text animation on scroll
│   ├── WorksReveal.tsx     # "Works" text reveal effect
│   └── LogoLoop.tsx        # Skills carousel
├── styles/
│   └── main.css            # Global styles
└── pages/
    └── Index.tsx           # Main portfolio page
public/
└── assets/
    └── placeholder-projects/  # Sample project images
```

## 🎨 Component Mapping

This project integrates the following uploaded components:

| Uploaded File | Integrated Component | Location |
|---------------|---------------------|-----------|
| `hero-dark-veil.txt` | `DarkVeil.tsx` | Hero section background |
| `bubble-menu.txt` | `BubbleMenu.tsx` | Navigation menu |
| `scroll-float.txt` | `ScrollFloat.tsx` | About & skills text animation |
| `flying-posters.txt` | `FlyingPosters.tsx` | Projects section |
| N/A (not provided) | `LogoLoop.tsx` | Skills carousel (custom implementation) |

## 🛠 Technology Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **OGL** - WebGL library for 3D graphics
- **GSAP** - Animation library
- **Framer Motion** - React animations

## 📦 Dependencies

Key packages used:
- `ogl` - WebGL rendering
- `gsap` - Advanced animations
- `framer-motion` - React-specific animations

## 🌐 Deployment

### Vercel
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

## 🎯 Features

- **WebGL Hero**: Shader-based animated background
- **3D Projects**: Flying poster gallery with WebGL
- **Smooth Animations**: GSAP-powered interactions
- **Responsive Design**: Mobile-first approach
- **Performance Optimized**: Lazy loading and efficient rendering
- **Accessible**: Semantic HTML and ARIA labels

## 📝 Customization

### Project Images
Replace images in `public/assets/placeholder-projects/` with your own work.

### Colors & Styling
Modify `src/styles/main.css` for global styling changes.

### Content
Update text content in `src/pages/Index.tsx`.

## 🔧 Build Configuration

The project uses Vite with the following optimizations:
- TypeScript strict mode
- CSS optimization
- Asset optimization
- Production builds with tree shaking

## 📄 License

MIT License - feel free to use this portfolio template for your own projects.

---

Built with uploaded component implementations as canonical sources, maintaining original behavior and animations.