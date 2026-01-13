import { format, parse, differenceInMinutes, addDays, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';

// Helper to parse "HH:mm" string to minutes from start of day
const parseTimeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + minutes;
};

// Berechnet die Dauer in Minuten (interner Gebrauch für präzise Addition)
export const calculateDurationInMinutes = (startTime: string, endTime: string, pauseDurationMinutes: number = 0): number => {
  if (!startTime || !endTime) return 0;

  let start = parseTimeToMinutes(startTime);
  let end = parseTimeToMinutes(endTime);

  // Handle crossing midnight (e.g. 23:00 to 01:00)
  if (end < start) {
    end += 24 * 60;
  }

  const duration = end - start - pauseDurationMinutes;
  return Math.max(0, duration);
};

// Formats minutes to decimal string (e.g. 90 min -> "1,50")
export const formatMinutesToDecimal = (minutes: number): string => {
  const decimal = minutes / 60;
  return decimal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Main function used by UI
export const calculateDuration = (startTime: string, endTime: string, pauseTime: string = '0'): number => {
  if (!startTime || !endTime) return 0;

  // Convert pause string (which might be decimal hours or minutes, depending on input) to minutes
  const pauseMinutes = parseInt(pauseTime) || 0;
  const durationInMinutes = calculateDurationInMinutes(startTime, endTime, pauseMinutes);

  // Return as number for calculations, rounded to 2 decimals
  return parseFloat((durationInMinutes / 60).toFixed(2));
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'dd.MM.yyyy', { locale: de });
  } catch (e) {
    return dateString;
  }
};

export const formatTime = (timeString: string): string => {
  if (!timeString) return '';
  return timeString;
};

export const getDayName = (dateString: string): string => {
  if (!dateString) return '';
  try {
    return format(new Date(dateString), 'EEEE', { locale: de });
  } catch (e) {
    return '';
  }
};

export const getCurrentTime = (): string => {
  return format(new Date(), 'HH:mm');
};

export const getCurrentDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Legacy/UI helper: Formats decimal hours (e.g. 1.5) to string "1,50"
export const formatDuration = (hours: number): string => {
  if (isNaN(hours)) return '0,00';
  return hours.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
