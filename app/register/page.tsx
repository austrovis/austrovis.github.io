'use client';

import { useState } from 'react';
import { getUpcomingEvents } from '@/lib/events';

export default function RegisterPage() {
  const upcomingEvents = getUpcomingEvents();
  const nextEvent = upcomingEvents[0];

  const [formData, setFormData] = useState({
    name: '',
    talkTitle: '',
    description: '',
    expectations: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventId: nextEvent?.id,
          eventTitle: nextEvent?.title,
          eventDate: nextEvent?.date.toISOString(),
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        talkTitle: '',
        description: '',
        expectations: '',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit registration. Please try again.';
      setError(errorMessage);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!nextEvent) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Registration</h1>
          <p className="text-lg text-black/60">
            No upcoming events are scheduled at the moment. Please check back later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Register for the {nextEvent.title}</h1>
          <div className="bg-black/5 border border-black/10 rounded-lg p-6 mb-8">
            <p className="text-lg text-black mb-2">
              <span className="font-semibold">Date:</span> {nextEvent.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-lg text-black mb-2">
              <span className="font-semibold">Location:</span> {nextEvent.university}, {nextEvent.location}
            </p>
            <p className="text-black/70">{nextEvent.description}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Thank You!</h2>
            <p className="text-green-800 mb-4">
              Your registration has been received. We&apos;ll get back to you soon with more details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-black hover:text-black/70 underline"
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-black/10 rounded-lg p-8">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                Name (Presenter) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                placeholder="Your full name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="talkTitle" className="block text-sm font-semibold text-black mb-2">
                Talk Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="talkTitle"
                name="talkTitle"
                required
                value={formData.talkTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
                placeholder="Title of your presentation"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-semibold text-black mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition resize-none"
                placeholder="Brief description of your talk (200-300 words)"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="expectations" className="block text-sm font-semibold text-black mb-2">
                What do you expect? <span className="text-black/40">(Optional)</span>
              </label>
              <textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-black/20 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition resize-none"
                placeholder="Share your expectations for the workshop..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              <a
                href="/"
                className="flex-1 border border-black/20 text-black font-semibold py-3 px-6 rounded-lg hover:border-black/40 transition-colors text-center"
              >
                Cancel
              </a>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
