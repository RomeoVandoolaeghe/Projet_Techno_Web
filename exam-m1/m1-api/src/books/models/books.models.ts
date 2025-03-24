export interface BookModel {
  id: number;
  title: string;
  publishedYear: number;
  price: number;
  authorId: number;
  averageRating?: number;
}
