import React from 'react';
import { BarChart2, Shield, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, genuineCount, targetGoal = 500, onOpenAdminLogin }) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(9, 13, 22, 0.92)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border-default)',
      height: '64px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setCurrentView('landing')}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: 'var(--brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.85rem'
          }}>
            NW
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              NxtWave
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              AI Masterclass
            </span>
          </div>
        </div>

        {/* Center / Navigation Links (Landing View) */}
        {currentView === 'landing' ? (
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="nav-desktop">
            <a href="#about" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Curriculum
            </a>
            <a href="#who-should-attend" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Eligibility
            </a>
            <a href="#details" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Session Agenda
            </a>
            <a href="#register" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Registration
            </a>
          </nav>
        ) : (
          <button 
            onClick={() => setCurrentView('landing')}
            className="btn btn-secondary btn-sm"
          >
            ← Back to Workshop Page
          </button>
        )}

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* Target Progress Counter Pill */}
          <div 
            title="Campaign registrations progress towards 7-day goal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-accent)' }} />
            <span style={{ color: 'var(--text-muted)' }}>Target:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {genuineCount} / {targetGoal}
            </span>
          </div>

          {/* Admin Dashboard Entry */}
          {currentView === 'landing' ? (
            <button 
              onClick={onOpenAdminLogin}
              className="btn btn-secondary btn-sm"
              title="Open campaign monitoring dashboard"
            >
              <BarChart2 size={14} />
              <span>Dashboard</span>
            </button>
          ) : (
            <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>
              <Shield size={12} />
              <span>Admin Active</span>
            </span>
          )}

          {currentView === 'landing' && (
            <a href="#register" className="btn btn-primary btn-sm">
              <span>Register Free</span>
            </a>
          )}

        </div>

      </div>
    </header>
  );
};

export default Navbar;
