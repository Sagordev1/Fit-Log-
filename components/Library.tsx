'use client';

import Link from 'next/link';
import { ArrowDownUp, Clock3, Flame, Star } from 'lucide-react';
import { Oswald } from 'next/font/google';
import { useMemo, useState } from 'react';

import type { Workout } from '@/lib/data';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
});

type SortOption = 'default' | 'duration' | 'calories' | 'rating';

interface LibraryProps {
  workouts: Workout[];
}

export default function Library({ workouts }: LibraryProps) {
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const sortedWorkouts = useMemo(() => {
    const items = [...workouts];

    switch (sortBy) {
      case 'duration':
        return items.sort((a, b) => a.duration - b.duration);

      case 'calories':
        return items.sort(
          (a, b) => a.caloriesBurned - b.caloriesBurned
        );

      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);

      default:
        // Keep API sequence: 1 → 12
        return items.sort((a, b) => a.id - b.id);
    }
  }, [workouts, sortBy]);

  return (
    <section
      id="library"
      className="px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Sort By
            </span>

            <div className="relative">
              <ArrowDownUp
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="appearance-none rounded-full border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-9 text-sm font-medium text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="default">Default</option>
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-zinc-600">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Category Tags */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-black"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  {/* Workout Name */}
                  <h3
                    className={`${oswald.className} text-lg font-bold uppercase tracking-[0.45px] text-white`}
                  >
                    {workout.name}
                  </h3>

                  {/* Equipment */}
                  <p className="mt-2 text-sm text-zinc-500">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-3 border-t border-zinc-800 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#ccff00]">
                      <Clock3 size={14} />
                      <span className="text-zinc-300">{workout.duration} min</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#ccff00]">
                      <Flame size={14} />
                      <span className="text-zinc-300">{workout.caloriesBurned} kcal</span>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 text-xs text-[#ccff00]">
                      <Star size={14} />
                      <span className="text-zinc-300">{workout.rating}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}