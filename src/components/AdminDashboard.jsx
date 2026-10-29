import React, { useState, useEffect } from 'react';
import { 
  Target, DollarSign, TrendingUp, Search, RefreshCw, 
  PlusCircle, Trash2, Shield, AlertTriangle, Award, 
  BarChart3, CheckCircle, HardDrive, Eye, Calendar, RotateCcw,
  Layers, Users, ArrowUpRight
} from 'lucide-react';
import api from '../services/api.js';

export const AdminDashboard = ({ token, onLogout }) => {
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Active Tab: 'overview' | 'budget' | 'audit'
  const [activeTab, setActiveTab] = useState('overview');

  // Table Filters
  const [filterType, setFilterType] = useState('all'); // 'all' | 'genuine' | 'demo'
  const [sourceFilter, setSourceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState(null);

  // Load Dashboard Data directly from localStorage via api service
  const loadData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError(null);

    try {
      const [statsRes, regsRes] = await Promise.all([
        api.getCampaignStats(),
        api.getAdminRegistrations({
          filter: filterType,
          search: searchQuery,
          source: sourceFilter,
          page: 1,
          limit: 100
        })
      ]);

      setStats(statsRes.data);
      setRegistrations(regsRes.data.records || []);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      setError(err.message || 'Error loading dashboard metrics.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadData();
  }, [filterType, sourceFilter, searchQuery]);

  // Seed 5 sample demo records
  const handleSeedDemo = async () => {
    try {
      setRefreshing(true);
      const res = await api.seedDemoData(5);
      setActionNotice(res.message);
      await loadData(true);
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      setError(err.message || 'Failed to seed sample data');
    }
  };

  // Clear sample demo records
  const handleClearDemo = async () => {
    if (!window.confirm('Remove all SAMPLE DEMO records? Any manually submitted prototype registrations will be kept.')) {
      return;
    }
    try {
      setRefreshing(true);
      const res = await api.clearDemoData();
      setActionNotice(res.message);
      await loadData(true);
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      setError(err.message || 'Failed to clear sample data');
    }
  };

  // Clear manually submitted registrations
  const handleClearUserRegistrations = async () => {
    if (!window.confirm('Clear all your MANUALLY SUBMITTED prototype registrations from localStorage?')) {
      return;
    }
    try {
      setRefreshing(true);
      const res = await api.clearUserRegistrations();
      setActionNotice(res.message);
      await loadData(true);
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      setError(err.message || 'Failed to clear prototype registrations');
    }
  };

  // Factory reset prototype
  const handleResetAll = async () => {
    if (!window.confirm('Reset the prototype completely to default initial state? This resets all registrations, visits, and settings.')) {
      return;
    }
    try {
      setRefreshing(true);
      const res = await api.resetAll();
      setActionNotice(res.message);
      await loadData(true);
      setTimeout(() => setActionNotice(null), 3500);
    } catch (err) {
      setError(err.message || 'Failed to reset prototype');
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <RefreshCw size={28} className="animate-spin" color="var(--brand-primary)" style={{ margin: '0 auto 1.25rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Loading Campaign Operations...</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Aggregating registrations and channel attribution data</p>
      </div>
    );
  }

  const genuine = stats?.summary?.genuineCount || 0;
  const demoCount = stats?.summary?.demoCount || 0;
  const total = stats?.summary?.totalCount || 0;
  const goal = stats?.campaign?.goal || 500;
  const maxBudget = stats?.campaign?.maxBudget || 2000;
  const progressPercent = stats?.summary?.progressPercent || 0;
  const costPerLeadTarget = stats?.campaign?.costPerLeadTarget || 4.00;
  const budgetPlan = stats?.campaign?.budgetPlan || [];

  const channelColors = {
    whatsapp: '#22c55e',
    referral: '#818cf8',
    college_club: '#38bdf8',
    linkedin: '#0ea5e9',
    faculty: '#f59e0b'
  };

  return (
    <div style={{ padding: '2.5rem 0 5rem' }}>
      <div className="container">
        
        {/* Top Control Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.25rem',
          marginBottom: '1.75rem',
          borderBottom: '1px solid var(--border-default)',
          paddingBottom: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-brand">
                <Shield size={11} />
                <span>CAMPAIGN OPERATIONS</span>
              </span>
              <span className="badge badge-neutral">
                <HardDrive size={11} />
                <span>BROWSER LOCALSTORAGE</span>
              </span>
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Campaign Growth Tracker & Analytics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              "Build Your First AI Project in 60 Minutes" • 500 Registrations Target • ₹2,000 Maximum Budget
            </p>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => loadData(true)} 
              disabled={refreshing}
              className="btn btn-secondary btn-sm"
              title="Refresh local storage data"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button 
              onClick={handleSeedDemo}
              disabled={refreshing}
              className="btn btn-secondary btn-sm"
              title="Seed 5 sample records for demonstration"
            >
              <PlusCircle size={13} color="var(--brand-accent)" />
              <span>Seed +5 Sample</span>
            </button>

            {demoCount > 0 && (
              <button 
                onClick={handleClearDemo}
                disabled={refreshing}
                className="btn btn-secondary btn-sm"
                style={{ color: '#f87171' }}
                title="Remove sample records while keeping your prototype registrations"
              >
                <Trash2 size={13} />
                <span>Clear Sample ({demoCount})</span>
              </button>
            )}

            {genuine > 0 && (
              <button 
                onClick={handleClearUserRegistrations}
                disabled={refreshing}
                className="btn btn-secondary btn-sm"
                style={{ color: '#fbbf24' }}
                title="Clear manually registered prototype entries"
              >
                <Trash2 size={13} />
                <span>Clear Mine ({genuine})</span>
              </button>
            )}

            <button 
              onClick={handleResetAll}
              disabled={refreshing}
              className="btn btn-secondary btn-sm"
              title="Factory reset prototype state"
            >
              <RotateCcw size={13} />
              <span>Reset All</span>
            </button>

            <button 
              onClick={onLogout}
              className="btn btn-outline btn-sm"
            >
              Exit Dashboard
            </button>
          </div>
        </div>

        {/* Temporary Action Toast Notification */}
        {actionNotice && (
          <div style={{
            backgroundColor: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            color: '#34d399',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle size={16} />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Local Prototype Scope Disclosure */}
        <div style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.15rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={15} color="var(--warning)" style={{ flexShrink: 0 }} />
            <span>
              <strong>Local Prototype Scope:</strong> All data is derived dynamically from your browser's <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-accent)' }}>localStorage</code>. Sample demo records are flagged as <span className="badge badge-demo" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>SAMPLE DATA</span> and excluded from genuine campaign KPI calculations.
            </span>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            Prototype Genuine: <strong style={{ color: 'var(--success)' }}>{genuine}</strong> | Sample Demo: <strong style={{ color: '#f87171' }}>{demoCount}</strong>
          </div>
        </div>

        {/* Primary KPI Grid (Linear-Style High Contrast) */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          
          {/* Card 1: Registrations Progress */}
          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Prototype Registrations
              </span>
              <Target size={15} color="var(--brand-accent)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {genuine} <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {goal}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--success)' }}>
              <TrendingUp size={13} />
              <span>{progressPercent}% towards 7-day goal</span>
            </div>
          </div>

          {/* Card 2: Maximum Budget Limit */}
          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Budget Limit
              </span>
              <DollarSign size={15} color="var(--success)" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              ₹{maxBudget}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Target CAC: ₹{costPerLeadTarget}/student at 500 goal
            </div>
          </div>

          {/* Card 3: Observed Page Visits */}
          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Observed Channel Visits
              </span>
              <Eye size={15} color="#818cf8" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {stats?.summary?.totalObservedVisits || 0}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Browser-observed clicks across 5 channels
            </div>
          </div>

          {/* Card 4: Prototype Conversion Rate */}
          <div className="surface-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                Observed Conversion Rate
              </span>
              <BarChart3 size={15} color="#f472b6" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              {stats?.summary?.overallConversionRate || 0}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Registrations vs observed visits
            </div>
          </div>

        </div>

        {/* 500-Target Goal Progress Bar */}
        <div className="surface-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Registration Milestone Tracker</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Target: 500 Genuine Engineering Student Registrations within 7 Days
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-accent)' }}>
                {progressPercent}%
              </span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {Math.max(0, goal - genuine)} spots remaining
              </div>
            </div>
          </div>

          <div className="progress-track" style={{ height: '10px' }}>
            <div className="progress-fill" style={{ width: `${Math.min(100, progressPercent)}%` }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>0</span>
            <span>125 (25%)</span>
            <span>250 (50%)</span>
            <span>375 (75%)</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>500 (100% Target)</span>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-default)',
          marginBottom: '2rem'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'overview' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'overview' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <BarChart3 size={15} />
            <span>Channel Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'budget' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'budget' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <DollarSign size={15} />
            <span>7-Day Staged Budget Plan</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            style={{
              padding: '0.75rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'audit' ? '2px solid var(--brand-primary)' : '2px solid transparent',
              color: activeTab === 'audit' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <Users size={15} />
            <span>Registrations Audit Log ({registrations.length})</span>
          </button>
        </div>

        {/* TAB 1: Channel Analytics & Referral Leaderboard */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  Marketing Source Performance (5 Channels)
                </h2>
                <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                  No Double-Counting • 1 Primary Attribution per Student
                </span>
              </div>

              {/* 5 Channel Cards */}
              <div className="grid-5" style={{ marginBottom: '1.25rem' }}>
                {stats?.sources?.map((ch) => {
                  const color = channelColors[ch.key] || 'var(--brand-primary)';
                  return (
                    <div key={ch.key} className="surface-card" style={{ padding: '1.15rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {ch.label}
                        </span>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                      </div>

                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                        {ch.genuineCount}
                        {ch.demoCount > 0 && (
                          <span style={{ fontSize: '0.72rem', color: '#f87171', fontWeight: 400, marginLeft: '0.3rem' }}>
                            (+{ch.demoCount} sample)
                          </span>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        <span>Share:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{ch.percentageOfGenuine}%</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Conversion:</span>
                        <span style={{ color: 'var(--success)', fontWeight: 600 }}>{ch.conversionRate}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Visual Segmented Distribution Bar */}
              <div className="surface-card" style={{ padding: '1.25rem 1.5rem' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Channel Contribution Share (Prototype Registrations)
                </div>

                {genuine === 0 ? (
                  <div style={{ padding: '1.25rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                    No prototype registrations submitted yet. Fill out the workshop registration form to see live channel distribution!
                  </div>
                ) : (
                  <div>
                    <div style={{
                      display: 'flex',
                      width: '100%',
                      height: '18px',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }}>
                      {stats?.sources?.map((ch) => {
                        const widthPercent = ch.percentageOfGenuine || 0;
                        if (widthPercent === 0) return null;
                        return (
                          <div
                            key={ch.key}
                            style={{
                              width: `${widthPercent}%`,
                              backgroundColor: channelColors[ch.key] || 'var(--brand-primary)',
                              height: '100%',
                              transition: 'width 0.4s ease'
                            }}
                            title={`${ch.label}: ${ch.genuineCount} (${widthPercent}%)`}
                          />
                        );
                      })}
                    </div>

                    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '0.85rem', fontSize: '0.78rem' }}>
                      {stats?.sources?.map((ch) => (
                        <div key={ch.key} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: channelColors[ch.key] || 'var(--brand-primary)' }} />
                          <span style={{ color: 'var(--text-muted)' }}>{ch.label}:</span>
                          <strong style={{ color: 'var(--text-primary)' }}>{ch.genuineCount} ({ch.percentageOfGenuine}%)</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Referral Codes Leaderboard */}
            {stats?.topReferralCodes && stats.topReferralCodes.length > 0 && (
              <div className="surface-card" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1rem' }}>
                  <Award size={17} color="var(--brand-accent)" />
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Top Student Referral Ambassadors</h3>
                </div>
                
                <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                  {stats.topReferralCodes.map((item, index) => (
                    <div key={item.code} style={{
                      backgroundColor: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--brand-primary-light)',
                        color: 'var(--brand-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        #{index + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                          {item.code}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <strong style={{ color: 'var(--success)' }}>{item.genuineReferrals}</strong> signups
                          {item.demoReferrals > 0 && <span style={{ color: '#f87171' }}> (+{item.demoReferrals} sample)</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 7-Day Staged Budget Plan (Section 6 Requirement) */}
        {activeTab === 'budget' && (
          <div className="surface-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                  <DollarSign size={18} color="var(--success)" />
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                    Proposed 7-Day Staged Budget Plan (₹2,000 Maximum Budget)
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  A disciplined, staged allocation framework designed to hit 500 genuine registrations with zero wasted spend.
                </p>
              </div>

              <span className="badge badge-success">
                Planned Allocation Limits
              </span>
            </div>

            <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
              {budgetPlan.map((stage, idx) => (
                <div key={idx} className="surface-card-subtle" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--brand-accent)', fontFamily: 'var(--font-mono)' }}>
                      {stage.phase}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {stage.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                    ₹{stage.plannedAllocation}
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#a5b4fc', marginBottom: '0.5rem' }}>
                    {stage.stageName}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, flexGrow: 1 }}>
                    {stage.strategy}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed var(--border-default)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55
            }}>
              ℹ️ <strong>Budget Transparency Note:</strong> These figures represent <em>proposed allocation ceilings</em>, not actual expenditures. Days 1–2 test organic distribution (WhatsApp batch groups & LinkedIn) at ₹0 cost. Days 3–7 capital is deployed only if justified by observed conversion rates.
            </div>
          </div>
        )}

        {/* TAB 3: Registrations Audit Log Table */}
        {activeTab === 'audit' && (
          <div className="surface-card" style={{ padding: '1.75rem' }}>
            
            {/* Table Filter Toolbar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Student Registrations Audit Log</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Showing {registrations.length} records matching current filter
                </p>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                
                {/* Type Filter Buttons */}
                <div style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.15rem',
                  display: 'flex'
                }}>
                  <button
                    onClick={() => setFilterType('all')}
                    style={{
                      background: filterType === 'all' ? 'var(--brand-primary)' : 'transparent',
                      color: filterType === 'all' ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    All ({total})
                  </button>
                  <button
                    onClick={() => setFilterType('genuine')}
                    style={{
                      background: filterType === 'genuine' ? 'var(--brand-primary)' : 'transparent',
                      color: filterType === 'genuine' ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Prototype ({genuine})
                  </button>
                  <button
                    onClick={() => setFilterType('demo')}
                    style={{
                      background: filterType === 'demo' ? 'var(--brand-primary)' : 'transparent',
                      color: filterType === 'demo' ? '#fff' : 'var(--text-secondary)',
                      border: 'none',
                      padding: '0.35rem 0.65rem',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Sample ({demoCount})
                  </button>
                </div>

                {/* Source Select */}
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="form-select"
                  style={{ width: 'auto', height: '34px', padding: '0 0.75rem', fontSize: '0.8rem' }}
                >
                  <option value="">All 5 Channels</option>
                  <option value="whatsapp">WhatsApp Groups</option>
                  <option value="referral">Friends' Referral</option>
                  <option value="college_club">College Clubs</option>
                  <option value="linkedin">LinkedIn Organic</option>
                  <option value="faculty">Faculty Recommendation</option>
                </select>

                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search name, college, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ height: '34px', padding: '0 0.75rem 0 2rem', fontSize: '0.8rem', width: '200px' }}
                  />
                  <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

              </div>
            </div>

            {/* Table */}
            {registrations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  No registrations found
                </div>
                <p style={{ fontSize: '0.82rem' }}>
                  Try clearing your search query or click "Seed +5 Sample" in the toolbar above.
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="app-table">
                  <thead>
                    <tr>
                      <th>Record Type</th>
                      <th>Student Name</th>
                      <th>College / University</th>
                      <th>Email Address</th>
                      <th>Channel</th>
                      <th>Ref Used</th>
                      <th>Their Code</th>
                      <th>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id || reg._id}>
                        <td>
                          {reg.isDemo ? (
                            <span className="badge badge-demo" style={{ fontSize: '0.7rem' }}>SAMPLE DATA</span>
                          ) : (
                            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>PROTOTYPE</span>
                          )}
                        </td>
                        <td style={{ fontWeight: 600 }}>{reg.fullName}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{reg.college}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#a5b4fc' }}>{reg.email}</td>
                        <td>
                          <span className="badge badge-neutral" style={{ fontSize: '0.72rem' }}>
                            {reg.marketingSource}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                          {reg.referralCodeUsed ? (
                            <span style={{ color: 'var(--brand-accent)' }}>{reg.referralCodeUsed}</span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>—</span>
                          )}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.82rem', color: '#c084fc' }}>
                          {reg.myReferralCode || '—'}
                        </td>
                        <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {new Date(reg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
