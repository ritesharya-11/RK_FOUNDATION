import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {}

import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

import User from '../models/User.js';
import Setting from '../models/Setting.js';
import Program from '../models/Program.js';
import Project from '../models/Project.js';
import Activity from '../models/Activity.js';
import Gallery from '../models/Gallery.js';
import News from '../models/News.js';
import Testimonial from '../models/Testimonial.js';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import ContactMessage from '../models/ContactMessage.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[Seeder] Connected to database. Purging old records...');

    // Clear existing collections
    await Promise.all([
      User.deleteMany(),
      Setting.deleteMany(),
      Program.deleteMany(),
      Project.deleteMany(),
      Activity.deleteMany(),
      Gallery.deleteMany(),
      News.deleteMany(),
      Testimonial.deleteMany(),
      Donation.deleteMany(),
      Volunteer.deleteMany(),
      ContactMessage.deleteMany(),
    ]);

    console.log('[Seeder] Creating Super Admin user...');
    await User.create({
      name: process.env.INITIAL_ADMIN_NAME || 'RK Foundation Super Admin',
      email: (process.env.INITIAL_ADMIN_EMAIL || 'admin@rkfoundation.org').toLowerCase(),
      password: process.env.INITIAL_ADMIN_PASSWORD || 'Admin@RK2026!',
      role: 'superadmin',
      phone: '+91-9876543210',
      isActive: true,
    });

    console.log('[Seeder] Initializing Foundation Website Settings...');
    await Setting.create({
      siteName: 'RK FOUNDATION',
      tagline: 'Empowering Underprivileged Communities & Restoring Hope',
      missionStatement:
        'To transform the lives of vulnerable children, marginalized women, and destitute families across India through accessible education, lifesaving medical relief, nutritional security, and sustainable skill development.',
      contact: {
        phone: '+91-9876543210',
        altPhone: '+91-9812345678',
        email: 'contact@rkfoundation.org',
        donorEmail: 'donate@rkfoundation.org',
        address: 'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309',
        officeHours: 'Mon - Sat: 9:00 AM - 6:30 PM (IST)',
      },
      compliance: {
        trustRegistrationNo: 'TRUST/DL/2021/887412',
        ngoDarpanUid: 'DL/2021/0298412',
        panNumber: 'AAETR5566K',
        section80GRegNo: 'CIT(E)/DELHI/80G/2021-22/A/1045',
        section12ARegNo: 'CIT(E)/DELHI/12A/2021-22/A/2088',
        taxExemptionNote:
          'All contributions made to RK FOUNDATION are 50% tax exempt under Section 80G of the Indian Income Tax Act, 1961. Formal 80G tax receipts are generated instantly.',
      },
      socialLinks: {
        facebook: 'https://facebook.com/rkfoundation',
        instagram: 'https://instagram.com/rkfoundation',
        twitter: 'https://x.com/rkfoundation',
        linkedin: 'https://linkedin.com/company/rkfoundation',
        youtube: 'https://youtube.com/@rkfoundation',
        whatsapp: '+919876543210',
      },
      donationSettings: {
        presetAmounts: [500, 1000, 2500, 5000, 10000, 25000],
        defaultPreset: 2500,
        bankAccountName: 'RK FOUNDATION CHARITABLE TRUST',
        bankName: 'State Bank of India',
        accountNumber: '394857201948',
        ifscCode: 'SBIN0004052',
        branchName: 'Sector 62 Institutional Branch, Noida',
        upiId: 'rkfoundation@sbi',
      },
      announcementBar: {
        isEnabled: true,
        text: 'Urgent Winter Relief & Pediatric Nutrition Mission 2026 is Live. Every ₹1,000 provides warm clothes and 30 days of food.',
        linkUrl: '/donate',
        linkText: 'Donate Now',
      },
      hero: {
        badge: 'Govt. Registered Public Charitable Trust (80G & 12A Certified)',
        heading: 'Restoring Dignity, Educating Children, and Transforming Marginalized Communities',
        subheading:
          'Join RK FOUNDATION in our dedicated mission across Delhi-NCR and rural India. We bridge inequality by sponsoring foundational schooling for slum children, providing vocational tailoring for women, and delivering emergency medical assistance.',
        ctaPrimaryText: 'Make a Difference Today',
        ctaPrimaryLink: '/donate',
        ctaSecondaryText: 'Explore Our Programs',
        ctaSecondaryLink: '/programs',
        volunteerCtaText: 'Join as a Volunteer',
        volunteerCtaLink: '/volunteer',
      },
      impactStats: {
        livesImpacted: 48500,
        childrenEducated: 12400,
        womenEmpowered: 4200,
        mealsServed: 185000,
        healthCampsConducted: 340,
        activeVolunteers: 1250,
      },
    });

    console.log('[Seeder] Creating 10 Core Operational Programs...');
    await Program.insertMany([
      {
        title: 'Children Development',
        slug: 'children-development',
        category: 'Child Welfare',
        shortDescription:
          'Protecting child rights, fighting infant mortality, eliminating child labor, and providing free meals, clothes, and medicines.',
        fullDescription:
          'Our Children Development program focuses on street children and young learners from migrant laborer families who have dropped out of school or never enrolled. We operate community learning centers, provide bilingual tutoring, digital learning tablets, uniforms, school bags, and bridge courses that mainstream children into recognized government schools.',
        iconName: 'GraduationCap',
        coverImage: '/programs/children-development.jpg',
        objectives: [
          'Foundational literacy and numeracy for 3,000+ dropouts yearly',
          'Free mid-day nutritional meals and health screenings',
          'Bridge courses facilitating direct government school enrollment',
          'Digital smart classes and computer literacy modules',
        ],
        beneficiariesCount: 12400,
        budgetOrCostPerChild: 1200,
        isFeatured: true,
        displayOrder: 1,
      },
      {
        title: "Women's Development and Empowerment",
        slug: 'womens-development-and-empowerment',
        category: 'Women Empowerment',
        shortDescription:
          'Empowering women to live with dignity and equal rights in violence-free environments through literacy and self-help groups.',
        fullDescription:
          'RK FOUNDATION runs community vocational training hubs providing 6-month certification courses in professional tailoring, garment construction, handicraft making, and micro-entrepreneurship. Each graduating woman receives a sponsored sewing machine kit.',
        iconName: 'Sparkles',
        coverImage: '/programs/womens-empowerment.jpg',
        objectives: [
          'Livelihood skill training in sewing, design, and artisan crafts',
          'Financial independence and bank account linkage assistance',
          'Workshops on reproductive health, rights, and gender dignity',
          'Support for micro-enterprises and home-based garment stalls',
        ],
        beneficiariesCount: 4200,
        budgetOrCostPerChild: 2500,
        isFeatured: true,
        displayOrder: 2,
      },
      {
        title: 'Aged / Elderly Care',
        slug: 'aged-elderly-care',
        category: 'Elderly Support',
        shortDescription:
          'Providing medical aid, nutrition, and companionship to destitute and abandoned senior citizens living without family support.',
        fullDescription:
          'Destitute elderly individuals often face severe medical neglect and social isolation. RK FOUNDATION provides regular geriatric health monitoring, arthritis medications, adult diapers, nutritious food supplies, and community companionship.',
        iconName: 'Heart',
        coverImage: '/programs/elderly-care.jpg',
        objectives: [
          'Monthly chronic disease medical kits (hypertension, diabetes)',
          'Mobility aids including walking sticks, walkers, and wheelchairs',
          'Bi-weekly home visits by trained social workers',
          'Winter warmth kits containing quilts, thermal wear, and socks',
        ],
        beneficiariesCount: 3400,
        budgetOrCostPerChild: 2000,
        isFeatured: true,
        displayOrder: 3,
      },
      {
        title: 'Differently Abled Support',
        slug: 'differently-abled-support',
        category: 'Special Needs',
        shortDescription:
          'Ensuring differently-abled citizens enjoy equal rights, assistive equipment, dignity, and inclusive opportunities in nation-building.',
        fullDescription:
          'Empowering persons with physical and sensory disabilities through accessible mobility aids, occupational therapy sessions, government disability certificate camps, and inclusive vocational skills for sustainable livelihood.',
        iconName: 'Shield',
        coverImage: '/programs/differently-abled.jpg',
        objectives: [
          'Custom fitted wheelchairs, tri-cycles, and walking crutches',
          'Hearing aid fitting and pediatric speech therapy camps',
          'Accessible digital literacy modules for visually impaired students',
          'Facilitating UDID card and government disability pensions',
        ],
        beneficiariesCount: 2900,
        budgetOrCostPerChild: 3000,
        isFeatured: true,
        displayOrder: 4,
      },
      {
        title: 'Education and Literacy',
        slug: 'education-and-literacy',
        category: 'Education',
        shortDescription:
          'Bridging educational gaps for slum children and school dropouts with non-formal evening schooling and free learning materials.',
        fullDescription:
          'Our Education and Literacy initiative runs after-school remedial learning centers across urban slums. We provide free syllabus books, bilingual digital tablet learning, stationery kits, and dedicated tutors to ensure every child passes their exams with distinction.',
        iconName: 'BookOpen',
        coverImage: '/programs/education-literacy.jpg',
        objectives: [
          'Remedial schooling and exam coaching for board aspirants',
          'Distribution of school bags, notebooks, and learning tablets',
          'Scholarships for bright students from impoverished backgrounds',
          'Parent counseling on the critical value of girl-child education',
        ],
        beneficiariesCount: 8600,
        budgetOrCostPerChild: 1500,
        isFeatured: true,
        displayOrder: 5,
      },
      {
        title: 'Health and Family Welfare',
        slug: 'health-and-family-welfare',
        category: 'Healthcare',
        shortDescription:
          'Community health camps, preventative medical care, and quality mother-child health guidance across rural and slum settlements.',
        fullDescription:
          'Our healthcare relief team deploys mobile medical clinics directly to underserved communities across Delhi-NCR. We bring certified pediatricians, general physicians, and optometrists to provide free consultations, essential medications, hemoglobin testing, and malnutrition screenings.',
        iconName: 'HeartPulse',
        coverImage: '/programs/health-welfare.jpg',
        objectives: [
          'Weekly mobile health clinics in high-density informal settlements',
          'Free diagnostic screenings, vision testing, and spectacles',
          'Pediatric treatment fund for critical child surgeries',
          'Maternal healthcare and post-natal nutrition guidance',
        ],
        beneficiariesCount: 28500,
        budgetOrCostPerChild: 1800,
        isFeatured: true,
        displayOrder: 6,
      },
      {
        title: 'Dalit Upliftment & Rights Advocacy',
        slug: 'dalit-upliftment-and-rights',
        category: 'Dalit Upliftment & Rights',
        shortDescription:
          'Community legal aid, constitutional rights literacy, caste discrimination grievance support, and educational advancement for Dalit youth.',
        fullDescription:
          'Dedicated to constitutional equality and social justice, this initiative assists marginalized Dalit and minority settlements with government scheme linkages, scholarship applications, free legal advice, and youth leadership training.',
        iconName: 'ShieldCheck',
        coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
        objectives: [
          'Legal aid clinics and social welfare documentation camps',
          'Hostel and higher-education scholarship enrollment help',
          'Youth leadership, anti-discrimination, and civic awareness',
          'Economic self-help group formation for Dalit women',
        ],
        beneficiariesCount: 5200,
        budgetOrCostPerChild: 1800,
        isFeatured: false,
        displayOrder: 7,
      },
      {
        title: 'Drinking Water & Sanitation Project',
        slug: 'drinking-water-and-sanitation',
        category: 'Drinking Water & Sanitation',
        shortDescription:
          'Installing community RO filtration plants, renovating slum borewells, building clean sanitation units, and distributing hygiene kits.',
        fullDescription:
          'Contaminated water is the leading cause of preventable child mortality in informal settlements. We construct decentralized clean drinking water dispensing kiosks and safe, well-lit sanitation complexes for women and children in slum clusters.',
        iconName: 'Droplets',
        coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?q=80&w=1200&auto=format&fit=crop',
        objectives: [
          'High-capacity community reverse osmosis water filtration units',
          'Slum toilet refurbishment with running water and solar lighting',
          'Handwashing, personal hygiene, and menstrual health campaigns',
          'Periodic testing of water quality across Delhi-NCR bastis',
        ],
        beneficiariesCount: 22000,
        budgetOrCostPerChild: 1000,
        isFeatured: false,
        displayOrder: 8,
      },
      {
        title: 'Environment and Forest Protection',
        slug: 'environment-and-forest-protection',
        category: 'Environment and Forest Protection',
        shortDescription:
          'Urban afforestation, community tree plantation drives, plastic-waste eradication, and school eco-club conservation workshops.',
        fullDescription:
          'Combating hazardous air pollution and urban degradation through massive native tree plantation drives across Delhi-NCR green belts, setting up community rainwater harvesting pits, and educating youth on environmental stewardship.',
        iconName: 'Leaf',
        coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop',
        objectives: [
          'Plantation of 25,000+ native saplings in urban heat islands',
          'Slum clean-up and plastic segregation awareness drives',
          'Rainwater harvesting installations in community bridge schools',
          'Solar lantern distribution in un-electrified settlements',
        ],
        beneficiariesCount: 15000,
        budgetOrCostPerChild: 800,
        isFeatured: false,
        displayOrder: 9,
      },
      {
        title: 'Disaster Management & Emergency Relief',
        slug: 'disaster-management-and-emergency-relief',
        category: 'Disaster Management & Emergency Relief',
        shortDescription:
          'Rapid on-ground deployment of emergency food rations, dry clothes, temporary tarpaulin shelters, and clean water during crises.',
        fullDescription:
          'Our rapid disaster response unit stays primed 24/7 to support flood victims, slum fire survivors, and vulnerable families affected by harsh northern cold waves with emergency cooked meals, blankets, first-aid, and rebuilding kits.',
        iconName: 'LifeBuoy',
        coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop',
        objectives: [
          'Immediate 24-hour food and dry ration relief distribution',
          'Emergency tarpaulins, bamboo poles, and waterproof mats',
          'Medical triage camps and water purification chlorine tablets',
          'Rebuilding support for devastated slum shanties',
        ],
        beneficiariesCount: 35000,
        budgetOrCostPerChild: 2000,
        isFeatured: true,
        displayOrder: 10,
      },
    ]);

    console.log('[Seeder] Creating Live Fundraising Campaigns / Causes...');
    const createdProjects = await Project.insertMany([
      {
        title: 'Save 4-Year-Old Aarav: Urgent Congenital Heart Surgery',
        slug: 'save-aarav-heart-surgery',
        category: 'Urgent Medical Relief',
        summary:
          'Aarav was born with a critical ventricular septal defect. His father, a daily-wage laborer, cannot afford the urgent cardiac surgery needed to save his life.',
        story:
          '4-year-old Aarav from Nand Nagri, Delhi, struggles to breathe with every small step. Diagnosed with a severe ventricular heart defect, doctors have stated that surgical correction must be completed within 30 days. The estimated cost of hospital stay, surgery, and post-operative intensive care is ₹3,50,000. Your generous contribution will directly save this little child’s life.',
        targetAmount: 350000,
        raisedAmount: 268500,
        donorsCount: 142,
        coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?q=80&w=1200&auto=format&fit=crop',
        isUrgent: true,
        isFeatured: true,
        status: 'active',
        beneficiaryNameOrGroup: 'Master Aarav (Age 4)',
        location: 'AIIMS / New Delhi Hospital',
      },
      {
        title: 'Slum Learning Centers: Sponsor Schooling for 500 Migrant Children',
        slug: 'sponsor-slum-child-education-2026',
        category: 'Slum Child Education',
        summary:
          'Help us establish 5 new after-school bridge education centers in East Delhi slum settlements to pull 500 children off the streets and into school.',
        story:
          'Children of brick kiln and construction workers are constantly on the move, leading to devastating educational gaps. RK FOUNDATION is building dedicated slum learning centers equipped with experienced teachers, digital tablets, school uniforms, and hot meals. A donation of ₹1,200 supports a child’s entire education for an entire month.',
        targetAmount: 600000,
        raisedAmount: 435000,
        donorsCount: 289,
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
        isUrgent: false,
        isFeatured: true,
        status: 'active',
        beneficiaryNameOrGroup: '500 Migrant Children',
        location: 'East Delhi & Noida Clusters',
      },
      {
        title: 'Winter Warmth & Ration Kits for 1,000 Destitute Families',
        slug: 'winter-warmth-and-ration-relief-drive',
        category: 'Ration & Nutrition Kit',
        summary:
          'Provide high-grade wool blankets, thermal jackets, and 30-day grocery ration kits to homeless and daily-wage families fighting severe cold.',
        story:
          'Winter in Northern India brings sub-zero winds and harsh conditions for families residing in makeshift tarpaulin shacks. Our on-ground relief team is actively distributing 1,000 survival packages containing warm quilts, thermal wear, and a 35kg grocery package of essential grains, pulses, and oil.',
        targetAmount: 500000,
        raisedAmount: 382000,
        donorsCount: 215,
        coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop',
        isUrgent: true,
        isFeatured: true,
        status: 'active',
        beneficiaryNameOrGroup: '1,000 Destitute Households',
        location: 'Delhi-NCR & Western UP',
      },
      {
        title: 'Livelihood for Widowed & Single Mothers: 100 Sewing Machine Sponsorships',
        slug: 'empower-mothers-sewing-machines',
        category: 'Women Vocational Center',
        summary:
          'Equip 100 marginalized women with professional sewing machines and business starter fabric to launch their own home-based tailoring micro-enterprises.',
        story:
          'Following a 6-month intensive training program at the RK FOUNDATION Skill Center, these 100 women are ready to earn with dignity. Sponsoring a commercial heavy-duty sewing machine for ₹4,500 permanently lifts a household out of extreme poverty and funds their children’s education.',
        targetAmount: 450000,
        raisedAmount: 310000,
        donorsCount: 167,
        coverImage: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop',
        isUrgent: false,
        isFeatured: true,
        status: 'active',
        beneficiaryNameOrGroup: '100 Trained Women Tailors',
        location: 'Skill Center, Noida Sector 62',
      },
    ]);

    console.log('[Seeder] Creating On-Ground Field Activities...');
    await Activity.insertMany([
      {
        title: 'Mega Health & Pediatric Checkup Camp at Nand Nagri',
        date: new Date('2026-02-15'),
        location: 'Community Center, Nand Nagri, East Delhi',
        category: 'Health Camp',
        description:
          'Over 420 children and mothers received free pediatric consultations, dental screenings, hemoglobin checkups, and necessary vitamin syrups and antibiotic treatments.',
        beneficiariesCount: 420,
        coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
        status: 'completed',
      },
      {
        title: 'Winter Warmth & Quilt Distribution at Kashmere Gate',
        date: new Date('2026-01-20'),
        location: 'Kashmere Gate & Yamuna Pushta Settlements',
        category: 'Winter Blanket Drive',
        description:
          'Distributed 650 heavy winter quilts, thermal innerwear sets, and hot porridge to destitute elderly individuals and families sleeping without proper shelter.',
        beneficiariesCount: 650,
        coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1200&auto=format&fit=crop',
        status: 'completed',
      },
      {
        title: 'Back-to-School Learning Kit Handover for 300 Slum Children',
        date: new Date('2026-03-02'),
        location: 'RK Foundation Education Hub, Ghaziabad Cluster',
        category: 'Education Kit Distribution',
        description:
          'Provided sturdy school bags, Hindi-English workbooks, drawing sets, water bottles, and geometry boxes to 300 children enrolled in our foundation classes.',
        beneficiariesCount: 300,
        coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
        status: 'completed',
      },
      {
        title: 'Graduation Ceremony for Batch 14 Vocational Sewing Students',
        date: new Date('2026-02-28'),
        location: 'RK Center of Excellence, Sector 62, Noida',
        category: 'Women Workshop',
        description:
          'Celebrated the successful graduation of 48 women from our 6-month tailoring and fashion stitching course. Sponsored sewing machines were distributed to the top 20 performers.',
        beneficiariesCount: 48,
        coverImage: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop',
        status: 'completed',
      },
    ]);

    console.log('[Seeder] Creating Media Gallery...');
    await Gallery.insertMany([
      {
        title: 'Children enjoying interactive digital learning tablets in our bridge school',
        category: 'Child Education',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop',
        caption: 'Digital literacy in informal slum clusters',
        location: 'East Delhi',
        isFeatured: true,
      },
      {
        title: 'Certified pediatric physician examining young child during mobile health drive',
        category: 'Healthcare Relief',
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
        caption: 'Free diagnostic care for all',
        location: 'Nand Nagri, Delhi',
        isFeatured: true,
      },
      {
        title: 'Volunteer team packing 500 monthly dry grocery ration kits',
        category: 'Food & Ration Drives',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop',
        caption: 'Packing essential staples for daily-wage households',
        location: 'Noida Central Warehouse',
        isFeatured: true,
      },
      {
        title: 'Trainees mastering precision dressmaking at RK Foundation Skill Center',
        category: 'Women Empowerment',
        imageUrl: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1000&auto=format&fit=crop',
        caption: 'Skill training bringing financial self-reliance',
        location: 'Sector 62 Center',
        isFeatured: true,
      },
      {
        title: 'Smiling young students showcasing their new backpacks and notebooks',
        category: 'Child Education',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Back-to-school joy',
        location: 'Ghaziabad Learning Hub',
        isFeatured: true,
      },
      {
        title: 'Annual Volunteer Convention and Community Impact Recognition',
        category: 'Community Events',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
        caption: 'Celebrating our 1,200+ passionate volunteers',
        location: 'Delhi Habitat Centre',
        isFeatured: true,
      },
    ]);

    console.log('[Seeder] Creating News & Impact Stories...');
    await News.insertMany([
      {
        title: 'How Bridge Learning Centers Are Ending Child Labor in Delhi Slums',
        slug: 'ending-child-labor-through-bridge-schools',
        category: 'Field Stories',
        summary:
          'A deep dive into RK FOUNDATION’s accelerated learning curriculum that has mainstreamed over 3,200 dropouts into formal government schools over the past 3 years.',
        content: `
### Transforming Slum Corners Into Classrooms

For an 8-year-old child born into a family of migrant construction workers, life in an informal settlement often means looking after younger siblings or collecting recyclable scrap rather than sitting in a classroom.

At RK FOUNDATION, we believe every child possesses innate genius that merely awaits the spark of opportunity. Our Bridge Learning Centers are situated right inside high-density settlements, eliminating long commutes that deter parents from sending their daughters to school.

### A Holistic Model: Food, Fun, and Foundational Skills

Our approach combines three foundational pillars:
1. **Daily Nutrition:** A hot, vitamin-fortified meal every morning ensures no child learns on an empty stomach.
2. **Activity-Based Learning:** Using colorful manipulatives, interactive storytelling, and digital audiovisual modules to make learning irresistible.
3. **Parental Counselling:** Convincing parents of the long-term economic dividends of keeping their children in school rather than child labor.

With your continuous philanthropic support, we plan to open 10 new centers across Delhi-NCR before the next academic year.
        `,
        author: 'Dr. Radhika Sharma (Education Director)',
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop',
        tags: ['Child Education', 'Slum Schools', 'Right to Education'],
        isPublished: true,
      },
      {
        title: 'Empowerment Through the Needle: Sunita’s Journey From Hardship to Enterprise',
        slug: 'sunitas-journey-to-financial-freedom',
        category: 'Field Stories',
        summary:
          'Widowed at age 26 with two toddlers, Sunita found hope at the RK Foundation Vocational Center. Today, she runs her own tailoring boutique and earns ₹18,000 every month.',
        content: `
### Against Immense Odds

When Sunita lost her husband to illness four years ago, she had never worked outside the house and had only completed 6th grade. Facing mounting debt and uncertainty, she walked into RK FOUNDATION’s Women Vocational Center in Noida.

"I didn't know how to thread a needle properly," recalls Sunita with a proud smile. "The trainers were patient and kind. They taught me how to measure, cut garments, sew blouses, and even maintain financial ledgers."

### A Sustainable Micro-Business

Upon completing her 6-month certification, Sunita was sponsored a commercial sewing machine by a generous donor through our platform. Today, she designs garments for over 80 local clients and has enrolled both her daughters in a private English-medium school.

Sunita represents the thousands of women whose lives are permanently transformed when given access to skills rather than just temporary charity.
        `,
        author: 'Priya Mehra (Women Empowerment Lead)',
        coverImage: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop',
        tags: ['Women Empowerment', 'Skill Development', 'Livelihood'],
        isPublished: true,
      },
      {
        title: 'RK FOUNDATION Recognized by Social Welfare Board for 100% Transparency',
        slug: 'rk-foundation-awarded-transparency-excellence',
        category: 'Press Release',
        summary:
          'RK FOUNDATION receives the 2026 NGO Governance & Financial Transparency Certification for exemplary public reporting and real-time donor tracking.',
        content: `
### Transparency is Our Utmost Priority

RK FOUNDATION has officially been commended for best practices in non-profit financial governance. Every single donation received through our online portal is instantly logged with an official 80G tax receipt and linked to verified field expenditure.

Our public dashboard, audited annual accounts, and independent ground surveys ensure that 88% of every rupee contributed directly funds frontline program delivery.
        `,
        author: 'Corporate Communications Desk',
        coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
        tags: ['Transparency', 'Governance', '80G Tax Benefits'],
        isPublished: true,
      },
    ]);

    console.log('[Seeder] Creating Testimonials...');
    await Testimonial.insertMany([
      {
        name: 'Vikram Malhotra',
        role: 'Corporate CSR Partner & Monthly Donor',
        message:
          'Donating to RK FOUNDATION gives me complete peace of mind. The transparent receipts, real-time campaign updates, and genuine ground photos prove that our funds are transforming young lives directly.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
        rating: 5,
        isFeatured: true,
      },
      {
        name: 'Dr. Ananya Sen',
        role: 'Volunteer Medical Officer',
        message:
          'Volunteering in RK Foundation’s mobile health camps in Nand Nagri has been one of the most rewarding experiences of my medical career. The organizational logistics and empathy for beneficiaries are world-class.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
        rating: 5,
        isFeatured: true,
      },
      {
        name: 'Meena Devi',
        role: 'Beneficiary & Tailoring Center Graduate',
        message:
          'Because of the free tailoring training and sponsored sewing machine from RK FOUNDATION, my family no longer sleeps hungry. I am proud to be independent and pay for my son’s education myself.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
        rating: 5,
        isFeatured: true,
      },
    ]);

    console.log('[Seeder] Creating Initial Sample Donations & Volunteer Records...');
    const campaign1 = createdProjects[0];
    const campaign2 = createdProjects[1];

    await Donation.insertMany([
      {
        receiptNumber: 'RKF-2026-REC-100234',
        donorName: 'Rahul Verma',
        donorEmail: 'rahul.verma@example.com',
        donorPhone: '+91-9811223344',
        donorPan: 'ABCDE1234F',
        address: 'Tower 4, Green Glen Apts, Sector 50, Gurgaon',
        city: 'Gurgaon',
        state: 'Haryana',
        postalCode: '122018',
        amount: 5000,
        currency: 'INR',
        campaignId: campaign1._id,
        campaignTitle: campaign1.title,
        paymentGateway: 'razorpay',
        orderId: 'order_seeded_9001',
        paymentId: 'pay_seeded_8001',
        paymentStatus: 'captured',
        taxExemption80G: true,
        notes: 'Wishing Aarav a speedy recovery and long, healthy life.',
      },
      {
        receiptNumber: 'RKF-2026-REC-100235',
        donorName: 'Sunita Aggarwal',
        donorEmail: 'sunita.aggarwal@example.com',
        donorPhone: '+91-9988776655',
        donorPan: 'XYZPA9876Q',
        address: 'B-12, Greater Kailash 1, New Delhi',
        city: 'New Delhi',
        state: 'Delhi',
        postalCode: '110048',
        amount: 2500,
        currency: 'INR',
        campaignId: campaign2._id,
        campaignTitle: campaign2.title,
        paymentGateway: 'razorpay',
        orderId: 'order_seeded_9002',
        paymentId: 'pay_seeded_8002',
        paymentStatus: 'captured',
        taxExemption80G: true,
        notes: 'Keep up the wonderful education initiative for our children.',
      },
      {
        receiptNumber: 'RKF-2026-REC-100236',
        donorName: 'Anonymous Donor',
        donorEmail: 'donor.care@example.com',
        donorPhone: '+91-9877001122',
        donorPan: '',
        amount: 10000,
        currency: 'INR',
        campaignTitle: 'General Charitable Relief Fund',
        paymentGateway: 'razorpay',
        orderId: 'order_seeded_9003',
        paymentId: 'pay_seeded_8003',
        paymentStatus: 'captured',
        taxExemption80G: false,
        isAnonymous: true,
      },
    ]);

    await Volunteer.insertMany([
      {
        fullName: 'Aakash Mishra',
        email: 'aakash.mishra@example.com',
        phone: '+91-9822334455',
        city: 'Noida',
        state: 'Uttar Pradesh',
        occupation: 'Software Engineer',
        education: 'B.Tech Computer Science',
        availableHoursPerWeek: 'Weekends only',
        areasOfInterest: ['Child Tutoring & Education', 'Social Media & Content'],
        previousExperience: '2 years teaching slum kids in college NGO club.',
        motivation:
          'I want to contribute my weekend hours to tutor young students in basic mathematics and computer literacy.',
        status: 'approved',
        adminNotes: 'Assigned to Sector 62 weekend education batch.',
      },
      {
        fullName: 'Kavita Chawla',
        email: 'kavita.c@example.com',
        phone: '+91-9833445566',
        city: 'New Delhi',
        state: 'Delhi',
        occupation: 'Undergraduate Student',
        education: 'BA Psychology',
        availableHoursPerWeek: '5-10 hours',
        areasOfInterest: ['Medical & Health Camps', 'Food & Nutrition Drives'],
        previousExperience: 'Organized university blood donation camps.',
        motivation: 'Passionate about public healthcare relief and helping distressed families.',
        status: 'pending',
      },
    ]);

    await ContactMessage.insertMany([
      {
        name: 'Deepak Chopra',
        email: 'deepak.chopra@corporatesolutions.com',
        phone: '+91-9810101010',
        subject: 'Corporate CSR Partnership Opportunity 2026',
        message:
          'Our corporate CSR committee would like to discuss sponsoring 3 new Women Vocational Tailoring Centers in Delhi-NCR. Please connect us with your executive team.',
        status: 'unread',
      },
      {
        name: 'Suman Roy',
        email: 'suman.roy@example.com',
        phone: '+91-9722331100',
        subject: 'Donating used books and laptops for education centers',
        message:
          'We have approximately 25 refurbished laptops and 400 school textbooks available for donation. Where can we deliver them?',
        status: 'read',
        adminNotes: 'Contacted Suman on 5th Feb. Logistics pickup scheduled.',
      },
    ]);

    console.log('[Seeder] ==============================================');
    console.log('[Seeder] DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`[Seeder] Super Admin Email:    ${process.env.INITIAL_ADMIN_EMAIL || 'admin@rkfoundation.org'}`);
    console.log(`[Seeder] Super Admin Password: ${process.env.INITIAL_ADMIN_PASSWORD || 'Admin@RK2026!'}`);
    console.log('[Seeder] ==============================================');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('[Seeder Error] Database seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();
