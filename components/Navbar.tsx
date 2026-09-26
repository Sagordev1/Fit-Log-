'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
  const path = usePathname();
  const { plan, saved } = useFitLog();

  return (
    <header className="sticky top-0 z-50 border-b border-[#222] bg-[#070707]/95 backdrop-blur">
      <div className="container flex min-h-[74px] items-center justify-between gap-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-[.16em]"
        >
          <Image src="/assets/logo.png" alt="FitLog" width={30} height={30} />
          <span>FITLOG</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            className={`text-sm font-bold ${
              path === '/'
                ? 'text-[#ccff00]'
                : 'text-[#aaa] hover:text-white'
            }`}
            href="/"
          >
            Workouts
          </Link>
          <Link
            className={`text-sm font-bold ${
              path.startsWith('/my-plan')
                ? 'text-[#ccff00]'
                : 'text-[#aaa] hover:text-white'
            }`}
            href="/my-plan"
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm font-bold text-white"
          >
            Plan
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-sm font-bold text-white"
          >
            Saved
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#555] text-xs font-black text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <div className="container flex gap-2 pb-3 md:hidden">
        <Link
          className={`flex-1 rounded-lg px-4 py-2 text-center text-xs font-bold uppercase ${
            path === '/' ? 'bg-[#ccff00] text-black' : 'bg-[#111] text-[#aaa]'
          }`}
          href="/"
        >
          Workouts
        </Link>
        <Link
          className={`flex-1 rounded-lg px-4 py-2 text-center text-xs font-bold uppercase ${
            path.startsWith('/my-plan')
              ? 'bg-[#ccff00] text-black'
              : 'bg-[#111] text-[#aaa]'
          }`}
          href="/my-plan"
        >
          My Plan
        </Link>
      </div>
    </header>
  );
}