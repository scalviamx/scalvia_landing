export interface LalanudaUser {
  name: string;
  email?: string;
  imageUrl?: string;
  provider: "google" | "guest";
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  pet: string;
  text: string;
}
