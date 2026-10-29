import React, { useState } from 'react';
import { HardDrive, X } from 'lucide-react';

export const DemoModeBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside 
      aria-label="Prototype environment notice"
      style={{
        background: 'var(--bg-surface-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="badge badge-neutral" style={{ padding: '0.15rem 0.5rem', fontSize: '0.72rem' }}>
            <HardDrive size={11} />
            <span>LOCAL PROTOTYPE</span>
          </span>
          <span>
            Client-side prototype: Registrations and referral attribution are stored in your browser's <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>localStorage</code>. No backend database required.
          </span>
        </div>

        <button 
          onClick={() => setDismissed(true)}
          className="btn-ghost"
          style={{ height: '24px', width: '24px', padding: 0, borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Dismiss notification"
          aria-label="Dismiss prototype notification"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
};

export default DemoModeBanner;
