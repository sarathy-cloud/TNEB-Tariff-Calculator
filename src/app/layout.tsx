import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TNEB Electricity Bill Calculator | Tamil Nadu Tariff Calculator',
  description: 'Calculate your Tamil Nadu electricity bill using official slab-wise tariff rates and visualize how consumption affects your bill with interactive graphs.',
  keywords: ['TNEB', 'TANGEDCO', 'Electricity Calculator', 'Tamil Nadu Electricity Tariff', 'Slab Billing Calculator', 'LT-1A Tariff'],
  authors: [{ name: 'TNEB Tariff Calculator' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full bg-artifact-bg-light dark:bg-artifact-bg-dark text-artifact-text-light dark:text-artifact-text-dark transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
