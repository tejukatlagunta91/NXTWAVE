import React from 'react';
import { CheckCircle2, GraduationCap, Briefcase, Code2, Sparkles } from 'lucide-react';

export const TargetAudience = () => {
  const criteria = [
    {
      title: 'Final-Year Engineering Students',
      branch: 'CS, IT, ECE, Core Branches',
      detail: 'Students actively preparing for campus recruitment drives, technical assessment rounds, and system design interviews.'
    },
    {
      title: 'Placement Resume Enhancers',
      branch: 'Portfolio Distinction',
      detail: 'Candidates wanting to replace generic college coursework projects with deployed, modern AI applications that capture recruiters’ attention.'
    },
    {
      title: 'Practical AI Beginners',
      branch: 'No Heavy Math Prerequisites',
      detail: 'Learners wanting to integrate LLM APIs and modern AI tools without getting bogged down by weeks of abstract machine learning theory.'
    },
    {
      title: 'Action-Oriented Coders',
      branch: 'Hands-On Builders',
      detail: 'Students who learn best by writing and running code in real time alongside an experienced mentor rather than watching passive tutorials.'
    }
  ];

  return (
    <section id="who-should-attend" className="section-py" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.35fr)',
          gap: '3rem',
          alignItems: 'start'
        }} className="target-layout">
          
          {/* Left Column: Context & Intent */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span className="badge badge-brand">WHO SHOULD ATTEND</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.35rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Built specifically for final-year placement prep
            </h2>
            <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              Campus recruitment teams now expect software candidates to demonstrate practical AI literacy. Most engineering curricula stop at classroom theory, leaving students unprepared to explain production AI implementations.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              This 60-minute session gives you a functioning, resume-ready project and the exact architectural talking points needed to confidently answer technical interview questions.
            </p>

            <div className="surface-card-subtle" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                <span>Zero complex machine learning prerequisites</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                <span>Working code and architecture repository included</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.88rem' }}>
                <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
                <span>Live interactive session with real-time code-along</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Specific Audience Profiles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {criteria.map((item, idx) => (
              <div 
                key={idx}
                className="surface-card"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--brand-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-accent)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  flexShrink: 0,
                  fontFamily: 'var(--font-mono)'
                }}>
                  0{idx + 1}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      • {item.branch}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default TargetAudience;
