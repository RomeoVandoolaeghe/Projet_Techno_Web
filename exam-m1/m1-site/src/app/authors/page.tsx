'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';

type Author = {
    id: number;
    name: string;
    birthDate: string;
    nationality: string;
    biography?: string;
    books: { ratings: { stars: number }[] }[];
};

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [newAuthor, setNewAuthor] = useState({
        name: '',
        birthDate: '',
        nationality: '',
        biography: '',
    });

    useEffect(() => {
        fetchAuthors();
    }, [search]);

    const fetchAuthors = async () => {
        try {
            setLoading(true);
            let url = 'http://localhost:3001/authors';
            if (search) url += `?search=${encodeURIComponent(search)}`;

            const res = await fetch(url);
            const data = await res.json();
            setAuthors(data);
        } catch (err) {
            console.error('Erreur de chargement', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/authors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newAuthor,
                    birthDate: new Date(newAuthor.birthDate).toISOString(),
                }),
            });

            if (!res.ok) throw new Error('Erreur lors de la création');

            setNewAuthor({ name: '', birthDate: '', nationality: '', biography: '' });
            setShowModal(false);
            fetchAuthors();
        } catch (error) {
            alert('Erreur lors de la création de l’auteur.');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Auteurs</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowModal(true)}
                >
                    Ajouter un auteur
                </button>
            </div>

            <input
                type="text"
                placeholder="Rechercher un auteur"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded w-full sm:w-1/2 mb-6"
            />

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {authors.map((author) => {
                        const allRatings = author.books.flatMap((b) => b.ratings ?? []);
                        const avg =
                            allRatings.length > 0
                                ? allRatings.reduce((sum, r) => sum + r.stars, 0) / allRatings.length
                                : 0;

                        return (
                            <li key={author.id} className="bg-white p-4 rounded shadow">
                                <Link href={`/authors/${author.id}`}>
                                    <h3 className="text-lg font-bold">{author.name}</h3>
                                </Link>
                                <p className="text-sm text-gray-600">Nationalité : {author.nationality}</p>
                                <p className="text-sm text-gray-600">
                                    Livres : {author.books.length} – Note moyenne : {avg.toFixed(1)}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            )}


            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Nouvel auteur</h3>
                        <form onSubmit={handleCreate} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Nom"
                                value={newAuthor.name}
                                onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="date"
                                placeholder="Date de naissance"
                                value={newAuthor.birthDate}
                                onChange={(e) => setNewAuthor({ ...newAuthor, birthDate: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Nationalité"
                                value={newAuthor.nationality}
                                onChange={(e) => setNewAuthor({ ...newAuthor, nationality: e.target.value })}
                                className="border px-3 py-2 rounded"
                                required
                            />
                            <textarea
                                placeholder="Biographie"
                                value={newAuthor.biography}
                                onChange={(e) => setNewAuthor({ ...newAuthor, biography: e.target.value })}
                                className="border px-3 py-2 rounded"
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
