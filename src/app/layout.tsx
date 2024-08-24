import Header from '@/src/components/header';
import { Toaster } from '@/src/components/ui/toaster';
import { QueryProvider } from '@/src/providers/query-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Додаток для розподілу рахунків',
  description:
    'Зручний інструмент для розподілу витрат між друзями та колегами.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <main className="custom-container">{children}</main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
