import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Award,
  Save,
  Users,
  GraduationCap,
  Sparkles,
  Utensils,
  HeartPulse,
  HeartHandshake,
  TrendingUp,
  Eye,
} from 'lucide-react';

export const AdminImpactCMS = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const [stats, setStats] = useState({
    livesImpacted: settings.impactStats?.livesImpacted || 48500,
    childrenEducated: settings.impactStats?.childrenEducated || 12400,
    womenEmpowered: settings.impactStats?.womenEmpowered || 4200,
    mealsServed: settings.impactStats?.mealsServed || 185000,
    healthCampsConducted: settings.impactStats?.healthCampsConducted || 340,
    activeVolunteers: settings.impactStats?.activeVolunteers || 1250,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, val) => {
    setStats({ ...stats, [field]: Number(val) || 0 });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', {
        impactStats: stats,
      });
      if (res?.success) {
        showToast('Impact metrics updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update impact stats.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const metricsConfig = [
    {
      key: 'livesImpacted',
      label: 'Lives Impacted',
      desc: 'Total beneficiaries reached across schooling, health, and relief.',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
    },
    {
      key: 'childrenEducated',
      label: 'Children Educated',
      desc: 'Slum & rural children supported with evening non-formal schooling.',
      icon: GraduationCap,
      color: 'from-amber-500 to-yellow-600',
    },
    {
      key: 'womenEmpowered',
      label: 'Women Empowered',
      desc: 'Self-help group members trained with vocational sewing skills.',
      icon: Sparkles,
      color: 'from-purple-600 to-pink-600',
    },
    {
      key: 'mealsServed',
      label: 'Nutritional Meals Distributed',
      desc: 'Daily cooked hot meals and dry ration emergency kits served.',
      icon: Utensils,
      color: 'from-emerald-600 to-teal-600',
    },
    {
      key: 'healthCampsConducted',
      label: 'Free Health Checkup Camps',
      desc: 'Doctor consultations, pediatric diagnostics, and free medicines.',
      icon: HeartPulse,
      color: 'from-red-600 to-rose-600',
    },
    {
      key: 'activeVolunteers',
      label: 'Active Changemakers / Volunteers',
      desc: 'Registered ground workers, educators, and field organizers.',
      icon: HeartHandshake,
      color: 'from-cyan-600 to-blue-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Our Impact CMS & Field Numbers</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Maintain accurate ground impact metrics presented in public impact tickers, annual audits, and brochures.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Publish Impact Numbers'}</span>
        </button>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricsConfig.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.key}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">{m.label}</span>
                <span className="p-2 rounded-xl bg-slate-800 text-white">
                  <Icon className="w-4 h-4" />
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Recorded Total Metric Count
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={stats[m.key]}
                    onChange={(e) => handleChange(m.key, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-lg font-black text-white focus:outline-hidden focus:border-red-500 font-mono"
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-black text-[#FFC43D]">
                    +
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Simulation Strip */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span>Public Website Preview (Desktop Strip)</span>
          </span>
          <span className="text-[10px] text-[#FFC43D] font-bold">
            Live Preview
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200">
          <div className="text-center max-w-md mx-auto mb-6">
            <span className="text-[10px] font-bold text-[#FFC43D] uppercase tracking-wider block">
              Measurable Change on the Ground
            </span>
            <h3 className="text-base font-extrabold text-[#151A2D]">
              Our Community Impact Across India
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            {metricsConfig.map((m) => (
              <div key={m.key} className="p-3 rounded-2xl bg-[#F7F7F5] border border-[#E8E8E5]">
                <span className="block text-lg font-black text-[#0B0D17]">
                  {stats[m.key]?.toLocaleString('en-IN')}+
                </span>
                <span className="block text-[10px] font-semibold text-[#697386] mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

