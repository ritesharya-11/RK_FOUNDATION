import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export const RefundPolicy = () => {
  const { settings } = useWebsite();

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Financial Safeguards"
        title="Donation Cancellation & 7-Day Refund Policy"
        subtitle="Transparent guidelines regarding contribution processing, technical erroneous debits, and our structured 7-day refund window."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Refund Policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-8 text-slate-600 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-card">
          <div className="pb-4 border-b border-slate-200">
            <p className="text-xs text-slate-400">
              Last Updated: January 2026 | RK FOUNDATION (Public Charitable Trust)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#121316]">1. General Refund Principle</h2>
            <p>
              As an established public charitable trust, contributions once remitted to RK FOUNDATION are designated for immediate on-ground deployment in child education, pediatric treatments, and food distributions. Consequently, standard voluntary donations are non-refundable once disbursed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#121316]">2. Seven (7) Days Technical Window for Duplicate / Erroneous Debits</h2>
            <p>
              We maintain a <strong>7-Day Refund Consideration Window</strong> for specific extenuating technical circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121316]">
              <li><strong>Duplicate Transaction:</strong> Where a donor's bank account or card was charged twice due to network timeout or gateway glitches.</li>
              <li><strong>Erroneous Keying of Amount:</strong> Where an unintended amount was entered (e.g. ₹50,000 instead of ₹5,000) and reported immediately.</li>
              <li><strong>Unauthorized Fraudulent Transaction:</strong> In cases of stolen credentials supported by an official banking dispute.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#121316]">3. How to Submit a Refund Request</h2>
            <p>
              To lodge a formal refund claim, the donor must email <strong>{settings.contact?.donorEmail || 'donate@rkfoundation.org'}</strong> within seven (7) calendar days of the transaction timestamp with the following documentation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121316]">
              <li>Official RK Foundation Receipt Number.</li>
              <li>Payment Gateway Reference / Transaction ID / Bank UTR.</li>
              <li>Bank statement snippet evidencing the debit.</li>
              <li>Explicit reason and written statement requesting cancellation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#121316]">4. Refund Processing Mechanism</h2>
            <p>
              Upon verification and internal approval by the Trust's finance committee, the approved refund will be credited back exclusively to the original payment source (bank account, card, or UPI VPA) within 5 to 7 business banking days. In cases where an 80G tax certificate has already been issued, the donor must surrender and treat that receipt number as void for tax deduction purposes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
