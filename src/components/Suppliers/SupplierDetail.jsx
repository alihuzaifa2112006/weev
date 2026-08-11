import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowLeft, Layers, Package, ShieldCheck, Check, ChevronDown, Calendar, FolderPlus, UploadCloud, Trash2, MapPin, Search, X, CheckCircle, ChevronUp, Building2, Phone, ThumbsUp } from 'lucide-react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { decryptObjectKeys } from '../../api/encryption';
import { getSuppliersData } from '../../api/supplierService';
import SingleSelectDropdown from './SingleSelectDropdown';
import './SupplierDetail.css';

const muiTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    '& fieldset': {
      borderColor: '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: '#cbd5e1',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#09090b',
      borderWidth: '1px',
    },
    '& input': {
      padding: '10px 14px',
    },
  },
};

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
          const decryptedList = await getSuppliersData();
          if (decryptedList && decryptedList.length > 0) {
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
  const websiteUrl = (supplier?.Website && supplier.Website !== '-') ? supplier.Website : '';
  const email = (supplier?.OnboardingEmail && supplier.OnboardingEmail !== '-') ? supplier.OnboardingEmail : (supplier?.Email && supplier.Email !== '-' ? supplier.Email : '');

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

  const [empForm, setEmpForm] = useState({
    noOfEmployees: '',
    exportBusinessPct: '',
    experienceInBusiness: '',
    europeBusinessPct: '',
    shippingTerms: '',
    yearsInBusiness: '',
    yearsInEuropeBusiness: '',
    businessType: '',
  });

  const handleEmpFormChange = (key, value) => {
    setEmpForm((prev) => ({ ...prev, [key]: value }));
  };

  const [setupForm, setSetupForm] = useState({
    capacityPerMonth: supplier?.Capacity || '100',
    capacityUnit: 'KG',
    turnoverPerYear: supplier?.Annualturnover || '100',
    turnoverUnit: 'EURO',
    businessLicenseNo: supplier?.BusinessLicenseNumber || '2001',
    licenseFile: null,
    additionalInfo: '',
  });

  const licenseFileInputRef = useRef(null);

  const [gpsForm, setGpsForm] = useState({
    searchQuery: '',
    factoryName: supplier?.VenderName || 'Hong Kong Industrial Trading Corp',
    vendor: supplier?.ShortName ? `${supplier.ShortName} (24)` : 'HONG KONG VENDOR (24)',
    address: [supplier?.Address1, supplier?.Address2, supplier?.City, supplier?.CountryName].filter(Boolean).join(', ') || '30 Canton Road, Tsim Sha Tsui, Kowloon, Hong Kong',
    city: supplier?.City || 'HONG KONG',
    branch: 'Kowloon Branch',
    latitude: '22.319303',
    longitude: '114.169361',
    radius: '500',
  });

  const catalogProducts = [
    { id: 1, img: '/1.jpg', title: 'Cross-Strap Embroidered Cork Sandal' },
    { id: 2, img: '/2.jpg', title: 'Double Buckle Patterned Cork Sandal' },
    { id: 3, img: '/3.jpg', title: 'Black Ankle-Strap Comfort Sandal' },
    { id: 4, img: '/4.jpg', title: 'Tan Leather Circle-Accent Slingback' },
    { id: 5, img: '/5.jpg', title: 'Casual Everyday Flat Sandal' },
    { id: 6, img: '/6.jpg', title: 'Classic Urban Sneaker' },
  ];

  const [catalogComments, setCatalogComments] = useState({});
  const [catalogCommentInputs, setCatalogCommentInputs] = useState({});
  const [catalogLikes, setCatalogLikes] = useState({});
  const [catalogUserLiked, setCatalogUserLiked] = useState({});

  const handleLikeToggle = (productId) => {
    setCatalogUserLiked((prev) => {
      const isLiked = !!prev[productId];
      const newLiked = !isLiked;
      setCatalogLikes((prevLikes) => ({
        ...prevLikes,
        [productId]: (prevLikes[productId] || 0) + (newLiked ? 1 : -1),
      }));
      return { ...prev, [productId]: newLiked };
    });
  };

  const handlePostComment = (productId) => {
    const text = catalogCommentInputs[productId]?.trim();
    if (!text) return;
    setCatalogComments((prev) => ({
      ...prev,
      [productId]: [...(prev[productId] || []), text],
    }));
    setCatalogCommentInputs((prev) => ({ ...prev, [productId]: '' }));
  };

  const [expandedSuppliers, setExpandedSuppliers] = useState({});

  const toggleExpandSupplier = (index) => {
    setExpandedSuppliers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const materialSuppliersList = [
    {
      name: 'Apex Organic Cotton & Textile Mills',
      verified: true,
      address: 'Plot 18, Industrial Estate Phase 2, Faisalabad, Pakistan',
      city: 'Faisalabad',
      contactPerson: 'Tariq Mehmood',
      phone: '+92 300 4567890',
      email: 'sales@apexcottonmills.com',
      details: {
        materialType: '100% Organic Combed Cotton, Pima Cotton & Jersey Fabrics',
        capacity: '150,000 Meters / Month',
        moq: '500 Meters',
        leadTime: '10 - 15 Days',
        qualityCert: 'GOTS Certified, OEKO-TEX Standard 100',
        paymentTerms: '30% Advance, 70% LC at sight',
      },
    },
    {
      name: 'Le Farc Tannery & Genuine Leather Supplies',
      verified: true,
      address: 'Km 12.5 Carretera León - Silao, León, Guanajuato, Mexico',
      city: 'León',
      contactPerson: 'Carlos Delgado',
      phone: '+52 477 710 4300',
      email: 'contact@lefarc.com.mx',
      details: {
        materialType: 'Finished Cowhide Leather, Goat Suede & Sheep Nappa',
        capacity: '80,000 SF / Month',
        moq: '1,000 SF',
        leadTime: '14 - 21 Days',
        qualityCert: 'LWG Gold Rated, ISO 14001:2015',
        paymentTerms: 'Net 30 Days',
      },
    },
    {
      name: 'Guangzhou Silk, Denim & Trims Factory',
      verified: true,
      address: 'No. 88 Textile Avenue, Haizhu District, Guangzhou, China',
      city: 'Guangzhou',
      contactPerson: 'Chen Wei',
      phone: '+86 20 8455 1234',
      email: 'chen.wei@gzsilkdenim.cn',
      details: {
        materialType: 'Raw Denim, Pure Mulberry Silk, Linen & Garment Trims',
        capacity: '300,000 Meters / Month',
        moq: '1,000 Meters',
        leadTime: '12 - 18 Days',
        qualityCert: 'ISO 9001:2015, REACH Compliant',
        paymentTerms: 'TT Bank Transfer',
      },
    },
  ];

  const storageKey = `supplier_contacts_${id || 'default'}`;

  const [generalContacts, setGeneralContacts] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load contacts from localStorage", e);
    }
    return [
      {
        id: '1',
        contactType: 'BUSINESS REPRESENTATIVE',
        name: 'Lucinda Lee',
        jobTitle: '-',
        mobileNumber: '852 2369-4734',
        email: 'lucindalee@ivt-hk.com',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(generalContacts));
    } catch (e) {
      console.error("Failed to save contacts to localStorage", e);
    }
  }, [generalContacts, storageKey]);

  const handleContactChange = (index, field, value) => {
    setGeneralContacts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddContact = () => {
    setGeneralContacts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        contactType: 'BUSINESS REPRESENTATIVE',
        name: '',
        jobTitle: '',
        mobileNumber: '',
        email: '',
      },
    ]);
  };

  const handleDeleteContact = (index) => {
    setGeneralContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const [certForm, setCertForm] = useState({
    document: '',
    description: '',
    validityFrom: '',
    validityTo: '',
    file: null,
  });

  const [certificatesList, setCertificatesList] = useState([]);
  const fileInputRef = useRef(null);

  const handleCertAdd = () => {
    if (!certForm.document && !certForm.description) return;
    setCertificatesList((prev) => [
      ...prev,
      {
        id: Date.now(),
        certificate: certForm.document || 'Certificate',
        description: certForm.description || '-',
        validityFrom: certForm.validityFrom || '-',
        validityTo: certForm.validityTo || '-',
        fileName: certForm.file ? certForm.file.name : 'Document.pdf',
      },
    ]);
    setCertForm({
      document: '',
      description: '',
      validityFrom: '',
      validityTo: '',
      file: null,
    });
  };

  if (loading) {
    return (
      <div className="suppliers-loader-container" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="suppliers-spinner"></div>
      </div>
    );
  }

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
        {['Overview', 'Catalog', 'Team', 'Setup Details', 'GPS', 'Material Supplier', 'Certificates and Patents', 'Contact'].map((tab) => (
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

      {/* Tab Content: Catalog */}
      {activeTab === 'Catalog' && (
        <div className="catalog-tab-content">
          {/* Catalog Top Banner */}
          <div className="catalog-hero-banner">
            <div className="catalog-banner-overlay">
              <span className="catalog-banner-sub">Footwear Collection 2025</span>
              <h1 className="catalog-banner-title">Sandals • Sneakers • Multiple Design Options</h1>
            </div>
          </div>

          {/* Catalog Products Grid */}
          <div className="catalog-products-grid">
            {catalogProducts.map((product) => {
              const likesCount = catalogLikes[product.id] || 0;
              const isLiked = !!catalogUserLiked[product.id];
              const productComments = catalogComments[product.id] || [];
              const currentInput = catalogCommentInputs[product.id] || '';

              return (
                <div key={product.id} className="catalog-product-card">
                  {/* Product Image Frame */}
                  <div className="catalog-img-frame">
                    <img src={product.img} alt={product.title} className="catalog-product-img" />
                  </div>

                  {/* Comment Input Box */}
                  <div className="catalog-card-body">
                    <div className="catalog-comment-wrapper">
                      <textarea
                        rows={2}
                        className="catalog-comment-input"
                        placeholder="Leave your comments here!"
                        value={currentInput}
                        onChange={(e) =>
                          setCatalogCommentInputs((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Likes & Post Button Row */}
                    <div className="catalog-card-action-row">
                      <button
                        type="button"
                        className={`catalog-like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={() => handleLikeToggle(product.id)}
                      >
                        <ThumbsUp size={14} className="like-icon" />
                        <span>({likesCount})</span>
                      </button>

                      <button
                        type="button"
                        className="catalog-post-btn"
                        onClick={() => handlePostComment(product.id)}
                      >
                        Post
                      </button>
                    </div>

                    {/* Render Posted Comments */}
                    {productComments.length > 0 && (
                      <div className="catalog-comments-list">
                        {productComments.map((c, i) => (
                          <div key={i} className="catalog-comment-bubble">
                            <span className="comment-author">User:</span>
                            <span className="comment-text">{c}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
              {websiteUrl ? (
                <a
                  href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  {websiteUrl}
                </a>
              ) : (
                <span className="contact-empty-text">-</span>
              )}
              <div className="contact-divider"></div>
            </div>

            <div className="contact-info-col">
              <h3 className="contact-sub-heading">Email</h3>
              <div className="contact-divider"></div>
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="contact-link"
                >
                  {email}
                </a>
              ) : (
                <span className="contact-empty-text">-</span>
              )}
              <div className="contact-divider"></div>
            </div>
          </div>

          {/* General Contact Information Section */}
          <div className="general-contacts-card">
            <h2 className="general-contacts-title">General Contact Information</h2>

            <div className="general-contacts-table-wrapper">
              <div className="general-contacts-table-header">
                <div className="gc-th">Contact Type</div>
                <div className="gc-th">Name</div>
                <div className="gc-th">Job Title</div>
                <div className="gc-th">Mobile Number</div>
                <div className="gc-th">Email</div>
                <div className="gc-th gc-actions-th">Actions</div>
              </div>

              <div className="general-contacts-table-body">
                {generalContacts.length === 0 ? (
                  <div className="gc-empty-row">No contacts added yet. Click "Add More" below.</div>
                ) : (
                  generalContacts.map((contact, index) => (
                    <div className="general-contacts-table-row" key={contact.id || index}>
                      {/* Contact Type */}
                      <div className="gc-td">
                        <SingleSelectDropdown
                          options={['BUSINESS REPRESENTATIVE', 'SALES MANAGER', 'TECHNICAL SUPPORT', 'ACCOUNTING', 'GENERAL']}
                          selected={contact.contactType}
                          placeholder="Select Contact Type"
                          onSelect={(val) => handleContactChange(index, 'contactType', val)}
                        />
                      </div>

                      {/* Name */}
                      <div className="gc-td">
                        <TextField
                          size="small"
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                          fullWidth
                          sx={muiTextFieldSx}
                        />
                      </div>

                      {/* Job Title */}
                      <div className="gc-td">
                        <TextField
                          size="small"
                          placeholder="Job Title"
                          value={contact.jobTitle}
                          onChange={(e) => handleContactChange(index, 'jobTitle', e.target.value)}
                          fullWidth
                          sx={muiTextFieldSx}
                        />
                      </div>

                      {/* Mobile Number */}
                      <div className="gc-td">
                        <TextField
                          size="small"
                          placeholder="Mobile Number"
                          value={contact.mobileNumber}
                          onChange={(e) => handleContactChange(index, 'mobileNumber', e.target.value)}
                          fullWidth
                          sx={muiTextFieldSx}
                        />
                      </div>

                      {/* Email */}
                      <div className="gc-td">
                        <TextField
                          size="small"
                          type="email"
                          placeholder="Email"
                          value={contact.email}
                          onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                          fullWidth
                          sx={muiTextFieldSx}
                        />
                      </div>

                      {/* Actions */}
                      <div className="gc-td gc-actions-td">
                        <button
                          type="button"
                          className="gc-trash-btn"
                          onClick={() => handleDeleteContact(index)}
                          title="Delete Contact"
                        >
                          <Trash2 size={18} color="#ef4444" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="gc-add-row-footer">
                <button
                  type="button"
                  className="gc-add-more-btn"
                  onClick={handleAddContact}
                >
                  Add More
                </button>
              </div>
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

      {/* Tab Content: Setup Details */}
      {activeTab === 'Setup Details' && (
        <div className="setup-tab-content">
          <div className="setup-card">
            <h2 className="setup-title">Setup Details</h2>

            <div className="setup-form-grid">
              {/* Row 1: Capacity & Turnover */}
              <div className="setup-form-row">
                {/* Field 1: Capacity per Month */}
                <div className="setup-field-group">
                  <label className="emp-field-label">
                    Capacity per Month <span className="required-star">*</span>{' '}
                    <span className="setup-sub-label">(Please select the appropriate unit for your product)</span>
                  </label>
                  <div className="setup-input-unit-group">
                    <input
                      type="text"
                      className="setup-input-main"
                      value={setupForm.capacityPerMonth}
                      onChange={(e) => setSetupForm((prev) => ({ ...prev, capacityPerMonth: e.target.value }))}
                    />
                    <div className="setup-unit-dropdown-wrapper">
                      <label className="setup-unit-label">Unit</label>
                      <SingleSelectDropdown
                        options={['KG', 'SF', 'Meters', 'Pieces', 'Tons']}
                        selected={setupForm.capacityUnit}
                        onSelect={(val) => setSetupForm((prev) => ({ ...prev, capacityUnit: val }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Field 2: Turnover per year */}
                <div className="setup-field-group">
                  <label className="emp-field-label">
                    Turnover per year <span className="required-star">*</span>
                  </label>
                  <div className="setup-input-unit-group">
                    <input
                      type="text"
                      className="setup-input-main"
                      value={setupForm.turnoverPerYear}
                      onChange={(e) => setSetupForm((prev) => ({ ...prev, turnoverPerYear: e.target.value }))}
                    />
                    <div className="setup-unit-dropdown-wrapper">
                      <label className="setup-unit-label">Unit</label>
                      <SingleSelectDropdown
                        options={['EURO', 'USD', 'GBP', 'INR', 'PKR']}
                        selected={setupForm.turnoverUnit}
                        onSelect={(val) => setSetupForm((prev) => ({ ...prev, turnoverUnit: val }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Business License No. */}
              <div className="setup-form-row full-width">
                <div className="setup-field-group full-width">
                  <label className="emp-field-label">
                    Business License No. <span className="required-star">*</span>
                  </label>
                  <div className="setup-license-input-wrapper">
                    <input
                      type="text"
                      className="setup-input-main flex-1"
                      value={setupForm.businessLicenseNo}
                      onChange={(e) => setSetupForm((prev) => ({ ...prev, businessLicenseNo: e.target.value }))}
                    />
                    <input
                      type="file"
                      ref={licenseFileInputRef}
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSetupForm((prev) => ({ ...prev, licenseFile: e.target.files[0] }));
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="setup-upload-btn"
                      onClick={() => licenseFileInputRef.current && licenseFileInputRef.current.click()}
                      title="Upload Business License Document"
                    >
                      <UploadCloud size={20} color="#09090b" />
                    </button>
                  </div>
                  {setupForm.licenseFile && (
                    <span className="setup-uploaded-filename">{setupForm.licenseFile.name}</span>
                  )}
                </div>
              </div>

              {/* Row 3: Additional Info */}
              <div className="setup-form-row full-width">
                <div className="setup-field-group full-width">
                  <label className="emp-field-label">Additional Info</label>
                  <textarea
                    className="setup-textarea-element"
                    placeholder="Additional Info.."
                    rows={4}
                    value={setupForm.additionalInfo}
                    onChange={(e) => setSetupForm((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                  />
                </div>
              </div>

              {/* Row 4: Employees & Business Details Grid */}
              <div className="emp-fields-grid" style={{ marginTop: '16px' }}>
                {/* Field 1: No. of Employee */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    No. of Employee <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['Under 50', '50 - 100', '100 - 500', 'Over 500']}
                    selected={empForm.noOfEmployees}
                    placeholder="Select No. of Employee"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, noOfEmployees: val }))}
                  />
                </div>

                {/* Field 2: % of Export Business */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    % of Export Business <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['0%', '10% - 25%', '25% - 50%', 'Over 50%']}
                    selected={empForm.exportBusinessPct}
                    placeholder="Select % of Export Business"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, exportBusinessPct: val }))}
                  />
                </div>

                {/* Field 3: Experience in Business Type */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    Experience in Business Type <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['1 - 3 Years', '3 - 5 Years', '5 - 10 Years', 'Over 10 Years']}
                    selected={empForm.experienceInBusiness}
                    placeholder="Select Experience in Business"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, experienceInBusiness: val }))}
                  />
                </div>

                {/* Field 4: % of Business in Europe */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    % of Business in Europe <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['0%', '10% - 25%', 'Over 25%', '50% - 75%', 'Over 75%']}
                    selected={empForm.europeBusinessPct}
                    placeholder="Select % of Business in Europe"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, europeBusinessPct: val }))}
                  />
                </div>

                {/* Field 5: Shipping Terms */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    Shipping Terms <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['FOB', 'CIF', 'EXW', 'DDP', 'FCA']}
                    selected={empForm.shippingTerms}
                    placeholder="Select Shipping Terms"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, shippingTerms: val }))}
                  />
                </div>

                {/* Field 6: Years in Business */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    Years in Business <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['1 - 3 Years', '3 - 5 Years', '5 - 10 Years', 'Over 10']}
                    selected={empForm.yearsInBusiness}
                    placeholder="Select Years in Business"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, yearsInBusiness: val }))}
                  />
                </div>

                {/* Field 7: Years in European Business */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    Years in European Business <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['1 - 3 Years', '3 - 5 Years', '5 - 10 Years', 'Over 10']}
                    selected={empForm.yearsInEuropeBusiness}
                    placeholder="Select Years in European Business"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, yearsInEuropeBusiness: val }))}
                  />
                </div>

                {/* Field 8: Business Type */}
                <div className="emp-field-group">
                  <label className="emp-field-label">
                    Business Type <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={['Manufacturer', 'Trader / Distributor', 'Agent', 'Exporter']}
                    selected={empForm.businessType}
                    placeholder="Select Business Type"
                    onSelect={(val) => setEmpForm((prev) => ({ ...prev, businessType: val }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: GPS */}
      {activeTab === 'GPS' && (
        <div className="gps-tab-content">
          <div className="gps-card">
            <div className="gps-grid-layout">
              {/* Left Side: Map Search & View */}
              <div className="gps-left-map-column">
                <div className="gps-search-bar">
                  <div className="gps-search-input-wrapper">
                    <Search size={18} className="gps-search-icon" />
                    <input
                      type="text"
                      className="gps-search-input"
                      placeholder="Search places (e.g., Al-Karam Textile Mills, Karachi)..."
                      value={gpsForm.searchQuery}
                      onChange={(e) => setGpsForm((prev) => ({ ...prev, searchQuery: e.target.value }))}
                    />
                  </div>
                  <button type="button" className="gps-google-badge">Google</button>
                </div>

                <div className="gps-map-frame-wrapper">
                  <iframe
                    title="GPS Google Map"
                    width="100%"
                    height="360"
                    frameBorder="0"
                    style={{ borderRadius: '10px', border: '1px solid #cbd5e1' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      gpsForm.searchQuery
                        ? gpsForm.searchQuery
                        : `${gpsForm.latitude},${gpsForm.longitude}`
                    )}&z=15&output=embed`}
                    allowFullScreen
                  ></iframe>
                </div>

                <p className="gps-map-footer-note">
                  📍 Click on the map or search above to choose the location pin.
                </p>
              </div>

              {/* Right Side: Factory Form Fields */}
              <div className="gps-right-form-column">
                {/* Field 1: Name */}
                <div className="gps-field-group">
                  <label className="emp-field-label">
                    Name <span className="required-star">*</span>
                  </label>
                  <TextField
                    size="small"
                    value={gpsForm.factoryName}
                    onChange={(e) => setGpsForm((prev) => ({ ...prev, factoryName: e.target.value }))}
                    fullWidth
                    sx={muiTextFieldSx}
                  />
                </div>

                {/* Field 2: Address */}
                <div className="gps-field-group">
                  <label className="emp-field-label">Address</label>
                  <textarea
                    className="gps-textarea-element"
                    rows={2}
                    value={gpsForm.address}
                    onChange={(e) => setGpsForm((prev) => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                {/* Field 4 & 5: City & Branch */}
                <div className="gps-field-row-two">
                  <div className="gps-field-group">
                    <label className="emp-field-label">City</label>
                    <SingleSelectDropdown
                      options={['HONG KONG', 'SIALKOT', 'KARACHI', 'LAHORE', 'FAISALABAD', 'LEON']}
                      selected={gpsForm.city}
                      onSelect={(val) => setGpsForm((prev) => ({ ...prev, city: val }))}
                    />
                  </div>

                  <div className="gps-field-group">
                    <label className="emp-field-label">
                      Branch <span className="required-star">*</span>
                    </label>
                    <TextField
                      size="small"
                      value={gpsForm.branch}
                      onChange={(e) => setGpsForm((prev) => ({ ...prev, branch: e.target.value }))}
                      fullWidth
                      sx={muiTextFieldSx}
                    />
                  </div>
                </div>

                {/* Field 6, 7 & 8: Latitude, Longitude, Radius */}
                <div className="gps-field-row-three">
                  <div className="gps-field-group">
                    <label className="emp-field-label">Latitude</label>
                    <TextField
                      size="small"
                      value={gpsForm.latitude}
                      onChange={(e) => setGpsForm((prev) => ({ ...prev, latitude: e.target.value }))}
                      fullWidth
                      sx={{
                        ...muiTextFieldSx,
                        '& input': { color: '#166534', fontWeight: 600 },
                      }}
                    />
                  </div>

                  <div className="gps-field-group">
                    <label className="emp-field-label">Longitude</label>
                    <TextField
                      size="small"
                      value={gpsForm.longitude}
                      onChange={(e) => setGpsForm((prev) => ({ ...prev, longitude: e.target.value }))}
                      fullWidth
                      sx={{
                        ...muiTextFieldSx,
                        '& input': { color: '#166534', fontWeight: 600 },
                      }}
                    />
                  </div>

                  <div className="gps-field-group">
                    <label className="emp-field-label">Radius (meters)</label>
                    <div className="gps-radius-input-group">
                      <TextField
                        size="small"
                        value={gpsForm.radius}
                        onChange={(e) => setGpsForm((prev) => ({ ...prev, radius: e.target.value }))}
                        fullWidth
                        sx={muiTextFieldSx}
                      />
                      <span className="gps-radius-badge">m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="gps-bottom-actions">
              <button type="button" className="gps-cancel-btn">
                <X size={16} />
                <span>Cancel</span>
              </button>
              <button type="button" className="gps-save-btn">
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Material Supplier */}
      {activeTab === 'Material Supplier' && (
        <div className="material-supplier-tab-content">
          <div className="material-supplier-header">
            <h2 className="material-supplier-title">Material Suppliers</h2>
            <p className="material-supplier-subtitle">
              Verified raw material vendors and supply partners linked to this factory.
            </p>
          </div>

          <div className="material-supplier-cards-list">
            {materialSuppliersList.map((sup, idx) => {
              const isExpanded = !!expandedSuppliers[idx];
              return (
                <div key={idx} className={`mat-sup-card ${isExpanded ? 'expanded' : ''}`}>
                  {/* Card Header Top Row: Title + Verified Badge */}
                  <div className="mat-sup-card-top">
                    <div className="mat-sup-title-group">
                      <div className="mat-sup-icon-badge">
                        <Building2 size={20} color="#09090b" />
                      </div>
                      <h3 className="mat-sup-name">{sup.name}</h3>
                    </div>

                    <div className="mat-sup-verified-badge">
                      <CheckCircle size={15} color="#16a34a" />
                      <span>Verified by AI</span>
                    </div>
                  </div>

                  {/* Always Visible Core Info Grid */}
                  <div className="mat-sup-info-grid">
                    <div className="mat-sup-info-item">
                      <MapPin size={16} className="mat-sup-item-icon" />
                      <div>
                        <span className="mat-sup-label">Address</span>
                        <p className="mat-sup-val">{sup.address}</p>
                      </div>
                    </div>

                    <div className="mat-sup-info-item">
                      <Building2 size={16} className="mat-sup-item-icon" />
                      <div>
                        <span className="mat-sup-label">City</span>
                        <p className="mat-sup-val">{sup.city}</p>
                      </div>
                    </div>

                    <div className="mat-sup-info-item">
                      <Phone size={16} className="mat-sup-item-icon" />
                      <div>
                        <span className="mat-sup-label">Contact Person & Phone</span>
                        <p className="mat-sup-val">{sup.contactPerson} ({sup.phone})</p>
                      </div>
                    </div>

                    <div className="mat-sup-info-item">
                      <Mail size={16} className="mat-sup-item-icon" />
                      <div>
                        <span className="mat-sup-label">Email</span>
                        <p className="mat-sup-val">
                          <a href={`mailto:${sup.email}`} className="mat-sup-link">{sup.email}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expand / Collapse Section */}
                  {isExpanded && (
                    <div className="mat-sup-expanded-content">
                      <div className="mat-sup-divider"></div>
                      <h4 className="mat-sup-expanded-heading">Supplier Specifications & Operations</h4>

                      <div className="mat-sup-spec-grid">
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Material Type</span>
                          <span className="mat-sup-spec-val">{sup.details.materialType}</span>
                        </div>
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Supply Capacity</span>
                          <span className="mat-sup-spec-val">{sup.details.capacity}</span>
                        </div>
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Minimum Order (MOQ)</span>
                          <span className="mat-sup-spec-val">{sup.details.moq}</span>
                        </div>
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Lead Time</span>
                          <span className="mat-sup-spec-val">{sup.details.leadTime}</span>
                        </div>
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Quality Certification</span>
                          <span className="mat-sup-spec-val highlight-green">{sup.details.qualityCert}</span>
                        </div>
                        <div className="mat-sup-spec-box">
                          <span className="mat-sup-spec-label">Payment Terms</span>
                          <span className="mat-sup-spec-val">{sup.details.paymentTerms}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Footer: GPS & Expand Buttons */}
                  <div className="mat-sup-card-footer">
                    <button
                      type="button"
                      className="mat-sup-gps-btn"
                    >
                      <MapPin size={15} />
                      <span>GPS</span>
                    </button>

                    <button
                      type="button"
                      className="mat-sup-expand-btn"
                      onClick={() => toggleExpandSupplier(idx)}
                    >
                      <span>{isExpanded ? 'Collapse Details' : 'Expand Details'}</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab Content: Certificates and Patents */}
      {activeTab === 'Certificates and Patents' && (
        <div className="cert-tab-content">
          <p className="cert-subtext">
            Please upload all the certificates and patents the company has obtained:
          </p>

          <div className="cert-top-layout">
            {/* Left Form Side */}
            <div className="cert-form-side">
              <div className="cert-form-row">
                <div className="cert-field-group">
                  <label className="emp-field-label">
                    Document <span className="required-star">*</span>
                  </label>
                  <SingleSelectDropdown
                    options={[
                      'ISO 14001',
                      'ISO 45001 (formerly OHSAS 18001)',
                      'SA8000 (Social Accountability 8000)',
                      'WRAP',
                      'BSCI (Business Social Compliance Initiative)',
                      'ETI (Ethical Trading Initiative)',
                      'Sedex (Supplier Ethical Data Exchange)',
                      'ISO 9001:2015 Quality Management',
                      'Leather Working Group - Gold Certified',
                      'OEKO-TEX Standard 100',
                      'Global Organic Textile Standard (GOTS)'
                    ]}
                    selected={certForm.document}
                    placeholder="Select Document"
                    onSelect={(val) => setCertForm((prev) => ({ ...prev, document: val }))}
                  />
                </div>

                <div className="cert-field-group">
                  <label className="emp-field-label">Description (if others)</label>
                  <input
                    type="text"
                    className="cert-input-element"
                    placeholder="Certificate Description"
                    value={certForm.description}
                    onChange={(e) => setCertForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="cert-form-row">
                  <div className="cert-field-group">
                    <label className="emp-field-label">
                      Validity From <span className="required-star">*</span>
                    </label>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={certForm.validityFrom ? dayjs(certForm.validityFrom, 'DD/MM/YYYY') : null}
                      onChange={(newValue) => {
                        setCertForm((prev) => ({
                          ...prev,
                          validityFrom: newValue && newValue.isValid() ? newValue.format('DD/MM/YYYY') : '',
                        }));
                      }}
                      slotProps={{
                        popper: {
                          sx: {
                            '& .MuiPickersDay-root.Mui-selected': {
                              backgroundColor: '#09090b !important',
                              color: '#ffffff !important',
                            },
                          },
                        },
                        textField: {
                          placeholder: 'DD/MM/YYYY',
                          fullWidth: true,
                          size: 'small',
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#ffffff',
                              fontSize: '14px',
                              '& fieldset': {
                                borderColor: '#e2e8f0',
                              },
                              '&:hover fieldset': {
                                borderColor: '#cbd5e1',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#09090b',
                                borderWidth: '1px',
                              },
                              '& input': {
                                padding: '12px 16px',
                              },
                            },
                            '& .MuiSvgIcon-root': {
                              color: '#64748b',
                            },
                          },
                        },
                      }}
                    />
                  </div>

                  <div className="cert-field-group">
                    <label className="emp-field-label">
                      Validity To <span className="required-star">*</span>
                    </label>
                    <DatePicker
                      format="DD/MM/YYYY"
                      value={certForm.validityTo ? dayjs(certForm.validityTo, 'DD/MM/YYYY') : null}
                      onChange={(newValue) => {
                        setCertForm((prev) => ({
                          ...prev,
                          validityTo: newValue && newValue.isValid() ? newValue.format('DD/MM/YYYY') : '',
                        }));
                      }}
                      slotProps={{
                        popper: {
                          sx: {
                            '& .MuiPickersDay-root.Mui-selected': {
                              backgroundColor: '#09090b !important',
                              color: '#ffffff !important',
                            },
                          },
                        },
                        textField: {
                          placeholder: 'DD/MM/YYYY',
                          fullWidth: true,
                          size: 'small',
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                              backgroundColor: '#ffffff',
                              fontSize: '14px',
                              '& fieldset': {
                                borderColor: '#e2e8f0',
                              },
                              '&:hover fieldset': {
                                borderColor: '#cbd5e1',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#09090b',
                                borderWidth: '1px',
                              },
                              '& input': {
                                padding: '12px 16px',
                              },
                            },
                            '& .MuiSvgIcon-root': {
                              color: '#64748b',
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </LocalizationProvider>
            </div>

            {/* Right Upload Card Side */}
            <div className="cert-upload-side">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCertForm((prev) => ({ ...prev, file: e.target.files[0] }));
                  }
                }}
              />
              <div
                className="cert-dropzone-box"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <div className="cert-illustration-circle">
                  <FolderPlus size={40} color="#09090b" />
                </div>
                <h4 className="cert-dropzone-title">
                  {certForm.file ? certForm.file.name : 'Drop or Select file'}
                </h4>
                <p className="cert-dropzone-subtext">
                  Drop files here or click <span className="cert-browse-link">browse</span> thorough your machine
                </p>
              </div>
            </div>
          </div>

          {/* Add Button */}
          <div className="cert-add-btn-wrapper">
            <button className="cert-add-button" onClick={handleCertAdd}>
              Add
            </button>
          </div>

          {/* Table Footer Bar */}
          <div className="cert-table-container">
            <div className="cert-table-header-bar">
              <div className="cert-col">Certificate</div>
              <div className="cert-col">Description</div>
              <div className="cert-col">Validity from</div>
              <div className="cert-col">To</div>
              <div className="cert-col">File</div>
            </div>

            <div className="cert-table-body-list">
              {certificatesList.length === 0 ? (
                <div className="cert-table-empty-row">No certificates added yet.</div>
              ) : (
                certificatesList.map((item) => (
                  <div className="cert-table-row-item" key={item.id}>
                    <div className="cert-col font-bold">{item.certificate}</div>
                    <div className="cert-col">{item.description}</div>
                    <div className="cert-col">{item.validityFrom}</div>
                    <div className="cert-col">{item.validityTo}</div>
                    <div className="cert-col cert-file-link">{item.fileName}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content for Catalog */}
      {activeTab !== 'Overview' && activeTab !== 'Contact' && activeTab !== 'Team' && activeTab !== 'Setup Details' && activeTab !== 'Certificates and Patents' && (
        <div className="tab-placeholder-content">
          <h3>{activeTab} Section</h3>
          <p>Detailed {activeTab.toLowerCase()} information for {name} will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
