'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';


type Book = {
    id: number;
    title: string;
    publishedYear: number;
    price: number;
    author: {
        name: string;
    };
    ratings: { stars: number }[];
};

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'asc' | 'desc' | ''>('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [newBook, setNewBook] = useState({
        title: '',
        publishedYear: '',
        price: '',
        authorId: '',
    });

    useEffect(() => {
        fetchBooks();
    }, [search, sort]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            let url = `http://localhost:3001/books`;
            const query = [];

            if (search) query.push(`search=${encodeURIComponent(search)}`);
            if (sort) query.push(`sort=${sort}`);
            if (query.length > 0) url += `?${query.join('&')}`;

            const res = await fetch(url);
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error('Erreur de chargement', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newBook.title,
                    publishedYear: Number(newBook.publishedYear),
                    price: parseFloat(newBook.price),
                    authorId: Number(newBook.authorId),
                }),
            });

            if (!res.ok) throw new Error('Erreur lors de la création');

            setNewBook({ title: '', publishedYear: '', price: '', authorId: '' });
            setShowModal(false);
            fetchBooks();
        } catch (error) {
            alert('Erreur lors de la création du livre. Vérifie l\'auteur.');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Livres</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowModal(true)}
                >
                    Ajouter un livre
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Rechercher par titre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded w-full sm:w-1/2"
                />
                <select
                    className="border px-4 py-2 rounded w-full sm:w-1/4"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as 'asc' | 'desc' | '')}
                >
                    <option value="">-- Trier par titre --</option>
                    <option value="asc">Ascendant</option>
                    <option value="desc">Descendant</option>
                </select>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {books.map((book) => {
                        const avg =
                            book.ratings.length > 0
                                ? book.ratings.reduce((acc, r) => acc + r.stars, 0) / book.ratings.length
                                : 0;

                        return (
                            <li key={book.id} className="bg-white p-4 rounded shadow">
                                <Link href={`/books/${book.id}`}>
                                    <h3 className="text-lg font-bold hover:underline text-blue-600">
                                        {book.title}
                                    </h3>
                                </Link>
                                <p className="text-sm text-gray-600">Année : {book.publishedYear}</p>
                                <p className="text-sm text-gray-600">Auteur : {book.author.name}</p>
                                <p className="text-yellow-600 font-medium">
                                    Note moyenne : {avg.toFixed(1)}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}


            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Nouveau livre</h3>
                        <form onSubmit={handleCreate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Titre"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Année de publication"
                                value={newBook.publishedYear}
                                onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Prix"
                                value={newBook.price}
                                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="number"
                                placeholder="ID de l’auteur"
                                value={newBook.authorId}
                                onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Annuler
                                </button>
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
