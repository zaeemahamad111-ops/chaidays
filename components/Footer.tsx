import Link from 'next/link';
import Image from 'next/image';
import WaitlistSection from './WaitlistSection';

import { getSiteData } from '@/lib/data';

export default async function Footer() {
  let socials = {};
  let outlets = [];
  try {
    const data = await getSiteData();
    socials = data?.socials || {};
    outlets = data?.outlets || [];
  } catch (error) {
    console.error("Error loading footer data:", error);
  }

  return (
    <footer className="w-full bg-[#ebdcd0]">
      <WaitlistSection socials={socials} outlets={outlets} />
    </footer>
  );
}
