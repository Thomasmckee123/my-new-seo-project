/**
 * Footer component for FitTrack Blog
 * Provides comprehensive site footer with links, social media, and newsletter signup
 * Optimized for SEO with proper internal linking and structured data
 */

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Dumbbell, 
  Mail, 
  Twitter, 
  Instagram, 
  Facebook,
  Youtube,
  Heart
} from 'lucide-react';

/**
 * Footer link interface for organization
 */
interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Footer link sections for organized navigation
 */
const footerSections = {
  content: {
    title: 'Content',
    links: [
      { label: 'Latest Articles', href: '/blog' },
      { label: 'Beginner Guides', href: '/blog?category=beginner-guide' },
      { label: 'Workout Tips', href: '/blog?category=workout-tips' },
      { label: 'Nutrition', href: '/blog?category=nutrition' },
    ] as FooterLink[],
  },
  tools: {
    title: 'Tools',
    links: [
      { label: 'Workout Tracker', href: '/workout-tracker' },
      { label: 'Exercise Library', href: '/exercises' },
      { label: 'Progress Charts', href: '/progress' },
      { label: 'Workout Plans', href: '/plans' },
    ] as FooterLink[],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ] as FooterLink[],
  },
  connect: {
    title: 'Connect',
    links: [
      { label: 'Twitter', href: 'https://twitter.com/fittrackblog', external: true },
      { label: 'Instagram', href: 'https://instagram.com/fittrackblog', external: true },
      { label: 'Facebook', href: 'https://facebook.com/fittrackblog', external: true },
      { label: 'YouTube', href: 'https://youtube.com/fittrackblog', external: true },
    ] as FooterLink[],
  },
};

/**
 * Social media icon mapping
 */
const socialIcons = {
  Twitter: Twitter,
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
};

/**
 * Footer component props interface
 */
export interface FooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Whether to show newsletter signup */
  showNewsletter?: boolean;
}

/**
 * Site Footer component with comprehensive links and newsletter signup
 * Provides SEO-friendly footer structure with proper internal linking
 * 
 * @param className - Additional CSS classes for customization
 * @param showNewsletter - Whether to display newsletter signup section
 */
export const Footer: React.FC<FooterProps> = ({
  className,
  showNewsletter = true,
}) => {
  /**
   * Handles newsletter form submission
   * Currently a placeholder - would integrate with email service in production
   */
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (Mailchimp, SendGrid, etc.)
    console.log('Newsletter signup submitted');
  };

  return (
    <footer
      className={cn(
        'bg-neutral-900 text-neutral-300',
        className
      )}
      role="contentinfo"
    >
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="mx-auto h-8 w-8 text-primary-400 mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Stay Updated with FitTrack
              </h2>
              <p className="text-neutral-400 mb-6">
                Get the latest workout tips, nutrition advice, and fitness motivation 
                delivered to your inbox. Join thousands of fitness enthusiasts!
              </p>
              
              {/* Newsletter Form */}
              <form 
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                aria-label="Newsletter signup"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-primary-500 focus:ring-primary-500"
                  aria-label="Email address for newsletter"
                />
                <Button 
                  type="submit"
                  variant="primary"
                  className="whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </form>
              
              <p className="text-xs text-neutral-500 mt-3">
                No spam, unsubscribe at any time. Read our{' '}
                <Link 
                  href="/privacy" 
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center space-x-3 mb-4 group"
              aria-label="FitTrack Blog - Go to homepage"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg group-hover:bg-primary-700 transition-colors">
                <Dumbbell 
                  className="w-6 h-6 text-white" 
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">FitTrack</h3>
                <p className="text-sm text-neutral-400">Track Your Journey</p>
              </div>
            </Link>
            
            <p className="text-neutral-400 mb-6 max-w-md">
              Your ultimate fitness companion for tracking workouts, reading expert 
              content, and achieving your health goals. Start your journey today.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {footerSections.connect.links.map((link) => {
                const IconComponent = socialIcons[link.label as keyof typeof socialIcons];
                return IconComponent ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    aria-label={`Follow us on ${link.label}`}
                  >
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerSections).map(([key, section]) => {
            if (key === 'connect') return null; // Social links handled above
            
            return (
              <div key={key}>
                <h3 className="text-white font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm text-neutral-500 mb-4 md:mb-0">
              <span>© {new Date().getFullYear()} FitTrack Blog. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" aria-hidden="true" /> for fitness enthusiasts
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-neutral-500 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-neutral-500 hover:text-primary-400 transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-neutral-500 hover:text-primary-400 transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;