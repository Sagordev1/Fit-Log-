'use client';

import Image from 'next/image';
import { Oswald } from 'next/font/google';
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Flame,
  ShieldCheck,
} from 'lucide-react';

import Library from '@/components/Library';
import {
  FALLBACK_WORKOUTS,
  fetchWorkouts,
  type Workout,
} from '@/lib/data';

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetchWorkouts()
      .then((data) => {
        if (active) {
          setWorkouts(data.length ? data : FALLBACK_WORKOUTS);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl relative overflow-hidden rounded-3xl border border-[#292929] bg-[#151719]">
          <div className="relative grid min-h-[500px] items-center gap-6 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_.85fr] lg:px-14 lg:py-10">
            {/* Left Content */}
            <div className="relative z-10 fade-in">
              <p className="mb-4 text-xs font-black tracking-[.3em] text-[#ccff00]">
                WORKOUT LIBRARY
              </p>

          <h1 className={`${oswald.className} max-w-3xl text-[60px] font-extrabold leading-[60px] tracking-[-1.5px] uppercase text-white`}>
            Train with intent. Log
          <br />
            every set.
          </h1>
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#a4a4a4] sm:text-base sm:leading-7">
                FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                it into today&apos;s plan, and watch the week&apos;s work add
                up.
              </p>

              <a
                href="#library"
                className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black transition hover:-translate-y-0.5"
              >
                Browse workouts
                <ArrowRight size={17} />
              </a>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-wider text-[#777]">
                <span className="flex items-center gap-2">
                  <ShieldCheck
                    size={15}
                    className="text-[#ccff00]"
                  />
                  12 curated lifts
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={15} />
                  daily planning
                </span>

                <span className="flex items-center gap-2">
                  <Flame size={15} />
                  live totals
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[300px] sm:h-[350px] lg:h-[430px]">
              <div className="absolute right-0 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#ccff00]/10 blur-3xl sm:h-[360px] sm:w-[360px]" />

              <Image
                src="/assets/banner.png"
                alt="Athlete using a gym machine"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain object-center lg:object-right drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]"
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-bold uppercase tracking-[.25em] text-[#555] sm:flex">
            Scroll to explore
            <ArrowDown size={13} />
          </div>
        </div>
      </section>

      {/* ================= LIBRARY ================= */}
      {loading ? (
        <section className="container flex min-h-[420px] flex-col items-center justify-center gap-4">
          <div className="spinner" />

          <p className="text-sm font-bold uppercase tracking-[.2em] text-[#777]">
            Loading workouts…
          </p>
        </section>
      ) : (
        <Library workouts={workouts} />
      )}
    </>
  );
}