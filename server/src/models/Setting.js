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
      altEmail: { type: String, default: 'info@rebirthcaretrust.org' },
      donorEmail: { type: String, default: 'donate@rkfoundation.org' },
      address: {
        type: String,
        default: 'E-4/202 Nand Nagri, Delhi - 110093',
      },
      branchAddress: {
        type: String,
        default: '1104, Harsharan Niwas, Shri Ram Nagar, New Delhi - 110032',
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
      bankAccountName: { type: String, default: 'Rebirth Care Trust' },
      bankName: { type: String, default: 'Indian Bank' },
      accountNumber: { type: String, default: '505001234567' },
      ifscCode: { type: String, default: 'IDIB000N123' },
      branchName: { type: String, default: 'Nand Nagri Branch, Delhi' },
      secondaryBank: {
        bankAccountName: { type: String, default: 'Rebirth Care Trust' },
        bankName: { type: String, default: 'Axis Bank' },
        accountNumber: { type: String, default: '921020012345678' },
        ifscCode: { type: String, default: 'UTIB0001234' },
        branchName: { type: String, default: 'Connaught Place Branch, New Delhi' },
        isActive: { type: Boolean, default: true },
      },
      upiId: { type: String, default: 'rebirthcaretrust@indianbk' },
      qrCodeImage: { type: String, default: '/uploads/2cd52fa93d56753fdbaa24f072e57ee3.png' },
      enableOnlineGateway: { type: Boolean, default: true },
      minimumDonationAmount: { type: Number, default: 500 },
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
    impactStories: [
      {
        title: { type: String, default: '10,000+ Nutritious Meals Served in Marginalized Slum Settlements' },
        slug: { type: String, default: '10000-nutritious-meals-served' },
        category: { type: String, default: 'Hunger & Nutrition Relief' },
        outcomeMetric: { type: String, default: '10,000+ Nutritious Meals' },
        location: { type: String, default: 'Nand Nagri, Yamuna Vihar & Seelampur, Delhi NCR' },
        pdfDossierUrl: { type: String, default: '/reports/meals-distribution-audit.pdf' },
        coverImage: { type: String, default: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800' },
        summary: { type: String, default: 'Providing freshly cooked warm nutritional food packets and emergency grocery packs to destitute households.' },
        story: { type: String, default: 'Through our ground kitchen and distribution vans, we mobilized hot nutritious meals across daily wage clusters.' },
        beneficiariesCount: { type: Number, default: 10000 },
        status: { type: String, default: 'published' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 1 },
      },
      {
        title: { type: String, default: 'Saree & Warm Garments Distribution for 1,500+ Destitute Women & Seniors' },
        slug: { type: String, default: 'saree-garments-distribution-women' },
        category: { type: String, default: 'Clothing & Dignity' },
        outcomeMetric: { type: String, default: '1,500+ Women & Elderly' },
        location: { type: String, default: 'Yamuna Khadar & Mustafabad Settlements, Delhi' },
        pdfDossierUrl: { type: String, default: '/reports/garments-distribution-audit.pdf' },
        coverImage: { type: String, default: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800' },
        summary: { type: String, default: 'Seasonal winter warmth and dignified clothing support for elderly widows and marginalized women.' },
        story: { type: String, default: 'Delivered winter-resistant blankets, thermal sweaters, and daily wear sarees across temporary settlements.' },
        beneficiariesCount: { type: Number, default: 1500 },
        status: { type: String, default: 'published' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 2 },
      },
      {
        title: { type: String, default: 'Emergency Medical & NICU Treatment Sponsorship for 45+ Critical Infants' },
        slug: { type: String, default: 'emergency-medical-nicu-sponsorship' },
        category: { type: String, default: 'Healthcare & NICU Support' },
        outcomeMetric: { type: String, default: '₹4.5L+ Hospital Care Sponsored' },
        location: { type: String, default: 'GTB Hospital, AIIMS & Kalawati Saran, Delhi' },
        pdfDossierUrl: { type: String, default: '/reports/nicu-treatment-audit.pdf' },
        coverImage: { type: String, default: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800' },
        summary: { type: String, default: 'Life-saving surgical interventions, phototherapy, and premature infant stabilization care.' },
        story: { type: String, default: 'Partnering with tertiary government hospitals to sponsor essential medications and ventilator care.' },
        beneficiariesCount: { type: Number, default: 45 },
        status: { type: String, default: 'published' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 3 },
      },
      {
        title: { type: String, default: 'Street-to-School Remedial Child Bridge Centers' },
        slug: { type: String, default: 'street-to-school-remedial-education' },
        category: { type: String, default: 'Child Literacy & Education' },
        outcomeMetric: { type: String, default: '250+ Children Enrolled' },
        location: { type: String, default: 'Nand Nagri & Gokalpuri, Delhi NCR' },
        pdfDossierUrl: { type: String, default: '/reports/remedial-education-audit.pdf' },
        coverImage: { type: String, default: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800' },
        summary: { type: String, default: 'Mainstreaming children of waste-pickers and migrant daily-wagers into formal public schools.' },
        story: { type: String, default: 'Free daily evening coaching classes, basic alphabetic literacy, mathematics, and uniform kits.' },
        beneficiariesCount: { type: Number, default: 250 },
        status: { type: String, default: 'published' },
        isActive: { type: Boolean, default: true },
        order: { type: Number, default: 4 },
      },
    ],
    heroBanners: [
      {
        title: { type: String, default: 'Helping Children Grow With Care' },
        headlinePrefix: { type: String, default: 'Restoring Hope, Empowering' },
        headlineHighlight: { type: String, default: 'Children & Women' },
        headlineSuffix: { type: String, default: 'in Delhi NCR' },
        floatingQuote: { type: String, default: '"We make a living by what we get, but we make a life by what we give."' },
        subtitle: {
          type: String,
          default:
            'We are a children-focused charity organization dedicated to improving young lives through education, healthcare, protection, and community support.',
        },
        imageUrl: { type: String, default: '/hero-children.jpg' },
        badgeText: { type: String, default: 'NITI AAYOG DARPAN RECOGNIZED NGO • UID DL/2020/0262802' },
        primaryBtnText: { type: String, default: 'Donate Online' },
        primaryBtnLink: { type: String, default: '/donate' },
        secondaryBtnText: { type: String, default: 'Explore Our Programs' },
        secondaryBtnLink: { type: String, default: '/our-programs' },
        stat1Label: { type: String, default: 'Meals & Care Kits Distributed' },
        stat2Label: { type: String, default: 'Supported with Care' },
        stat3Label: { type: String, default: 'Real Stories Real Change' },
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
