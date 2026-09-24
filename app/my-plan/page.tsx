'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  Clock3,
  Flame,
  Star,
  X,
} from 'lucide-react';

import { useFitLog } from '@/context/FitLogContext';
import type { Workout } from '@/lib/data';

type SortOption = 'duration' | 'calories' | 'rating';

function PlanInner() {
  const params = useSearchParams();

  const {
    plan,
    saved,
    done,
    removeFromPlan,
    removeSaved,
    markDone,
  } = useFitLog();

  const [sortBy, setSortBy] = useState<SortOption>('duration');

  const tab = params.get('tab') === 'saved' ? 'saved' : 'plan';

  const items = tab === 'plan' ? plan : saved;

  // Sort current tab's workouts
  const sortedItems = useMemo(() => {
    const sorted = [...items];

    switch (sortBy) {
      case 'duration':
        return sorted.sort((a, b) => a.duration - b.duration);

      case 'calories':
        return sorted.sort(
          (a, b) => a.caloriesBurned - b.caloriesBurned,
        );

      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);

      default:
        return sorted;
    }
  }, [items, sortBy]);

  const minutes = useMemo(
    () =>
      plan.reduce(
        (total, workout) => total + workout.duration,
        0,
      ),
    [plan],
  );

  const calories = useMemo(
    () =>
      plan.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0,
      ),
    [plan],
  );

  return (
    <section className="container py-14">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-[#222] pb-9 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-xs font-black tracking-[.25em] text-[#ccff00]">
            YOUR TRAINING LOG
          </p>

          <h1 className="display text-6xl font-black uppercase leading-none">
            My Plan
          </h1>

          <p className="mt-3 text-[#999]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <Link
          href="/#library"
          className="inline-flex items-center gap-2 self-start rounded-full border border-[#3a3a3a] px-5 py-3 text-xs font-black uppercase hover:border-[#ccff00]"
        >
          Add a workout <ArrowRight size={15} />
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid gap-3 py-7 sm:grid-cols-3">
        {[
          ['Exercises', plan.length],
          ['Minutes', minutes],
          ['Calories', calories],
        ].map(([label, value]) => (
          <div
            key={String(label)}
            className="rounded-2xl border border-[#252525] bg-[#101010] p-5"
          >
            <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#666]">
              {label}
            </p>

            <p className="display mt-2 text-4xl font-black">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + Sort */}
      <div className="mb-6 flex flex-col gap-4 border-b border-[#292929] sm:flex-row sm:items-end sm:justify-between">
        {/* Tabs */}
        <div className="flex">
          <Link
            href="/my-plan"
            className={`px-5 py-4 text-xs font-black uppercase tracking-wider ${
              tab === 'plan'
                ? 'border-b-2 border-[#ccff00] text-white'
                : 'text-[#666]'
            }`}
          >
            Today&apos;s Plan{' '}
            <span className="ml-1 text-[#888]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className={`px-5 py-4 text-xs font-black uppercase tracking-wider ${
              tab === 'saved'
                ? 'border-b-2 border-[#ccff00] text-white'
                : 'text-[#666]'
            }`}
          >
            Saved{' '}
            <span className="ml-1 text-[#888]">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-3 pb-3 sm:pb-2">
          <span className="text-[10px] font-black uppercase tracking-[.2em] text-[#666]">
            Sort By
          </span>

          <div className="relative">
            <ArrowDownUp
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]"
            />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value as SortOption)
              }
              className="appearance-none rounded-full border border-[#333] bg-[#101010] py-2.5 pl-9 pr-9 text-xs font-black uppercase text-white outline-none transition hover:border-[#555] focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            {/* Chevron */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#888]">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* Workout List */}
      {sortedItems.length ? (
        <div className="space-y-4">
          {sortedItems.map((workout) => (
            <PlanCard
              key={workout.id}
              w={workout}
              savedTab={tab === 'saved'}
              isDone={done.includes(workout.id)}
              remove={() =>
                tab === 'plan'
                  ? removeFromPlan(workout.id)
                  : removeSaved(workout.id)
              }
              done={() => markDone(workout.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-[#343434] px-6 py-24 text-center">
          <p className="display text-4xl font-black uppercase">
            Nothing here yet
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#777]">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/#library"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-xs font-black uppercase text-black"
          >
            Go to workouts <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </section>
  );
}

function PlanCard({
  w,
  savedTab,
  isDone,
  remove,
  done,
}: {
  w: Workout;
  savedTab: boolean;
  isDone: boolean;
  remove: () => void;
  done: () => void;
}) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-[#292929] bg-[#101010] md:flex-row ${
        isDone ? 'opacity-60' : ''
      }`}
    >
      {/* Image */}
      <div className="relative h-48 w-full shrink-0 bg-[#171717] md:h-auto md:w-52">
        <Image
          src={w.image}
          alt={w.name}
          fill
          sizes="208px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2">
              {w.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="text-[9px] font-black uppercase tracking-wider text-[#ccff00]"
                >
                  {group}
                </span>
              ))}
            </div>

            <h2 className="display mt-2 text-3xl font-black uppercase">
              {w.name}
            </h2>

            <p className="mt-1 text-sm text-[#777]">
              {w.equipment}
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={remove}
            aria-label="Remove"
            className="rounded-full border border-[#333] p-2 text-[#777] hover:border-red-500 hover:text-red-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Stats + Actions */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
          <div className="flex gap-4 text-xs text-[#888]">
            <span className="flex items-center gap-1">
              <Clock3 size={14} />
              {w.duration}m
            </span>

            <span className="flex items-center gap-1">
              <Flame size={14} />
              {w.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star
                size={14}
                className="text-[#ccff00]"
              />
              {w.rating}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* View Details */}
            <Link
              href={`/workout/${w.id}`}
              className="rounded-lg border border-[#444] px-4 py-2 text-[10px] font-black uppercase hover:border-white"
            >
              View Details
            </Link>

            {/* Mark Done */}
            {!savedTab && (
              <button
                onClick={done}
                disabled={isDone}
                className="flex items-center gap-2 rounded-lg bg-[#ccff00] px-4 py-2 text-[10px] font-black uppercase text-black disabled:opacity-60"
              >
                <Check size={14} />

                {isDone ? 'Done' : 'Mark as Done'}
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MyPlan() {
  return (
    <Suspense
      fallback={
        <section className="container min-h-[70vh] py-20">
          <p className="text-sm font-bold text-[#777]">
            Loading workouts…
          </p>
        </section>
      }
    >
      <PlanInner />
    </Suspense>
  );
}