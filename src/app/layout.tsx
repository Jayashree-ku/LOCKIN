import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/context/AuthContext';

export const metadata: Metadata = {
  title: 'LOCKIN — Stop guessing. Start locking in.',
  description: 'Engineering branch discovery and career roadmap platform for 12th-grade students and undergraduates.',
  keywords: ['engineering', 'career roadmap', 'computer science', 'ai', 'data science', 'electronics', 'mechanical', 'btech'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0B0C] text-[#F4EDE0] min-h-screen antialiased selection:bg-[#F4EDE0] selection:text-[#0B0B0C]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
