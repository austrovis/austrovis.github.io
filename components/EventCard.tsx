import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

export default function EventCard({ event, isPast = false }: EventCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={`border border-black/10 p-5 rounded-lg hover:border-black/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${isPast ? 'opacity-70' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-sm text-black/60">{event.university}</p>
        </div>
        {!isPast && (
          <span className="px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
            Upcoming
          </span>
        )}
      </div>
      
      <div className="space-y-1.5 mb-3">
        <p className="text-sm">
          <span className="font-medium">Date:</span> {formatDate(event.date)}
        </p>
        <p className="text-sm">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        {event.speakers && event.speakers.length > 0 && (
          <p className="text-sm">
            <span className="font-medium">Speakers:</span> {event.speakers.join(', ')}
          </p>
        )}
      </div>
      
      <p className="text-sm text-black/70 mb-3">{event.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {!isPast && (
          <a
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-black/80 transition-colors"
          >
            Register Now
          </a>
        )}
        {event.materials?.slides && (
          <a
            href={event.materials.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 transition-colors"
          >
            Slides
          </a>
        )}
        {event.materials?.recording && (
          <a
            href={event.materials.recording}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 transition-colors"
          >
            Recording
          </a>
        )}
        {event.materials?.code && (
          <a
            href={event.materials.code}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 transition-colors"
          >
            Code
          </a>
        )}
      </div>
    </div>
  );
}
