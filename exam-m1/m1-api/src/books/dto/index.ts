export class CreateBookDto {
  title: string;
  publishedYear: number;
  price: number;
  authorId: number;
}

export class UpdateBookDto {
  title?: string;
  publishedYear?: number;
  price?: number;
  authorId?: number;
}
