import { notFound } from 'next/navigation';
import AuthorDrawer from './drawer';

type Author = {
    id: number;
    name: string;
    birthDate: string;
    nationality: string;
    biography?: string;
    books: {
        id: number;
        title: string;
        ratings: { stars: number }[];
    }[];
};

async function getAuthor(id: string): Promise<Author | null> {
    try {
        const res = await fetch(`http://localhost:3001/authors/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export default async function AuthorDetailPage({ params }: { params: { id: string } }) {
    const author = await getAuthor(params.id);
    if (!author) return notFound();

    const allRatings = author.books.flatMap((b) => b.ratings ?? []);
    const avg =
        allRatings.length > 0
            ? allRatings.reduce((acc, r) => acc + r.stars, 0) / allRatings.length
            : 0;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">{author.name}</h1>

            <p className="text-gray-700 mb-1">Nationalité : {author.nationality}</p>
            <p className="text-gray-700 mb-1">Date de naissance : {new Date(author.birthDate).toLocaleDateString()}</p>
            {author.biography && <p className="text-gray-700 mb-4">{author.biography}</p>}

            <p className="text-yellow-600 font-medium mb-4">
                Livres écrits : {author.books.length} – Note moyenne : {avg.toFixed(1)}
            </p>

            <h2 className="text-lg font-semibold mb-2">Livres</h2>
            <ul className="mb-6 space-y-2">
                {author.books.length === 0 ? (
                    <p className="text-sm text-gray-500">Aucun livre enregistré.</p>
                ) : (
                    author.books.map((book) => (
                        <li key={book.id} className="border rounded p-3">
                            <p className="font-medium">{book.title}</p>
                            <p className="text-sm text-gray-600">
                                Moyenne :{' '}
                                {book.ratings.length > 0
                                    ? (
                                        book.ratings.reduce((sum, r) => sum + r.stars, 0) /
                                        book.ratings.length
                                    ).toFixed(1)
                                    : '0.0'}
                            </p>
                        </li>
                    ))
                )}
            </ul>


            <AuthorDrawer authorId={author.id} />
        </div>
    );
}
