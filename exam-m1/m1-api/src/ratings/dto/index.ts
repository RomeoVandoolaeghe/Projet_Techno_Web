export class CreateRatingDto {
  stars: number; // Note entre 1 et 5
  comment?: string;
  bookId: number;
}

export class UpdateRatingDto {
  stars?: number;
  comment?: string;
}
