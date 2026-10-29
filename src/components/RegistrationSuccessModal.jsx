import React, { useState, useEffect } from 'react';
import { CheckCircle2, Copy, Check, X, MessageSquare, ArrowRight } from 'lucide-react';

export const RegistrationSuccessModal = ({ registrationData, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!registrationData) return null;

  const { fullName, email, college, myReferralCode, shareUrl } = registrationData;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        throw new Error('Clipboard API unavailable');
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // Fallback using temporary textarea
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (fErr) {
        console.warn('Fallback copy failed:', fErr);
      }
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hey! I just registered for the free workshop "Build Your First AI Project in 60 Minutes" for placement prep. Join me using my invite link:\n${shareUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)'
            }}>
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 id="modal-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Registration Confirmed
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Welcome, {fullName}! Your seat is secured.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="btn-ghost"
            style={{ width: '32px', height: '32px', padding: 0, borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Confirmation Details Card */}
        <div className="surface-card-subtle" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Registered Email:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>College / University:</span>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{college}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Session:</span>
            <span style={{ color: 'var(--brand-accent)', fontWeight: 600 }}>60-Min Live Interactive</span>
          </div>
        </div>

        {/* Personalized Referral Program */}
        <div style={{
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            Invite Classmates & Placement Peers
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Help your engineering peers get placement-ready. Any student who registers with your personal link will be credited to your code:
          </p>

          {/* Referral Code Box */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-input)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '0.85rem'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your Unique Referral Code
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', color: 'var(--brand-accent)' }}>
                {myReferralCode}
              </div>
            </div>
            <span className="badge badge-brand">Active</span>
          </div>

          {/* Shareable Link Input with Copy Button */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input 
              readOnly 
              value={shareUrl} 
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '0 0.85rem',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                width: '100%',
                outline: 'none',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button 
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0 1rem', flexShrink: 0 }}
            >
              {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* WhatsApp Share Button */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ width: '100%', backgroundColor: '#16a34a', borderColor: '#15803d' }}
          >
            <MessageSquare size={16} />
            <span>Share via WhatsApp</span>
          </a>
        </div>

        {/* Footer Close */}
        <button 
          onClick={onClose}
          className="btn btn-outline"
          style={{ width: '100%' }}
        >
          Close & Back to Workshop
        </button>

      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
