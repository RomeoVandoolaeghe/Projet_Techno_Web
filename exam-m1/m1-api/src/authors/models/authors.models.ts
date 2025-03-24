export interface AuthorModel {
  id: number;
  name: string;
  birthDate: Date;
  nationality: string;
  biography?: string;
  booksWritten?: number;
  averageRating?: number;
}
