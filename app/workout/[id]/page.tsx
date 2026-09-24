import { notFound } from 'next/navigation';

import WorkoutDetailClient from '@/components/WorkoutDetailClient';
import { FALLBACK_WORKOUTS } from '@/lib/data';

export function generateStaticParams() {
  return FALLBACK_WORKOUTS.map((workout) => ({
    id: String(workout.id),
  }));
}

export const dynamicParams = false;

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!FALLBACK_WORKOUTS.some((workout) => workout.id === Number(id))) {
    notFound();
  }

  return <WorkoutDetailClient id={id} />;
}
