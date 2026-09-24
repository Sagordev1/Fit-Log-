'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Workout } from '@/lib/data';

type FitLogContextValue = {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (workout: Workout) => void;
  save: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeSaved: (id: number) => void;
  markDone: (id: number) => void;
  toast: (message: string) => void;
};

const FitLogContext = createContext<FitLogContextValue | null>(null);

const read = (key: string) => {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
};

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setPlan(read('fitlog-plan'));
    setSaved(read('fitlog-saved'));
    setDone(read('fitlog-done'));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog-plan', JSON.stringify(plan));
    }
  }, [plan]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    }
  }, [saved]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitlog-done', JSON.stringify(done));
    }
  }, [done]);

  const toast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(''), 2200);
  };

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      saved,
      done,
      toast,
      addToPlan: (workout: Workout) => {
        if (plan.some((item) => item.id === workout.id)) {
          toast('Already in today’s plan');
          return;
        }

        if (plan.length >= 5) {
          toast('Today’s plan is full — 5 lifts max');
          return;
        }

        setPlan((current) => [...current, workout]);
        toast('Added to today’s plan');
      },
      save: (workout: Workout) => {
        if (saved.some((item) => item.id === workout.id)) {
          toast('Already saved');
          return;
        }

        setSaved((current) => [...current, workout]);
        toast('Saved for later');
      },
      removeFromPlan: (id: number) => {
        setPlan((current) => current.filter((item) => item.id !== id));
        toast('Removed from today’s plan');
      },
      removeSaved: (id: number) => {
        setSaved((current) => current.filter((item) => item.id !== id));
        toast('Removed from saved');
      },
      markDone: (id: number) => {
        setDone((current) =>
          current.includes(id) ? current : [...current, id],
        );
        toast('Workout marked as done');
      },
    }),
    [plan, saved, done],
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
      <div className="hidden" data-toast={toastMessage} />
      <ToastPortal message={toastMessage} />
    </FitLogContext.Provider>
  );
}

function ToastPortal({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-[#3d3d3d] bg-[#161616] px-5 py-3 text-sm font-bold shadow-2xl">
      <span className="mr-2 text-[#ccff00]">✓</span>
      {message}
    </div>
  );
}

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error('useFitLog must be inside FitLogProvider');
  }

  return context;
};
