import React from 'react';

export const Footer = ({ onOpenAdminLogin }) => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-surface-subtle)',
      padding: '3rem 0 2rem',
      fontSize: '0.85rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
              <span>NxtWave Growth Challenge</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• Placement Prototype</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.35rem', maxWidth: '480px', lineHeight: 1.5 }}>
              "Build Your First AI Project in 60 Minutes" workshop prototype demonstrating client-side student registration, 5-channel attribution, and budget tracking.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <a href="#about" style={{ color: 'var(--text-secondary)' }}>Curriculum</a>
            <a href="#who-should-attend" style={{ color: 'var(--text-secondary)' }}>Who Can Attend</a>
            <a href="#register" style={{ color: 'var(--text-secondary)' }}>Registration</a>
            <button
              onClick={onOpenAdminLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                textDecoration: 'underline'
              }}
            >
              Admin Dashboard
            </button>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            Prototype for NxtWave Growth Intern Challenge • All dates, mentors, and venue details use customizable placeholders.
          </div>
          <div>
            Tailored for Final-Year Engineering Students Preparing for Placements
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
