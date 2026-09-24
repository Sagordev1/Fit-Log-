'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Flame,
  ShieldCheck,
} from 'lucide-react';

import Library from '@/components/Library';
import { FALLBACK_WORKOUTS, fetchWorkouts, type Workout } from '@/lib/data';

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
      <section className="relative overflow-hidden border-b border-[#222]">
        <div className="container grid min-h-[560px] items-center gap-10 py-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10 fade-in">
            <p className="mb-5 text-xs font-black tracking-[.3em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>
            <h1 className="display max-w-3xl text-6xl font-black uppercase leading-[.86] sm:text-7xl lg:text-[7rem]">
              Train with intent. Log every set.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#a4a4a4]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a
              href="#library"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:translate-y-[-2px]"
            >
              Browse workouts <ArrowRight size={18} />
            </a>

            <div className="mt-10 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-[#777]">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ccff00]" />
                12 curated lifts
              </span>
              <span className="flex items-center gap-2">
                <Clock3 size={16} /> daily planning
              </span>
              <span className="flex items-center gap-2">
                <Flame size={16} /> live totals
              </span>
            </div>
          </div>

          <div className="relative min-h-[350px] lg:min-h-[500px]">
            <div className="absolute right-0 top-1/2 h-[390px] w-[390px] -translate-y-1/2 rounded-full bg-[#ccff00]/10 blur-3xl" />
            <Image
              src="/assets/banner.png"
              alt="Athlete using a gym machine"
              fill
              priority
              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,.6)]"
            />
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[.25em] text-[#555] sm:flex">
          Scroll to explore <ArrowDown size={14} />
        </div>
      </section>

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
