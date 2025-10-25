import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delta Flight Tracker',
  description: 'Real-time flight tracking dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='overscroll-none'>
      <body>{children}</body>
    </html>
  );
}
