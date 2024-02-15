import React, { useState } from 'react';

const articles = [
  { id: 1, title: 'Article 1', content: 'Content of Article 1' },
  { id: 2, title: 'Article 2', content: 'Content of Article 2' },
  // Add more articles as needed
];

const SidebarItem = ({ title, children, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sidebar-item" onClick={onSelect}>
      <div className="sidebar-title" onClick={toggle}>
        {title}
        <span className="sidebar-icon">{isOpen ? '▼' : '▶'}</span>
      </div>
      {isOpen && <div className="sidebar-content">{children}</div>}
    </div>
  );
};

const ArticleContent = ({ article }) => {
  if (!article) return null;

  return (
    <div className="article-content">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
};

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Søk" 
            className="search-input" 
            value={searchTerm}
            onChange={handleSearchChange} 
          />
        </div>
        {filteredArticles.map((article) => (
          <SidebarItem 
            key={article.id} 
            title={article.title} 
            onSelect={() => setSelectedArticle(article)}
          />
        ))}
      </aside>
      <ArticleContent article={selectedArticle} />
    </div>
  );
};

export default Sidebar;
