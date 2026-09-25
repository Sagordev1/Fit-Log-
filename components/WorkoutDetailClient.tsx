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
    <section className="container py-6 sm:py-8">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#888] hover:text-white"
      >
        <ArrowLeft size={15} /> Back to library
      </Link>

      <div className="grid overflow-hidden rounded-3xl border border-[#292929] bg-[#0d0d0d] lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#151515] sm:aspect-[16/10] lg:sticky lg:top-20 lg:aspect-[4/5]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <h1 className="display text-2xl font-black uppercase leading-[.95] sm:text-3xl">
            {workout.name}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#9d9d9d]">
            {workout.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-4 space-y-1">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg bg-[#1a1c1e] px-4 py-3"
              >
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#888]">
                  {label}
                </p>
                <p className="text-sm font-bold text-[#eee]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h2 className="text-xs font-black uppercase tracking-[.25em] text-[#ccff00]">
              Instructions
            </h2>
            <ol className="mt-3 space-y-2.5">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3a3a3a] text-[11px] font-black text-[#ccff00]">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-[#b2b2b2]">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan || plan.length >= 5}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-4 py-3 text-xs font-black uppercase text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {inPlan ? <Check size={16} /> : <Plus size={16} />}
              {inPlan
                ? 'In today’s plan'
                : plan.length >= 5
                  ? 'Plan full'
                  : "Add to today's plan"}
            </button>

            <button
              onClick={() => save(workout)}
              disabled={isSaved}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#4a4a4a] px-4 py-3 text-xs font-black uppercase disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Bookmark size={16} />
              {isSaved ? 'Saved' : 'Save for later'}
            </button>
          </div>

          <div className="mt-4 flex gap-5 text-xs text-[#777]">
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