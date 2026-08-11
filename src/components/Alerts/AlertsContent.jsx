import React, { useState } from 'react';
import { MoreHorizontal, ChevronRight, ChevronDown, ShoppingBag, MessageSquare } from 'lucide-react';
import { dummyAlerts } from '../../data/dummyData';
import './AlertsContent.css';

export default function AlertsContent() {
  const [activeTab, setActiveTab] = useState('Messages');

  const sidebarTabs = [
    'All Alerts',
    'Messages',
    'Suppliers',
    'Projects Activities',
    'Projects Comments',
    'Orders',
    'Account'
  ];

  return (
    <div className="alerts-content-wrapper">
      <div className="alerts-container">
        
        {/* Header */}
        <div className="alerts-header">
          <h2>Alerts</h2>
          <div className="alerts-filter">
            <span className="filter-label">Status:</span>
            <div className="status-dropdown">
              <span>All</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="alerts-layout">
          {/* Sidebar */}
          <div className="alerts-sidebar">
            {sidebarTabs.map(tab => (
              <div 
                key={tab} 
                className={`alert-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* List Content */}
          <div className="alerts-list">
            {dummyAlerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <div className="alert-item-left">
                  {/* Unread indicator */}
                  <div className="unread-dot-wrapper">
                    {alert.unread && <div className="unread-dot"></div>}
                  </div>
                  
                  {/* Icon */}
                  <div className="alert-icon-wrapper">
                    {alert.icon === 'ShoppingBag' ? (
                      <ShoppingBag size={24} strokeWidth={2} />
                    ) : (
                      <div className="dummy-avatar-icon">
                        <img src="/icon.png" alt="icon" style={{width: 20, opacity: 0.5}} />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="alert-text-content">
                    <h4 className="alert-title">
                      {alert.type === 'order_update' ? (
                        <><span className="highlight-blue">Your</span> order request has been updated</>
                      ) : (
                        alert.title
                      )}
                    </h4>
                    <p className="alert-description">{alert.description}</p>
                  </div>
                </div>

                <div className="alert-item-right">
                  <span className="alert-time">{alert.time}</span>
                  <div className="alert-actions">
                    <button className="alert-action-btn"><MoreHorizontal size={18} /></button>
                    <button className="alert-action-btn"><ChevronRight size={18} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
