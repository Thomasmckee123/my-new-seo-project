/**
 * Header component for FitTrack Blog
 * Provides sticky site header with logo, navigation, and responsive design
 * Optimized for SEO with proper semantic HTML and structured data support
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Navigation from './Navigation';
import Button from '@/components/ui/Button';
import { Dumbbell } from 'lucide-react';

/**
 * Header component props interface
 */
export interface HeaderProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether the header should be sticky */
  sticky?: boolean;
  /** Whether to show a call-to-action button */
  showCTA?: boolean;
}

/**
 * Site Header component with logo, navigation, and responsive design
 * Includes proper semantic HTML structure for SEO and accessibility
 * 
 * @param className - Additional CSS classes for customization
 * @param sticky - Whether header should stick to top on scroll
 * @param showCTA - Whether to display call-to-action button
 */
export const Header: React.FC<HeaderProps> = ({
  className,
  sticky = true,
  showCTA = true,
}) => {
  return (
    <header
      className={cn(
        'w-full bg-white border-b border-neutral-200 shadow-sm',
        sticky && 'sticky top-0 z-50',
        className
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-3 text-primary-700 hover:text-primary-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
              aria-label="FitTrack Blog - Go to homepage"
            >
              {/* Logo Icon */}
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <Dumbbell 
                  className="w-6 h-6 text-white" 
                  aria-hidden="true"
                />
              </div>
              
              {/* Brand Text */}
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary-700">
                  FitTrack
                </h1>
                <p className="text-xs text-neutral-600 -mt-1">
                  Track Your Journey
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Navigation />
          </div>

          {/* Call-to-Action and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* CTA Button - Hidden on mobile to save space */}
            {showCTA && (
              <div className="hidden lg:block">
                <Button
                  asChild
                  variant="primary"
                  size="sm"
                  className="shadow-sm"
                >
                  <Link href="/workout-tracker">
                    Start Tracking
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Navigation />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Brand Text - Shown below header on mobile */}
      <div className="sm:hidden border-t border-neutral-100 bg-neutral-50 px-4 py-2">
        <div className="text-center">
          <span className="text-sm font-medium text-primary-700">FitTrack Blog</span>
          <span className="text-xs text-neutral-600 ml-2">Track Your Fitness Journey</span>
        </div>
      </div>
    </header>
  );
};

export default Header;