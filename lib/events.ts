import { Event } from '@/types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Introduction to Data Visualization',
    date: new Date('2024-03-15'),
    location: 'Vienna, Austria',
    university: 'TU Wien',
    description: 'An introductory workshop covering fundamental concepts in data visualization, including visual encoding, color theory, and effective chart design.',
    speakers: ['Dr. Maria Schmidt', 'Prof. Andreas Weber'],
    materials: {
      slides: 'https://example.com/slides',
      recording: 'https://example.com/recording',
    },
  },
  {
    id: '2',
    title: 'Interactive Visualizations with D3.js',
    date: new Date('2024-05-20'),
    location: 'Graz, Austria',
    university: 'TU Graz',
    description: 'Hands-on workshop exploring D3.js for creating interactive and dynamic data visualizations in web applications.',
    speakers: ['Dr. Thomas Mueller'],
    materials: {
      slides: 'https://example.com/slides',
      code: 'https://github.com/example/d3-workshop',
    },
  },
  {
    id: '3',
    title: 'Visual Analytics for Large Datasets',
    date: new Date('2024-09-10'),
    location: 'Salzburg, Austria',
    university: 'University of Salzburg',
    description: 'Advanced techniques for analyzing and visualizing large-scale datasets using modern visual analytics tools and methods.',
    speakers: ['Prof. Sarah Klein', 'Dr. Michael Huber'],
    materials: {
      slides: 'https://example.com/slides',
    },
  },
  {
    id: '4',
    title: 'Machine Learning Visualization',
    date: new Date('2025-11-25'),
    location: 'Innsbruck, Austria',
    university: 'University of Innsbruck',
    description: 'Exploring visualization techniques for understanding and explaining machine learning models and their predictions.',
    speakers: ['Dr. Lisa Wagner'],
    registrationLink: 'https://example.com/register',
  },
  {
    id: '5',
    title: 'Network and Graph Visualization',
    date: new Date('2026-02-14'),
    location: 'Linz, Austria',
    university: 'JKU Linz',
    description: 'Workshop focused on techniques for visualizing complex networks, social graphs, and relational data structures.',
    speakers: ['Prof. Robert Fischer', 'Dr. Anna Bauer'],
    registrationLink: 'https://example.com/register',
  },
];

export function getPastEvents(): Event[] {
  const now = new Date();
  return events.filter(event => event.date < now).sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events.filter(event => event.date >= now).sort((a, b) => a.date.getTime() - b.date.getTime());
}
