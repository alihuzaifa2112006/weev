import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './SingleSelectDropdown.css';

export default function SingleSelectDropdown({ options, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="single-select-container" ref={dropdownRef}>
      <div 
        className={`single-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="single-select-value">{selected}</span>
        <ChevronDown size={16} className={`single-select-icon ${isOpen ? 'rotate' : ''}`} />
      </div>

      {isOpen && (
        <div className="single-select-dropdown">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`single-select-option ${selected === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
