import { Event } from '@/types/event';

export const events: Event[] = [
  {
    id: '1',
    title: '1st Edition AustroVis Workshop',
    date: new Date('2023-10-16'),
    location: 'Vienna, Austria',
    university: 'University of Vienna',
    description: 'The first edition of the AustroVis Workshop.',
    speakers: ['Torsten Möller'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '2',
    title: '2nd Edition AustroVis Workshop',
    date: new Date('2024-02-20'),
    location: 'Vienna, Austria',
    university: 'TU Wien',
    description: 'The second edition of the AustroVis Workshop.',
    speakers: ['Manuela Waldner'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '3',
    title: '3rd Edition AustroVis Workshop',
    date: new Date('2024-09-30'),
    location: 'Vienna, Austria',
    university: 'VRVis',
    description: 'The third edition of the AustroVis Workshop.',
    speakers: ['Johanna Schmidt'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '4',
    title: '4th Edition AustroVis Workshop',
    date: new Date('2025-02-25'),
    location: 'St. Pölten, Austria',
    university: 'University of Applied Sciences, St. Pölten',
    description: 'The fourth edition of the AustroVis Workshop.',
    speakers: ['Wolfgang Aigner'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '5',
    title: '5th Edition AustroVis Workshop',
    date: new Date('2025-09-25'),
    location: 'Graz, Austria',
    university: 'TU Graz',
    description: 'The fifth edition of the AustroVis Workshop.',
    speakers: ['Alexander Lex'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '6',
    title: '6th Edition AustroVis Workshop',
    date: new Date('2026-02-02'),
    location: 'Vienna, Austria',
    university: 'TU Wien',
    description: 'The sixth edition of the AustroVis Workshop.',
    speakers: ['Velitchko Filipov'],
    materials: {
      slides: '',
      recording: '',
    },
  },
  {
    id: '7',
    title: '7th Edition AustroVis Workshop',
    // date intentionally omitted (TBD)
    tbd: true,
    location: '',
    university: '',
    description: 'The seventh edition of the AustroVis Workshop.',
    speakers: [''],
    materials: {
      slides: '',
      recording: '',
    },
  },
];

export function getPastEvents(): Event[] {
  const now = new Date();
  return events
    .filter(event => event.date instanceof Date && !isNaN(event.date.getTime()) && event.date < now)
    .sort((a, b) => b.date!.getTime() - a.date!.getTime());
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events
    .filter(event => {
      if (event.date instanceof Date && !isNaN(event.date.getTime())) {
        return event.date >= now;
      }
      // Include events with no/invalid date or explicitly marked as TBD
      return event.tbd === true || event.date == null;
    })
    .sort((a, b) => {
      const aTime = a.date instanceof Date && !isNaN(a.date.getTime()) ? a.date.getTime() : Number.POSITIVE_INFINITY;
      const bTime = b.date instanceof Date && !isNaN(b.date.getTime()) ? b.date.getTime() : Number.POSITIVE_INFINITY;
      return aTime - bTime;
    });
}
