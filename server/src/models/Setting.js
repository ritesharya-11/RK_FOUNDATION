import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: 'RK FOUNDATION',
    },
    tagline: {
      type: String,
      default: 'Empowering Underprivileged Communities & Restoring Hope',
    },
    missionStatement: {
      type: String,
      default:
        'To transform lives through accessible child education, emergency healthcare relief, women livelihood empowerment, and holistic community rehabilitation across marginalized sectors of society.',
    },
    logoUrl: {
      type: String,
      default: '',
    },
    contact: {
      phone: { type: String, default: '+91-9876543210' },
      altPhone: { type: String, default: '+91-9812345678' },
      email: { type: String, default: 'info@rkfoundation.org' },
      donorEmail: { type: String, default: 'donate@rkfoundation.org' },
      address: {
        type: String,
        default: 'Plot 45, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309',
      },
      officeHours: { type: String, default: 'Mon - Sat: 9:00 AM - 6:30 PM' },
    },
    compliance: {
      trustRegistrationNo: { type: String, default: 'TRUST/DL/2021/887412' },
      ngoDarpanUid: { type: String, default: 'DL/2021/0298412' },
      panNumber: { type: String, default: 'AAETR5566K' },
      section80GRegNo: { type: String, default: 'CIT(E)/DELHI/80G/2021-22/A/1045' },
      section12ARegNo: { type: String, default: 'CIT(E)/DELHI/12A/2021-22/A/2088' },
      taxExemptionNote: {
        type: String,
        default:
          'All donations made to RK FOUNDATION are eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.',
      },
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/rkfoundation' },
      instagram: { type: String, default: 'https://instagram.com/rkfoundation' },
      twitter: { type: String, default: 'https://x.com/rkfoundation' },
      linkedin: { type: String, default: 'https://linkedin.com/company/rkfoundation' },
      youtube: { type: String, default: 'https://youtube.com/@rkfoundation' },
      whatsapp: { type: String, default: '+919876543210' },
    },
    donationSettings: {
      presetAmounts: {
        type: [Number],
        default: [500, 1000, 2500, 5000, 10000, 25000],
      },
      defaultPreset: { type: Number, default: 2500 },
      bankAccountName: { type: String, default: 'RK FOUNDATION CHARITABLE TRUST' },
      bankName: { type: String, default: 'State Bank of India' },
      accountNumber: { type: String, default: '394857201948' },
      ifscCode: { type: String, default: 'SBIN0004052' },
      branchName: { type: String, default: 'Sector 62 Institutional Branch' },
      upiId: { type: String, default: 'rkfoundation@sbi' },
      qrCodeImage: { type: String, default: '' },
    },
    announcementBar: {
      isEnabled: { type: Boolean, default: true },
      text: {
        type: String,
        default:
          'Urgent Appeal: Support our Winter Warmth & Pediatric Nutrition Drive 2026. Every donation is 50% tax exempt under 80G.',
      },
      linkUrl: { type: String, default: '/donate' },
      linkText: { type: String, default: 'Support Now' },
    },
    hero: {
      badge: { type: String, default: 'Govt. Registered Public Charitable Trust (80G & 12A Certified)' },
      heading: {
        type: String,
        default: 'Bridging the Divide: Empowering Underprivileged Lives with Dignity & Hope',
      },
      subheading: {
        type: String,
        default:
          'Join RK FOUNDATION in our relentless mission to educate children of migrant workers, empower marginalized women through skill centers, and provide vital healthcare to the vulnerable.',
      },
      ctaPrimaryText: { type: String, default: 'Donate to a Cause' },
      ctaPrimaryLink: { type: String, default: '/donate' },
      ctaSecondaryText: { type: String, default: 'Explore Our Programs' },
      ctaSecondaryLink: { type: String, default: '/programs' },
      volunteerCtaText: { type: String, default: 'Join as Volunteer' },
      volunteerCtaLink: { type: String, default: '/volunteer' },
    },
    impactStats: {
      livesImpacted: { type: Number, default: 48500 },
      childrenEducated: { type: Number, default: 12400 },
      womenEmpowered: { type: Number, default: 4200 },
      mealsServed: { type: Number, default: 185000 },
      healthCampsConducted: { type: Number, default: 340 },
      activeVolunteers: { type: Number, default: 1250 },
    },
    heroBanners: [
      {
        title: { type: String, default: 'Helping Children Grow With Care' },
        subtitle: {
          type: String,
          default:
            'We are a children-focused charity organization dedicated to improving young lives through education, healthcare, protection, and community support.',
        },
        imageUrl: { type: String, default: '/hero-children.jpg' },
        badgeText: { type: String, default: '50% Tax Deduction (Section 80G)' },
        primaryBtnText: { type: String, default: 'Donate Now' },
        primaryBtnLink: { type: String, default: '/donate' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 1 },
      },
    ],
    appreciationLetters: [
      {
        title: { type: String, default: 'Section 80G Registration Order' },
        authority: { type: String, default: 'Income Tax Department, Govt of India' },
        certificateNo: { type: String, default: 'CIT(E)/DELHI/80G/2021-22/A/1045' },
        issueDate: { type: String, default: '2021-08-15' },
        fileUrl: { type: String, default: '/certificates/80g.pdf' },
        category: { type: String, default: 'Statutory Compliance' },
        isActive: { type: Boolean, default: true },
      },
      {
        title: { type: String, default: 'NITI Aayog NGO Darpan Registration' },
        authority: { type: String, default: 'NITI Aayog, Government of India' },
        certificateNo: { type: String, default: 'DL/2021/0298412' },
        issueDate: { type: String, default: '2021-04-10' },
        fileUrl: { type: String, default: '/certificates/darpan.pdf' },
        category: { type: String, default: 'Government Accreditation' },
        isActive: { type: Boolean, default: true },
      },
    ],
    parentsVideos: [
      {
        title: { type: String, default: 'Rebirth Care Trust | NGO | Child Nutrition Review' },
        parentName: { type: String, default: 'Sunita Devi (Mother of Aarav)' },
        location: { type: String, default: 'Nand Nagri, Delhi' },
        youtubeUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        thumbnailUrl: { type: String, default: '/video-thumbnail.jpg' },
        testimonialQuote: {
          type: String,
          default:
            'Thanks to the foundation evening schooling and nutrition kits, my two children are excelling in class.',
        },
        isFeatured: { type: Boolean, default: true },
      },
    ],
    pageSections: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    auditLogs: [
      {
        action: { type: String, default: '' },
        user: { type: String, default: 'Admin' },
        details: { type: String, default: '' },
        ip: { type: String, default: '127.0.0.1' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    seo: {
      metaTitle: {
        type: String,
        default: 'RK FOUNDATION — Registered Public Charitable Trust | Child Education & Healthcare Relief',
      },
      metaDescription: {
        type: String,
        default:
          'RK FOUNDATION is a transparent, registered non-profit organization providing child education, women empowerment, food relief, and healthcare to underprivileged communities.',
      },
      metaKeywords: {
        type: [String],
        default: ['ngo', 'charity', '80g tax exemption', 'child education', 'women empowerment', 'delhi ncr ngo'],
      },
      ogImage: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Setting', settingSchema);
