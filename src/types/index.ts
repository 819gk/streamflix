export interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  backdrop: string;
  category: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  trending?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
}
