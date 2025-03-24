import { Rating } from '@prisma/client';

export const ratingPresenter = (rating: Rating) => ({
  id: rating.id,
  stars: rating.stars,
  comment: rating.comment,
  bookId: rating.bookId,
});
