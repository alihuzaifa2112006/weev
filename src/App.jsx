import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeaderSearch from './components/HeaderSearch/HeaderSearch';
import DashboardContent from './components/Dashboard/DashboardContent';
import AlertsContent from './components/Alerts/AlertsContent';
import AccountContent from './components/Account/AccountContent';
import ProjectsContent from './components/Projects/ProjectsContent';
import MaterialsContent from './components/Materials/MaterialsContent';
import SuppliersContent from './components/Suppliers/SuppliersContent';
import SupplierDetail from './components/Suppliers/SupplierDetail';
import CartSidebar from './components/CartSidebar/CartSidebar';
import Footer from './components/Footer/Footer';
import { Loader2 } from 'lucide-react';
import './App.css';

export default function App() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({ query: '', category: 'Everything' });
  const [cartOpen, setCartOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Simulate network request when switching tabs
  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500); // 500ms fake loading
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleSearch = ({ query, category }) => {
    setSearchParams({ query, category });
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <Navbar setCartOpen={setCartOpen} />

      {/* Header Search Bar */}
      <HeaderSearch onSearch={handleSearch} />

      {/* Main Body */}
      <main className="main-content">
        {isPageLoading ? (
          <div className="page-loader-container">
            <Loader2 size={40} className="spinner-icon" color="#111111" />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<DashboardContent searchQuery={searchParams.query} searchCategory={searchParams.category} />} />
            <Route path="/alerts" element={<AlertsContent />} />
            <Route path="/account" element={<AccountContent />} />
            <Route path="/projects" element={<ProjectsContent />} />
            <Route path="/materials" element={<MaterialsContent />} />
            <Route path="/suppliers" element={<SuppliersContent />} />
            <Route path="/suppliers/:id" element={<SupplierDetail />} />
          </Routes>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
