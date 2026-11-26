/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { HallPackageDetailPage } from './pages/HallPackageDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { BlogsModal } from './components/modals/BlogsModal';
import { ContactUsModal } from './components/modals/ContactUsModal';
import { ThemeProvider } from './context/ThemeContext';
import { LuxuryCursor } from './components/common/LuxuryCursor';
import { FACILITIES, FacilityId, HALL_PACKAGES, HallPackageId } from './data/venueData';

const VALID_FACILITY_IDS = new Set<string>(FACILITIES.map((f) => f.id));
const VALID_PACKAGE_IDS = new Set<string>(HALL_PACKAGES.map((p) => p.id));

function parseFacilityIdFromRoute(route: string): FacilityId | null {
  if (!route.startsWith('/facility/')) return null;
  const slug = route.replace('/facility/', '').split('/')[0];
  if (slug === 'hall') return 'hall-3';
  return VALID_FACILITY_IDS.has(slug) ? (slug as FacilityId) : null;
}

function parsePackageIdFromRoute(route: string): HallPackageId | null {
  if (!route.startsWith('/package/')) return null;
  const slug = route.replace('/package/', '').split('/')[0];
  return VALID_PACKAGE_IDS.has(slug) ? (slug as HallPackageId) : null;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('Grand Weddings');

  // Sync with browser URL bar and back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin' || window.location.hash.includes('admin')) {
        setCurrentRoute('/admin');
      } else if (path === '/booking' || window.location.hash.includes('booking')) {
        setCurrentRoute('/booking');
      } else if (parseFacilityIdFromRoute(path)) {
        setCurrentRoute(path);
      } else if (parsePackageIdFromRoute(path)) {
        setCurrentRoute(path);
      } else {
        setCurrentRoute('/');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string, sectionId?: string) => {
    setCurrentRoute(route);
    if (window.history.pushState) {
      window.history.pushState(null, '', route);
    }

    if (route === '/') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectEventForBooking = (eventTitle: string) => {
    setSelectedEventType(eventTitle);
    navigateTo('/booking');
  };

  const activeFacilityId = parseFacilityIdFromRoute(currentRoute);
  const activePackageId = parsePackageIdFromRoute(currentRoute);

  return (
    <ThemeProvider>
      {/* Luxury GSAP Custom Follower Cursor */}
      <LuxuryCursor />

      <div className="min-h-screen flex flex-col bg-white dark:bg-[#06140e] text-[#202823] dark:text-gray-100 font-['Urbanist','Outfit',sans-serif] transition-colors duration-300">
        {/* Shared Premium Sticky Header */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onOpenBlogs={() => setBlogsOpen(true)}
          onOpenContactUs={() => setContactUsOpen(true)}
        />

        {/* Primary Page Outlet */}
        <main className="flex-1">
          {currentRoute === '/admin' ? (
            <AdminDashboardPage onGoHome={() => navigateTo('/')} />
          ) : currentRoute === '/booking' ? (
            <BookingPage
              onGoHome={() => navigateTo('/')}
              preselectedEventType={selectedEventType}
            />
          ) : activePackageId ? (
            <HallPackageDetailPage
              packageId={activePackageId}
              onNavigate={navigateTo}
              onEnquirePackage={handleSelectEventForBooking}
            />
          ) : activeFacilityId ? (
            <FacilityDetailPage
              facilityId={activeFacilityId}
              onNavigate={navigateTo}
              onBookFacility={handleSelectEventForBooking}
            />
          ) : (
            <HomePage
              onNavigate={navigateTo}
              onSelectEventForBooking={handleSelectEventForBooking}
            />
          )}
        </main>

        {/* Shared Luxury Footer */}
        <Footer onNavigate={navigateTo} />

        {/* Contact Us Centered Overlay Modal */}
        <ContactUsModal
          isOpen={contactUsOpen}
          onClose={() => setContactUsOpen(false)}
        />

        {/* Blogs & Updates Modal */}
        <BlogsModal
          isOpen={blogsOpen}
          onClose={() => setBlogsOpen(false)}
          onCheckDates={() => {
            setBlogsOpen(false);
            navigateTo('/booking');
          }}
        />
      </div>
    </ThemeProvider>
  );
}
