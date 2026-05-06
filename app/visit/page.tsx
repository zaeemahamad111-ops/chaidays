import type { Metadata } from 'next';
import VisitClient from './VisitClient';

export const metadata: Metadata = {
  title: 'Visit Us',
  description: 'Find Chai Days at Stone Harbor, San Francisco. View opening hours, contact details, and book a concierge experience at our premium artisan tea café.',
  openGraph: { title: 'Visit Us | Chai Days', url: 'https://chaidays.com/visit' },
};

export default function VisitPage() {
  return <VisitClient />;
}
