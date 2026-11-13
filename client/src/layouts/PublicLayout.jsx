import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#151A2D]">
      {/* 
        Global Standardized Header:
        Top Utility & Compliance Bar (#0B0D17) + Main Navigation Bar (#FFFFFF)
        Sticky top-0 z-50 across all frontend pages.
      */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <Navbar />
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Dark Footer */}
      <Footer />
    </div>
  );
};

