import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'সীরাত ফর কিডস (Seerat For Kids) | ইন্টারঅ্যাক্টিভ সীরাহ যাত্রা',
  description: 'ছোটদের জন্য রাসুলুল্লাহ ﷺ-এর জীবনীর ইন্টারঅ্যাক্টিভ মানচিত্র, গল্প ও শিক্ষামূলক গেম অ্যাপ্লিকেশন।',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-amber-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
