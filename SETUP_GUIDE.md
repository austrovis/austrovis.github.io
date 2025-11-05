# AustroVis Setup Guide

## ✅ What's Been Set Up

Your AustroVis website is ready! Here's what's included:

### 🎨 Design
- Modern, minimal black & white design
- Fully responsive (mobile, tablet, desktop)
- Clean typography with Inter font
- Smooth scrolling and transitions

### 📄 Pages & Sections
1. **Hero Section** - Bold intro with CTA buttons
2. **Upcoming Events** - Cards showing future workshops
3. **Past Events** - Archive of previous workshops
4. **About Section** - Info about AustroVis
5. **Newsletter Signup** - Email collection form (needs integration)
6. **Header** - Navigation with Discord link
7. **Footer** - Social links and copyright

### 🔧 Technical Setup
- Next.js 15 with TypeScript
- Tailwind CSS for styling
- Static export configured for GitHub Pages
- GitHub Actions workflow ready

## 🚀 Next Steps

### 1. Test Locally
The dev server is running at: http://localhost:3000

Open it in your browser to see the site!

### 2. Customize Content

#### Update Events
Edit `/lib/events.ts` to add real event data:
```typescript
{
  id: 'unique-id',
  title: 'Your Event Title',
  date: new Date('2025-12-01'),
  location: 'Vienna, Austria',
  university: 'TU Wien',
  description: 'Event description...',
  speakers: ['Speaker Name'],
  registrationLink: 'https://your-registration-link.com',
}
```

#### Update Social Links
- Discord link: `components/Header.tsx` line 19
- Footer links: `components/Footer.tsx` lines 15-37

#### Update About Section
- Content: `app/page.tsx` lines 74-86

### 3. Newsletter Integration

The newsletter signup form is ready but needs backend integration. Options:

**Option A: Mailchimp**
1. Create a Mailchimp account
2. Get your form action URL
3. Update `components/NewsletterSignup.tsx` handleSubmit function

**Option B: ConvertKit**
1. Create a ConvertKit account
2. Get your form ID
3. Update the form submission logic

**Option C: Custom API**
Create an API route in `/app/api/subscribe/route.ts`

### 4. GitHub Pages Deployment

#### A. Enable GitHub Pages
1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial AustroVis website"
git push origin main
```

2. Go to your repository on GitHub
3. Settings → Pages
4. Under "Build and deployment":
   - Source: **GitHub Actions**
5. Push to main branch triggers auto-deployment

#### B. Update basePath (IMPORTANT!)
In `next.config.ts`, the basePath is set to `/austrovis`. 

If your repo name is different, update it:
```typescript
basePath: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME' : '',
```

Your site will be at: `https://austrovis.github.io/austrovis/`

### 5. Optional: Custom Domain
1. Buy a domain (e.g., austrovis.org)
2. In GitHub: Settings → Pages → Custom domain
3. Add a CNAME record in your domain DNS settings

## 📝 Common Tasks

### Add a New Event
1. Open `/lib/events.ts`
2. Add event object to the `events` array
3. Save - it auto-updates!

### Change Colors
The site uses Tailwind classes. To change from black/white:
- Update `bg-black` to `bg-blue-600`, etc.
- Update `text-black` to `text-blue-900`, etc.

### Add New Pages
1. Create file in `/app/` directory (e.g., `app/speakers/page.tsx`)
2. Add link in `components/Header.tsx`

### Build for Production
```bash
npm run build
```
Output goes to `/out` directory

## 🐛 Troubleshooting

### Dev Server Issues
```bash
# Stop server: Ctrl+C
# Restart:
npm run dev
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### GitHub Actions Failing
- Check the basePath matches your repo name
- Ensure Node version is 20+ in workflow
- Check Actions tab for specific errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GitHub Pages](https://docs.github.com/en/pages)

## 💡 Ideas for Enhancement

- Add image gallery for past events
- Create individual event detail pages
- Add speakers page with bios
- Integrate Google Calendar
- Add RSS feed for events
- Create admin panel for content management
- Add search functionality

## 🆘 Need Help?

Check the comments in the code - they explain key sections!

Key files to understand:
- `app/page.tsx` - Homepage structure
- `components/EventCard.tsx` - How events are displayed
- `lib/events.ts` - Event data management
- `next.config.ts` - Build configuration
