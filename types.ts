export enum Category {
  IPHONE = 'iPhone',
  ACCESSORIES = 'Acessórios',
  OFFERS = 'Ofertas'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  colors: string[];
  capacities?: string[];
  description: string;
  rating: number;
  reviews: Review[];
  isNew?: boolean;
  specs: Record<string, string>;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  selectedColor: string;
  selectedCapacity?: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processando' | 'Enviado' | 'Entregue';
  items: CartItem[];
}