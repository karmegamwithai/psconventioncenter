/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { BlogsModal } from './components/modals/BlogsModal';
import { ThemeProvider } from './context/ThemeContext';
import { LuxuryCursor } from './components/common/LuxuryCursor';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'/' | '/booking'>('/');
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('Wedding');

  // Sync with browser URL bar and back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/booking' || window.location.hash.includes('booking')) {
        setCurrentRoute('/booking');
      } else {
        setCurrentRoute('/');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: '/' | '/booking', sectionId?: string) => {
    setCurrentRoute(route);
    if (window.history.pushState) {
      window.history.pushState(null, '', route === '/booking' ? '/booking' : '/');
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

  return (
    <ThemeProvider>
      {/* Luxury GSAP Custom Follower Cursor */}
      <LuxuryCursor />

      <div className="min-h-screen flex flex-col bg-white dark:bg-[#06140e] text-[#202823] dark:text-gray-100 font-['Outfit',sans-serif] transition-colors duration-300">
        {/* Shared Premium Sticky Header with Dark Mode Toggle */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={navigateTo}
          onOpenBlogs={() => setBlogsOpen(true)}
        />

        {/* Primary Page Outlet */}
        <main className="flex-1">
          {currentRoute === '/' ? (
            <HomePage
              onNavigate={navigateTo}
              onSelectEventForBooking={handleSelectEventForBooking}
            />
          ) : (
            <BookingPage
              onGoHome={() => navigateTo('/')}
              preselectedEventType={selectedEventType}
            />
          )}
        </main>

        {/* Shared Luxury Footer */}
        <Footer onNavigate={navigateTo} />

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
