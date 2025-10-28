/**
 * Navigation component for FitTrack Blog
 * Provides accessible navigation with mobile responsiveness and active state handling
 * Includes both desktop and mobile navigation patterns with proper SEO structure
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

/**
 * Navigation item interface for type safety
 */
interface NavigationItem {
  /** Display text for the navigation item */
  label: string;
  /** URL path for the navigation item */
  href: string;
  /** Optional description for accessibility */
  description?: string;
}

/**
 * Main navigation items for the site
 * Organized for both SEO and user experience
 */
const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    description: 'FitTrack Blog homepage with latest fitness content',
  },
  {
    label: 'Blog',
    href: '/blog',
    description: 'Expert fitness articles and workout guides',
  },
  {
    label: 'Workout Tracker',
    href: '/workout-tracker',
    description: 'Free workout tracking tool',
  },
  {
    label: 'About',
    href: '/about',
    description: 'About FitTrack Blog and our mission',
  },
];

/**
 * Navigation component props interface
 */
export interface NavigationProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show mobile menu by default */
  defaultMobileOpen?: boolean;
}

/**
 * Main Navigation component with responsive design and accessibility
 * Handles both desktop horizontal navigation and mobile hamburger menu
 * 
 * @param className - Additional CSS classes for styling
 * @param defaultMobileOpen - Whether mobile menu starts open (for testing)
 */
export const Navigation: React.FC<NavigationProps> = ({
  className,
  defaultMobileOpen = false,
}) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(defaultMobileOpen);

  /**
   * Checks if a navigation item is currently active
   * Uses exact matching for home page, starts-with for other pages
   */
  const isActiveLink = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  /**
   * Toggles mobile menu visibility
   * Includes proper ARIA state management
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Closes mobile menu when a link is clicked
   * Improves mobile user experience
   */
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn('relative', className)}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
              'hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md',
              isActiveLink(item.href)
                ? 'text-primary-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600'
                : 'text-neutral-700 hover:text-primary-600'
            )}
            aria-current={isActiveLink(item.href) ? 'page' : undefined}
            title={item.description}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="text-neutral-700 hover:text-primary-600"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:hidden z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="mobile-menu-button"
        >
          <div className="py-1" role="none">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  'block px-4 py-3 text-sm transition-colors duration-200',
                  'hover:bg-primary-50 focus:bg-primary-50 focus:outline-none',
                  isActiveLink(item.href)
                    ? 'bg-primary-50 text-primary-700 font-medium border-r-2 border-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                )}
                role="menuitem"
                aria-current={isActiveLink(item.href) ? 'page' : undefined}
              >
                <div>
                  <div className="font-medium">{item.label}</div>
                  {item.description && (
                    <div className="text-xs text-neutral-500 mt-1">
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navigation;