import EventCard from '@/components/EventCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScrollReveal from '@/components/ScrollReveal';
import ParallaxHero from '@/components/ParallaxHero';
import { getPastEvents, getUpcomingEvents } from '@/lib/events';

export default function Home() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 border-b border-black/10 dark:border-[#202225] darkest:border-white/10 overflow-hidden">
        {/* Hero Image with Parallax */}
        <ParallaxHero />

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 animate-slide-up text-black dark:text-white darkest:text-white">
            AustroVis
          </h1>
          <p className="text-lg md:text-xl text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A community of researchers, students, and practitioners interested in data visualization and visual analytics in Austria.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="/register"
              className="px-6 py-2.5 border border-black/20 dark:border-white/20 darkest:border-white/20 font-medium rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 transition-all text-sm text-black dark:text-white darkest:text-white"
            >
              Stay Updated
            </a>
            <a
              href="#events"
              className="px-6 py-2.5 border border-black/20 dark:border-white/20 darkest:border-white/20 font-medium rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 transition-all text-sm text-black dark:text-white darkest:text-white"
            >
              View Events
            </a>
            <a
              href="https://discord.gg/rbkSzsxP47"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-black/20 dark:border-white/20 darkest:border-white/20 font-medium rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 transition-all text-sm text-black dark:text-white darkest:text-white"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3 text-black dark:text-white darkest:text-white">About the AustroVis Workshop</h2>
            <p className="text-base text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-4">
              The workshop brings together the visualization community in Austria to share knowledge and build connections.
            </p>
            <p className="text-base text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
              The AustroVis Workshop covers a wide range of topics in visualization, from fundamental visualization principles to advanced techniques in interactive visualization, visual analytics, and machine learning visualization.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 text-black dark:text-white darkest:text-white">Upcoming Events</h2>
          </ScrollReveal>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 100}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <p className="text-black/60 dark:text-[#b9bbbe] darkest:text-white/60 text-lg">
                No upcoming events scheduled at the moment. Stay tuned!
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-6 bg-black/2 dark:bg-[#2f3136] darkest:bg-black/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8 text-black dark:text-white darkest:text-white">Past Events</h2>
          </ScrollReveal>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 100}>
                  <EventCard event={event} isPast />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <p className="text-black/60 dark:text-[#b9bbbe] darkest:text-white/60 text-lg">
                No past events yet. Check back soon!
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter">
        <ScrollReveal>
          <NewsletterSignup />
        </ScrollReveal>
      </section>
    </>
  );
}
