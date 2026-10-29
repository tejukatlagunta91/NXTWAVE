import React from 'react';
import { ArrowRight, Calendar, Clock, Monitor, UserCheck } from 'lucide-react';

export const Hero = ({ genuineCount, targetGoal = 500, progressPercent = 0 }) => {
  return (
    <section style={{ padding: '4.5rem 0 3.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        {/* Eyebrow / Category Tag */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <span className="badge badge-brand" style={{ padding: '0.3rem 0.75rem', fontSize: '0.78rem' }}>
            ENGINEERING PLACEMENT MASTERCLASS • 60-MIN LIVE SESSION
          </span>
        </div>

        {/* Mandatory Exact Headline */}
        <h1 style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.4rem)',
          lineHeight: 1.15,
          maxWidth: '860px',
          margin: '0 auto 1.25rem',
          letterSpacing: '-0.03em'
        }}>
          Build Your First AI Project in 60 Minutes
        </h1>

        {/* Mandatory Exact Subheading */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          color: 'var(--text-secondary)',
          maxWidth: '720px',
          margin: '0 auto 2.25rem',
          lineHeight: 1.65
        }}>
          Preparing for placements? Want to add practical AI projects to your resume but don't know where to start? Join our free 60-minute AI workshop and take your first step towards building your own AI project!
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <a href="#register" className="btn btn-primary btn-lg">
            <span>Register for Free</span>
            <ArrowRight size={17} />
          </a>
          <a href="#about" className="btn btn-secondary btn-lg">
            <span>Explore Curriculum</span>
          </a>
        </div>

        {/* Target Milestone Summary */}
        <div className="surface-card-subtle" style={{ maxWidth: '640px', margin: '0 auto 3rem', padding: '1.25rem 1.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Campaign Target Progress
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                {genuineCount} <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {targetGoal} Student Registrations</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                {progressPercent}% Achieved
              </span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {Math.max(0, targetGoal - genuineCount)} spots to 7-day goal
              </div>
            </div>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${Math.min(100, progressPercent)}%` }} />
          </div>
        </div>

        {/* Workshop Specifications Strip (Clean Developer Conference Style) */}
        <div id="details" className="grid-4" style={{ textAlign: 'left' }}>
          
          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Calendar size={16} />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Session Date</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              [Date: Upcoming Weekend - TBA]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Editable placeholder
            </div>
          </div>

          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Duration</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              [Time: 6:00 PM – 7:00 PM IST]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              60-Minute Intensive
            </div>
          </div>

          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Monitor size={16} />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Format</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              [Live Virtual Workshop]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Interactive Code-Along
            </div>
          </div>

          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <UserCheck size={16} />
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>Mentor</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              [Industry AI Specialist]
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Guest Speaker TBA
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
