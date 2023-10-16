import AuthorName from "./AuthorName";
import PublisherName from "./PublisherName";

export default interface Book {
  id: string;
  title: string;
  isbn: string;
  description: string;
  publicationYear: number;
  quantity: number;
  genre: string;
  author: AuthorName;
  publisher: PublisherName;
}
