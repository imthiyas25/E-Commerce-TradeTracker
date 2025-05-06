export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  categoryId: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  openingHours: string;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  storeId: string;
  status: 'in_stock' | 'out_of_stock' | 'low_stock' | 'discontinued';
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface StoreStats {
  id: string;
  name: string;
  totalProducts: number;
  totalValue: number;
  categoryId: string;
  location: string;
}