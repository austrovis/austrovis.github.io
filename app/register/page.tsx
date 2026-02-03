'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/events';

const REGISTRATION_OPEN = false; // Toggle this to open/close registration

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
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [showLoadForm, setShowLoadForm] = useState(false);
  const [loadName, setLoadName] = useState('');

  const handleLoadExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingExisting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_REGISTER_API_URL || '/api/register';
      const response = await fetch(`${apiUrl}?name=${encodeURIComponent(loadName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration not found');
      }

      if (result.success && result.data) {
        // Load the data into the form
        setFormData({
          name: result.data.name || '',
          isPresenting: result.data.isPresenting === 'Yes',
          talkTitle: result.data.talkTitle || '',
          description: result.data.description || '',
          expectations: result.data.expectations || '',
        });
        setIsEditing(true);
        setShowLoadForm(false);
        setLoadName('');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load registration';
      setError(errorMessage);
      console.error('Load error:', err);
    } finally {
      setLoadingExisting(false);
    }
  };

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
          eventDate: nextEvent?.date ? nextEvent.date.toISOString() : null,
          submittedAt: new Date().toISOString(),
          isUpdate: isEditing, // Flag to indicate if this is an update
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if it's a duplicate name error
        if (data.isDuplicate) {
          setError(data.error + ' Would you like to load and edit it?');
          setIsDuplicate(true);
          setShowLoadForm(true);
          setLoadName(formData.name);
          return;
        }
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
      setIsEditing(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit registration. Please try again.';
      setError(errorMessage);
      setIsDuplicate(false);
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

  // Registration is locked for this edition
  if(!REGISTRATION_OPEN) {
      return (
      <main className="min-h-screen bg-white dark:bg-[#36393f] darkest:bg-black pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white darkest:text-white mb-4">Registration Closed</h1>
          <div className="bg-black/5 dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-8 mb-8">
            <p className="text-lg text-black dark:text-white darkest:text-white mb-2">
              Registration for this edition of the workshop is now <span className="font-semibold">closed</span>.
            </p>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
              Please wait for an announcement for the next one!
            </p>
          </div>
        </div>
      </main>
    )
  }
  else {
  return (
    <main className="min-h-screen bg-white dark:bg-[#36393f] darkest:bg-black pt-32 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white darkest:text-white mb-4">Register for the {nextEvent.title}</h1>
          <div className="bg-black/5 dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6 mb-8">
            <p className="text-lg text-black dark:text-white darkest:text-white mb-2">
              <span className="font-semibold">Date:</span> {nextEvent.date ? nextEvent.date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'TBD'}
            </p>
            <p className="text-lg text-black dark:text-white darkest:text-white mb-2">
              <span className="font-semibold">Location:</span> {nextEvent.university}, {nextEvent.location}
            </p>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">{nextEvent.description}</p>
          </div>
        </div>

        {error && (
          <div className={`${isDuplicate ? 'bg-orange-50 dark:bg-yellow-900/30 darkest:bg-yellow-800/20 border-orange-300 dark:border-yellow-600 darkest:border-yellow-500' : 'bg-red-50 dark:bg-red-900/20 darkest:bg-red-900/30 border-red-200 dark:border-red-700 darkest:border-red-600'} border rounded-lg p-4 mb-6 text-center`}>
            <p className={isDuplicate ? 'text-orange-800 dark:text-yellow-400 darkest:text-yellow-300' : 'text-red-800 dark:text-red-300 darkest:text-red-200'}>{error}</p>
          </div>
        )}

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-900/20 darkest:bg-green-900/30 border border-green-200 dark:border-green-700 darkest:border-green-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 darkest:text-green-200 mb-4">Thank You!</h2>
            <p className="text-green-800 dark:text-green-300 darkest:text-green-200 mb-4">
              Your registration has been {isEditing ? 'updated' : 'received'}. We&apos;ll get back to you soon with more details.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setIsEditing(false);
              }}
              className="text-black dark:text-white darkest:text-white hover:text-black/70 dark:hover:text-white/70 darkest:hover:text-white/70 underline"
            >
              Submit another registration
            </button>
          </div>
        ) : (
          <>
            {/* Load Existing Registration Section */}
            {!isEditing && (
              <div className="mb-6">
                <button
                  onClick={() => setShowLoadForm(!showLoadForm)}
                  className="w-full bg-black/5 dark:bg-[#2f3136] darkest:bg-black hover:bg-black/10 dark:hover:bg-[#40444b] darkest:hover:bg-white/10 text-black dark:text-white darkest:text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-black/20 dark:border-[#40444b] darkest:border-white/20"
                >
                  {showLoadForm ? 'Hide' : 'Edit Existing Registration'}
                </button>
                
                {showLoadForm && (
                  <div className="mt-4 p-4 border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg bg-black/5 dark:bg-[#2f3136] darkest:bg-black">
                    <form onSubmit={handleLoadExisting}>
                      <label htmlFor="loadName" className="block text-sm font-semibold text-black dark:text-white darkest:text-white mb-2">
                        Enter your name to load your existing registration
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="loadName"
                          value={loadName}
                          onChange={(e) => setLoadName(e.target.value)}
                          className="flex-1 px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition bg-white dark:bg-[#40444b] darkest:bg-black text-black dark:text-white darkest:text-white"
                          placeholder="Your full name"
                          required
                        />
                        <button
                          type="submit"
                          disabled={loadingExisting}
                          className="bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black font-semibold py-2 px-6 rounded-lg hover:bg-black/80 dark:hover:bg-white/90 darkest:hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingExisting ? 'Loading...' : 'Load'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {isEditing && (
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 darkest:bg-blue-900/30 border border-blue-200 dark:border-blue-700 darkest:border-blue-600 rounded-lg">
                <p className="text-blue-800 dark:text-blue-300 darkest:text-blue-200 font-semibold">
                  ✏️ Editing existing registration for: {formData.name}
                </p>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: '',
                      isPresenting: false,
                      talkTitle: '',
                      description: '',
                      expectations: '',
                    });
                  }}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 darkest:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 darkest:hover:text-blue-100 underline"
                >
                  Cancel editing and create new registration
                </button>
              </div>
            )}

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
                disabled={isEditing}
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition bg-white dark:bg-[#40444b] darkest:bg-black text-black dark:text-white darkest:text-white disabled:bg-gray-100 dark:disabled:bg-[#2f3136] darkest:disabled:bg-black/50 disabled:cursor-not-allowed"
                placeholder="Your full name"
              />
              {isEditing && (
                <p className="text-xs text-black/50 dark:text-white/50 darkest:text-white/50 mt-1">Name cannot be changed when editing</p>
              )}
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPresenting"
                  checked={formData.isPresenting}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setFormData({ 
                      ...formData, 
                      isPresenting: isChecked,
                      // Clear talk fields if unchecking
                      talkTitle: isChecked ? formData.talkTitle : '',
                      description: isChecked ? formData.description : ''
                    });
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
                <span className="text-sm font-semibold text-black dark:text-white darkest:text-white">
                  I&apos;m presenting a talk <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {formData.isPresenting && (
              <>
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
                    className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition bg-white dark:bg-[#40444b] darkest:bg-black text-black dark:text-white darkest:text-white"
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
                    className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition resize-none bg-white dark:bg-[#40444b] darkest:bg-black text-black dark:text-white darkest:text-white"
                    placeholder="Brief description of your talk (200-300 words)"
                  />
                </div>
              </>
            )}

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
                className="w-full px-4 py-2 border border-black/20 dark:border-[#40444b] darkest:border-white/20 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-black dark:focus:border-white darkest:focus:border-white outline-none transition resize-none bg-white dark:bg-[#40444b] darkest:bg-black text-black dark:text-white darkest:text-white"
                placeholder="Share your expectations for the workshop..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black font-semibold py-3 px-6 rounded-lg hover:bg-black/80 dark:hover:bg-white/90 darkest:hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : isEditing ? 'Update Registration' : 'Submit Registration'}
              </button>
              <Link
                href="/"
                className="flex-1 border border-black/20 dark:border-[#40444b] darkest:border-white/20 text-black dark:text-white darkest:text-white font-semibold py-3 px-6 rounded-lg hover:border-black/40 dark:hover:border-white/40 darkest:hover:border-white/40 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
          </>
        )}
      </div>
    </main>
  );
}
}
