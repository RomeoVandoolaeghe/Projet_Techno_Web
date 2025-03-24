import { notFound } from 'next/navigation';
import Drawer from './drawer';

type Book = {
  id: number;
  title: string;
  publishedYear: number;
  price: number;
  author: {
    name: string;
  };
  ratings: {
    stars: number;
    comment?: string;
  }[];
};

async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`http://localhost:3001/books/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return notFound();

  const avg =
    book.ratings.length > 0
      ? book.ratings.reduce((acc, r) => acc + r.stars, 0) / book.ratings.length
      : 0;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>

      <p className="text-gray-700 mb-1">Auteur : <span className="font-medium">{book.author.name}</span></p>
      <p className="text-gray-700 mb-1">Année : {book.publishedYear}</p>
      <p className="text-gray-700 mb-1">Prix : {book.price.toFixed(2)} €</p>
      <p className="text-yellow-600 font-medium mb-4">Note moyenne : {avg.toFixed(1)} ⭐</p>

      {/* Composant Drawer + Supprimer */}
      <Drawer bookId={book.id} ratings={book.ratings} />
    </div>
  );
}
