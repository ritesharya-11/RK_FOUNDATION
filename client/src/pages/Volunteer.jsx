import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import {
  UserCheck,
  CheckCircle2,
  Calendar,
  Award,
  Heart,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const Volunteer = () => {
  const { showToast } = useWebsite();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: 'Delhi-NCR',
    occupation: 'Student / Professional',
    education: '',
    availableHoursPerWeek: 'Weekends only',
    areasOfInterest: ['Child Tutoring & Education'],
    previousExperience: '',
    motivation: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const interestOptions = [
    'Child Tutoring & Education',
    'Medical & Health Camps',
    'Food & Nutrition Drives',
    'Women Vocational Training',
    'Social Media & Content',
    'Fundraising & Outreach',
    'Event Management & Logistics',
  ];

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.areasOfInterest.includes(interest);
      if (exists) {
        return {
          ...prev,
          areasOfInterest: prev.areasOfInterest.filter((i) => i !== interest),
        };
      } else {
        return {
          ...prev,
          areasOfInterest: [...prev.areasOfInterest, interest],
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.motivation.trim()
    ) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (formData.areasOfInterest.length === 0) {
      setErrorMsg('Please select at least one area of volunteer interest.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post('/volunteers', formData);
      if (res?.success) {
        setSuccess(true);
        showToast('Volunteer application submitted successfully!', 'success');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Join Our Movement"
        title="Become an RK Foundation Volunteer"
        subtitle="Dedicate your weekends or evenings to ignite hope. Tutor children, assist in mobile healthcare camps, or manage emergency nutrition relief operations."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Join as Volunteer' },
        ]}
      />

      {/* Main Form & Benefits Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Volunteer Perks & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#F67708]">
                Why Volunteer With Us?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#323D3D] leading-tight">
                Tangible Grassroots Action with Full Support
              </h2>
              <p className="text-sm text-[#697777] leading-relaxed">
                Join a dynamic family of 1,200+ volunteers across Delhi-NCR. We believe dedicated volunteers are the beating heart of long-term social transformation.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E3D9CF] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#036C6C] text-[#F67708] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#323D3D]">Official Volunteer Certification</h4>
                  <p className="text-xs text-[#697777] mt-1 leading-relaxed">
                    Receive government-recognized experience certificates and letters of recommendation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E3D9CF] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#036C6C] text-[#F67708] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#323D3D]">Flexible Scheduling</h4>
                  <p className="text-xs text-[#697777] mt-1 leading-relaxed">
                    Weekend-only batches or weekday evening slots tailored to students and working professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E3D9CF] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#036C6C] text-[#F67708] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#323D3D]">Direct Mentorship & Training</h4>
                  <p className="text-xs text-[#697777] mt-1 leading-relaxed">
                    Orientation sessions guided by senior educators and community social workers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D9CF] shadow-card text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#036C6C] text-[#F67708] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#323D3D]">Application Received!</h3>
                <p className="text-sm text-[#697777] max-w-md mx-auto leading-relaxed">
                  Thank you for stepping forward to serve. Our volunteer onboarding team will review your profile and contact you within 48 hours for orientation.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      city: '',
                      state: 'Delhi-NCR',
                      occupation: 'Student / Professional',
                      education: '',
                      availableHoursPerWeek: 'Weekends only',
                      areasOfInterest: ['Child Tutoring & Education'],
                      previousExperience: '',
                      motivation: '',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#F67708] hover:bg-[#E06800] transition cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-5"
              >
                <h3 className="text-xl font-bold text-[#323D3D]">Volunteer Enrollment Form</h3>

                {errorMsg && (
                  <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-xs flex items-start gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anjali@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98111 22334"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      City of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. New Delhi, Noida, Gurgaon"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      Occupation / Current Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. College Student / Analyst"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      Availability
                    </label>
                    <select
                      value={formData.availableHoursPerWeek}
                      onChange={(e) =>
                        setFormData({ ...formData, availableHoursPerWeek: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    >
                      <option value="Weekends only">Weekends only</option>
                      <option value="2-4 hours">2-4 hours per week</option>
                      <option value="5-10 hours">5-10 hours per week</option>
                      <option value="10-20 hours">10-20 hours per week</option>
                      <option value="Full-time">Full-time Fellowship</option>
                    </select>
                  </div>
                </div>

                {/* Areas of Interest Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-[#323D3D] mb-2">
                    Areas of Interest (Select All That Apply) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {interestOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs cursor-pointer transition ${
                          formData.areasOfInterest.includes(opt)
                            ? 'bg-[#036C6C] border-[#036C6C] text-[#F67708] font-bold'
                            : 'bg-[#FAF7F2] border-[#E3D9CF] text-[#323D3D] hover:border-[#F67708]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.areasOfInterest.includes(opt)}
                          onChange={() => handleInterestToggle(opt)}
                          className="accent-[#F67708]"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#323D3D] mb-1">
                    Why do you wish to volunteer with RK FOUNDATION? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us what motivates you to participate..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full font-extrabold text-sm text-white bg-[#F67708] hover:bg-[#E06800] shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Volunteer Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
