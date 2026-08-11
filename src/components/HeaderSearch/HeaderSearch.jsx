import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './HeaderSearch.css';

export default function HeaderSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Everything');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    'Everything',
    'Materials',
    'Collections',
    'Projects',
    'Suppliers'
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ query, category });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="header-search-bar-wrapper">
      <form className="header-search-container" onSubmit={handleSearchSubmit}>
        {/* Search Input Box */}
        <div className="search-input-field">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search for everything"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Custom Category Dropdown */}
        <div className="search-category-custom-wrapper" ref={dropdownRef}>
          <div 
            className={`search-category-selected ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="selected-text">{category}</span>
            <ChevronDown className="select-chevron" size={16} />
          </div>
          
          {isDropdownOpen && (
            <div className="custom-dropdown-menu">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`custom-dropdown-item ${category === cat ? 'active' : ''}`}
                  onClick={() => {
                    setCategory(cat);
                    setIsDropdownOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Black & Yellow Search CTA Button */}
        <button type="submit" className="weev-search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
