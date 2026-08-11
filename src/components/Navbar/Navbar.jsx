import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Bell, User, ShoppingBag } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ setCartOpen }) {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [materialsMenuOpen, setMaterialsMenuOpen] = useState(false);
  const [suppliersMenuOpen, setSuppliersMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to get active tab based on pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'My Dashboard';
    if (path === '/projects') return 'Projects';
    if (path === '/materials') return 'Materials';
    if (path === '/suppliers') return 'Suppliers';
    if (path === '/alerts') return 'Alerts';
    if (path === '/account') return 'Account';
    return 'My Dashboard';
  };
  const activeTab = getActiveTab();

  const navItems = [
    { id: 'My Dashboard', label: 'My Dashboard', hasDropdown: false },
    { id: 'Projects', label: 'Projects', hasDropdown: false },
    { id: 'Materials', label: 'Materials', hasDropdown: true },
    { id: 'Suppliers', label: 'Suppliers', hasDropdown: true },
  ];

  return (
    <header className="weev-navbar-header">
      <div className="weev-navbar-container">
        {/* Left: WEEV Brand & Workspace */}
        <div className="navbar-brand-section">
          <div className="weev-logo-wrapper" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '2px' }}>
              <rect width="36" height="36" fill="#D6E300" />
              <defs>
                <pattern id="stripes" patternUnits="userSpaceOnUse" width="36" height="3.2">
                  <rect width="36" height="1.8" fill="#111111" />
                </pattern>
              </defs>
              <text x="50%" y="82%" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="32" text-anchor="middle" fill="url(#stripes)" letter-spacing="-2px">W</text>
            </svg>
            <span className="weev-logo-text">eev</span>
          </div>

          <div className="brand-divider"></div>

          <div className="workspace-selector" onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}>
            <span className="workspace-name">Weev design</span>
            <ChevronDown className={`dropdown-arrow ${workspaceMenuOpen ? 'open' : ''}`} size={16} strokeWidth={2.5} />

            {workspaceMenuOpen && (
              <div className="dropdown-menu workspace-menu">
                <div className="dropdown-item active">Weev design</div>
                <div className="dropdown-item">Weev Production</div>
                <div className="dropdown-item">Weev Samples</div>
              </div>
            )}
          </div>
        </div>

        <div className="vertical-divider section-divider"></div>

        {/* Center: Main Navigation */}
        <nav className="navbar-nav-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                className={`nav-item-wrapper ${isActive ? 'active' : ''}`}
                onMouseEnter={() => {
                  if (item.id === 'Materials') setMaterialsMenuOpen(true);
                  if (item.id === 'Suppliers') setSuppliersMenuOpen(true);
                }}
                onMouseLeave={() => {
                  if (item.id === 'Materials') setMaterialsMenuOpen(false);
                  if (item.id === 'Suppliers') setSuppliersMenuOpen(false);
                }}
                onClick={() => {
                  if (!item.hasDropdown || item.id === 'Materials' || item.id === 'Suppliers') {
                    if (item.id === 'My Dashboard') navigate('/');
                    else if (item.id === 'Projects') navigate('/projects');
                    else if (item.id === 'Materials') navigate('/materials');
                    else if (item.id === 'Suppliers') navigate('/suppliers');
                  }
                }}
              >
                <span className="nav-link-text">{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown
                    size={15}
                    className={`dropdown-arrow ${
                      (item.id === 'Materials' && materialsMenuOpen) ||
                      (item.id === 'Suppliers' && suppliersMenuOpen)
                        ? 'open'
                        : ''
                    }`}
                  />
                )}
                {isActive && <div className="active-nav-indicator" />}

                {/* Submenu for Materials (2-column layout) */}
                {item.id === 'Materials' && materialsMenuOpen && (
                  <div className="materials-dropdown-menu">
                    <div className="materials-dropdown-col left-col">
                      <div className="materials-dropdown-item main-cat">Featured</div>
                      <div className="materials-dropdown-item main-cat">Collections</div>
                      <div className="materials-dropdown-item main-cat">From My Suppliers</div>
                      <div 
                        className="materials-dropdown-item main-cat"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/materials');
                          setMaterialsMenuOpen(false);
                        }}
                      >
                        Browse All
                      </div>
                    </div>
                    <div className="materials-dropdown-col right-col">
                      <div className="materials-dropdown-item">Components, Outsoles, Insoles, Lasts</div>
                      <div className="materials-dropdown-item">Finished and semi finished Goods</div>
                      <div className="materials-dropdown-item">Hardware</div>
                      <div className="materials-dropdown-item">Leather</div>
                      <div className="materials-dropdown-item">Synthetics & Leather Alternatives</div>
                      <div className="materials-dropdown-item">Textile</div>
                      <div className="materials-dropdown-item">Threads, Yarns, Fibers</div>
                      <div className="materials-dropdown-item">Trim and Accessory</div>
                    </div>
                  </div>
                )}

                {/* Submenu for Suppliers (2-column layout) */}
                {item.id === 'Suppliers' && suppliersMenuOpen && (
                  <div className="materials-dropdown-menu">
                    <div className="materials-dropdown-col left-col">
                      <div className="materials-dropdown-item main-cat">Featured</div>
                      <div className="materials-dropdown-item main-cat">My Suppliers</div>
                      <div 
                        className="materials-dropdown-item main-cat"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/suppliers');
                          setSuppliersMenuOpen(false);
                        }}
                      >
                        Browse All
                      </div>
                    </div>
                    <div className="materials-dropdown-col right-col">
                      <div className="materials-dropdown-item">Components, Outsoles, Insoles, Lasts</div>
                      <div className="materials-dropdown-item">Finished and semi finished Goods</div>
                      <div className="materials-dropdown-item">Hardware</div>
                      <div className="materials-dropdown-item">Leather</div>
                      <div className="materials-dropdown-item">Synthetics & Leather Alternatives</div>
                      <div className="materials-dropdown-item">Textile</div>
                      <div className="materials-dropdown-item">Threads, Yarns, Fibers</div>
                      <div className="materials-dropdown-item">Trim and Accessory</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="vertical-divider section-divider"></div>

        {/* Right: Actions (Notification, Profile, Cart/Bag) */}
        <div className="navbar-actions-section">
          {/* Notifications */}
          <div className="nav-item-wrapper bell-nav-item" onClick={() => {
            navigate('/alerts');
            setNotificationCount(0);
          }}>
            <button
              className="icon-action-btn notification-btn"
              title="Notifications"
            >
              <Bell size={20} className="action-icon" />
              {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
            </button>
            {activeTab === 'Alerts' && <div className="active-nav-indicator" style={{bottom: '-12px'}} />}
          </div>

          {/* User Account */}
          <div 
            className="nav-item-wrapper profile-nav-item" 
            onMouseEnter={() => setUserMenuOpen(true)}
            onMouseLeave={() => setUserMenuOpen(false)}
          >
            <button
              className="icon-action-btn profile-btn"
              title="User Account"
            >
              <User size={20} className="action-icon" />
              <ChevronDown size={14} className="user-chevron" />
            </button>
            {(activeTab === 'Account' || userMenuOpen) && <div className="active-nav-indicator" style={{bottom: '-12px'}} />}

            {userMenuOpen && (
              <div className="mega-dropdown-menu">
                <div className="mega-dropdown-columns">
                  <div className="mega-col">
                    <div className="mega-item" onClick={() => { navigate('/account'); setUserMenuOpen(false); }}>My Account</div>
                    <div className="mega-item">My Company</div>
                    <div className="mega-item">My Team</div>
                  </div>
                  <div className="mega-col">
                    <div className="mega-item">My Suppliers</div>
                    <div className="mega-item">Orders</div>
                  </div>
                </div>
                <div className="mega-dropdown-footer">
                  <div className="mega-item logout-item">Log out</div>
                </div>
              </div>
            )}
          </div>

          <div className="vertical-divider small-divider"></div>

          {/* Shopping Bag */}
          <button 
            className="icon-action-btn cart-btn" 
            title="Bag / Samples"
            onClick={() => setCartOpen && setCartOpen(true)}
          >
            <ShoppingBag size={20} className="action-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
