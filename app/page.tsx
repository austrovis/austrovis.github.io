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
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 border-b border-black/10 overflow-hidden">
        {/* Hero Image with Parallax */}
        <ParallaxHero />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 animate-slide-up">
            AustroVis
          </h1>
          <p className="text-lg md:text-xl text-black/70 mb-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            A workshop series focused on visualization and visual analytics at Austrian universities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="/register"
              className="px-6 py-2.5 bg-black text-white font-medium rounded-md hover:bg-black/80 hover:scale-105 transition-all text-sm"
            >
              Register Now
            </a>
            <a
              href="#events"
              className="px-6 py-2.5 border border-black/20 font-medium rounded-md hover:border-black/40 hover:scale-105 transition-all text-sm"
            >
              View Events
            </a>
            <a
              href="https://discord.gg/example"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-black/20 font-medium rounded-md hover:border-black/40 hover:scale-105 transition-all text-sm"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
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
              <p className="text-black/60 text-lg">
                No upcoming events scheduled at the moment. Stay tuned!
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-6 bg-black/2">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
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
              <p className="text-black/60 text-lg">
                No past events yet. Check back soon!
              </p>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">About AustroVis</h2>
            <p className="text-base text-black/70 mb-4">
              AustroVis is a collaborative workshop series bringing together researchers, students, and practitioners 
              interested in data visualization and visual analytics across Austrian universities.
            </p>
            <p className="text-base text-black/70">
              Our workshops cover a wide range of topics, from fundamental visualization principles to advanced 
              techniques in interactive visualization, visual analytics, and machine learning visualization.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Newsletter Signup */}
      <ScrollReveal>
        <NewsletterSignup />
      </ScrollReveal>
    </>
  );
}
