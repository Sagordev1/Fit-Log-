'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

import type { Workout } from '@/lib/data';

import WorkoutCard from './WorkoutCard';

export default function Library({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState('duration');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    return workouts
      .filter((workout) =>
        `${workout.name} ${workout.muscleGroups.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .sort((a, b) => {
        if (sort === 'duration') return a.duration - b.duration;
        if (sort === 'calories') return a.caloriesBurned - b.caloriesBurned;
        return b.rating - a.rating;
      });
  }, [workouts, query, sort]);

  return (
    <section id="library" className="container scroll-mt-28 py-20">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-black tracking-[.25em] text-[#ccff00]">
            12 MOVES / ONE LIBRARY
          </p>
          <h2 className="display text-5xl font-black uppercase sm:text-6xl">
            The Library
          </h2>
          <p className="mt-2 text-[#999]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex items-center gap-2 rounded-xl border border-[#2b2b2b] bg-[#101010] px-3">
            <Search size={16} className="text-[#777]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search workouts"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#555] sm:w-40"
            />
          </label>

          <label className="flex items-center gap-2 rounded-xl border border-[#2b2b2b] bg-[#101010] px-3 text-xs font-bold uppercase text-[#999]">
            Sort By
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="bg-transparent py-3 text-white outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </div>

      {list.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((workout) => (
            <WorkoutCard key={workout.id} w={workout} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#333] py-20 text-center text-[#777]">
          No workouts found.
        </div>
      )}
    </section>
  );
}
