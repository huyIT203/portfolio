# 💼 Portfolio Website

Modern, responsive portfolio website showcasing my projects and skills as a Flutter Mobile Developer.

## 🚀 Features

- ✨ Modern, clean design with smooth animations
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- 🎨 Bright, vibrant color scheme
- 🌊 3D background animations (Three.js)
- ⚡ Smooth GSAP animations and transitions
- 🎯 Interactive skill pages
- 📸 Project showcases with image carousels
- 📄 CV download functionality

## 📁 Structure

```
portfolio/
├── index.html              # Main homepage
├── style.css              # Main stylesheet
├── script.js              # Three.js & GSAP animations
├── common-animations.js   # Shared animations
├── project-page.css       # Project detail page styles
├── project-carousel.js    # Carousel functionality
├── skills/                # Individual skill pages
│   ├── flutter.html
│   ├── dart.html
│   └── ...
├── image/                 # Images and assets
│   ├── project_logo/
│   └── project_image/
├── project-mixs.html      # Mixs project details
├── project-sparkly.html   # Sparkly project details
└── PhamQuangHuy_FlutterMobileDeveloper.pdf
```

## 🛠️ Technologies

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- JavaScript (Vanilla)
- Three.js (3D animations)
- GSAP (Animations)
- Font Awesome (Icons)
- Google Fonts (Typography)

## 🌐 Live Demo

Deployed on: [GitHub Pages / Netlify / Vercel]

## 📦 Local Development

1. Clone the repository:
```bash
git clone https://github.com/huyIT203/portfolio.git
cd portfolio
```

2. Open `index.html` in your browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

3. Visit `http://localhost:8000`

## 📝 Content

- **About Me**: Personal introduction and education
- **Skills**: Detailed pages for each technology/tool
- **Projects**: Showcase of Mixs and Sparkly projects
- **Fun Facts**: Personal hobbies and interests
- **Contact**: Social media and contact information

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --bg-primary: #0F172A;
    --accent-primary: #818CF8;
    /* ... */
}
```

### Content
- Update `index.html` for main content
- Modify skill pages in `skills/` folder
- Update project details in `project-*.html` files

## 📄 License

© 2024 Pham Quang Huy. All rights reserved.

## 🔗 Links

- GitHub: [@huyIT203](https://github.com/huyIT203)
- LinkedIn: [Phạm Quang Huy](https://www.linkedin.com/in/ph%E1%BA%A1mquanghuy/)
- Email: [Your Email]

---

**Note**: See [DEPLOY.md](./DEPLOY.md) for deployment instructions.

