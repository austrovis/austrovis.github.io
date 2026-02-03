'use client';

import { useState } from 'react';
import Link from 'next/link';

function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
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

      setSubmittedEmail(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="p-6 bg-green-500/20 dark:bg-green-500/10 darkest:bg-green-500/10 border border-green-500/50 dark:border-green-500/40 darkest:border-green-500/40 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-green-400 dark:text-green-400 darkest:text-green-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-green-600 dark:text-green-400 darkest:text-green-400 mb-1">Subscription Successful!</h3>
              <p className="text-sm text-black/90 dark:text-[#b9bbbe] darkest:text-white/80 mb-1">
                Further instructions to finalize your subscription have been sent to:
              </p>
              <p className="font-medium text-black dark:text-white darkest:text-white mb-3">{submittedEmail}</p>
              <div className="space-y-1 text-xs text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z" />
                  </svg>
                  <span className="text-black/80 dark:text-[#b9bbbe] darkest:text-white/70">
                    Not in your inbox? Take a quick look in spam or the promotions tab.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black/10 dark:border-[#40444b] darkest:border-white/20 font-semibold rounded-lg hover:border-black/30 dark:hover:border-white/40 darkest:hover:border-white/40 hover:bg-black/5 dark:hover:bg-[#40444b] darkest:hover:bg-white/10 transition-all text-black dark:text-white darkest:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              disabled={status === 'loading'}
              className="w-full px-5 py-3.5 rounded-lg border-2 border-black/10 dark:border-[#40444b] darkest:border-white/20 text-black dark:text-white darkest:text-white placeholder-black/40 dark:placeholder-[#72767d] darkest:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white darkest:focus:ring-white focus:border-transparent disabled:opacity-50 disabled:bg-black/5 dark:disabled:bg-[#1e1f22]/50 darkest:disabled:bg-black/50 transition-all text-base bg-white dark:bg-[#1e1f22] darkest:bg-[#0a0a0a]"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3.5 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black font-semibold rounded-lg hover:bg-black/90 dark:hover:bg-white/80 darkest:hover:bg-white/80 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap shadow-lg hover:shadow-xl"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
        
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-500 dark:text-red-400 darkest:text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 h-px bg-black/10 dark:bg-white/20 darkest:bg-white/20"></div>
        <span className="text-sm text-black/50 dark:text-[#b9bbbe] darkest:text-white/50 font-medium">OR</span>
        <div className="flex-1 h-px bg-black/10 dark:bg-white/20 darkest:bg-white/20"></div>
      </div>
      
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black/10 dark:border-[#40444b] darkest:border-white/20 font-semibold rounded-lg hover:border-black/30 dark:hover:border-[#b9bbbe] darkest:hover:border-white/50 hover:bg-black/5 dark:hover:bg-white/5 darkest:hover:bg-white/10 transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}

export default function MailingListPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#36393f] darkest:bg-black pt-32 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white darkest:text-white mb-4">
            AustroVis Mailing List
          </h1>
          <p className="text-lg text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 max-w-2xl mx-auto">
            Stay connected with the Austrian visualization community. Get updates about workshops, events, and opportunities.
          </p>
        </div>

        {/* Description */}
        <section className="mb-12">
          <div className="bg-black/5 dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">About the List</h2>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-4">
              The AustroVis mailing list is the primary communication channel for the Austrian visualization community. 
              Powered by Mailman3, it&apos;s a space where researchers, students, and practitioners can:
            </p>
            <ul className="list-disc list-inside text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 space-y-2 mb-4">
              <li>Receive announcements about upcoming AustroVis workshops and events</li>
              <li>Share job opportunities, PhD positions, and internships in visualization</li>
              <li>Discuss visualization topics and ask questions to the community</li>
              <li>Collaborate on research projects and publications</li>
              <li>Stay informed about visualization-related news in Austria and beyond</li>
            </ul>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
              Anyone interested in data visualization, visual analytics, or related fields is welcome to join!
            </p>
          </div>
        </section>

        {/* List Owner */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">List Administrator</h2>
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-2">
              For questions, concerns, or administrative requests, please contact the list owner:
            </p>
            <a 
              href="mailto:austrovis-owner@cvast.tuwien.ac.at"
              className="text-black dark:text-white darkest:text-white font-medium hover:underline inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              austrovis-owner@cvast.tuwien.ac.at
            </a>
          </div>
        </section>

        {/* Subscription Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">How to Subscribe</h2>
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white darkest:text-white mb-1">Submit Your Email</h3>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    Use the subscription form on our <Link href="/#newsletter" className="text-black dark:text-white darkest:text-white underline">homepage</Link> or 
                    send an email directly to <a href="mailto:austrovis-request@cvast.tuwien.ac.at?subject=Subscribe" className="text-black dark:text-white darkest:text-white underline">austrovis-request@cvast.tuwien.ac.at</a> with 
                    the subject line &quot;Subscribe&quot; (the message body can be empty)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white darkest:text-white mb-1">Check Your Email</h3>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    You&apos;ll receive a confirmation email with instructions to finalize your subscription.
                  </p>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mt-2">
                    <strong className="text-black dark:text-white darkest:text-white font-semibold">Important:</strong> Be sure to check your <strong className="text-black dark:text-white darkest:text-white font-semibold">spam or promotions folder</strong> if you don&apos;t see the email in your inbox.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white darkest:text-white mb-1">Confirm Your Subscription</h3>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    Follow the link in the confirmation email to complete your subscription. 
                    Once confirmed, you&apos;ll start receiving updates from the AustroVis community.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-black/10 dark:border-[#40444b] darkest:border-white/20">
              <Link
                href="/#newsletter"
                className="inline-block px-6 py-3 bg-black dark:bg-white darkest:bg-white text-white dark:text-black darkest:text-black font-semibold rounded-md hover:bg-black/80 dark:hover:bg-white/80 darkest:hover:bg-white/80 transition-colors"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </section>

        {/* Unsubscription Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">How to Unsubscribe</h2>
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-4">
              You can unsubscribe from the mailing list at any time using one of these methods:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-black dark:text-white darkest:text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <p className="text-black dark:text-white darkest:text-white font-medium mb-1">Email Method</p>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    Send an email to{' '}
                    <a href="mailto:austrovis-owner@cvast.tuwien.ac.at?subject=Unsubscribe" className="text-black dark:text-white darkest:text-white underline">
                      austrovis-owner@cvast.tuwien.ac.at
                    </a>
                    {' '}with the subject line &quot;Unsubscribe&quot; from the address you want to unsubscribe (the message body can be empty)
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-black/40 dark:text-white/40 darkest:text-white/40 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <p className="text-black dark:text-white darkest:text-white font-medium mb-1">Footer Links</p>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-2">
                    <strong className="text-black dark:text-white darkest:text-white">Automated unsubscribe links are currently in development.</strong>
                  </p>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    We&apos;re working on adding one-click unsubscribe links to the footer of all mailing list emails. 
                    In the meantime, please use the email method or contact the list owner for assistance.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-black dark:text-white darkest:text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <div>
                  <p className="text-black dark:text-white darkest:text-white font-medium mb-1">Contact the Owner</p>
                  <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                    Email{' '}
                    <a href="mailto:austrovis-owner@cvast.tuwien.ac.at" className="text-black dark:text-white darkest:text-white underline">
                      austrovis-owner@cvast.tuwien.ac.at
                    </a>
                    {' '}if you need assistance unsubscribing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archive Access */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">Accessing the Archive</h2>
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <div className="flex gap-3 items-start mb-4">
              <svg className="w-6 h-6 text-black/40 dark:text-white/40 darkest:text-white/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-2">
                  <strong className="text-black dark:text-white darkest:text-white">Archive access is currently in development.</strong> 
                </p>
                <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70">
                  We&apos;re working on making past mailing list messages searchable and accessible to subscribers. 
                  This feature will allow you to browse previous discussions, announcements, and shared resources.
                </p>
                <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mt-2">
                  Check back soon for updates, or subscribe to the mailing list to be notified when the archive becomes available!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-4">Privacy & Data Protection</h2>
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-6">
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-3">
              We respect your privacy and are committed to protecting your personal information:
            </p>
            <ul className="list-disc list-inside text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 space-y-2">
              <li>Your email address is only used for mailing list communications</li>
              <li>We do not share or sell subscriber information to third parties</li>
              <li>Messages are sent only by AustroVis community members</li>
              <li>You can unsubscribe at any time without explanation</li>
              <li>The list is hosted by the <a href="https://www.cvast.tuwien.ac.at/" className="underline font-bold text-black dark:text-white darkest:text-white">Centre for Visual Analytics Science and Technology (CVAST)</a></li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-white dark:bg-[#2f3136] darkest:bg-black border border-black/10 dark:border-[#40444b] darkest:border-white/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white darkest:text-white mb-3">Ready to Join?</h2>
            <p className="text-black/70 dark:text-[#b9bbbe] darkest:text-white/70 mb-6">
              Become part of Austria&apos;s visualization community today.
            </p>
            <SubscribeForm />
          </div>
        </section>
      </div>
    </main>
  );
}
