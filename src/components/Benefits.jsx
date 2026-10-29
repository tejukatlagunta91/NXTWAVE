import React from 'react';
import { Terminal, GitBranch, Layers, MessageSquare, Code2, ArrowRight } from 'lucide-react';

export const Benefits = () => {
  const agendaPhases = [
    {
      time: '00–15 Min',
      phase: 'Phase 1: Architecture & Model Selection',
      detail: 'Demystifying modern LLM APIs, prompt orchestration, and zero-setup developer toolchains without unnecessary infrastructure complexity.'
    },
    {
      time: '15–40 Min',
      phase: 'Phase 2: Hands-On Interactive Code-Along',
      detail: 'Building the core AI prototype line-by-line alongside the mentor. Connecting endpoints, handling model responses, and testing functional code.'
    },
    {
      time: '40–50 Min',
      phase: 'Phase 3: Web Deployment & Portfolio Hosting',
      detail: 'Deploying your project to a public URL that recruiters can directly interact with from your resume links or GitHub profile.'
    },
    {
      time: '50–60 Min',
      phase: 'Phase 4: Placement Interview Playbook & Q&A',
      detail: 'How to articulate architectural design choices, handle trade-off questions, and discuss scalability during campus recruitment rounds.'
    }
  ];

  const deliverables = [
    {
      icon: <GitBranch size={18} color="var(--brand-accent)" />,
      title: 'Complete Project Repository',
      desc: 'Clean, well-documented starter codebase with modular structure ready to customize for your final-year portfolio.'
    },
    {
      icon: <Layers size={18} color="#a5b4fc" />,
      title: 'Architecture & Flow Diagrams',
      desc: 'High-level system design visual to include directly in project reports and placement presentation slides.'
    },
    {
      icon: <MessageSquare size={18} color="#34d399" />,
      title: 'Interview Talking Points Cheatsheet',
      desc: 'Concise answers to common technical interview questions about latency, prompt chaining, and API integration.'
    }
  ];

  return (
    <section id="about" className="section-py" style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="badge badge-brand" style={{ marginBottom: '0.75rem' }}>
            WORKSHOP CURRICULUM
          </span>
          <h2 className="section-title">
            60-Minute Masterclass Agenda & Deliverables
          </h2>
          <p className="section-subtitle">
            A fast-paced, practical session designed to deliver working code and placement interview confidence.
          </p>
        </div>

        {/* 4-Phase Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {agendaPhases.map((phase, idx) => (
            <div key={idx} className="surface-card" style={{ padding: '1.25rem', position: 'relative' }}>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--brand-accent)',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                marginBottom: '0.75rem'
              }}>
                {phase.time}
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: '0.45rem', color: 'var(--text-primary)' }}>
                {phase.phase}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {phase.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Concrete Placement Deliverables Strip */}
        <div className="surface-card" style={{ padding: '1.75rem 2rem' }}>
          <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.25rem' }}>
            Tangible Assets You Walk Away With
          </div>

          <div className="grid-3">
            {deliverables.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item.desc}
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

export default Benefits;
