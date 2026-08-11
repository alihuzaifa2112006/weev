import React from 'react';
import { Eye, Trash2, X, ChevronDown } from 'lucide-react';
import './AccountContent.css';

export default function AccountContent() {
  const subNav = ['My Account', 'My Company', 'My Team', 'My Suppliers', 'Orders'];

  return (
    <div className="account-page-wrapper">
      <div className="account-subnav">
        <div className="account-subnav-container">
          {subNav.map(item => (
            <div key={item} className={`subnav-item ${item === 'My Account' ? 'active' : ''}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="account-main-content">
        <div className="account-card">
          <h2>My Account</h2>
          
          <div className="profile-avatar-section">
            <div className="avatar-circle">
              <img src="/icon.png" alt="Profile" />
              <button className="delete-avatar-btn">
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          <form className="account-form">
            <div className="form-group">
              <label>Currency</label>
              <div className="custom-select-wrapper">
                <select className="form-input">
                  <option>€ EUR</option>
                  <option>$ USD</option>
                </select>
                <ChevronDown size={16} className="input-chevron" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Name</label>
                <input type="text" className="form-input" defaultValue="Tilo" />
              </div>
              <div className="form-group flex-1">
                <label>Surname</label>
                <input type="text" className="form-input" defaultValue="Jaehn" />
              </div>
            </div>

            <div className="form-group">
              <label>Role</label>
              <input type="text" className="form-input disabled" value="Global Admin" disabled />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-input disabled" value="t.jaehn@weev.one" disabled />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <input type="password" className="form-input" defaultValue="********" />
                <Eye size={16} className="input-icon-right" />
              </div>
            </div>

            <div className="form-group">
              <label>Enter New Password</label>
              <div className="input-with-icon">
                <input type="password" className="form-input" />
                <Eye size={16} className="input-icon-right" />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-with-icon">
                <input type="password" className="form-input" />
                <Eye size={16} className="input-icon-right" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>Country Code</label>
                <div className="custom-select-wrapper with-clear">
                  <select className="form-input">
                    <option>CH (+41)</option>
                  </select>
                  <div className="select-actions">
                    <X size={14} className="clear-icon" />
                    <ChevronDown size={16} className="input-chevron" />
                  </div>
                </div>
              </div>
              <div className="form-group flex-1">
                <label>Phone</label>
                <input type="text" className="form-input" defaultValue="5103328502" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>City</label>
                <input type="text" className="form-input" defaultValue="Zürich" />
              </div>
              <div className="form-group flex-1">
                <label>State</label>
                <input type="text" className="form-input" defaultValue="Swiss" />
              </div>
            </div>

            <div className="form-group">
              <label>Country</label>
              <div className="custom-select-wrapper">
                <select className="form-input">
                  <option>Switzerland</option>
                </select>
                <ChevronDown size={16} className="input-chevron" />
              </div>
            </div>

            <div className="form-group">
              <label>Language</label>
              <div className="custom-select-wrapper">
                <select className="form-input">
                  <option>English</option>
                </select>
                <ChevronDown size={16} className="input-chevron" />
              </div>
            </div>

            <div className="form-actions">
              <div className="left-actions">
                <button type="submit" className="save-btn">Save changes</button>
                <button type="button" className="cancel-btn">Cancel</button>
              </div>
              <button type="button" className="delete-acc-btn">Delete account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
