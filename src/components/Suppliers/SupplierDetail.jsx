import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, Layers, Package, ShieldCheck, Check } from 'lucide-react';
import './SupplierDetail.css';

export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Overview');
  const [supplier, setSupplier] = useState(location.state?.supplier || null);
  const [loading, setLoading] = useState(!location.state?.supplier);

  useEffect(() => {
    if (!supplier) {
      // If navigated directly via URL, try fetching or fallback to mock supplier matching screenshot
      const fetchSupplier = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'https://svitchapi.swtcloud.net/mapi/';
          const response = await fetch(`${apiUrl}GetSupplierData?UserID=265`);
          const data = await response.json();
          if (data.ServiceRes && data.ServiceRes.length > 0) {
            const found = data.ServiceRes.find(
              (s) => s.VenderLibraryID === id || s.SupplierCode === id
            ) || data.ServiceRes[0];
            setSupplier(found);
          }
        } catch (err) {
          console.error("Error loading supplier detail:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    }
  }, [id, supplier]);

  // Display fields (fallback to screenshot defaults if API fields are encrypted/empty)
  const name = (supplier && supplier.VenderName && supplier.VenderName.length < 30)
    ? supplier.VenderName
    : 'LeFarc';

  const country = (supplier && supplier.CountryName && supplier.CountryName.length < 30)
    ? supplier.CountryName
    : 'Mexico';

  const desc = (supplier && supplier.Desc && supplier.Desc.length < 100)
    ? supplier.Desc
    : 'Lefarc is a 100% Mexican tannery specializing in premium, sustainable leather for footwear, leather goods and upholstery. We export 85% of our production and have a presence in over 20 countries. Gold-certified by the LWG, we operate 4 production facilities with a monthly capacity of 2 million sqft.';

  const capacity = (supplier && supplier.Capacity && supplier.Capacity !== '-')
    ? supplier.Capacity
    : '24000000 SF';

  return (
    <div className="supplier-detail-page">
      {/* Back button */}
      <div className="supplier-detail-topbar">
        <button className="back-btn" onClick={() => navigate('/suppliers')}>
          <ArrowLeft size={18} />
          <span>Back to Suppliers</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="supplier-hero-banner">
        <div className="hero-overlay-text">Our Identity</div>
      </div>

      {/* Profile Header Box */}
      <div className="supplier-profile-header-container">
        <div className="supplier-profile-header">
          <div className="profile-logo-box">
            <span className="logo-text">LE FARC</span>
          </div>

          <div className="profile-title-section">
            <h1 className="profile-name">{name}</h1>
            <p className="profile-location">{country}</p>
          </div>

          <div className="profile-actions">
            <button className="disconnect-btn">Disconnect</button>
            <button className="message-btn">
              <Mail size={16} />
              <span>Message supplier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Tabs */}
      <div className="supplier-nav-tabs">
        {['Overview', 'Catalog', 'Team', 'Contact'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'Overview' && (
        <div className="overview-tab-content">
          {/* Our Story Section */}
          <section className="story-section">
            <div className="story-left">
              <h2 className="section-heading">Our Story</h2>
              <p className="story-desc">{desc}</p>
              
              <div className="cert-badge-box">
                <div className="lwg-badge">
                  <div className="lwg-icon">
                    <Check size={18} color="#2e7d32" />
                  </div>
                  <div className="lwg-text">
                    <strong>LEATHER WORKING GROUP</strong>
                    <span>GOLD CERTIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-right">
              <div className="story-img-card">
                <div className="story-img-overlay">
                  <span>Our Identity</span>
                </div>
              </div>
            </div>
          </section>

          {/* At a Glance Section */}
          <section className="glance-section">
            <h2 className="section-heading">At a glance</h2>

            <div className="glance-grid">
              {/* Card 1: Materials */}
              <div className="glance-card">
                <div className="glance-card-content">
                  <span className="glance-label">Materials</span>
                  <div className="glance-value-primary">Leather</div>
                </div>
                <div className="glance-icon-row">
                  <div className="swatch-icon">
                    <Layers size={32} color="#111" />
                  </div>
                </div>
                <div className="yellow-bottom-bar"></div>
              </div>

              {/* Card 2: Capacity */}
              <div className="glance-card">
                <div className="glance-card-content">
                  <span className="glance-label">Capacity</span>
                  <div className="glance-value-primary font-bold">
                    {capacity} <span className="text-sm font-normal">SF</span>
                  </div>
                  <p className="glance-subtext">produced per year</p>
                </div>
                <div className="glance-icon-row">
                  <Package size={32} color="#111" />
                </div>
                <div className="yellow-bottom-bar"></div>
              </div>

              {/* Card 3: Specialties */}
              <div className="glance-card">
                <div className="glance-card-content">
                  <span className="glance-label">Specialties</span>
                  <p className="glance-subtext-dark">
                    Specialized in small skin leather: goat and lamb
                  </p>
                </div>
                <div className="glance-icon-row">
                  <ShieldCheck size={32} color="#111" />
                </div>
                <div className="yellow-bottom-bar"></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Content for Catalog / Team / Contact */}
      {activeTab !== 'Overview' && (
        <div className="tab-placeholder-content">
          <h3>{activeTab} Section</h3>
          <p>Detailed {activeTab.toLowerCase()} information for {name} will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
