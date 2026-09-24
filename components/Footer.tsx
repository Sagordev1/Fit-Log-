import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#222] bg-[#050505]">
      <div className="container flex flex-col items-start justify-between gap-5 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 font-black tracking-[.16em]">
          <Image src="/assets/logo.png" alt="" width={25} height={25} />
          FITLOG
        </div>
        <p className="text-xs text-[#777]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
