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

  const websiteUrl = (supplier && supplier.Website && supplier.Website.length < 50 && !supplier.Website.includes('='))
    ? supplier.Website
    : 'https://lefarc.com/en/nuestra-esencia/';

  const email = (supplier && supplier.OnboardingEmail && supplier.OnboardingEmail.length < 50 && !supplier.OnboardingEmail.includes('='))
    ? supplier.OnboardingEmail
    : 'mercadotecnia@lefarc.com';

  const address1 = (supplier && supplier.Address1 && supplier.Address1.length < 50 && !supplier.Address1.includes('='))
    ? supplier.Address1
    : 'Av. Transportistas 301, Col. Unidad Obrera';

  const city = (supplier && supplier.City && supplier.City.length < 50 && !supplier.City.includes('='))
    ? supplier.City
    : '37179 León de los Aldama, Gto., Mexico';

  const phone = (supplier && supplier.PhoneNumber && supplier.PhoneNumber.length < 30 && !supplier.PhoneNumber.includes('='))
    ? supplier.PhoneNumber
    : '+52 477 470 2828';

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

      {/* Tab Content: Contact */}
      {activeTab === 'Contact' && (
        <div className="contact-tab-content">
          <h2 className="contact-main-heading">Contact information</h2>

          <div className="contact-info-grid">
            <div className="contact-info-col">
              <h3 className="contact-sub-heading">Website</h3>
              <div className="contact-divider"></div>
              <a
                href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                {websiteUrl}
              </a>
              <div className="contact-divider"></div>
            </div>

            <div className="contact-info-col">
              <h3 className="contact-sub-heading">Email</h3>
              <div className="contact-divider"></div>
              <a
                href={`mailto:${email}`}
                className="contact-link"
              >
                {email}
              </a>
              <div className="contact-divider"></div>
            </div>
          </div>

          <div className="locations-section">
            <h2 className="contact-main-heading">Locations</h2>
            <h3 className="contact-sub-heading">HQ</h3>
            <div className="contact-divider short-divider"></div>

            <div className="hq-address-block">
              <p>{address1}</p>
              <p>{city}</p>
              <p>{country}</p>
              <p className="phone-line">Phone: {phone}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content for Catalog / Team */}
      {activeTab !== 'Overview' && activeTab !== 'Contact' && (
        <div className="tab-placeholder-content">
          <h3>{activeTab} Section</h3>
          <p>Detailed {activeTab.toLowerCase()} information for {name} will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
