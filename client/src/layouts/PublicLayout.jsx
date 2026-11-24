import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#121316]">
      {/* 
        Global Standardized Header:
        Sticky top-0 / floating capsule z-50 across all frontend pages.
      */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
};

