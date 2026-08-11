import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, Layers, Package, ShieldCheck, Check } from 'lucide-react';
import { decryptObjectKeys } from '../../api/encryption';
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
      const fetchSupplier = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'https://svitchapi.swtcloud.net/mapi/';
          const response = await fetch(`${apiUrl}GetSupplierData?UserID=265`);
          const data = await response.json();
          if (data.ServiceRes && data.ServiceRes.length > 0) {
            const decryptedList = decryptObjectKeys(data.ServiceRes);
            const found = decryptedList.find(
              (s) => s.VenderLibraryID === id || s.SupplierCode === id
            ) || decryptedList[0];
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

  // Display fields dynamically from decrypted API data (pure API values)
  const name = supplier?.VenderName || supplier?.ShortName || '';
  const country = [supplier?.City, supplier?.CountryName].filter(Boolean).join(', ');
  const desc = supplier?.Desc || [supplier?.Address1, supplier?.Address2, country].filter(Boolean).join(', ');
  const capacity = supplier?.Capacity || '';
  const materials = supplier?.Type || supplier?.ProductCategoriesID || '';
  const websiteUrl = supplier?.Website || '';
  const email = supplier?.OnboardingEmail || '';
  const address1 = supplier?.Address1 || '';
  const city = [supplier?.City, supplier?.Province, supplier?.ZipCode, supplier?.CountryName].filter(Boolean).join(', ');
  const phone = supplier?.PhoneNumber || '';

  const supplierDomain = email.includes('@') ? email.split('@')[1] : 'lefarc.com';
  const supplierPrefix = name || 'LeFarc';

  const teamMembers = [
    {
      name: 'Garnica Fernanda',
      email: email || `mercadotecnia@${supplierDomain}`
    },
    {
      name: `${supplierPrefix} Material`,
      email: `material@${supplierDomain}`
    },
    {
      name: `${supplierPrefix} Catalog`,
      email: `catalog@${supplierDomain}`
    },
    {
      name: `${supplierPrefix} Sales`,
      email: `sales@${supplierDomain}`
    }
  ];

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
      <div className="supplier-hero-banner"></div>

      {/* Profile Header Box */}
      <div className="supplier-profile-header-container">
        <div className="supplier-profile-header">
          <div className="profile-logo-box">
            {supplier?.SupplierLogo || supplier?.imgOriginalLogo ? (
              <img
                src={supplier.SupplierLogo || supplier.imgOriginalLogo}
                alt={name}
                className="profile-logo-img"
              />
            ) : (
              <span className="logo-text">{name ? name.toUpperCase() : 'LE FARC'}</span>
            )}
          </div>

          <div className="profile-title-section">
            <h1 className="profile-name">{name || 'Supplier Detail'}</h1>
            {country && <p className="profile-location">{country}</p>}
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
              <p className="story-desc">{desc || 'No description available for this supplier.'}</p>
              
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
              <div className="story-img-card"></div>
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
                  <div className="glance-value-primary">{materials || '-'}</div>
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
                    {capacity || '-'}
                  </div>
                  {capacity && <p className="glance-subtext">produced per year</p>}
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

      {/* Tab Content: Team */}
      {activeTab === 'Team' && (
        <div className="team-tab-content">
          <h2 className="section-heading">Our team</h2>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar-placeholder">
                  <span className="team-avatar-initial">
                    {member.name ? member.name.charAt(0) : 'W'}
                  </span>
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-email">
                  Email: <a href={`mailto:${member.email}`}>{member.email}</a>
                </p>
                <button className="team-message-btn">
                  <Mail size={14} />
                  <span>Message</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content for Catalog */}
      {activeTab !== 'Overview' && activeTab !== 'Contact' && activeTab !== 'Team' && (
        <div className="tab-placeholder-content">
          <h3>{activeTab} Section</h3>
          <p>Detailed {activeTab.toLowerCase()} information for {name} will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
