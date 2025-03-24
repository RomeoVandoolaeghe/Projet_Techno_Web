'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type DrawerProps = {
    bookId: number;
    ratings: {
        stars: number;
        comment?: string;
    }[];
};

export default function Drawer({ bookId, ratings }: DrawerProps) {
    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [newRating, setNewRating] = useState({ stars: '', comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3001/books/${bookId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            router.push('/books');
        } else {
            alert('Erreur lors de la suppression.');
        }
    };

    const handleAddRating = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const res = await fetch('http://localhost:3001/ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stars: parseInt(newRating.stars),
                    comment: newRating.comment,
                    bookId,
                }),
            });

            if (!res.ok) throw new Error('Erreur lors de l’ajout');

            setNewRating({ stars: '', comment: '' });
            setOpen(false);
            window.location.reload(); 
        } catch (err) {
            alert('Erreur lors de l’ajout de la note.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex gap-4 mt-6">
                <button
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setOpen(true)}
                >
                    Voir les commentaires
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => setConfirmDelete(true)}
                >
                    Supprimer le livre
                </button>
            </div>


            {open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
                    <div className="bg-white w-full max-w-md p-6 shadow-lg overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">💬 Commentaires</h2>
                            <button className="text-sm text-blue-600" onClick={() => setOpen(false)}>
                                Fermer
                            </button>
                        </div>

                        {ratings.length === 0 ? (
                            <p className="text-sm text-gray-500">Aucun commentaire pour ce livre.</p>
                        ) : (
                            <ul className="space-y-3 mb-6">
                                {ratings.map((r, i) => (
                                    <li key={i} className="border p-3 rounded">
                                        <p className="text-yellow-600 font-semibold">⭐ {r.stars}/5</p>
                                        {r.comment && <p className="text-sm italic mt-1">{r.comment}</p>}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <form onSubmit={handleAddRating} className="border-t pt-4">
                            <h4 className="font-semibold mb-2">➕ Ajouter une note</h4>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                required
                                placeholder="Étoiles (1 à 5)"
                                value={newRating.stars}
                                onChange={(e) => setNewRating({ ...newRating, stars: e.target.value })}
                                className="border px-3 py-2 rounded w-full mb-2"
                            />
                            <textarea
                                placeholder="Commentaire (optionnel)"
                                value={newRating.comment}
                                onChange={(e) => setNewRating({ ...newRating, comment: e.target.value })}
                                className="border px-3 py-2 rounded w-full mb-2"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                disabled={submitting}
                            >
                                {submitting ? 'Envoi...' : 'Ajouter la note'}
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {confirmDelete && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Es-tu sûr de vouloir supprimer ce livre ? Cette action est irréversible.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
