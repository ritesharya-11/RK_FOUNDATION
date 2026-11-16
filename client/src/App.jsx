import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { MissionVision } from './pages/MissionVision';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Activities } from './pages/Activities';
import { Gallery } from './pages/Gallery';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { ParentsVideo } from './pages/ParentsVideo';
import { Donate } from './pages/Donate';
import { Volunteer } from './pages/Volunteer';
import { Contact } from './pages/Contact';
import { ReceiptVerify } from './pages/ReceiptVerify';
import { LegalPrivacy } from './pages/LegalPrivacy';
import { TermsConditions } from './pages/TermsConditions';
import { RefundPolicy } from './pages/RefundPolicy';

// Admin Pages & Protected Routes
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminActivities } from './pages/admin/AdminActivities';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminNews } from './pages/admin/AdminNews';
import { AdminTestimonials } from './pages/admin/AdminTestimonials';
import { AdminDonations } from './pages/admin/AdminDonations';
import { AdminVolunteers } from './pages/admin/AdminVolunteers';
import { AdminContactMessages } from './pages/admin/AdminContactMessages';
import { AdminUsers } from './pages/admin/AdminUsers';

// Newly Added Admin Sections
import { AdminHeroBanners } from './pages/admin/AdminHeroBanners';
import { AdminLiveCases } from './pages/admin/AdminLiveCases';
import { AdminImpactCMS } from './pages/admin/AdminImpactCMS';
import { AdminAppreciationLetters } from './pages/admin/AdminAppreciationLetters';
import { AdminParentsVideo } from './pages/admin/AdminParentsVideo';
import { AdminPageSections } from './pages/admin/AdminPageSections';
import { AdminAuditTrail } from './pages/admin/AdminAuditTrail';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission-and-vision" element={<MissionVision />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/success-stories" element={<News />} />
        <Route path="/parents-video" element={<ParentsVideo />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/receipt/verify" element={<ReceiptVerify />} />
        <Route path="/privacy-policy" element={<LegalPrivacy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Dashboard */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="hero-banners" element={<AdminHeroBanners />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="campaigns" element={<AdminProjects />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="live-cases" element={<AdminLiveCases />} />
          <Route path="impact" element={<AdminImpactCMS />} />
          <Route path="appreciation-letters" element={<AdminAppreciationLetters />} />
          <Route path="parents-video" element={<AdminParentsVideo />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="media-library" element={<AdminGallery />} />
          <Route path="page-sections" element={<AdminPageSections />} />
          <Route path="volunteers" element={<AdminVolunteers />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="trust-settings" element={<AdminSettings />} />
          <Route path="audit-trail" element={<AdminAuditTrail />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="contact-messages" element={<AdminContactMessages />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

