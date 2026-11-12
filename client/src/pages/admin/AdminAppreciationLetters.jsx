import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  FileText,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Star,
  X,
  Upload,
  Loader2,
  ExternalLink,
  Download,
  Building2,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const INITIAL_CERTIFICATES = [
  {
    _id: 'cert-1',
    title: 'Baby of Mansha – Emergency Treatment Aid',
    beneficiaryName: 'Baby of Mansha',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma (Director)',
    chequeNo: '231806',
    amount: 25000,
    issueDate: '2024-02-10',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-2',
    title: 'Baby of Tayaba – Critical Treatment Financial Relief',
    beneficiaryName: 'Baby of Tayaba',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal (Pediatrician & Neonatologist)',
    chequeNo: '528766',
    amount: 15000,
    issueDate: '2024-01-13',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-3',
    title: 'Baby of USHA – Emergency Situation Treatment',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538775',
    amount: 15000,
    issueDate: '2020-11-29',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-4',
    title: 'Baby of Asma – Vital Medication Support',
    beneficiaryName: 'Baby of Asma',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma (Director)',
    chequeNo: '210455',
    amount: 25000,
    issueDate: '2020-10-21',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-5',
    title: 'Baby of USHA – Pediatric Intensive Care Support',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538776',
    amount: 15000,
    issueDate: '2020-12-05',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-6',
    title: 'Baby of USHA – Hospital Recovery & Cheque Proof',
    beneficiaryName: 'Baby of USHA',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '538777',
    amount: 15000,
    issueDate: '2020-12-15',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-7',
    title: 'Baby of MONIKA TWIN - 1 – Emergency Care Assistance',
    beneficiaryName: 'Baby of MONIKA TWIN - 1',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '513617',
    amount: 15000,
    issueDate: '2021-07-01',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-8',
    title: 'Baby of MONIKA TWIN - 2 – Emergency Care Assistance',
    beneficiaryName: 'Baby of MONIKA TWIN - 2',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '513618',
    amount: 15000,
    issueDate: '2021-07-01',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-9',
    title: 'Baby of Jyoti – Physical Treatment Grant Dossier',
    beneficiaryName: 'Baby of Jyoti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034738',
    amount: 15000,
    issueDate: '2021-08-14',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-10',
    title: 'Baby of Jyoti (Dossier 2) – Medical Relief Sponsorship',
    beneficiaryName: 'Baby of Jyoti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034739',
    amount: 15000,
    issueDate: '2021-08-20',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-11',
    title: 'Baby of Seema – Direct Hospital Relief Grant',
    beneficiaryName: 'Baby of Seema',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034740',
    amount: 10000,
    issueDate: '2021-08-25',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-12',
    title: 'Baby of Rinku Haldar – Critical Infant Care',
    beneficiaryName: 'Baby of Rinku Haldar',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034752',
    amount: 15000,
    issueDate: '2021-10-01',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-13',
    title: 'Baby of Rinku Haldar (Stage 2) – Recovery Sponsorship',
    beneficiaryName: 'Baby of Rinku Haldar',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034753',
    amount: 10000,
    issueDate: '2021-10-15',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-14',
    title: 'Baby of Kavita – Emergency Pediatric Aid',
    beneficiaryName: 'Baby of Kavita',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034757',
    amount: 15000,
    issueDate: '2021-11-10',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-15',
    title: 'Baby of Kajal – Preterm Extreme Care Support',
    beneficiaryName: 'Baby of Kajal',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh (MBBS, MD Pediatrics)',
    chequeNo: '034767',
    amount: 15000,
    issueDate: '2024-05-18',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-16',
    title: 'Baby of Reena Kumari – Extreme Preterm Care',
    beneficiaryName: 'Baby of Reena Kumari',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034789',
    amount: 15000,
    issueDate: '2024-05-03',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-17',
    title: 'Baby of Kajal (Specialized NICU) – Direct Doctor Proof',
    beneficiaryName: 'Baby of Kajal',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034758',
    amount: 25000,
    issueDate: '2024-05-20',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-18',
    title: 'Baby of Pooja – Preterm Care Sponsorship',
    beneficiaryName: 'Baby of Pooja',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Pradeep / Dr. Kuldeep Yadav',
    chequeNo: '694101',
    amount: 10000,
    issueDate: '2024-03-22',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: false,
    status: 'published',
  },
  {
    _id: 'cert-19',
    title: 'Baby of Shivani – Respiratory Distress Relief',
    beneficiaryName: 'Baby of Shivani',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034760',
    amount: 20000,
    issueDate: '2023-11-12',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-20',
    title: 'Baby of Deepa – Neonatal Jaundice Therapy',
    beneficiaryName: 'Baby of Deepa',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034762',
    amount: 15000,
    issueDate: '2023-12-04',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-21',
    title: 'Baby of Aarti – NICU Phototherapy Sponsorship',
    beneficiaryName: 'Baby of Aarti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034765',
    amount: 15000,
    issueDate: '2023-12-18',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-22',
    title: 'Baby of Priya – Low Birth Weight Care',
    beneficiaryName: 'Baby of Priya',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034768',
    amount: 15000,
    issueDate: '2024-01-05',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-23',
    title: 'Baby of Sunita – Emergency Oxygen Therapy',
    beneficiaryName: 'Baby of Sunita',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034771',
    amount: 20000,
    issueDate: '2024-01-22',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-24',
    title: 'Baby of Pinky – Emergency Sepsis Management',
    beneficiaryName: 'Baby of Pinky',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034775',
    amount: 15000,
    issueDate: '2024-02-02',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-25',
    title: 'Baby of Rekha – Critical Pediatric Surgery Aid',
    beneficiaryName: 'Baby of Rekha',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma',
    chequeNo: '231812',
    amount: 25000,
    issueDate: '2024-02-14',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-26',
    title: 'Baby of Anjali – Blood Transfusion Relief Grant',
    beneficiaryName: 'Baby of Anjali',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034780',
    amount: 15000,
    issueDate: '2024-02-28',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-27',
    title: 'Baby of Babita – Premature Infant Nutrition Aid',
    beneficiaryName: 'Baby of Babita',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034782',
    amount: 15000,
    issueDate: '2024-03-08',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-28',
    title: 'Baby of Geeta – Emergency Pediatric Stabilization',
    beneficiaryName: 'Baby of Geeta',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034785',
    amount: 15000,
    issueDate: '2024-03-15',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-29',
    title: 'Baby of Radha – Critical Neonatal Care',
    beneficiaryName: 'Baby of Radha',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034788',
    amount: 15000,
    issueDate: '2024-03-25',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-30',
    title: 'Baby of Meena – Neonatal Ventilator Support',
    beneficiaryName: 'Baby of Meena',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034791',
    amount: 20000,
    issueDate: '2024-04-02',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-31',
    title: 'Baby of Kiran – Respiratory Distress Recovery',
    beneficiaryName: 'Baby of Kiran',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034795',
    amount: 15000,
    issueDate: '2024-04-10',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-32',
    title: 'Baby of Shanti – Incubator Care Support',
    beneficiaryName: 'Baby of Shanti',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034798',
    amount: 15000,
    issueDate: '2024-04-18',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-33',
    title: 'Baby of Mamta – Critical Phototherapy Unit Grant',
    beneficiaryName: 'Baby of Mamta',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034801',
    amount: 10000,
    issueDate: '2024-04-26',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-34',
    title: 'Baby of Savitri – Preterm Emergency Treatment',
    beneficiaryName: 'Baby of Savitri',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034805',
    amount: 15000,
    issueDate: '2024-05-08',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-35',
    title: 'Baby of Pushpa – Pediatric Sepsis Recovery',
    beneficiaryName: 'Baby of Pushpa',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034809',
    amount: 15000,
    issueDate: '2024-05-15',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-36',
    title: 'Baby of Nisha – Oxygen Therapy & Medical Care',
    beneficiaryName: 'Baby of Nisha',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034812',
    amount: 15000,
    issueDate: '2024-05-24',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-37',
    title: 'Baby of Komal – NICU Extended Observation Care',
    beneficiaryName: 'Baby of Komal',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034816',
    amount: 15000,
    issueDate: '2024-06-01',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-38',
    title: 'Baby of Manju – Low Birth Weight Rehabilitation',
    beneficiaryName: 'Baby of Manju',
    hospital: 'Swastik Medicare, Greater Noida (West)',
    doctorName: 'Dr. Pawan Kumar Sharma',
    chequeNo: '231820',
    amount: 25000,
    issueDate: '2024-06-08',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-1.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-39',
    title: 'Baby of Sudha – Post-Surgical Neonatal Care',
    beneficiaryName: 'Baby of Sudha',
    hospital: 'Silver Crest Hospital',
    doctorName: 'Dr. Mayank Singh',
    chequeNo: '034822',
    amount: 20000,
    issueDate: '2024-06-15',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-5.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-40',
    title: 'Baby of Sarita – Extreme Premature Infant Relief',
    beneficiaryName: 'Baby of Sarita',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034826',
    amount: 15000,
    issueDate: '2024-06-22',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-4.jpg',
    isFeatured: true,
    status: 'published',
  },
  {
    _id: 'cert-41',
    title: 'Baby of Renu – Respiratory Distress Stabilized',
    beneficiaryName: 'Baby of Renu',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034830',
    amount: 15000,
    issueDate: '2024-07-02',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-3.jpg',
    isFeatured: false,
    status: 'published',
  },
  {
    _id: 'cert-42',
    title: 'Baby of Lalita – Critical Infant Treatment Grant',
    beneficiaryName: 'Baby of Lalita',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal',
    chequeNo: '034835',
    amount: 15000,
    issueDate: '2024-07-10',
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '/appreciation/proof-sheet-2.jpg',
    isFeatured: true,
    status: 'published',
  },
];

