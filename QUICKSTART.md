# Quick Start - AustroVis Website

## 🎉 Your Website is Ready!

### View It Now
Open in your browser: **http://localhost:3000**

The development server is already running!

---

## 📋 What You Have

✅ Modern Next.js website with TypeScript  
✅ Minimal black/white design  
✅ Event listing system (past & upcoming)  
✅ Newsletter signup form  
✅ Responsive mobile design  
✅ GitHub Actions deployment workflow  
✅ Ready for GitHub Pages  

---

## 🎯 Immediate Next Steps

### 1. Test the Website
Open http://localhost:3000 and explore:
- Hero section with CTAs
- Upcoming events (2 sample events)
- Past events (3 sample events)
- About section
- Newsletter signup
- Navigation & footer

### 2. Add Your Real Content

**Update Events** → Open `lib/events.ts`  
Replace the mock events with your real workshop data.

**Update Links** → Open these files:
- `components/Header.tsx` - Update Discord link (line 19)
- `components/Footer.tsx` - Update social media links (lines 15-37)

**Update About Text** → Open `app/page.tsx`
Edit lines 74-86 with your actual description.

### 3. Deploy to GitHub

```bash
# Initialize git (if needed)
git add .
git commit -m "Initial AustroVis website"
git push origin main
```

Then on GitHub:
1. Go to: **Settings → Pages**
2. Set Source to: **GitHub Actions**
3. Done! Your site will deploy automatically

**Important:** Check `next.config.ts` - make sure `basePath` matches your repo name!

---

## 📍 Key Files to Edit

| File | Purpose |
|------|---------|
| `lib/events.ts` | Add/edit events |
| `app/page.tsx` | Homepage content |
| `components/Header.tsx` | Navigation links |
| `components/Footer.tsx` | Footer content & social links |
| `components/NewsletterSignup.tsx` | Email signup (needs API integration) |
| `next.config.ts` | Build config (update basePath!) |

---

## 🛠️ Common Commands

```bash
# Development (already running)
npm run dev

# Build for production
npm run build

# Type checking
npm run lint

# Stop server
Ctrl+C (in terminal)
```

---

## 🚨 Before Deploying

1. ✅ Update Discord link in Header
2. ✅ Update social links in Footer  
3. ✅ Replace mock events with real data
4. ✅ Update `basePath` in `next.config.ts` if needed
5. ✅ Test newsletter form integration
6. ✅ Add your logo/images to `/public` folder (optional)

---

## 🎨 Customization Tips

**Change Colors:**  
Search for `bg-black` and `text-black` in components, replace with your colors.

**Change Font:**  
Edit `app/layout.tsx` line 3 - import different Google Font.

**Add Pages:**  
Create new files in `/app` directory (e.g., `app/team/page.tsx`)

---

## 📞 Need Help?

- Check `SETUP_GUIDE.md` for detailed instructions
- Check `README.md` for project structure
- All components have comments explaining functionality

---

## 🎊 You're All Set!

Your AustroVis website is production-ready. Just add your content and deploy!

Happy coding! 🚀
