# AustroVis

A modern, minimal website for the AustroVis workshop series - focused on visualization and visual analytics at Austrian universities.

## Features

- 🎨 Modern, minimal design with black & white theme
- 📅 Event listings (past and upcoming)
- 📧 Newsletter signup integration
- 🔗 Social media links (Discord, Twitter, GitHub)
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and Tailwind CSS
- 🚀 Automated deployment to GitHub Pages

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/austrovis/austrovis.git
cd austrovis
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
austrovis/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout with header/footer
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with links
│   ├── EventCard.tsx    # Event display component
│   └── NewsletterSignup.tsx  # Email signup form
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
  registrationLink: 'https://...',
}
```

### Customizing

- **Colors:** Edit Tailwind classes in components
- **Fonts:** Update `app/layout.tsx` to change fonts
- **Content:** Modify `app/page.tsx` for homepage content
- **Social Links:** Update `components/Header.tsx` and `components/Footer.tsx`

## Deployment

### GitHub Pages

The site is automatically deployed to GitHub Pages when you push to the `main` branch.

#### Setup Instructions:

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Build and deployment**, select:
   - **Source:** GitHub Actions
4. Push to the `main` branch to trigger deployment

The site will be available at: `https://<username>.github.io/austrovis/`

### Manual Build

To build for production locally:

```bash
npm run build
```

This creates a static export in the `/out` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this template for your own workshop series!

## Contact

For questions or suggestions, join our [Discord](https://discord.gg/example) community.
