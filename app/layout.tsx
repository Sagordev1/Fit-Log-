import './globals.css';

import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ToastHost from '@/components/ToastHost';
import { FitLogProvider } from '@/context/FitLogContext';

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description: 'A dark, no-nonsense workout library and daily plan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FitLogProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastHost />
        </FitLogProvider>
      </body>
    </html>
  );
}
