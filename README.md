# AustroVis

A modern, minimal website for the AustroVis workshop series - focused on visualization and visual analytics at Austrian universities.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages (static export)
- **Backend:** Netlify Functions (serverless)

## Architecture

This project uses a split architecture:

- **Frontend:** Static Next.js site hosted on GitHub Pages
- **Backend:** Serverless functions on Netlify (separate repo: [austrovis-netlify-functions](https://github.com/austrovis/austrovis-netlify-function))

The static site calls Netlify functions for form submissions, which then forward data to:
- Google Sheets (for event registrations)
- Mailman (for newsletter subscriptions)

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/austrovis/austrovis.github.io.git
cd austrovis.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_NEWSLETTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/newsletter
NEXT_PUBLIC_REGISTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/register
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
austrovis.github.io/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Homepage
│   ├── register/        # Event registration page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with links
│   ├── EventCard.tsx    # Event display component
│   ├── NewsletterSignup.tsx  # Email signup form
│   ├── ParallaxHero.tsx # Hero section with parallax
│   └── ScrollReveal.tsx # Scroll animation wrapper
├── lib/                 # Utilities and data
│   └── events.ts        # Event data and helpers
├── types/               # TypeScript types
│   └── event.ts         # Event type definitions
└── public/              # Static assets
```

### Adding Events

Edit `/lib/events.ts` to add new events:

```typescript
{
  id: 'unique-id',
  title: 'Event Title',
  date: new Date('2025-12-01'),
  location: 'City, Austria',
  university: 'University Name',
  description: 'Event description...',
  speakers: ['Speaker 1', 'Speaker 2'],
  registrationLink: '/register',
}
```

### Customizing

- **Colors:** Edit Tailwind classes in components
- **Fonts:** Update `app/layout.tsx` to change fonts
- **Content:** Modify `app/page.tsx` for homepage content
- **Social Links:** Update `components/Header.tsx` and `components/Footer.tsx`

## Backend Setup

### Google Sheets Integration

The registration form saves data to Google Sheets. See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed setup instructions.

**Quick summary:**
1. Create a Google Sheet with registration data columns
2. Create a Google Apps Script web app
3. Deploy the script and get the URL
4. Add the URL to Netlify environment variables as `GOOGLE_SHEETS_SCRIPT_URL`

### Newsletter Integration

The newsletter signup forwards to a Mailman mailing list:
1. Get your Mailman subscription URL
2. Add it to Netlify environment variables as `MAILMAN_SUBSCRIBE_URL`

### Netlify Functions

The backend functions are in a separate repository: [austrovis-serverless](https://github.com/austrovis/austrovis-serverless)

These functions handle:
- Newsletter subscription forwarding
- Registration form submission to Google Sheets
- CORS handling for cross-origin requests

## Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages when you push to the `main` branch via GitHub Actions.

#### Required GitHub Secrets

Add these secrets in your repository settings (**Settings** > **Secrets and variables** > **Actions**):

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `NEXT_PUBLIC_NEWSLETTER_API_URL` | Netlify function URL for newsletter | `https://austrovis-serverless.netlify.app/.netlify/functions/newsletter` |
| `NEXT_PUBLIC_REGISTER_API_URL` | Netlify function URL for registration | `https://austrovis-serverless.netlify.app/.netlify/functions/register` |

#### Setup Instructions:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Build and deployment**, select:
   - **Source:** GitHub Actions
4. Add the required secrets (see above)
5. Push to the `main` branch to trigger deployment

The site will be available at: `https://austrovis.github.io/`

### Manual Build

To build for production locally:

```bash
npm run build
```

This creates a static export in the `/out` directory.

To test the production build locally:

```bash
npm run build
npx serve out
```

## Environment Variables

### Development (`.env.local`)
```env
NEXT_PUBLIC_NEWSLETTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/newsletter
NEXT_PUBLIC_REGISTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/register
```

### Production (GitHub Actions Secrets)
Set the same variables as GitHub repository secrets. They will be embedded into the static build during deployment.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Related Repositories

- [austrovis-serverless](https://github.com/austrovis/austrovis-serverless) - Serverless backend functions (private)

## License

MIT License - feel free to use this template for your own workshop series!
