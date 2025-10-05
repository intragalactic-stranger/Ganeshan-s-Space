# Portfolio Customization Guide

This guide will help you customize your AI Engineer portfolio with your personal information, projects, and branding.

## 🎨 Color Scheme

The portfolio uses an AI-focused color scheme:
- **Primary Blue**: `#0E6BA8` (Neural Blue)
- **Secondary Purple**: `#8B5CF6` (Electric Purple)
- **Accent Cyan**: `#00d9ff` (Bright Cyan)

To change colors, update:
- `app/globals.css` - Search for color values
- `tailwind.config.ts` - Add custom color classes if needed

## 📝 Personal Information

### Update Your Details
Edit `/config/index.ts`:
```typescript
export const siteConfig: Metadata = {
  title: "Your Name | AI Engineer Portfolio",
  description: "Your custom description...",
  // ...
}
```

### Social Links & Contact
Edit `/constants/index.ts` - Update the `SOCIALS` constant:
```typescript
export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
  link: "https://www.linkedin.com/in/ganeshannainar/",
  },
  // Add more...
]
```

## 🚀 Adding Projects

Edit `/constants/index.ts` - Update the `PROJECTS` array:
```typescript
export const PROJECTS = [
  {
    title: "Your Project Name",
    description: "Detailed description with metrics...",
    image: "/projects/project-1.png", // Add image to public/projects/
    link: "#projects", // Or external link
    tags: ["Tag1", "Tag2", "Tag3"], // Technology tags
  },
]
```

### Project Images
1. Add project screenshots to `/public/projects/`
2. Recommended size: 800x450px (16:9 aspect ratio)
3. Formats: PNG, JPG, or WebP

## 🛠️ Skills Section

### Using Existing Icons
Available icons in `/public/skills/`:
- css.png, docker.png, express.png, figma.png
- firebase.png, framer.png, go.png, graphql.png
- html.png, js.png, mongodb.png, mui.png
- mysql.png, next.png, node.png, postgresql.png
- prisma.png, react.png, reactnative.png
- reactquery.png, redux.png, stripe.png
- tailwind.png, tauri.png, ts.png

### Adding Custom Skill Icons

1. **Find or Create Icons**:
   - Download from [SimpleIcons](https://simpleicons.org/)
   - Use [Iconify](https://icon-sets.iconify.design/)
   - Create custom 80x80px PNG files

2. **Add to Project**:
   - Place PNG files in `/public/skills/`
   - Name format: lowercase, e.g., `python.png`, `tensorflow.png`

3. **Update Constants**:
   Edit `/constants/index.ts`:
   ```typescript
   export const SKILL_DATA = [
     {
       skill_name: "Python",
       image: "python.png", // Your new icon
       width: 80,
       height: 80,
     },
   ]
   ```

### Recommended AI/ML Skill Icons to Add:
- `python.png` - Python programming
- `tensorflow.png` - TensorFlow
- `pytorch.png` - PyTorch
- `langchain.png` - LangChain
- `aws.png` - AWS Cloud
- `fastapi.png` - FastAPI
- `huggingface.png` - Hugging Face

## 🏆 Certifications

Edit `/constants/index.ts` - Update `CERTIFICATIONS`:
```typescript
export const CERTIFICATIONS = [
  {
    name: "Certification Name",
    issuer: "Issuing Organization",
    date: "Valid until Month Year",
    image: "/certifications/cert-name.png", // Optional
    credentialUrl: "https://credential-url.com",
  },
]
```

### Adding Certification Badges
1. Download badge images from issuing organizations
2. Place in `/public/certifications/`
3. Update the `image` field in constants

## 🎯 Achievements

Edit `/constants/index.ts` - Update `ACHIEVEMENTS`:
```typescript
export const ACHIEVEMENTS = [
  {
    title: "Achievement Title",
    description: "Brief description",
    year: "2024",
    icon: "🏆", // Emoji icon
  },
]
```

## 📝 Blog Posts

Edit `/constants/index.ts` - Update `BLOG_POSTS`:
```typescript
export const BLOG_POSTS = [
  {
    title: "Article Title",
    excerpt: "Brief summary...",
    date: "Oct 2024",
    readTime: "5 min read",
    image: "/blog/article-image.png",
    link: "https://medium.com/@your-username/article",
    tags: ["Tag1", "Tag2"],
  },
]
```

## 🎨 Logo Customization

The current logo uses a stylized "G" with gradient. To customize:

### Option 1: Change Letter
Edit `/components/main/navbar-new.tsx`:
```tsx
<span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0E6BA8] via-[#8B5CF6] to-[#00d9ff] animate-pulse">
  Y {/* Change to your initial */}
</span>
```

### Option 2: Use Custom Logo Image
1. Add your logo to `/public/logo.png`
2. Replace the logo code in navbar with:
```tsx
<Image
  src="/logo.png"
  alt="Logo"
  width={50}
  height={50}
  className="cursor-pointer"
/>
```

## 📄 Resume/CV

### Adding Download Resume Link
1. Add your PDF resume to `/public/resume/`
2. Update `/constants/index.ts`:
```typescript
export const LINKS = {
  resume: "/resume/Your_Name_Resume.pdf",
  // ...
}
```

3. The download link is already in the footer and hero CTAs

## 🌐 Navigation

Edit `/constants/index.ts` - Update `NAV_LINKS`:
```typescript
export const NAV_LINKS = [
  { title: "About", link: "#about-me" },
  { title: "Skills", link: "#skills" },
  // Add or remove sections
]
```

## 🎬 Background Videos

The portfolio uses background videos for visual effects:
- Hero section: `/public/videos/blackhole.webm`
- Skills section: `/public/videos/skills-bg.webm`
- Encryption section: `/public/videos/encryption-bg.webm`

To replace:
1. Create or find WebM format videos
2. Replace files in `/public/videos/`
3. Keep file names the same, or update component imports

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure Next.js settings in Netlify

### Custom Server
```bash
npm run build
npm run start
```

## 📱 Responsive Design

The portfolio is fully responsive. Test on:
- Mobile (375px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🎨 Advanced Customization

### Changing Animations
Edit `/lib/motion.ts` to adjust animation timing and effects.

### Adding New Sections
1. Create component in `/components/main/`
2. Import and add to `/app/page.tsx`
3. Add navigation link to constants

### Modifying Layout
- Main layout: `/app/layout.tsx`
- Page structure: `/app/page.tsx`
- Global styles: `/app/globals.css`

## 🐛 Troubleshooting

### Images Not Loading
- Check file paths in `/public/`
- Ensure correct file extensions
- Clear Next.js cache: `rm -rf .next`

### Build Errors
```bash
npm install --legacy-peer-deps
npm run build
```

### Port Already in Use
```bash
# Use different port
npx next dev -p 3001
```

## 📞 Need Help?

- Check Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

---

**Happy Customizing! 🚀**
