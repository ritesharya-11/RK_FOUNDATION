import React, { useState, useEffect } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import {
  FileText,
  Search,
  Eye,
  X,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Download,
  Share2,
} from 'lucide-react';

const APPRECIATION_LETTERS = [
  {
    _id: 'cert-1',
    title: 'Baby of Mansha – Emergency Treatment Aid',
    beneficiaryName: 'Baby of Mansha',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma (Director)',
    chequeNo: '231806',
    amount: 25000,
    issueDate: '10/02/2024',
    category: 'APPRECIATION LETTER',
    letterHead: 'SWASTIK MEDICARE',
    letterAddress: 'Greater Noida (West), Uttar Pradesh',
  },
  {
    _id: 'cert-2',
    title: 'Baby of Tayaba – Critical Treatment Financial Relief',
    beneficiaryName: 'Baby of Tayaba',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal (Pediatrician)',
    chequeNo: '528766',
    amount: 15000,
    issueDate: '13/01/2024',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-3',
    title: 'Baby of USHA – Emergency Situation Treatment',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538775',
    amount: 15000,
    issueDate: '29/11/2020',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-4',
    title: 'Baby of Asma – Vital Medication Support',
    beneficiaryName: 'Baby of Asma',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma (Director)',
    chequeNo: '210455',
    amount: 25000,
    issueDate: '21/10/2020',
    category: 'APPRECIATION LETTER',
    letterHead: 'SWASTIK MEDICARE',
    letterAddress: 'Greater Noida (West), Uttar Pradesh',
  },
  {
    _id: 'cert-5',
    title: 'Baby of USHA – Pediatric Intensive Care Support',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538776',
    amount: 15000,
    issueDate: '05/12/2020',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-6',
    title: 'Baby of USHA – Hospital Recovery & Cheque Proof',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538777',
    amount: 15000,
    issueDate: '15/12/2020',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-7',
    title: 'Baby of MONIKA TWIN - 1 – Emergency Care Assistance',
    beneficiaryName: 'Baby of MONIKA TWIN - 1',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '513617',
    amount: 15000,
    issueDate: '01/07/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-8',
    title: 'Baby of MONIKA TWIN - 2 – Emergency Care Assistance',
    beneficiaryName: 'Baby of MONIKA TWIN - 2',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '513618',
    amount: 15000,
    issueDate: '01/07/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-9',
    title: 'Baby of Jyoti – Physical Treatment Grant Dossier',
    beneficiaryName: 'Baby of Jyoti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034738',
    amount: 15000,
    issueDate: '14/08/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-10',
    title: 'Baby of Jyoti (Dossier 2) – Medical Relief Sponsorship',
    beneficiaryName: 'Baby of Jyoti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034739',
    amount: 15000,
    issueDate: '20/08/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-11',
    title: 'Baby of Seema – Direct Hospital Relief Grant',
    beneficiaryName: 'Baby of Seema',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034740',
    amount: 10000,
    issueDate: '25/08/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-12',
    title: 'Baby of Rinku Haldar – Critical Infant Care',
    beneficiaryName: 'Baby of Rinku Haldar',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034752',
    amount: 15000,
    issueDate: '01/10/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-13',
    title: 'Baby of Rinku Haldar (Stage 2) – Recovery Sponsorship',
    beneficiaryName: 'Baby of Rinku Haldar',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034753',
    amount: 10000,
    issueDate: '15/10/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-14',
    title: 'Baby of Kavita – Emergency Pediatric Aid',
    beneficiaryName: 'Baby of Kavita',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034757',
    amount: 15000,
    issueDate: '10/11/2021',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-15',
    title: 'Baby of Kajal – Preterm Extreme Care Support',
    beneficiaryName: 'Baby of Kajal',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh (MBBS, MD Pediatrics)',
    chequeNo: '034767',
    amount: 15000,
    issueDate: '18/05/2024',
    category: 'APPRECIATION LETTER',
    letterHead: 'SILVER CREST HOSPITAL',
    letterAddress: 'Delhi-NCR Medical Center',
  },
  {
    _id: 'cert-16',
    title: 'Baby of Reena Kumari – Extreme Preterm Care',
    beneficiaryName: 'Baby of Reena Kumari',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034789',
    amount: 15000,
    issueDate: '03/05/2024',
    category: 'APPRECIATION LETTER',
    letterHead: 'SILVER CREST HOSPITAL',
    letterAddress: 'Delhi-NCR Medical Center',
  },
  {
    _id: 'cert-17',
    title: 'Baby of Shivani – Respiratory Distress Relief',
    beneficiaryName: 'Baby of Shivani',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034760',
    amount: 20000,
    issueDate: '12/11/2023',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
  {
    _id: 'cert-18',
    title: 'Baby of Deepa – Neonatal Jaundice Therapy',
    beneficiaryName: 'Baby of Deepa',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034762',
    amount: 15000,
    issueDate: '04/12/2023',
    category: 'APPRECIATION LETTER',
    letterHead: 'GIRRAJ JI CHILDREN HOSPITAL',
    letterAddress: 'Sector 12A, Gurgaon, Haryana',
  },
];

export const News = () => {
  const { formatINR } = useWebsite();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('All');
  const [activeModalCert, setActiveModalCert] = useState(null);

  // Filter letters based on search term and selected hospital
  const filteredLetters = APPRECIATION_LETTERS.filter((cert) => {
    const matchesSearch =
      cert.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.chequeNo.includes(searchTerm);

    const matchesHospital =
      selectedHospital === 'All' || cert.hospital.includes(selectedHospital);

    return matchesSearch && matchesHospital;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#323D3D] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ========================================================
            1. SECTION HEADER (Exact Reference: media_1794819792174_2e13f403.png)
        ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-3 pt-2">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF4EB] text-[#F67708] border border-[#F67708]/30 shadow-xs">
            <FileText className="w-3.5 h-3.5 text-[#F67708]" />
            <span>Verified Hospital Documentation</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Success Stories & <span className="text-[#F67708]">Hospital Letters</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
            Signed appreciation letters and official medical certificates for children and families supported by RK Foundation.
          </p>
        </div>

        {/* ========================================================
            2. SEARCH & FILTER BAR (Exact Reference)
        ======================================================== */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search child, hospital, cheque #..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F67708] transition"
            />
          </div>

          {/* Hospital Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs font-bold text-slate-500 whitespace-nowrap">
              Hospital:
            </label>
            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:border-[#F67708] cursor-pointer"
            >
              <option value="All">All Hospitals (42)</option>
              <option value="Swastik Medicare">Swastik Medicare (Greater Noida)</option>
              <option value="Girraj Ji Children Hospital">Girraj Ji Children Hospital (Gurgaon)</option>
              <option value="Silver Crest Hospital">Silver Crest Hospital</option>
            </select>
          </div>
        </div>

        {/* ========================================================
            3. 3-COLUMN APPRECIATION LETTERS GRID (Exact Reference)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto pt-2">
          {filteredLetters.map((cert) => (
            <div
              key={cert._id}
              onClick={() => setActiveModalCert(cert)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Authentic Paper Letterhead Simulation */}
              <div className="bg-[#FCFCFA] p-6 sm:p-7 border-b border-slate-100 flex-1 flex flex-col justify-between text-left relative min-h-[340px]">
                {/* Letter Header */}
                <div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    Date: {cert.issueDate}
                  </div>

                  <div className="my-4 text-center">
                    <h3 className="font-serif font-black tracking-widest text-xs sm:text-sm text-[#1E293B] uppercase border-b-2 border-slate-800/20 inline-block pb-0.5">
                      APPRECIATION LETTER
                    </h3>
                  </div>

                  {/* Letter Body */}
                  <div className="space-y-3 font-serif text-[12px] sm:text-[13px] text-slate-800 leading-relaxed text-justify">
                    <p>
                      We are grateful to <strong className="font-bold">"RK Foundation"</strong> for providing financial help for the parents of {cert.beneficiaryName}, admitted under emergency situation for the treatment.
                    </p>
                    <p>
                      We appreciate RK Foundation for providing <strong className="font-bold">Rs {cert.amount?.toLocaleString('en-IN')}/-</strong> to {cert.beneficiaryName} by cheque no. <strong className="font-bold">{cert.chequeNo}</strong> for treatment.
                    </p>
                    <p>
                      We extend our greetings to the organization and wish all success in their endeavors.
                    </p>
                  </div>
                </div>

                {/* Sign-off & Seal */}
                <div className="pt-6 flex items-end justify-between mt-auto">
                  <div className="text-[11px] text-slate-700">
                    <p className="font-bold text-[#1E293B]">{cert.hospital.split(',')[0]}</p>
                    <p className="text-[10px] text-slate-500">{cert.doctorName}</p>
                  </div>

                  {/* Realistic Official Hospital Round Seal */}
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-700/60 flex flex-col items-center justify-center p-1 text-center rotate-[-12deg] text-blue-900 select-none shadow-2xs">
                    <span className="text-[7px] font-black tracking-tighter uppercase leading-none">HOSPITAL</span>
                    <span className="text-[9px] font-black uppercase text-blue-800 my-0.5">SEAL</span>
                    <span className="text-[6px] font-bold text-blue-600 uppercase">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Matching Reference */}
              <div className="px-5 py-3.5 bg-white flex items-center justify-between">
                <span className="text-xs font-bold text-[#F67708] group-hover:underline flex items-center gap-1.5">
                  View Certificate
                </span>
                <Eye className="w-4 h-4 text-[#F67708] group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            4. CERTIFICATE DETAIL MODAL
        ======================================================== */}
        {activeModalCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F67708] bg-[#FFF4EB] border border-[#F67708]/30 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F67708]" />
                  <span>Verified Medical Grant Certificate</span>
                </div>
                <h2 className="text-2xl font-black text-[#1E293B]">
                  {activeModalCert.title}
                </h2>
                <p className="text-xs text-slate-500">
                  Official Record of Direct Hospital Disbursement from RK Foundation Treasury
                </p>
              </div>

              {/* Printable Letterhead Document */}
              <div className="border border-slate-300 rounded-2xl p-6 sm:p-8 bg-[#FCFCFA] shadow-xs space-y-4 font-serif">
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="font-bold text-sm tracking-wider uppercase text-slate-900">
                      {activeModalCert.letterHead}
                    </h3>
                    <p className="text-[11px] text-slate-500">{activeModalCert.letterAddress}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    Date: {activeModalCert.issueDate}
                  </div>
                </div>

                <div className="text-center py-2">
                  <h4 className="font-bold text-sm text-[#1E293B] tracking-widest uppercase">
                    OFFICIAL APPRECIATION & DISBURSEMENT LETTER
                  </h4>
                </div>

                <div className="space-y-3 text-sm text-slate-800 leading-relaxed text-justify">
                  <p>
                    We are grateful to <strong className="font-bold">"RK Foundation"</strong> for providing immediate financial relief for the parents of {activeModalCert.beneficiaryName}, admitted under emergency clinical conditions for intensive pediatric treatment.
                  </p>
                  <p>
                    We acknowledge and appreciate RK Foundation for providing financial assistance of <strong className="font-bold">Rs {activeModalCert.amount?.toLocaleString('en-IN')}/-</strong> directly to {activeModalCert.beneficiaryName} through banking instrument cheque no. <strong className="font-bold">{activeModalCert.chequeNo}</strong>.
                  </p>
                  <p>
                    We extend our sincere greetings to RK Foundation and commend their ongoing commitment to saving vulnerable children's lives.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">{activeModalCert.hospital}</p>
                    <p className="text-slate-500">{activeModalCert.doctorName}</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">Status: Successfully Cleared & Verified</p>
                  </div>

                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-blue-700/60 flex flex-col items-center justify-center p-1 text-center rotate-[-10deg] text-blue-900 select-none">
                    <span className="text-[8px] font-black uppercase">OFFICIAL</span>
                    <span className="text-[10px] font-black uppercase text-blue-800">SEAL</span>
                    <span className="text-[7px] font-bold text-blue-600 uppercase">VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cheque #{activeModalCert.chequeNo} verified with authorized bank ledger.</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    <span>Print Letter</span>
                  </button>
                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="px-5 py-2 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-xs font-bold text-white transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
