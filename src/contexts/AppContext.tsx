import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockStores, mockProducts, mockCategories } from '../data/mockData';
import { Store, Product, Category, StoreStats } from '../types';

interface AppContextType {
  stores: Store[];
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  addStore: (store: Omit<Store, 'id'>) => Promise<Store>;
  updateStore: (id: string, store: Partial<Store>) => Promise<Store>;
  deleteStore: (id: string) => Promise<void>;
  getStore: (id: string) => Store | undefined;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Product | undefined;
  getStoreProducts: (storeId: string) => Product[];
  getStoreStats: () => StoreStats[];
  searchStores: (term: string) => Store[];
  searchProducts: (term: string) => Product[];
  searchAll: (term: string) => { stores: Store[]; products: Product[] };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    try {
      setStores(mockStores);
      setProducts(mockProducts);
      setCategories(mockCategories);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Store CRUD operations
  const addStore = async (store: Omit<Store, 'id'>): Promise<Store> => {
    const newStore: Store = {
      ...store,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStores((prev) => [...prev, newStore]);
    return newStore;
  };

  const updateStore = async (id: string, storeData: Partial<Store>): Promise<Store> => {
    const updatedStore = { ...getStore(id)!, ...storeData, updatedAt: new Date().toISOString() };
    setStores((prev) => prev.map((s) => (s.id === id ? updatedStore : s)));
    return updatedStore;
  };

  const deleteStore = async (id: string): Promise<void> => {
    setStores((prev) => prev.filter((s) => s.id !== id));
    // Also delete associated products
    setProducts((prev) => prev.filter((p) => p.storeId !== id));
  };

  const getStore = (id: string): Store | undefined => {
    return stores.find((s) => s.id === id);
  };

  // Product CRUD operations
  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
    const updatedProduct = { ...getProduct(id)!, ...productData, updatedAt: new Date().toISOString() };
    setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
    return updatedProduct;
  };

  const deleteProduct = async (id: string): Promise<void> => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const getStoreProducts = (storeId: string): Product[] => {
    return products.filter((p) => p.storeId === storeId);
  };

  // Statistics and search operations
  const getStoreStats = (): StoreStats[] => {
    return stores.map((store) => {
      const storeProducts = getStoreProducts(store.id);
      const totalProducts = storeProducts.length;
      const totalValue = storeProducts.reduce((sum, product) => sum + product.price * product.stock, 0);
      
      return {
        id: store.id,
        name: store.name,
        totalProducts,
        totalValue,
        categoryId: store.categoryId,
        location: store.location,
      };
    });
  };

  const searchStores = (term: string): Store[] => {
    const lowercaseTerm = term.toLowerCase();
    return stores.filter(
      (store) =>
        store.name.toLowerCase().includes(lowercaseTerm) ||
        store.description.toLowerCase().includes(lowercaseTerm)
    );
  };

  const searchProducts = (term: string): Product[] => {
    const lowercaseTerm = term.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseTerm) ||
        product.description.toLowerCase().includes(lowercaseTerm)
    );
  };

  const searchAll = (term: string) => {
    return {
      stores: searchStores(term),
      products: searchProducts(term),
    };
  };

  const value = {
    stores,
    products,
    categories,
    loading,
    error,
    addStore,
    updateStore,
    deleteStore,
    getStore,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getStoreProducts,
    getStoreStats,
    searchStores,
    searchProducts,
    searchAll,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};