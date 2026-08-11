import React from 'react';
import { ChevronDown, Beaker, Shirt, Shield, Package, Scissors, Nut, Database, Layers } from 'lucide-react';
import { dummyPopularCollections, dummyExploreTypes } from '../../data/dummyData';
import './MaterialsContent.css';

// Using simple icons for the Explore grid to approximate the design
const typeIcons = {
  'Leather': <Shield size={24} color="#D6E300" strokeWidth={1.5} />,
  'Synthetics & Leather Alternatives': <Beaker size={24} color="#D6E300" strokeWidth={1.5} />,
  'Textiles': <Shirt size={24} color="#D6E300" strokeWidth={1.5} />,
  'Finished and semi finished Goods': <Package size={24} color="#D6E300" strokeWidth={1.5} />,
  'Trims & Accessories': <Scissors size={24} color="#D6E300" strokeWidth={1.5} />,
  'Hardware': <Nut size={24} color="#D6E300" strokeWidth={1.5} />,
  'Components, Outsoles, Insoles, Lasts': <Database size={24} color="#D6E300" strokeWidth={1.5} />,
  'Threads, Yarns, Fibers': <Layers size={24} color="#D6E300" strokeWidth={1.5} />
};

export default function MaterialsContent() {
  return (
    <div className="materials-page-wrapper">
      
      {/* Top Section: Popular Collections */}
      <section className="materials-section popular-collections-section">
        <div className="materials-container">
          <h2 className="section-title">Popular collections you might like</h2>
          
          <div className="collections-toolbar">
            <span className="collections-count">39 items</span>
            <div className="sort-by-wrapper">
              <span className="sort-label">Sort by:</span>
              <div className="sort-dropdown">
                <span>Date Added</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <div className="collections-grid">
            {dummyPopularCollections.map(collection => (
              <div key={collection.id} className="collection-card">
                <div className="collection-image-wrapper">
                  {/* Fallback to simple colored div if no image */}
                  <div className="collection-image-placeholder">
                    <span>{collection.title.substring(0,2).toUpperCase()}</span>
                  </div>
                </div>
                <div className="collection-info">
                  <h3 className="collection-title">{collection.title}</h3>
                  <p className="collection-supplier">{collection.supplier}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="read-more-btn black-btn">Read more</button>
        </div>
      </section>

      {/* Middle Section: Explore by Type */}
      <section className="materials-section explore-types-section">
        <div className="materials-container">
          <h2 className="section-title">Explore by type</h2>
          
          <div className="types-grid">
            {dummyExploreTypes.map(type => (
              <div key={type.id} className="type-card">
                <div className="type-icon-wrapper">
                  {typeIcons[type.title] || <Layers size={24} color="#D6E300" />}
                </div>
                <h3 className="type-title">{type.title}</h3>
                <p className="type-desc">{type.description}</p>
                {type.hasReadMore && (
                  <button className="type-read-more">Read More</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section: Promotional Banner */}
      <section className="materials-promo-banner">
        <div className="promo-container">
          <h2 className="promo-text">Browse every material in our library, and filter based on the criteria you care about.</h2>
          <button className="view-all-materials-btn">View all materials</button>
        </div>
      </section>

    </div>
  );
}
