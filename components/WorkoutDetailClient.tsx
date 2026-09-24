'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Flame,
  Plus,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { useFitLog } from '@/context/FitLogContext';
import {
  FALLBACK_WORKOUTS,
  fetchWorkouts,
  type Workout,
} from '@/lib/data';

export default function WorkoutDetailClient({ id }: { id: string }) {
  const fallback =
    FALLBACK_WORKOUTS.find((workout) => workout.id === Number(id)) ??
    FALLBACK_WORKOUTS[0];
  const [workout, setWorkout] = useState<Workout>(fallback);
  const { plan, saved, addToPlan, save } = useFitLog();

  useEffect(() => {
    fetchWorkouts().then((data) => {
      const found = data.find((item: Workout) => item.id === Number(id));
      if (found) setWorkout(found);
    });
  }, [id]);

  const inPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const specs = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', String(workout.sets)],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', String(workout.rating)],
  ];

  return (
    <section className="container py-10 sm:py-14">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#888] hover:text-white"
      >
        <ArrowLeft size={15} /> Back to library
      </Link>

      <div className="grid overflow-hidden rounded-3xl border border-[#292929] bg-[#0d0d0d] lg:grid-cols-[1fr_1fr]">
        <div className="relative min-h-[420px] bg-[#151515] lg:min-h-[720px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#1a1a1a] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#ccff00]"
              >
                {group}
              </span>
            ))}
          </div>

          <h1 className="display text-5xl font-black uppercase leading-[.9] sm:text-6xl">
            {workout.name}
          </h1>
          <p className="mt-6 leading-7 text-[#9d9d9d]">
            {workout.description}
          </p>

          <div className="mt-8 grid grid-cols-2 border-y border-[#292929] sm:grid-cols-3">
            {specs.map(([label, value]) => (
              <div key={label} className="border-b border-[#222] p-4">
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#666]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-bold text-[#eee]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <h2 className="text-xs font-black uppercase tracking-[.25em] text-[#ccff00]">
              Instructions
            </h2>
            <ol className="mt-4 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3a3a3a] text-xs font-black text-[#ccff00]">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-[#b2b2b2]">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan || plan.length >= 5}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-4 text-xs font-black uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inPlan ? <Check size={17} /> : <Plus size={17} />}
              {inPlan
                ? 'In today’s plan'
                : plan.length >= 5
                  ? 'Plan full'
                  : "Add to today's plan"}
            </button>

            <button
              onClick={() => save(workout)}
              disabled={isSaved}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] px-5 py-4 text-xs font-black uppercase disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Bookmark size={17} />
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
          </div>

          <div className="mt-7 flex gap-5 text-xs text-[#777]">
            <span className="flex items-center gap-1">
              <Clock3 size={14} /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-[#ccff00]" /> {workout.rating}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
