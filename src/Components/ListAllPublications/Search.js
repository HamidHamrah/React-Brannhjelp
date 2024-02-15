import React, { useState, useEffect } from 'react';

const articles = [
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 1, title: 'Article 1', content: 'Hamid.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  { id: 2, title: 'Article 2', content: 'Content of Hello 2.' },
  

];

const ArticleContent = ({content }) => <div>{content}</div>;

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
              <ArticleContent content={article.content} />
            )}
          </div>
        ))}
      </div>
      {!isMobile && selectedArticleId && (
        <div className="article-content">
          <ArticleContent content={articles.find(article => article.id === selectedArticleId)?.title} />
          <ArticleContent content={articles.find(article => article.id === selectedArticleId)?.content} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
