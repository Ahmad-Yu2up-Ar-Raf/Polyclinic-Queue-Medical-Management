/**
 * Date Formatter Utility - Seamless ISO ↔ Display conversion
 *
 * Purpose: Handle all date formatting needs for FormDateInput
 * - Convert ISO string (YYYY-MM-DD) ↔ Display format (12 Agustus 2024)
 * - Handle null/undefined gracefully
 * - Support Indonesian locale
 * - Type-safe with proper error handling
 */

import { format, parse, isValid } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format ISO date string to readable display format
 * @param isoDate - ISO format date string (YYYY-MM-DD)
 * @returns Formatted string like "12 Agustus 2024" or empty string if invalid
 *
 * @example
 * formatDateForDisplay("1998-08-12") // "12 Agustus 1998"
 * formatDateForDisplay("") // ""
 * formatDateForDisplay(null) // ""
 */
export function formatDateForDisplay(isoDate: string | null | undefined): string {
  if (!isoDate || typeof isoDate !== 'string' || isoDate.trim() === '') {
    return '';
  }

  try {
    // Parse ISO format (YYYY-MM-DD)
    const date = parse(isoDate, 'yyyy-MM-dd', new Date());

    // Validate parsed date
    if (!isValid(date)) {
      return '';
    }

    // Format to Indonesian locale: "12 Agustus 1998"
    return format(date, 'dd MMMM yyyy', { locale: id });
  } catch (error) {
    console.warn(`[formatDateForDisplay] Failed to format "${isoDate}":`, error);
    return '';
  }
}

/**
 * Convert Date object to ISO string format
 * @param date - JavaScript Date object
 * @returns ISO format date string (YYYY-MM-DD)
 *
 * @example
 * formatDateToISO(new Date(1998, 7, 12)) // "1998-08-12"
 */
export function formatDateToISO(date: Date | null | undefined): string {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  try {
    if (!isValid(date)) {
      return '';
    }

    // Format as ISO: YYYY-MM-DD
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    console.warn('[formatDateToISO] Failed to format date:', error);
    return '';
  }
}

/**
 * Parse ISO date string to Date object
 * @param isoDate - ISO format date string (YYYY-MM-DD)
 * @returns Date object or null if invalid
 *
 * @example
 * parseISOToDate("1998-08-12") // Date object
 * parseISOToDate("invalid") // null
 */
export function parseISOToDate(isoDate: string | null | undefined): Date | null {
  if (!isoDate || typeof isoDate !== 'string' || isoDate.trim() === '') {
    return null;
  }

  try {
    const date = parse(isoDate, 'yyyy-MM-dd', new Date());
    return isValid(date) ? date : null;
  } catch (error) {
    console.warn(`[parseISOToDate] Failed to parse "${isoDate}":`, error);
    return null;
  }
}

/**
 * Get today's date in ISO format
 * @returns Today's date as ISO string (YYYY-MM-DD)
 *
 * @example
 * getTodayISO() // "2024-12-28"
 */
export function getTodayISO(): string {
  return formatDateToISO(new Date());
}

/**
 * Add years to ISO date
 * @param isoDate - Base ISO date string
 * @param years - Number of years to add (negative to subtract)
 * @returns New ISO date string or empty if invalid
 *
 * @example
 * addYearsToISO("1998-08-12", 18) // "2016-08-12"
 * addYearsToISO("2000-01-01", -5) // "1995-01-01"
 */
export function addYearsToISO(isoDate: string | null | undefined, years: number): string {
  const date = parseISOToDate(isoDate);
  if (!date) return '';

  try {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return formatDateToISO(newDate);
  } catch (error) {
    console.warn('[addYearsToISO] Failed to add years:', error);
    return '';
  }
}

/**
 * Calculate age from birth date ISO string
 * @param birthDateISO - Birth date as ISO string (YYYY-MM-DD)
 * @returns Age in years or null if invalid
 *
 * @example
 * calculateAge("1998-08-12") // 25 (or whatever current age is)
 */
export function calculateAge(birthDateISO: string | null | undefined): number | null {
  const birthDate = parseISOToDate(birthDateISO);
  if (!birthDate) return null;

  try {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  } catch (error) {
    console.warn('[calculateAge] Failed to calculate age:', error);
    return null;
  }
}
