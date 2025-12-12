'use client';

import { useState } from 'react';
import { getUpcomingEvents } from '@/lib/events';

export default function RegisterPage() {
  const upcomingEvents = getUpcomingEvents();
  const nextEvent = upcomingEvents[0];

  const [formData, setFormData] = useState({
    name: '',
    isPresenting: false,
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
      // Use external API endpoint for GitHub Pages deployment
      const apiUrl = process.env.NEXT_PUBLIC_REGISTER_API_URL || '/api/register';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          isPresenting: formData.isPresenting ? 'Yes' : 'No',
          talkTitle: formData.talkTitle,
          description: formData.description,
          expectations: formData.expectations,
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
        isPresenting: false,
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      isPresenting: e.target.checked,
    });
  };

  if (!nextEvent) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#36393f] darkest:bg-black pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white darkest:text-white mb-4">Registration</h1>
          <p className="text-lg text-black/60 dark:text-[#b9bbbe] darkest:text-white/60">
            No upcoming events are scheduled at the moment. Please check back later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#36393f] darkest:bg-black pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white darkest:text-white mb-4">Register for the {nextEvent.title}</h1>
          <div className="bg-black/5 dark:bg-[#2f3136] darkest:bg-white/5 border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6 mb-8">
            <p className="text-lg text-black dark:text-white darkest:text-white mb-2">
              <span className="font-semibold">Date:</span> {nextEvent.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-lg text-black dark:text-white darkest:text-white mb-2">
              <span className="font-semibold">Location:</span> {nextEvent.university}, {nextEvent.location}
            </p>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">{nextEvent.description}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 darkest:bg-green-900/20 border border-green-200 dark:border-green-700 darkest:border-green-700 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 darkest:text-green-400 mb-4">Thank You!</h2>
            <p className="text-green-800 dark:text-green-300 darkest:text-green-300 mb-4">
              Your registration has been received. We&apos;ll get back to you soon with more details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-black dark:text-white darkest:text-white hover:text-black/70 dark:hover:text-white/70 darkest:hover:text-white/70 underline"
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-8 bg-white dark:bg-[#2f3136] darkest:bg-black">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold text-black dark:text-white darkest:text-white mb-2">
                Name (Presenter) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition bg-white dark:bg-[#1e1f22] darkest:bg-[#0a0a0a] text-black dark:text-white darkest:text-white placeholder:text-black/40 dark:placeholder:text-[#72767d] darkest:placeholder:text-white/40"
                placeholder="Your full name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="talkTitle" className="block text-sm font-semibold text-black dark:text-white darkest:text-white mb-2">
                Talk Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="talkTitle"
                name="talkTitle"
                required
                value={formData.talkTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition bg-white dark:bg-[#1e1f22] darkest:bg-[#0a0a0a] text-black dark:text-white darkest:text-white placeholder:text-black/40 dark:placeholder:text-[#72767d] darkest:placeholder:text-white/40"
                placeholder="Title of your presentation"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-semibold text-black dark:text-white darkest:text-white mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition resize-none bg-white dark:bg-[#1e1f22] darkest:bg-[#0a0a0a] text-black dark:text-white darkest:text-white placeholder:text-black/40 dark:placeholder:text-[#72767d] darkest:placeholder:text-white/40"
                placeholder="Brief description of your talk (200-300 words)"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="expectations" className="block text-sm font-semibold text-black dark:text-white darkest:text-white mb-2">
                What do you expect? <span className="text-black/40 dark:text-white/40 darkest:text-white/40">(Optional)</span>
              </label>
              <textarea
                id="expectations"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition resize-none bg-white dark:bg-[#1e1f22] darkest:bg-[#0a0a0a] text-black dark:text-white darkest:text-white placeholder:text-black/40 dark:placeholder:text-[#72767d] darkest:placeholder:text-white/40"
                placeholder="Share your expectations for the workshop..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black font-semibold py-3 px-6 rounded-lg hover:bg-black/80 dark:hover:bg-white/80 darkest:hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
              <a
                href="/"
                className="flex-1 border border-black/20 dark:border-[#40444b] darkest:border-white/20 text-black dark:text-white darkest:text-white font-semibold py-3 px-6 rounded-lg hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 transition-colors text-center"
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
