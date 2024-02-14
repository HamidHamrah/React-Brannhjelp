import React, { useState } from 'react';


const SidebarItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sidebar-item">
      <div className="sidebar-title" onClick={toggle}>
        {title}
        <span className="sidebar-icon">{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && <div className="sidebar-content">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="search-container">
        <input type="text" placeholder="Søk" className="search-input" />
      </div>
      <SidebarItem title="List item">
        <SidebarItem title="Undertema level 1">
          <SidebarItem title="Undertema level 2" />
        </SidebarItem>
      </SidebarItem>
      {/* Repeat for other items */}
    </aside>
  );
};

export default Sidebar;
