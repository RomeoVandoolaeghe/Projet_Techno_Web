'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
    authorId: number;
};

export default function AuthorDrawer({ authorId }: Props) {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3001/authors/${authorId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Erreur suppression');
            router.push('/authors'); // Redirige vers la liste des auteurs
        } catch {
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <>
            <button
                onClick={() => setConfirmDelete(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Supprimer l’auteur 🗑️
            </button>

            {/* Modal de confirmation */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-4">Confirmer la suppression</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Supprimer cet auteur supprimera également ses livres. Continuer ?
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
