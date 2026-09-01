'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/subscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <div className="font-mono text-xs uppercase text-[var(--brass)] mb-3">Stay Updated</div>
      {status === 'done' ? (
        <p className="font-mono text-xs opacity-70">Subscribed — thank you.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 min-w-0 bg-transparent border-b border-[var(--line)] py-2 text-sm outline-none focus:border-[var(--brass)] transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="magnetic font-mono text-[10px] uppercase px-4 py-2 rounded-full bg-[var(--brass)] text-[var(--paper-light)] whitespace-nowrap disabled:opacity-50"
          >
            {status === 'sending' ? '...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="font-mono text-[10px] text-[var(--brass)] mt-2">Something went wrong — try again.</p>
      )}
    </div>
  )}