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
    <div className={`group border border-black/10 p-5 rounded-lg transition-all duration-300 hover:border-black/30 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] ${isPast ? 'opacity-70 hover:opacity-85' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          <h3 className="text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-black/80">{event.title}</h3>
          <p className="text-sm text-black/60 transition-colors duration-300 group-hover:text-black/70">{event.university}</p>
        </div>
        {!isPast && (
          <span className="px-3 py-1 text-xs font-medium bg-black text-white rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            Upcoming
          </span>
        )}
      </div>
      
      <div className="space-y-1.5 mb-3 transition-all duration-300 group-hover:translate-x-1">
        <p className="text-sm transition-colors duration-300 group-hover:text-black">
          <span className="font-medium">Date:</span> {formatDate(event.date)}
        </p>
        <p className="text-sm transition-colors duration-300 group-hover:text-black">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        {event.speakers && event.speakers.length > 0 && (
          <p className="text-sm transition-colors duration-300 group-hover:text-black">
            <span className="font-medium">Organizer:</span> {event.speakers.join(', ')}
          </p>
        )}
      </div>
      
      <p className="text-sm text-black/70 mb-3 transition-all duration-300 group-hover:text-black/80 group-hover:translate-x-1">{event.description}</p>
      
      <div className="flex flex-wrap gap-2 transition-all duration-300 group-hover:translate-x-1">
        {!isPast && (
          <a
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-black/80 hover:scale-105 transition-all duration-200"
          >
            Register Now
          </a>
        )}
        {event.materials?.slides && (
          <a
            href={event.materials.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 hover:scale-105 hover:bg-black/5 transition-all duration-200"
          >
            Slides
          </a>
        )}
        {event.materials?.recording && (
          <a
            href={event.materials.recording}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 hover:scale-105 hover:bg-black/5 transition-all duration-200"
          >
            Recording
          </a>
        )}
        {event.materials?.code && (
          <a
            href={event.materials.code}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 rounded-md hover:border-black/40 hover:scale-105 hover:bg-black/5 transition-all duration-200"
          >
            Code
          </a>
        )}
      </div>
    </div>
  );
}
