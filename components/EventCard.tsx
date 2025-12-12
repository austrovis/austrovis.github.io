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
    <div className={`group border border-black/10 dark:border-white/20 darkest:border-white/20 p-5 rounded-lg transition-all duration-300 hover:border-black/30 dark:hover:border-white/40 darkest:hover:border-white/40 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] bg-white dark:bg-[#2f3136] darkest:bg-black ${isPast ? 'opacity-70 hover:opacity-85' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          <h3 className="text-lg font-semibold mb-1 transition-colors duration-300 text-black dark:text-white darkest:text-white group-hover:text-black/80 dark:group-hover:text-white/90 darkest:group-hover:text-white/90">{event.title}</h3>
          <p className="text-sm text-black/60 dark:text-[#b9bbbe] darkest:text-white/60 transition-colors duration-300 group-hover:text-black/70 dark:group-hover:text-white/80 darkest:group-hover:text-white/80">{event.university}</p>
        </div>
        {!isPast && (
          <span className="px-3 py-1 text-xs font-medium bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            Upcoming
          </span>
        )}
      </div>
      
      <div className="space-y-1.5 mb-3 transition-all duration-300 group-hover:translate-x-1">
        <p className="text-sm transition-colors duration-300 text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 group-hover:text-black dark:group-hover:text-white darkest:group-hover:text-white">
          <span className="font-medium">Date:</span> {formatDate(event.date)}
        </p>
        <p className="text-sm transition-colors duration-300 text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 group-hover:text-black dark:group-hover:text-white darkest:group-hover:text-white">
          <span className="font-medium">Location:</span> {event.location}
        </p>
        {event.speakers && event.speakers.length > 0 && (
          <p className="text-sm transition-colors duration-300 text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 group-hover:text-black dark:group-hover:text-white darkest:group-hover:text-white">
            <span className="font-medium">Organizer:</span> {event.speakers.join(', ')}
          </p>
        )}
      </div>
      
      <p className="text-sm text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-3 transition-all duration-300 group-hover:text-black/80 dark:group-hover:text-white/90 darkest:group-hover:text-white/90 group-hover:translate-x-1">{event.description}</p>
      
      <div className="flex flex-wrap gap-2 transition-all duration-300 group-hover:translate-x-1">
        {!isPast && (
          <a
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black rounded-md hover:bg-black/80 dark:hover:bg-white/90 darkest:hover:bg-white/90 hover:scale-105 transition-all duration-200"
          >
            Register Now
          </a>
        )}
        {event.materials?.slides && (
          <a
            href={event.materials.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 dark:border-white/20 darkest:border-white/20 rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/5 darkest:hover:bg-white/5 transition-all duration-200 text-black dark:text-white darkest:text-white"
          >
            Slides
          </a>
        )}
        {event.materials?.recording && (
          <a
            href={event.materials.recording}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 dark:border-white/20 darkest:border-white/20 rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/5 darkest:hover:bg-white/5 transition-all duration-200 text-black dark:text-white darkest:text-white"
          >
            Recording
          </a>
        )}
        {event.materials?.code && (
          <a
            href={event.materials.code}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium border border-black/20 dark:border-white/20 darkest:border-white/20 rounded-md hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 hover:scale-105 hover:bg-black/5 dark:hover:bg-white/5 darkest:hover:bg-white/5 transition-all duration-200 text-black dark:text-white darkest:text-white"
          >
            Code
          </a>
        )}
      </div>
    </div>
  );
}
