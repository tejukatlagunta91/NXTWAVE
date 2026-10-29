/**
 * Frontend-Only API Adapter
 * Maps application calls to the localStorage storageService.
 * Requires NO backend server, NO database, and NO API keys.
 * Deployable directly on Vercel.
 */

import storageService from './storage.js';

export const api = {
  // Public Methods
  async getHealth() {
    return {
      status: 'operational',
      environment: 'frontend_only_local_prototype',
      storage: 'browser_localStorage',
      timestamp: new Date().toISOString()
    };
  },

  async getCampaignStats() {
    const stats = storageService.getCampaignStats();
    return {
      success: true,
      data: stats
    };
  },

  async getSources() {
    const stats = storageService.getCampaignStats();
    return {
      success: true,
      totalGenuine: stats.summary.genuineCount,
      totalDemo: stats.summary.demoCount,
      sources: stats.sources
    };
  },

  async registerStudent(payload) {
    const result = storageService.register(payload);
    return {
      success: true,
      message: '🎉 Congratulations! Your registration is confirmed in this local prototype!',
      data: {
        id: result.registration.id,
        fullName: result.registration.fullName,
        email: result.registration.email,
        college: result.registration.college,
        marketingSource: result.registration.marketingSource,
        referralCodeUsed: result.registration.referralCodeUsed,
        myReferralCode: result.registration.myReferralCode,
        shareUrl: result.shareUrl,
        createdAt: result.registration.createdAt,
        isDemo: result.registration.isDemo
      }
    };
  },

  async trackVisit(source, referralCode) {
    storageService.recordVisit(source, referralCode);
    return { success: true };
  },

  // Admin Methods (Demo Interface)
  async adminLogin(username, password) {
    const auth = storageService.adminLogin(username, password);
    return {
      success: true,
      message: 'Demo Admin Authenticated',
      data: {
        token: auth.token,
        username: 'admin',
        role: 'Demo Campaign Administrator'
      }
    };
  },

  async getAdminRegistrations({ filter = 'all', search = '', source = '', page = 1, limit = 100 } = {}) {
    let records = storageService.getRegistrations();

    if (filter === 'genuine') {
      records = records.filter((r) => !r.isDemo);
    } else if (filter === 'demo') {
      records = records.filter((r) => r.isDemo);
    }

    if (source) {
      records = records.filter((r) => r.marketingSource === source);
    }

    if (search) {
      const q = search.toLowerCase();
      records = records.filter(
        (r) =>
          r.fullName.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.college.toLowerCase().includes(q) ||
          (r.referralCodeUsed && r.referralCodeUsed.toLowerCase().includes(q)) ||
          (r.myReferralCode && r.myReferralCode.toLowerCase().includes(q))
      );
    }

    const total = records.length;
    const startIndex = (page - 1) * limit;
    const paginated = records.slice(startIndex, startIndex + Number(limit));

    return {
      success: true,
      data: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit) || 1,
        records: paginated
      }
    };
  },

  async seedDemoData(count = 5) {
    const added = storageService.seedDemoData(count);
    return {
      success: true,
      message: `Generated ${added.length} sample demo registrations.`,
      data: added
    };
  },

  async clearDemoData() {
    const res = storageService.clearDemoData();
    return {
      success: true,
      message: `Cleared ${res.removedCount} sample demo records. Manually submitted prototype registrations are preserved.`,
      data: res
    };
  },

  async clearUserRegistrations() {
    const res = storageService.clearUserRegistrations();
    return {
      success: true,
      message: `Cleared ${res.removedCount} prototype registrations.`,
      data: res
    };
  },

  async resetAll() {
    storageService.resetAll();
    return {
      success: true,
      message: 'Restored prototype to initial factory state.'
    };
  }
};

export default api;
