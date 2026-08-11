import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import './MultiSelectDropdown.css';

export default function MultiSelectDropdown({ options, placeholder = "Select...", hasSearch = false, selected = [], onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const selectedItems = onChange ? selected : internalSelected;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleItem = (option) => {
    let next;
    if (selectedItems.includes(option)) {
      next = selectedItems.filter(item => item !== option);
    } else {
      next = [...selectedItems, option];
    }
    if (onChange) {
      onChange(next);
    } else {
      setInternalSelected(next);
    }
  };

  const filteredOptions = hasSearch
    ? options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const displayValue = selectedItems.length > 0
    ? (selectedItems.length === 1 ? selectedItems[0] : `${selectedItems.length} selected`)
    : placeholder;

  return (
    <div className="multi-select-container" ref={dropdownRef}>
      <div 
        className={`multi-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="multi-select-value truncate">{displayValue}</span>
        <ChevronDown size={16} className={`multi-select-icon ${isOpen ? 'rotate' : ''}`} />
      </div>

      {isOpen && (
        <div className="multi-select-dropdown">
          {hasSearch && (
            <div className="multi-select-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          )}
          <div className="multi-select-options">
            {filteredOptions.map((option, index) => (
              <div 
                key={index} 
                className="multi-select-option"
                onClick={() => toggleItem(option)}
              >
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(option)}
                  onChange={() => {}} // handled by parent div onClick
                  className="multi-select-checkbox"
                />
                <span className="multi-select-option-text">{option}</span>
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="multi-select-empty">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
