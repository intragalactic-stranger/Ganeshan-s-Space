# Quick Asset Setup Guide

## 🎯 Priority Assets to Add

### 1. Skill Icons (15 minutes)
Download these skill icons and add to `/public/skills/`:

**AI/ML Stack:**
- `python.png` - [Download from SimpleIcons](https://simpleicons.org/icons/python.svg)
- `tensorflow.png` - [Download from SimpleIcons](https://simpleicons.org/icons/tensorflow.svg)
- `pytorch.png` - [Download from SimpleIcons](https://simpleicons.org/icons/pytorch.svg)
- `langchain.png` - Search "LangChain logo PNG" or use text-based icon

**Cloud & Tools:**
- `aws.png` - [AWS logo](https://simpleicons.org/icons/amazonaws.svg)
- `gcp.png` - [Google Cloud logo](https://simpleicons.org/icons/googlecloud.svg)
- `fastapi.png` - [FastAPI logo](https://simpleicons.org/icons/fastapi.svg)
- `streamlit.png` - [Streamlit logo](https://simpleicons.org/icons/streamlit.svg)

**How to Convert SVG to PNG:**
1. Open SVG in browser
2. Take screenshot or use online converter: https://cloudconvert.com/svg-to-png
3. Resize to 80x80px
4. Save to `/public/skills/`

**Or use this quick method:**
```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Convert SVG to PNG
convert input.svg -resize 80x80 output.png
```

### 2. Project Screenshots (30 minutes)
Create/capture screenshots for your projects:

**Required Files:**
- `/public/projects/project-1.png` - GenAI-In-A-Box Framework
- `/public/projects/project-2.png` - Insurance Agent
- `/public/projects/project-3.png` - Hospitality Agent

**Guidelines:**
- **Size**: 800x450px (16:9 aspect ratio)
- **Format**: PNG or JPG
- **Content**: 
  - Screenshots of running applications
  - Architecture diagrams
  - Dashboard/UI views
  - Or create branded project cards

**Quick Creation Tools:**
- [Canva](https://www.canva.com/) - Free templates
- [Figma](https://www.figma.com/) - Design mockups
- Screenshot existing demos with Cmd+Shift+4 (Mac)

**Placeholder Template:**
If you don't have screenshots yet, create simple placeholders:
- Background: Dark gradient (#030014 to #0E6BA8)
- Text: Project name + key technologies
- Icon: Relevant emoji or simple graphic

### 3. Resume PDF (5 minutes)
Add your resume to the project:

```bash
# Create folder
mkdir -p public/resume

# Copy your resume
cp ~/path/to/your/resume.pdf public/resume/Ganeshan_Arumuganainar_Resume.pdf
```

Make sure it's named exactly: `Ganeshan_Arumuganainar_Resume.pdf`

### 4. Certification Badges (Optional, 10 minutes)
Download official badges:

**Google Cloud:**
1. Go to [Google Cloud Certification](https://www.credential.net/)
2. Download your badge
3. Save as `/public/certifications/gcp-ml.png`

**AWS:**
1. Go to [AWS Certification](https://www.credly.com/)
2. Download your badge
3. Save as `/public/certifications/aws-cp.png`

**IELTS:**
- Use official IELTS logo or your score card screenshot
- Save as `/public/certifications/ielts.png`

## 🚀 After Adding Assets

### Update Constants (if needed)
If you renamed any files, update `/constants/index.ts`:

```typescript
export const SKILL_DATA = [
  {
    skill_name: "Python",
    image: "python.png", // Make sure this matches your file
    width: 80,
    height: 80,
  },
  // ...
]
```

### Test Locally
```bash
# The dev server should auto-reload
# If not, restart:
npm run dev
```

### Check Browser
- Open http://localhost:3000
- Scroll through all sections
- Verify all images load
- Check mobile responsive view

## 📸 Free Image Resources

If you need placeholder or stock images:

**Unsplash** (Free high-quality photos)
- https://unsplash.com/
- Search: "technology", "AI", "data", "code"

**Pexels** (Free stock photos & videos)
- https://www.pexels.com/

**Icons & Logos**
- https://simpleicons.org/ - Brand icons
- https://iconify.design/ - Thousands of icons
- https://www.flaticon.com/ - Icon sets

**Design Tools**
- https://www.canva.com/ - Easy design tool
- https://www.figma.com/ - Professional design
- https://excalidraw.com/ - Hand-drawn diagrams

## 🎨 Quick Project Card Template

If you need to create project cards quickly, use this Figma/Canva template:

**Design:**
- Canvas: 800x450px
- Background: Dark gradient (#030014 → #0E6BA8)
- Title: 48px bold, white
- Technologies: Small badges at top
- Brief description: 24px, light gray
- Optional: Icon or simple graphic

**Example Structure:**
```
┌─────────────────────────────────────┐
│ 🤖 GenAI-In-A-Box Framework        │
│                                     │
│ [LangChain] [AWS] [RAG] [Python]   │
│                                     │
│   Plug-and-play GenAI pipelines    │
│   50% faster development            │
│   Production-ready architecture     │
│                                     │
└─────────────────────────────────────┘
```

## ⚡ Super Quick Option

Don't have time? Use emoji placeholders temporarily:

Replace image paths with emoji or gradient backgrounds in the components. The site will still look professional while you gather proper assets.

---

**Need help? Check the main CUSTOMIZATION_GUIDE.md for detailed instructions!**
