import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Lock, ArrowRight } from 'lucide-react';
import api from '../services/api.js';

export const RegistrationForm = ({ onRegistrationSuccess, initialSource = 'whatsapp', initialReferral = '' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    college: '',
    marketingSource: initialSource || 'whatsapp',
    referralCode: initialReferral || ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateAlert, setDuplicateAlert] = useState(null);
  const [generalError, setGeneralError] = useState(null);

  // Sync props when query parameters update
  useEffect(() => {
    if (initialSource) {
      setFormData((prev) => ({ ...prev, marketingSource: initialSource }));
    }
    if (initialReferral) {
      setFormData((prev) => ({ ...prev, referralCode: initialReferral }));
    }
  }, [initialSource, initialReferral]);

  // Client validation
  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Full Name is required (minimum 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.college.trim() || formData.college.trim().length < 2) {
      errs.college = 'College / University name is required';
    }

    if (!formData.marketingSource) {
      errs.marketingSource = 'Please select how you heard about this session';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    setDuplicateAlert(null);
    setGeneralError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setDuplicateAlert(null);
    setGeneralError(null);

    try {
      const response = await api.registerStudent(formData);

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        college: '',
        marketingSource: initialSource || 'whatsapp',
        referralCode: ''
      });

      if (onRegistrationSuccess) {
        onRegistrationSuccess(response.data);
      }
    } catch (err) {
      console.warn('Registration error:', err);
      if (err.isDuplicate || err.status === 409) {
        setDuplicateAlert({
          message: err.message || `A registration with email "${formData.email}" already exists.`,
          existingRecord: err.existingRecord || err.data?.existingRecord
        });
      } else if (err.field) {
        setErrors({ [err.field]: err.message });
      } else if (err.data?.errors) {
        setErrors(err.data.errors);
      } else {
        setGeneralError(err.message || 'Registration could not be completed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="section-py">
      <div className="container-sm">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="badge badge-brand" style={{ marginBottom: '0.75rem' }}>
            FREE REGISTRATION
          </span>
          <h2 className="section-title">
            Reserve Your Workshop Spot
          </h2>
          <p className="section-subtitle">
            Join final-year engineering peers across campuses. Fill in your details below to confirm your seat and receive your referral link.
          </p>
        </div>

        {/* Duplicate Registration Alert Box */}
        {duplicateAlert && (
          <div style={{
            background: 'var(--error-bg)',
            border: '1px solid var(--error-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.85rem'
          }}>
            <AlertCircle size={20} color="var(--error)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#f87171', marginBottom: '0.2rem', fontSize: '0.92rem' }}>
                Already Registered
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                {duplicateAlert.message} Each student can register once with their unique email address.
              </div>
              {duplicateAlert.existingRecord && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Registered on: {new Date(duplicateAlert.existingRecord.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* General Error Alert */}
        {generalError && (
          <div style={{
            background: 'var(--error-bg)',
            border: '1px solid var(--error-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem 1rem',
            marginBottom: '1.5rem',
            color: '#f87171',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} color="var(--error)" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Main Form Surface */}
        <div className="surface-card" style={{ padding: '2rem 2.25rem' }}>
          <form onSubmit={handleSubmit} noValidate>
            
            {/* Full Name & Email Row */}
            <div className="grid-2" style={{ marginBottom: '0.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.fullName && <div className="form-error"><AlertCircle size={13} />{errors.fullName}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. rahul@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && <div className="form-error"><AlertCircle size={13} />{errors.email}</div>}
              </div>
            </div>

            {/* College Name & Marketing Channel Row */}
            <div className="grid-2" style={{ marginBottom: '0.25rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="college">
                  College / University <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="e.g. National Institute of Technology"
                  value={formData.college}
                  onChange={handleChange}
                  className={`form-input ${errors.college ? 'error' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.college && <div className="form-error"><AlertCircle size={13} />{errors.college}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="marketingSource">
                  Marketing Channel <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <select
                  id="marketingSource"
                  name="marketingSource"
                  value={formData.marketingSource}
                  onChange={handleChange}
                  className={`form-select ${errors.marketingSource ? 'error' : ''}`}
                  disabled={isSubmitting}
                >
                  <option value="whatsapp">WhatsApp Groups</option>
                  <option value="referral">Friends' Referral Link</option>
                  <option value="college_club">College Club / Coding Cell</option>
                  <option value="linkedin">LinkedIn Organic Post</option>
                  <option value="faculty">Faculty Recommendation</option>
                </select>
                {errors.marketingSource && <div className="form-error"><AlertCircle size={13} />{errors.marketingSource}</div>}
              </div>
            </div>

            {/* Referral Code (100% Optional for all channels) */}
            <div className="form-group">
              <label className="form-label" htmlFor="referralCode">
                Referral Code <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional — Leave blank if none)</span>
              </label>
              <input
                id="referralCode"
                name="referralCode"
                type="text"
                placeholder="Optional (leave blank if you don't have one)"
                value={formData.referralCode}
                onChange={handleChange}
                className="form-input"
                style={{ textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}
                disabled={isSubmitting}
              />
              <div className="form-hint">
                {formData.referralCode 
                  ? '✓ Referral code detected. Your referrer will receive attribution.' 
                  : 'You do not need a referral code to register. Leave this blank if you registered independently.'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.75rem' }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processing Registration...</span>
                </>
              ) : (
                <>
                  <span>Confirm Free Registration</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <Lock size={12} />
              <span>100% Free • No payment details needed • Instant confirmation & referral code</span>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default RegistrationForm;
