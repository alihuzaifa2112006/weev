import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { dummyRecentOrders, dummyCuttingEdgeSuppliers, dummyMyProjects, dummyMySuppliers } from '../../data/dummyData';
import { Building2, FolderKanban } from 'lucide-react';
import './DashboardContent.css';

export default function DashboardContent() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content-wrapper">
      <div className="dashboard-container">
        
        {/* Page Title */}
        <h1 className="dashboard-page-title">Tilo's Dashboard</h1>

        {/* Top 2 Columns Section */}
        <div className="dashboard-top-section">
          {/* Left Column: My Projects */}
          <div className="top-widget-card">
            <div className="top-widget-header">
              <h3>My Projects</h3>
              <Link to="/projects" className="view-all-link">View all <ChevronRight size={14} strokeWidth={2.5} /></Link>
            </div>
            <div className="top-widget-list">
              {dummyMyProjects.map((project) => (
                <div key={project.id} className="top-widget-item">
                  <div className="widget-item-left">
                    <div className="widget-icon">
                      {project.icon === 'Building' ? <Building2 size={24} strokeWidth={1.5} /> : <FolderKanban size={24} strokeWidth={1.5} />}
                    </div>
                    <div className="widget-text">
                      <div className="widget-item-title">{project.title}</div>
                      <div className="widget-item-action">
                        {project.actionText.includes('New Material Sku') ? (
                          <><strong>New Material Sku</strong> added by Chris Hillyer</>
                        ) : (
                          <><strong>New Material</strong> added by Chris Hillyer</>
                        )}
                      </div>
                      <div className="widget-item-time">{project.time}</div>
                    </div>
                  </div>
                  <button className="widget-chevron-btn"><ChevronRight size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: My Suppliers */}
          <div className="top-widget-card">
            <div className="top-widget-header">
              <h3>My Suppliers</h3>
              <Link to="/suppliers" className="view-all-link">View all <ChevronRight size={14} strokeWidth={2.5} /></Link>
            </div>
            <div className="top-widget-list">
              {dummyMySuppliers.map((supplier) => (
                <div key={supplier.id} className="top-widget-item">
                  <div className="widget-item-left">
                    <div className="widget-logo">
                      {/* Simplified Logo Box */}
                      <span className="logo-placeholder">{supplier.logo.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="widget-text">
                      <div className="widget-item-title">{supplier.name}</div>
                      <div className="widget-item-subtext">{supplier.subtext}</div>
                      <div className="widget-item-action">
                        {supplier.actionText.replace('Collection', '') && (
                          <>Collection <strong>{supplier.actionText.replace('Collection ', '')}</strong></>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="widget-chevron-btn"><ChevronRight size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Section Header */}
        <div className="recent-orders-header">
          <h2 className="recent-orders-title">Recent orders</h2>
          <Link to="/account" className="view-all-link">
            View all <ChevronRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Recent Orders Table */}
        <div className="recent-orders-table-container">
          <table className="recent-orders-table">
            <thead>
              <tr>
                <th>Order number</th>
                <th>Order date</th>
                <th>Supplier</th>
                <th>Estimated Cost</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dummyRecentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="col-order-number">{order.orderNumber}</td>
                  <td className="col-order-date">
                    {order.orderDate.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="col-supplier">
                    {order.supplier.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="col-cost">
                    {order.estimatedCost.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="col-status">
                    {order.status.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </td>
                  <td className="col-action">
                    <button className="view-order-btn">View Order</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cutting-edge suppliers section */}
        <div className="suppliers-section">
          <h3 className="suppliers-section-title">Cutting-edge suppliers you might like</h3>
          
          <div className="suppliers-list">
            {dummyCuttingEdgeSuppliers.map(supplier => (
              <div key={supplier.id} className="supplier-card">
                <div className="supplier-card-header">
                  <div className="supplier-logo-placeholder">W</div>
                </div>
                <div className="supplier-card-divider"></div>
                <div className="supplier-card-body">
                  <a href={`#${supplier.id}`} className="supplier-name-link">{supplier.name}</a>
                  
                  <div className="supplier-meta">
                    <div className="meta-row">
                      <span className="meta-label">Type:</span>
                      <span className="meta-value">{supplier.type}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Headquarters:</span>
                      <span className="meta-value">{supplier.headquarters}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Country of Production:</span>
                      <span className="meta-value">{supplier.countryOfProduction}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Capacity:</span>
                      <span className="meta-value">{supplier.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="view-all-suppliers-btn" onClick={() => navigate('/suppliers')}>View all suppliers</button>
        </div>

      </div>
    </div>
  );
}