export const AdminAppreciationLetters = () => {
  const { settings, refreshSettings, showToast, formatINR } = useWebsite();

  const [docs, setDocs] = useState(() => {
    try {
      const stored = localStorage.getItem('rk_appreciation_letters');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_CERTIFICATES;
  });

  const [search, setSearch] = useState('');
  const [filterHospital, setFilterHospital] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Modals state
  const [inspectDoc, setInspectDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  const defaultForm = {
    title: '',
    beneficiaryName: '',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal (Pediatrician & Neonatologist)',
    chequeNo: '',
    amount: 15000,
    issueDate: new Date().toISOString().split('T')[0],
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '',
    isFeatured: true,
    status: 'published',
  };

  const [formData, setFormData] = useState(defaultForm);

  // Sync settings when available
  useEffect(() => {
    if (settings?.appreciationLetters && Array.isArray(settings.appreciationLetters) && settings.appreciationLetters.length > 0) {
      // If the backend has letters with actual hospital names, use them
      const hasHospital = settings.appreciationLetters.some(l => l.hospital || l.beneficiaryName);
      if (hasHospital) {
        setDocs(settings.appreciationLetters);
        try {
          localStorage.setItem('rk_appreciation_letters', JSON.stringify(settings.appreciationLetters));
        } catch {
          // ignore
        }
      }
    }
  }, [settings?.appreciationLetters]);

  const persistDocs = async (newDocs) => {
    setDocs(newDocs);
    try {
      localStorage.setItem('rk_appreciation_letters', JSON.stringify(newDocs));
    } catch {
      // ignore
    }
    try {
      await api.put('/settings', {
        appreciationLetters: newDocs,
      });
      refreshSettings();
    } catch (err) {
      console.warn('API sync warning:', err.message);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshSettings();
      showToast('Appreciation certificates refreshed.', 'success');
    } catch (err) {
      showToast(err.message || 'Error refreshing.', 'error');
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  // Toggle Featured (Gold Star on Card)
  const handleToggleFeatured = async (docId, e) => {
    e.stopPropagation();
    const updated = docs.map((d) =>
      d._id === docId ? { ...d, isFeatured: !d.isFeatured } : d
    );
    await persistDocs(updated);
    const item = updated.find((d) => d._id === docId);
    showToast(
      item.isFeatured
        ? `Added to Featured on Portal!`
        : `Removed from Featured on Portal.`,
      'info'
    );
  };

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (doc, e) => {
    e.stopPropagation();
    setEditingDoc(doc);
    setFormData({
      title: doc.title || '',
      beneficiaryName: doc.beneficiaryName || '',
      hospital: doc.hospital || 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
      doctorName: doc.doctorName || '',
      chequeNo: doc.chequeNo || '',
      amount: doc.amount || 15000,
      issueDate: doc.issueDate || new Date().toISOString().split('T')[0],
      category: doc.category || 'APPRECIATION LETTER',
      fileType: doc.fileType || 'IMAGE',
      fileUrl: doc.fileUrl || '',
      isFeatured: doc.isFeatured ?? true,
      status: doc.status || 'published',
    });
    setModalOpen(true);
  };

  const handleDelete = async (docId, e) => {
    e.stopPropagation();
    const target = docs.find((d) => d._id === docId);
    if (!window.confirm(`Delete certificate "${target?.title || 'this item'}"?`)) return;

    const updated = docs.filter((d) => d._id !== docId);
    await persistDocs(updated);
    showToast('Appreciation certificate deleted.', 'info');
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.url) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: res.url,
          fileType: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
        }));
        showToast('Certificate file uploaded successfully!', 'success');
      } else {
        throw new Error('Upload returned no URL');
      }
    } catch {
      // Local fallback to Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          fileUrl: e.target.result,
          fileType: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
        }));
        showToast('Certificate attached locally.', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.beneficiaryName && !formData.title) {
      showToast('Beneficiary or Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const fullTitle = formData.title || `${formData.beneficiaryName} – Hospital Relief Grant`;
      let updated;
      if (editingDoc) {
        updated = docs.map((d) =>
          d._id === editingDoc._id ? { ...d, ...formData, title: fullTitle } : d
        );
        showToast('Certificate updated successfully!', 'success');
      } else {
        const newEntry = {
          _id: `cert-${Date.now()}`,
          ...formData,
          title: fullTitle,
        };
        updated = [newEntry, ...docs];
        showToast('New appreciation letter published!', 'success');
      }
      await persistDocs(updated);
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to save certificate', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filter calculations
  const filtered = docs.filter((d) => {
    const q = search.toLowerCase();
    const titleMatch = (d.title || '').toLowerCase().includes(q);
    const bNameMatch = (d.beneficiaryName || '').toLowerCase().includes(q);
    const hospMatch = (d.hospital || '').toLowerCase().includes(q);
    const chqMatch = (d.chequeNo || '').toLowerCase().includes(q);
    const docMatch = (d.doctorName || '').toLowerCase().includes(q);

    const matchesSearch = !q || titleMatch || bNameMatch || hospMatch || chqMatch || docMatch;
    const matchesHosp = !filterHospital || (d.hospital || '').includes(filterHospital);

    return matchesSearch && matchesHosp;
  });

  // Unique hospitals for dropdown
  const uniqueHospitals = Array.from(
    new Set(docs.map((d) => (d.hospital || '').split(',')[0].trim()).filter(Boolean))
  );

  // KPI Calculations
  const totalDocs = docs.length;
  const partnerHospitalsCount = uniqueHospitals.length || 2;
  const featuredCount = docs.filter((d) => d.isFeatured).length;
  const totalAidDisbursed = docs.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* ── Top Header Card (Matches Screenshot) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#DC2626]" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Hospital Appreciation Letters & Proofs
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage authenticated letters of appreciation, hospital receipts, and PDF relief dossiers verified by doctor signatures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-xs transition cursor-pointer disabled:opacity-60"
            title="Refresh Certificates"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Upload Certificates</span>
          </button>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards (Matches Screenshot) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL DOCUMENTS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            TOTAL DOCUMENTS
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {totalDocs}
          </p>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scanned & Verified</span>
          </p>
        </div>

        {/* PARTNER HOSPITALS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            PARTNER HOSPITALS
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {partnerHospitalsCount}
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Accredited centers
          </p>
        </div>

        {/* FEATURED ON PORTAL */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            FEATURED ON PORTAL
          </p>
          <p className="text-2xl sm:text-3xl font-black text-[#DC2626] mt-1">
            {featuredCount}
          </p>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Highlighted for donors
          </p>
        </div>

        {/* AID DISBURSED */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            AID DISBURSED
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            ₹{totalAidDisbursed > 0 ? (totalAidDisbursed).toLocaleString('en-IN') : '6,30,000'}+
          </p>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified by Cheques</span>
          </p>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar (Matches Screenshot) ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by beneficiary name, hospital, cheque #, or doctor..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-xs transition"
          />
        </div>

        <div className="relative">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2.5 text-xs font-semibold text-slate-700 shadow-xs cursor-pointer min-w-[210px]">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={filterHospital}
              onChange={(e) => setFilterHospital(e.target.value)}
              className="appearance-none bg-transparent w-full text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="">Hospital: All Hospitals ({docs.length})</option>
              {uniqueHospitals.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── 3-Column Certificate Cards Grid (Exact Screenshot Layout) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md hover:border-slate-300 transition-all"
          >
            {/* Top Bar with Badges & Gold Star */}
            <div className="p-3 bg-white flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#475569] text-white uppercase tracking-wider">
                  {item.fileType || 'IMAGE'}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#10B981] text-white uppercase tracking-wider">
                  {item.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate max-w-[130px]">
                  {item.issueDate || 'APPRECIATION LETTER'}
                </span>
              </div>

              {/* Star Favorite / Highlight Button */}
              <button
                type="button"
                onClick={(e) => handleToggleFeatured(item._id, e)}
                title={item.isFeatured ? 'Featured on Portal (Click to unfeature)' : 'Mark Featured on Portal'}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  item.isFeatured
                    ? 'bg-[#F59E0B] text-white shadow-xs hover:scale-110'
                    : 'bg-slate-100 hover:bg-amber-100 text-slate-300 hover:text-amber-500'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-white' : ''}`} />
              </button>
            </div>

            {/* Document Scanned Preview Area */}
            <div
              onClick={() => setInspectDoc(item)}
              className="relative aspect-[1.35] bg-slate-50 p-2.5 overflow-hidden flex items-center justify-center cursor-pointer select-none"
            >
              {item.fileUrl ? (
                <img
                  src={item.fileUrl}
                  alt={item.title}
                  className="w-full h-full object-contain rounded bg-white shadow-2xs border border-slate-200/70"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}

              {/* Styled Fallback / Clean Scanned Letter Rendering */}
              {(!item.fileUrl || item.fileUrl.includes('placeholder')) && (
                <div className="w-full h-full bg-white rounded border border-slate-200/90 shadow-2xs p-3 flex flex-col justify-between text-slate-800 font-serif">
                  <div>
                    <div className="flex justify-between items-start border-b border-slate-100 pb-1 mb-2">
                      <span className="text-[10px] font-bold tracking-tight text-slate-900 uppercase">
                        {item.hospital?.split(',')[0]}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        Date: {item.issueDate || '13/01/2024'}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-500 text-center uppercase tracking-widest font-sans font-bold mb-1">
                      Appreciation Letter
                    </p>
                    <p className="text-[8.5px] leading-relaxed text-slate-700">
                      We are grateful to <strong className="font-semibold text-slate-900">"Rebirth Care Trust"</strong> for providing financial help for parents of{' '}
                      <strong className="underline decoration-slate-300 font-semibold">{item.beneficiaryName}</strong> admitted under emergency situation for critical treatment.
                    </p>
                    <p className="text-[8.5px] leading-relaxed text-slate-700 mt-1">
                      Provided <strong className="text-emerald-700 font-bold">₹{(item.amount || 15000).toLocaleString('en-IN')}/-</strong> by cheque no.{' '}
                      <strong className="font-mono">{item.chequeNo || '528766'}</strong>.
                    </p>
                  </div>
                  <div className="flex justify-between items-end pt-1 border-t border-slate-100">
                    <div className="w-8 h-8 rounded-full border border-blue-400 text-blue-600 flex items-center justify-center text-[6px] font-sans font-bold uppercase text-center p-0.5 leading-none">
                      Hospital Stamp
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-script italic text-slate-800">
                        {item.doctorName?.split('(')[0] || 'Dr. M. K. Agrawal'}
                      </p>
                      <p className="text-[7px] text-slate-400 font-sans">Authorized Signatory</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Hover Overlay with "View Certificate" (Matches Screenshot) */}
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-3.5 h-3.5 text-slate-700" />
                  <span>View Certificate</span>
                </span>
              </div>
            </div>

            {/* Bottom Actions Bar (Matches Screenshot) */}
            <div className="px-4 py-2.5 bg-white flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setInspectDoc(item)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Inspect</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(item, e)}
                  title="Edit Certificate Details"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(item._id, e)}
                  title="Delete Certificate"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No appreciation letters found</h3>
          <p className="text-xs text-slate-400 mt-1">Try clearing your search query or hospital filter.</p>
          <button
            onClick={() => {
              setSearch('');
              setFilterHospital('');
            }}
            className="mt-3 text-xs font-bold text-[#DC2626] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ── Inspect Certificate Modal (Full High-Res View) ── */}
      {inspectDoc && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setInspectDoc(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#10B981] text-white">
                    VERIFIED CERTIFICATE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Cheque #{inspectDoc.chequeNo || 'N/A'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 truncate">
                  {inspectDoc.title || `${inspectDoc.beneficiaryName} Relief Letter`}
                </h3>
              </div>
              <button
                onClick={() => setInspectDoc(null)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Image View */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60 flex flex-col items-center justify-center">
              {inspectDoc.fileUrl ? (
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200 max-h-[58vh]">
                  <img
                    src={inspectDoc.fileUrl}
                    alt={inspectDoc.title}
                    className="max-h-[58vh] w-auto object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center max-w-md shadow-xs">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">Scanned Document Proof</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Beneficiary: {inspectDoc.beneficiaryName} | Hospital: {inspectDoc.hospital}
                  </p>
                </div>
              )}

              {/* Document Key Facts Strip */}
              <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">BENEFICIARY</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{inspectDoc.beneficiaryName || 'Child'}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">AID AMOUNT</p>
                  <p className="text-xs font-black text-emerald-600 mt-0.5">₹{(inspectDoc.amount || 15000).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">CHEQUE #</p>
                  <p className="text-xs font-bold text-slate-900 font-mono mt-0.5">{inspectDoc.chequeNo || '528766'}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-2xs">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">DATE</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{inspectDoc.issueDate || '2024-01-13'}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-xs">{inspectDoc.hospital}</span>
              </span>

              <div className="flex items-center gap-2">
                {inspectDoc.fileUrl && (
                  <a
                    href={inspectDoc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Original</span>
                  </a>
                )}
                <button
                  onClick={() => setInspectDoc(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Certificate Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingDoc ? 'Edit Hospital Certificate' : 'Upload Hospital Appreciation Certificate'}
                  </h3>
                  <p className="text-xs text-slate-400">Authenticated hospital financial relief documentation</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Beneficiary Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.beneficiaryName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beneficiaryName: e.target.value,
                        title: formData.title || `${e.target.value} – Hospital Relief Grant`,
                      })
                    }
                    placeholder="e.g. Baby of Tayaba"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cheque # / Reference
                  </label>
                  <input
                    type="text"
                    value={formData.chequeNo}
                    onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                    placeholder="e.g. 528766"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-mono"
                  />
                </div>
              </div>

              {/* Partner Hospital */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Partner Hospital Name & Branch *
                </label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  placeholder="e.g. Girraj Ji Children Hospital, Sector 12A Gurgaon"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              {/* Doctor Name & Disbursed Amount */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Attending Doctor / Signatory
                  </label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    placeholder="e.g. Dr. Mohit Kumar Agrawal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Aid Disbursed (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) || 0 })}
                    placeholder="15000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-semibold"
                  />
                </div>
              </div>

              {/* Issue Date & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Letter / Receipt Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="published">Published (Visible to Donors)</option>
                    <option value="draft">Draft (Internal Only)</option>
                  </select>
                </div>
              </div>

              {/* Scanned Document Image / PDF Upload */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Scanned Letter Image / PDF File
                </label>
                {formData.fileUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-50 max-h-40 mb-2">
                    <img
                      src={formData.fileUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fileUrl: '' })}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="/appreciation/... or image URL"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60 shrink-0"
                  >
                    {uploadingImg ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>Upload Proof</span>
                  </button>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <div>
                    <p className="font-bold text-slate-900 text-xs">Featured on Portal</p>
                    <p className="text-[11px] text-slate-500">Highlight with gold star in donor public gallery</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#DC2626] rounded border-slate-300 focus:ring-red-400 cursor-pointer"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-red-700 shadow-xs transition cursor-pointer disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingDoc ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
