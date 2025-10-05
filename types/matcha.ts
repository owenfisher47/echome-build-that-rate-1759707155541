export interface Matcha {
  id: string;
  name: string;
  rating: number;
  description: string;
  location: string;
  image: string;
  createdAt: Date;
}

export interface MatchaFormData {
  name: string;
  rating: number;
  description: string;
  location: string;
  image: File | null;
}