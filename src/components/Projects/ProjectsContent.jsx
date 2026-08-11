import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, ChevronDown, List, Folder, MoreHorizontal, MessageCircle, Trash2, Loader2 } from 'lucide-react';
import { dummyProjectFolders, dummyTeamProjects } from '../../data/dummyData';
import './ProjectsContent.css';

export default function ProjectsContent() {
  const [activeSubTab, setActiveSubTab] = useState('My Workspace');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // 400ms simulate loading
    return () => clearTimeout(timer);
  }, [activeSubTab]);

  const currentData = activeSubTab === 'My Workspace' ? dummyProjectFolders : dummyTeamProjects;

  const toggleDropdown = (id) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <div className="projects-page-wrapper">
      
      {/* Subnav Banner */}
      <div className="projects-subnav">
        <div className="projects-subnav-container">
          <div className="projects-subnav-left">
            <div 
              className={`projects-tab ${activeSubTab === 'My Workspace' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('My Workspace')}
            >
              My Workspace
            </div>
            <div 
              className={`projects-tab ${activeSubTab === 'Team Projects' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('Team Projects')}
            >
              Team Projects
            </div>
          </div>
          <div className="projects-subnav-right">
            <button className="chat-btn">
              <MessageSquare size={18} />
            </button>
            <button className="new-btn">
              <Plus size={16} color="#D6E300" strokeWidth={3} />
              <span>New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="projects-main-container">
        
        {/* Toolbar */}
        <div className="projects-toolbar">
          <h2 className="projects-count">{currentData.length} items</h2>
          
          <div className="projects-toolbar-right">
            <div className="sort-by-wrapper">
              <span className="sort-label">Sort by:</span>
              <div className="sort-dropdown">
                <span>Date Added</span>
                <ChevronDown size={16} />
              </div>
            </div>
            <button className="view-mode-btn">
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Grid or Loader */}
        {isLoading ? (
          <div className="projects-loader-container">
            <Loader2 size={32} className="spinner-icon" color="#111111" />
          </div>
        ) : (
          <div className="projects-grid">
            {currentData.map((folder) => (
              <div key={folder.id} className={`project-card ${openDropdownId === folder.id ? 'active' : ''}`}>
                <div className="project-card-left">
                  <Folder 
                    size={24} 
                    fill={folder.color === 'purple' ? '#C2B8F9' : '#F9EDC2'} 
                    color={folder.color === 'purple' ? '#7B61FF' : '#E5C03D'} 
                    strokeWidth={1.5}
                  />
                  <span className="project-title">{folder.name}</span>
                </div>
                
                <div className="project-card-right">
                  <button 
                    className={`more-options-btn ${openDropdownId === folder.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(folder.id);
                    }}
                  >
                    <MoreHorizontal size={20} color={openDropdownId === folder.id ? '#FFFFFF' : '#111111'} />
                  </button>

                  {openDropdownId === folder.id && (
                    <div className="project-dropdown-menu">
                      <div className="project-dropdown-item">
                        <MessageCircle size={16} />
                        <span>Comment</span>
                      </div>
                      <div className="project-dropdown-divider"></div>
                      <div className="project-dropdown-item">
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
