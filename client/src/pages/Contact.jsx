import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import api from '../services/api';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const Contact = () => {
  const { settings, showToast } = useWebsite();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Are all donations eligible for 80G tax exemption?',
      a: `Yes! RK FOUNDATION is a registered public charitable trust with valid 80G and 12A certification (${settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045'}). Donors can claim a 50% deduction on their taxable income. Digital receipts are generated instantly upon contribution.`,
    },
    {
      q: 'Can I visit the slum schools or vocational centers in person?',
      a: 'Absolutely. We actively encourage donors and community members to visit our learning centers in East Delhi and vocational centers in Noida. Please drop us a message or call our helpline to schedule an on-ground tour.',
    },
    {
      q: 'How can corporates partner for CSR initiatives?',
      a: 'We collaborate with corporate partners under Section 135 of the Companies Act, providing tailored CSR proposals, ground impact verification reports, and audited utilization certificates. Please reach out to contact@rkfoundation.org.',
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post('/contact', formData);
      if (res?.success) {
        setSuccess(true);
        showToast('Message sent! Our support team will get back to you shortly.', 'success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Connect With Us"
        title="We Are Here to Assist You"
        subtitle="Have questions about donations, tax exemption certificates, corporate CSR partnerships, or volunteering? Reach out to our dedicated team anytime."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact Us' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-20">
        {/* Contact Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FFC43D]">
                Headquarters
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#151A2D] leading-tight">
                Registered Trust Offices
              </h2>
              <p className="text-sm text-[#697386] leading-relaxed">
                Feel free to visit our office during working hours or call our direct helpline numbers for prompt assistance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E8E8E5] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Registered Office Address</h4>
                  <p className="text-xs text-[#697386] mt-1 leading-relaxed">
                    {settings.contact?.address || 'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E8E8E5] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Helpline Phone Numbers</h4>
                  <p className="text-xs text-[#697386] mt-1">
                    <a href={`tel:${settings.contact?.phone || '+91-9876543210'}`} className="hover:text-[#0B0D17] font-semibold">
                      {settings.contact?.phone || '+91-9876543210'}
                    </a>
                    {settings.contact?.altPhone && (
                      <span className="block mt-0.5">Alt: {settings.contact.altPhone}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E8E8E5] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Official Email Desks</h4>
                  <p className="text-xs text-[#697386] mt-1">
                    <a href={`mailto:${settings.contact?.email || 'contact@rkfoundation.org'}`} className="hover:text-[#0B0D17] font-semibold">
                      General: {settings.contact?.email || 'contact@rkfoundation.org'}
                    </a>
                    <span className="block mt-0.5">Donations: {settings.contact?.donorEmail || 'donate@rkfoundation.org'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-3xl border border-[#E8E8E5] shadow-card">
                <div className="w-10 h-10 rounded-2xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Office Working Hours</h4>
                  <p className="text-xs text-[#697386] mt-1">
                    {settings.contact?.officeHours || 'Mon - Sat: 9:00 AM - 6:30 PM (IST)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E8E5] shadow-card space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#151A2D]">Send Us a Message</h3>
                <p className="text-xs text-[#697386] mt-1">
                  Fill in your details and message below. We will reply within 24 business hours.
                </p>
              </div>

              {success && (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>Your message has been sent successfully! Our team will contact you shortly.</span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#151A2D] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E8E5] text-xs sm:text-sm focus:outline-none focus:border-[#0B0D17] focus:ring-1 focus:ring-[#0B0D17] bg-[#F7F7F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#151A2D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E8E5] text-xs sm:text-sm focus:outline-none focus:border-[#0B0D17] focus:ring-1 focus:ring-[#0B0D17] bg-[#F7F7F5]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#151A2D] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98100 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E8E5] text-xs sm:text-sm focus:outline-none focus:border-[#0B0D17] focus:ring-1 focus:ring-[#0B0D17] bg-[#F7F7F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#151A2D] mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSR Partnership / 80G Receipt Query"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E8E5] text-xs sm:text-sm focus:outline-none focus:border-[#0B0D17] focus:ring-1 focus:ring-[#0B0D17] bg-[#F7F7F5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151A2D] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your inquiry or feedback in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E8E8E5] text-xs sm:text-sm focus:outline-none focus:border-[#0B0D17] focus:ring-1 focus:ring-[#0B0D17] bg-[#F7F7F5]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full font-extrabold text-sm text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-md transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto space-y-8">
          <SectionHeading
            badge="Clear Answers"
            title="Frequently Asked Questions"
            description="Find direct answers to common queries regarding 80G deductions, transparency, and field operations."
          />

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#E8E8E5] overflow-hidden shadow-card transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between text-sm sm:text-base font-bold text-[#151A2D] hover:text-[#0B0D17] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#FFC43D]' : 'text-[#697386]'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#697386] leading-relaxed border-t border-[#E8E8E5] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
