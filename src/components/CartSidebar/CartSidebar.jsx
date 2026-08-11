import React from 'react';
import { X } from 'lucide-react';
import './CartSidebar.css';

export default function CartSidebar({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="cart-sidebar-overlay" onClick={onClose}></div>

      {/* Sidebar Panel */}
      <div className={`cart-sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-sidebar-header">
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        
        <div className="cart-sidebar-content">
          <h2 className="empty-cart-title">Cart is empty</h2>
        </div>
      </div>
    </>
  );
}
