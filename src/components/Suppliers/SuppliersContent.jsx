import React, { useState, useEffect, useMemo } from 'react';
import { decryptObjectKeys } from './api/getDecryption';
import MultiSelectDropdown from './MultiSelectDropdown';
import SingleSelectDropdown from './SingleSelectDropdown';
import './SuppliersContent.css';

export default function SuppliersContent() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showMySuppliers, setShowMySuppliers] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortBy, setSortBy] = useState('Date Added');

  const typeOptions = [
    'Components, Outsoles, Insoles...',
    'Finished and semi finished Goods',
    'Hardware',
    'Leather',
    'Synthetics & Leather Alternatives',
    'Textile',
    'Threads, Yarns, Fibers',
    'Trim and Accessory',
  ];

  const certOptions = [
    'GOTS - Global Organic Textile Standard',
    'bluesign®',
    'FSC - Forest Stewardship Council',
    'PEFC - Programme for the Endorsement of Forest Certification',
    'Leather Working Group',
  ];

  const countryOptions = [
    'Pakistan', 'Slovenia', 'Tunisia', 'Ecuador', 'Lesotho',
    'Spain', 'Portugal', 'Macao',
  ];

  const hqOptions = countryOptions;

  const sortOptions = [
    'Date Added',
    'Date Last Modified',
    'Name A to Z',
    'Name Z to A',
    'Primary Material Type A to Z',
    'Primary Material Type Z to A',
    'Headquarters A to Z',
    'Headquarters Z to A',
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchSuppliers = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || 'https://svitchapi.swtcloud.net/mapi/';
        const response = await fetch(`${apiUrl}GetPreOnboardListData`);
        const data = await response.json();

        if (!isMounted) return;

        if (
          (data.ResponseCode === '100' || data.ResponseCode === '200') &&
          Array.isArray(data.ServiceRes)
        ) {
          const decryptedList = decryptObjectKeys(data.ServiceRes);
          setSuppliers(decryptedList);
        } else {
          setError(data.ResponseMessage || 'Could not load suppliers.');
        }
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        if (isMounted) setError('Could not reach the supplier service.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSuppliers();
    return () => {
      isMounted = false;
    };
  }, []);

  const activeSuppliers = useMemo(() => {
    // "Only show my suppliers" — onboarded records are the ones that responded.
    const filtered = showMySuppliers
      ? suppliers.filter(
        (s) => String(s.IsSupplierResponed).toLowerCase() === 'true' ||
          String(s.IsSupplierResponed) === '1'
      )
      : suppliers;

    const byField = (field, dir) => (a, b) =>
      dir * String(a[field] || '').localeCompare(String(b[field] || ''));

    switch (sortBy) {
      case 'Name A to Z':
        return [...filtered].sort(byField('VenderName', 1));
      case 'Name Z to A':
        return [...filtered].sort(byField('VenderName', -1));
      case 'Headquarters A to Z':
        return [...filtered].sort(byField('CountryName', 1));
      case 'Headquarters Z to A':
        return [...filtered].sort(byField('CountryName', -1));
      default:
        // Date Added / Date Last Modified / Primary Material Type:
        // the list endpoint returns no field for these yet.
        return filtered;
    }
  }, [suppliers, showMySuppliers, sortBy]);

  const displayData = activeSuppliers.slice(0, visibleCount);

  const buildLocation = (supplier) =>
    [supplier.City, supplier.CountryName].filter(Boolean).join(', ');

  const buildDescription = (supplier) => {
    const address = [supplier.Address1, supplier.Address2, buildLocation(supplier)]
      .filter(Boolean)
      .join(', ');
    return address || 'No description available for this supplier.';
  };

  return (
    <div className="suppliers-page-wrapper">
      <div className="suppliers-container">

        {/* Header Section */}
        <div className="suppliers-header">
          <h1 className="suppliers-title">My suppliers</h1>
          <div className="suppliers-toggle-wrapper">
            <span className="toggle-label">Only show my suppliers</span>
            <div
              className={`toggle-switch ${showMySuppliers ? 'active' : ''}`}
              onClick={() => setShowMySuppliers(!showMySuppliers)}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="suppliers-filters">
          <div className="filter-group">
            <label>Type</label>
            <MultiSelectDropdown options={typeOptions} />
          </div>
          <div className="filter-group">
            <label>Certifications</label>
            <MultiSelectDropdown options={certOptions} />
          </div>
          <div className="filter-group">
            <label>Country of production</label>
            <MultiSelectDropdown options={countryOptions} hasSearch={true} />
          </div>
          <div className="filter-group">
            <label>Headquarters</label>
            <MultiSelectDropdown options={hqOptions} hasSearch={true} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="suppliers-toolbar">
          <div className="items-count">{activeSuppliers.length} items</div>
          <div className="sort-wrapper">
            <span className="sort-label">Sort by:</span>
            <SingleSelectDropdown
              options={sortOptions}
              selected={sortBy}
              onSelect={setSortBy}
            />
          </div>
        </div>

        {/* Supplier Cards List */}
        <div className="suppliers-list">
          {loading ? (
            <div className="loading-state">Loading suppliers…</div>
          ) : error ? (
            <div className="loading-state">{error}</div>
          ) : activeSuppliers.length === 0 ? (
            <div className="loading-state">No suppliers to show.</div>
          ) : (
            <>
              {displayData.map((supplier) => (
                <div
                  className="supplier-card"
                  key={supplier.VenderLibraryID || supplier.SupplierCode}
                >
                  <div className="supplier-card-header">
                    <div className="supplier-logo-placeholder">
                      {supplier.VenderName ? supplier.VenderName.charAt(0) : 'S'}
                    </div>
                  </div>
                  <div className="supplier-card-body">
                    <div className="supplier-main-info">
                      <h2 className="supplier-name">
                        {supplier.VenderName || supplier.ShortName || 'Unknown Supplier'}
                      </h2>
                      <p className="supplier-desc">{buildDescription(supplier)}</p>
                    </div>
                    <div className="supplier-details">
                      <div className="detail-row">
                        <span className="detail-label">Supplier code:</span>
                        <span className="detail-value">{supplier.SupplierCode || '-'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Headquarters:</span>
                        <span className="detail-value">{buildLocation(supplier) || '-'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Exporter:</span>
                        <span className="detail-value">{supplier.Exporter || '-'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value">{supplier.SupplierStatus || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {visibleCount < activeSuppliers.length && (
                <div className="load-more-wrapper">
                  <button
                    className="load-more-btn"
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                  >
                    View All
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}