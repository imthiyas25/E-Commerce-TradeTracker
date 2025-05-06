import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import StoresList from './pages/stores/StoresList';
import StoreDetails from './pages/stores/StoreDetails';
import ProductsList from './pages/products/ProductsList';
import ProductDetails from './pages/products/ProductDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="stores" element={<StoresList />} />
            <Route path="stores/:id" element={<StoreDetails />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;