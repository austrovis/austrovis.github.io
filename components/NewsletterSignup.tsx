'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Use external API endpoint for GitHub Pages deployment
      const apiUrl = process.env.NEXT_PUBLIC_NEWSLETTER_API_URL || '/api/newsletter';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      console.log('Email submitted:', email);
      setSubmittedEmail(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-black dark:bg-[#2f3136] darkest:bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
        <p className="text-white/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-6 text-base">
          Join our mailing list to receive updates about upcoming workshops and events.
        </p>
        
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-left">
              <h3 className="font-semibold text-green-400 mb-1">Subscription Successful!</h3>
              <p className="text-sm text-white/90">
                Further instructions to finalize your subscription have been sent to <span className="font-medium text-white">{submittedEmail}</span>
              </p>
              <div className="mt-3 text-left text-xs text-white/70 sm:text-sm">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-green-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z" />
                  </svg>
                  <span className="text-white/80">
                    Not in your inbox? Take a quick look in spam or the promotions tab.
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-green-400 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l-4 14" />
                  </svg>
                  <span>
                    Add us to your contacts so future updates land exactly where you expect.
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
