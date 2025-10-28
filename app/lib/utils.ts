/**
 * Utility functions for the FitTrack Blog application
 * Contains helper functions for date formatting, text processing, and CSS class handling
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines CSS classes using clsx and tailwind-merge
 * Ensures proper Tailwind CSS class merging and removes conflicts
 * 
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable format
 * 
 * @param dateString - ISO date string or Date object
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Formats a date for relative display (e.g., "2 days ago")
 * 
 * @param dateString - ISO date string or Date object
 * @returns Relative time string
 */
export function formatRelativeDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  
  return formatDate(date);
}

/**
 * Converts a string to a URL-friendly slug
 * Removes special characters and replaces spaces with hyphens
 * 
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Calculates estimated reading time for text content
 * Based on average reading speed of 200 words per minute
 * 
 * @param text - Text content to analyze
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadTime(text: string, wordsPerMinute: number = 200): number {
  // Remove HTML tags and count words
  const cleanText = text.replace(/<[^>]*>/g, '');
  const wordCount = cleanText.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Truncates text to a specified length with ellipsis
 * Ensures words are not cut off mid-word
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length including ellipsis
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength - 3);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

/**
 * Generates a random ID string
 * Useful for temporary IDs in forms and components
 * 
 * @param length - Length of the ID (default: 8)
 * @returns Random alphanumeric string
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Debounces a function call
 * Delays execution until after specified wait time has elapsed since last call
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Formats a number with proper thousand separators
 * 
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Calculates one-rep max using Epley formula
 * Used for strength training calculations
 * 
 * @param weight - Weight lifted
 * @param reps - Number of repetitions
 * @returns Estimated one-rep max
 */
export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}

/**
 * Calculates total volume for a workout
 * Sum of (weight × reps) for all sets
 * 
 * @param sets - Array of sets with weight and reps
 * @returns Total volume
 */
export function calculateTotalVolume(
  sets: Array<{ weight: number; reps: number }>
): number {
  return sets.reduce((total, set) => total + (set.weight * set.reps), 0);
}

/**
 * Validates email address format
 * 
 * @param email - Email address to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formats weight value with appropriate unit
 * 
 * @param weight - Weight value
 * @param unit - Weight unit (kg or lbs)
 * @returns Formatted weight string
 */
export function formatWeight(weight: number, unit: 'kg' | 'lbs' = 'kg'): string {
  return `${weight} ${unit}`;
}

/**
 * Formats duration in minutes to hours and minutes
 * 
 * @param minutes - Duration in minutes
 * @returns Formatted duration string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * Capitalizes the first letter of a string
 * 
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Checks if a date is today
 * 
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const today = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  );
}

/**
 * Gets the start and end of a week for a given date
 * 
 * @param date - Reference date
 * @returns Object with start and end dates of the week
 */
export function getWeekRange(date: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(date);
  const end = new Date(date);
  
  // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = start.getDay();
  
  // Calculate start of week (Sunday)
  start.setDate(start.getDate() - dayOfWeek);
  start.setHours(0, 0, 0, 0);
  
  // Calculate end of week (Saturday)
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  
  return { start, end };
}