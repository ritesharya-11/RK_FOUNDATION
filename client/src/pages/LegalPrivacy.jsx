import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { ShieldCheck, Lock } from 'lucide-react';

export const LegalPrivacy = () => {
  const { settings } = useWebsite();

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Legal & Compliance"
        title="Privacy Policy"
        subtitle="Our institutional commitment to protecting your personal data, transaction confidentiality, and regulatory disclosure standards."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-8 text-[#697777] bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D9CF] shadow-card">
          <div className="pb-4 border-b border-[#E3D9CF]">
            <p className="text-xs text-[#A0A4AE]">
              Last Updated: January 2026 | RK FOUNDATION (Registered Public Charitable Trust)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#323D3D]">1. Introduction & Overview</h2>
            <p>
              RK FOUNDATION ("we", "our", or "the Trust") values the sacred trust you place in us when donating, volunteering, or visiting our website. This Privacy Policy details our protocols regarding the collection, protection, and lawful utilization of personal donor information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#323D3D]">2. Information We Collect</h2>
            <p>When you contribute or register on our website, we may collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#323D3D]">
              <li>Full Name, Email Address, and Contact Mobile Number.</li>
              <li>Permanent Account Number (PAN) strictly for statutory 80G tax exemption filings under the Income Tax Act, 1961.</li>
              <li>Billing Address for generation of formal charitable contribution receipts.</li>
              <li>Volunteer application background details, interests, and availability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#323D3D]">3. Payment & Card Security</h2>
            <p>
              RK FOUNDATION does not store, process, or view credit/debit card credentials, CVVs, or bank net-banking passwords. All payment transactions are executed securely via RBI-compliant, PCI-DSS Level 1 certified payment gateways equipped with 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#323D3D]">4. No Commercial Sharing or Sale of Data</h2>
            <p>
              We firmly uphold a zero-commercialization policy. We will never sell, rent, trade, or disclose your personal information or contact details to third-party commercial marketing agencies or lead brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#323D3D]">5. Contacting the Trust Grievance Officer</h2>
            <p>
              For questions regarding your data privacy, request for deletion of non-statutory records, or duplicate receipt inquiries, please email <strong>{settings.contact?.email || 'contact@rkfoundation.org'}</strong> or write to <strong>{settings.contact?.address || 'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India'}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicy = LegalPrivacy;
