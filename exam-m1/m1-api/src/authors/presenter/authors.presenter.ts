import { Author, Book, Rating } from '@prisma/client';

export const authorPresenter = (
  author: Author & { books: (Book & { ratings: Rating[] })[] },
) => {
  const totalRatings = author.books.flatMap((b) => b.ratings);
  const averageRating =
    totalRatings.length > 0
      ? totalRatings.reduce((sum, r) => sum + r.stars, 0) / totalRatings.length
      : 0;

  return {
    ...author,
    booksWritten: author.books.length,
    averageRating,
  };
};
