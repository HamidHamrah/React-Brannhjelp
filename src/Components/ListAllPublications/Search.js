import React, { useState, useEffect } from 'react';

// Mock data for articles
const articles = [
  { id: 1, title: 'Article 1', content: 'Content of Article 1.' },
  { id: 2, title: 'Article 2', content: 'Content of Article 2.' },
  // ...add more articles as needed
];

const ArticleContent = ({ title, content }) => {
  if (!title && !content) return <div className="article-content-empty">Select an article to read.</div>;

  return (
    <div className="article-content">
      <h2 className="article-title">{title}</h2>
      <p className="article-body">{content}</p>
    </div>
  );
};

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const filteredArticles = articles.filter(article =>
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find the selected article
  const selectedArticle = articles.find(article => article.id === selectedArticleId);

  return (
    <div className="layout-container">
      <div className="search-and-list">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-title" onClick={() => setSelectedArticleId(article.id)}>
            {article.title}
            {isMobile && selectedArticleId === article.id && (
              // Render ArticleContent for mobile view inline
              <ArticleContent title={article.title} content={article.content} />
            )}
          </div>
        ))}
      </div>
      {!isMobile && selectedArticle && (
        // Render ArticleContent for desktop view
        <ArticleContent title={selectedArticle.title} content={selectedArticle.content} />
      )}
    </div>
  );
};

export default Sidebar;
