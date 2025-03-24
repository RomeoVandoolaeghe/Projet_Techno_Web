import Link from 'next/link';
import './App.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-800">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Ma Bibliothèque</h1>
            <ul className="flex gap-6 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-blue-600">
                  Livres
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-blue-600">
                  Auteurs
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
