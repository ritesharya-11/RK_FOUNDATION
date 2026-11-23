import React from 'react';
import { useWebsite } from '../context/WebsiteContext';

// Helper: Convert number to Indian English words
export const numberToWords = (num) => {
  if (!num || isNaN(num)) return 'Zero Rupees Only';
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const n = ('000000000' + Math.round(Number(num))).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return `${num} Rupees Only`;
  let str = '';
  str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
  str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
  str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
  str += Number(n[4]) !== 0 ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
  str +=
    Number(n[5]) !== 0
      ? (str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' '
      : '';
  return (str.trim() || 'Zero') + ' Rupees Only';
};

export const formatReceiptDate = (dateVal) => {
  if (!dateVal) return '09 November 2026';
  // If string already formatted like "17/11/2026" or "10/5/2026"
  if (typeof dateVal === 'string' && dateVal.includes('/')) {
    const parts = dateVal.split('/');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const monthIdx = parseInt(parts[1], 10) - 1;
      const year = parts[2];
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      if (monthNames[monthIdx]) {
        return `${day} ${monthNames[monthIdx]} ${year}`;
      }
    }
  }
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const DonationReceipt = ({ donation, id = 'printable-donation-receipt' }) => {
  const { settings } = useWebsite();

  if (!donation) return null;

  const receiptNumber = donation.receiptNumber || donation.subReceiptNumber || 'RCT-202611-0006';
  const donationDate = formatReceiptDate(donation.createdAt || donation.date || new Date());
  const donorName = donation.donorName || 'Shailendra Mishra';
  const donorPan = donation.donorPan || 'N/A';
  const donorCity = donation.city || 'Delhi';
  const donorPhone = donation.donorPhone || '+91-9311878362';
  const donorEmail = donation.donorEmail || 'contact@rebirthcaretrust.org';
  const purpose = donation.campaignTitle || donation.donationPurpose || 'General Charitable Fund';
  const paymentMode =
    donation.paymentModeFormatted ||
    donation.paymentMode ||
    (donation.paymentGateway === 'razorpay' ? 'Website (Online Razorpay)' : 'Website (Online Razorpay)');
  const transactionRef =
    donation.paymentId ||
    donation.transactionId ||
    donation.subReceiptNumber ||
    'pay_TxxPVx8mRwbkib';
  const amount = Number(donation.amount) || 500;
  const amountFormatted = amount.toFixed(2);
  const words = donation.amountInWords || numberToWords(amount);

  return (
    <div
      id={id}
      className="bg-white text-slate-900 font-sans p-6 sm:p-10 max-w-[780px] mx-auto border border-slate-200/90 shadow-sm rounded-2xl print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full print:rounded-none select-text"
      style={{ minHeight: '920px' }}
    >
      {/* ── TOP HEADER SECTION ── */}
      <div className="flex items-start justify-between gap-4 pb-3">
        {/* Left: Official Circular Seal / Logo */}
        <div className="shrink-0 pt-0.5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-red-200/80 p-1 flex items-center justify-center bg-white shadow-2xs">
            <img
              src="/logo-icon.png"
              alt="Rebirth Care Trust"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </div>
        </div>

        {/* Center: Trust Name & Addresses */}
        <div className="flex-1 text-center sm:text-left pl-1">
          <h1 className="text-xl sm:text-2xl font-black text-[#B91C1C] tracking-tight uppercase leading-none">
            REBIRTH CARE TRUST
          </h1>
          <div className="text-[10px] sm:text-[10.5px] text-slate-600 space-y-0.5 mt-1.5 leading-snug">
            <p>
              <strong className="text-slate-700">Regd. Office :</strong> 41, 1st Floor, Shyam Bazar, Katra Shanshai, Chandni Chowk, Delhi-110006
            </p>
            <p>
              <strong className="text-slate-700">Functional Office :</strong> E-4/202, Nand Nagari, Delhi-110093
            </p>
            <p>
              <strong className="text-slate-700">Mob. :</strong> +91-9311878362 &nbsp;|&nbsp;{' '}
              <strong className="text-slate-700">E-mail :</strong> contact@rebirthcaretrust.org
            </p>
            <p>
              <strong className="text-slate-700">Website :</strong> www.rebirthcaretrust.org
            </p>
          </div>
        </div>

        {/* Right: Statutory Legal Registration Box */}
        <div className="shrink-0 text-right text-[10.5px] text-slate-700 leading-tight border-l border-slate-200 pl-3 hidden sm:block">
          <p className="font-semibold">Reg. No. 769</p>
          <p className="font-semibold">PAN No.: AAETR1099J</p>
          <p className="font-medium text-slate-600 mt-0.5">NGO Darpan UID:</p>
          <p className="font-bold text-slate-800">DL/2020/0262802</p>
        </div>
      </div>

      {/* Mobile visible registration */}
      <div className="sm:hidden flex justify-between text-[10px] text-slate-600 border-t border-b border-slate-100 py-1.5 my-2">
        <span>Reg: 769</span>
        <span>PAN: AAETR1099J</span>
        <span>UID: DL/2020/0262802</span>
      </div>

      {/* ── 80G EXEMPTION ORDER NOTICE ── */}
      <div className="text-center pt-2.5 pb-2 text-[11px] sm:text-[11.5px] text-slate-700 font-medium leading-relaxed border-t border-slate-100">
        <p>All Donations are exempted under section 80G(5) (VI) of the Income Tax Act. 1961</p>
        <p className="font-bold text-slate-900">
          Order No. {settings.compliance?.section80GRegNo || 'AAETR1099JF20215'}
        </p>
      </div>

      {/* ── RED TITLE PILL BANNER ── */}
      <div className="flex justify-center my-3">
        <div className="bg-[#B91C1C] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-7 py-1.5 rounded-lg shadow-2xs">
          DONATION RECEIPT
        </div>
      </div>

      {/* ── GREETING & RECEIPT META ROW ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 pt-2 pb-3">
        {/* Left Greeting */}
        <div className="space-y-0.5">
          <p className="font-serif italic font-bold text-slate-900 text-sm">Dear Saviour,</p>
          <p className="font-serif italic text-xs text-slate-600">
            Thank you for joining Rebirth Care Trust Family and
          </p>
          <p className="font-serif italic text-xs text-slate-600">
            for your generous support for poor children.
          </p>
        </div>

        {/* Right Metadata */}
        <div className="text-left sm:text-right text-xs space-y-1">
          <p className="font-semibold text-slate-700">
            Receipt No. : <span className="font-mono font-black text-[#B91C1C] text-sm ml-1">{receiptNumber}</span>
          </p>
          <p className="font-semibold text-slate-700">
            Date : <span className="font-bold text-slate-900 ml-1">{donationDate}</span>
          </p>
        </div>
      </div>

      {/* ── DONOR DETAILS SECTION ── */}
      <div className="mt-4">
        <div className="border-b border-[#B91C1C]/60 pb-0.5 mb-2.5">
          <span className="text-[11px] sm:text-xs font-black text-[#B91C1C] uppercase tracking-wider">
            DONOR DETAILS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-xs">
          <div className="flex">
            <span className="w-24 shrink-0 text-slate-600 font-medium">Donor Name</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-bold text-slate-900 flex-1">{donorName}</span>
          </div>

          <div className="flex">
            <span className="w-20 shrink-0 text-slate-600 font-medium">Pan No.</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-mono font-bold text-slate-900 flex-1">{donorPan}</span>
          </div>

          <div className="flex">
            <span className="w-24 shrink-0 text-slate-600 font-medium">City</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-semibold text-slate-800 flex-1">{donorCity}</span>
          </div>

          <div className="flex">
            <span className="w-20 shrink-0 text-slate-600 font-medium">Phone</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-semibold text-slate-800 flex-1">{donorPhone}</span>
          </div>

          <div className="flex sm:col-span-2">
            <span className="w-24 shrink-0 text-slate-600 font-medium">Email Id</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-medium text-slate-800 flex-1">{donorEmail}</span>
          </div>
        </div>
      </div>

      {/* ── DONATION DETAILS SECTION ── */}
      <div className="mt-5">
        <div className="border-b border-[#B91C1C]/60 pb-0.5 mb-2.5">
          <span className="text-[11px] sm:text-xs font-black text-[#B91C1C] uppercase tracking-wider">
            DONATION DETAILS
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex">
            <span className="w-36 shrink-0 text-slate-600 font-medium">Donation Purpose</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-bold text-slate-900 flex-1">{purpose}</span>
          </div>

          <div className="flex">
            <span className="w-36 shrink-0 text-slate-600 font-medium">Payment Mode</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-semibold text-slate-800 flex-1">{paymentMode}</span>
          </div>

          <div className="flex">
            <span className="w-36 shrink-0 text-slate-600 font-medium">Transaction Reference</span>
            <span className="w-3 text-slate-400 font-bold">:</span>
            <span className="font-mono font-semibold text-slate-800 flex-1 break-all">
              {transactionRef}
            </span>
          </div>
        </div>
      </div>

      {/* ── AMOUNT DONATED BOX (Exact Match With Blue-Border Box in Screenshot) ── */}
      <div className="my-5 border border-slate-200 bg-white rounded-xl p-3.5 sm:p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-baseline">
          <span className="w-32 sm:w-36 shrink-0 text-xs sm:text-sm font-bold text-slate-900">
            Amount Donated
          </span>
          <span className="w-3 text-slate-400 font-bold">:</span>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-[#B91C1C] text-base sm:text-lg">₹</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {amountFormatted}
            </span>
          </div>
        </div>

        <div className="flex items-baseline text-xs sm:text-[13px]">
          <span className="w-32 sm:w-36 shrink-0 text-slate-700 font-bold">In Words</span>
          <span className="w-3 text-slate-400 font-bold">:</span>
          <span className="font-serif italic font-semibold text-slate-800 flex-1">
            {words}
          </span>
        </div>
      </div>

      {/* ── FOOTER NOTES & SIGNATURE ROW ── */}
      <div className="pt-2 flex flex-col sm:flex-row justify-between items-end gap-6 text-[10.5px] text-slate-600 leading-normal">
        {/* Left: Note Clauses */}
        <div className="space-y-1 sm:max-w-[440px]">
          <p className="font-bold text-slate-900 text-xs">Note :</p>
          <p>
            1. This receipt confirms valid receipt of funds by Rebirth Care Trust for its registered charitable purposes.
          </p>
          <p>
            2. Official Trust PAN: <strong className="text-slate-800 font-mono">AAETR1099J</strong>. NGO Darpan UID: <strong className="text-slate-800 font-mono">DL/2020/0262802</strong>.
          </p>
          <p>
            3. Tax deduction benefits under Section 80G of the Income Tax Act are subject to prevailing regulations.
          </p>
          <p>
            4. This is a computer-generated official receipt authenticated by the registered server ledger.
          </p>
        </div>

        {/* Right: Blue Stamp & Authorized Signature */}
        <div className="shrink-0 text-center flex flex-col items-center">
          {/* Circular Stamp Graphic matching screenshot */}
          <div className="relative w-28 h-28 flex items-center justify-center select-none">
            <svg viewBox="0 0 100 100" className="w-24 h-24 text-blue-700/80">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 1" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" />
              <path id="seal-curve-top" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
              <path id="seal-curve-bottom" d="M 82,50 A 32,32 0 1,1 18,50" fill="none" />
              <text className="text-[7.2px] font-black uppercase tracking-widest fill-blue-800">
                <textPath href="#seal-curve-top" startOffset="50%" textAnchor="middle">
                  REBIRTH CARE TRUST
                </textPath>
              </text>
              <text className="text-[6.5px] font-bold uppercase tracking-widest fill-blue-800">
                <textPath href="#seal-curve-bottom" startOffset="50%" textAnchor="middle">
                  ★ DELHI ★
                </textPath>
              </text>
              <text x="50" y="47" textAnchor="middle" className="text-[6.5px] font-bold fill-blue-800">
                REG. 769
              </text>
              <text x="50" y="55" textAnchor="middle" className="text-[5px] font-mono fill-blue-700">
                2020
              </text>
            </svg>
            {/* Signature Cursive Overlay */}
            <div className="absolute inset-0 flex items-center justify-center -rotate-12 pointer-events-none">
              <span className="font-serif italic font-bold text-red-600/90 text-[13px] tracking-tight border-b border-red-500/70 pb-0.5">
                Authorized Signature
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-medium mt-1">Authorized Signature</p>
          <p className="text-xs font-bold text-slate-900 tracking-tight">For REBIRTH CARE TRUST</p>
        </div>
      </div>

      {/* ── VERY BOTTOM ITALIC TAGLINE ── */}
      <div className="border-t border-slate-100 mt-6 pt-3 text-center text-[10px] text-slate-400 font-serif italic">
        Rebirth Care Trust is a registered public charitable trust dedicated to child welfare and community relief.
      </div>
    </div>
  );
};
