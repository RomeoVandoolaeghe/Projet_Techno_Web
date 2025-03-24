import { Book } from '@prisma/client';

export const bookPresenter = (
  book: Book & { ratings: { stars: number }[] },
) => {
  const averageRating =
    book.ratings.length > 0
      ? book.ratings.reduce((sum, r) => sum + r.stars, 0) / book.ratings.length
      : 0;

  return {
    ...book,
    averageRating,
  };
};
