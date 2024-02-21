import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch articles from API using Axios
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7207/api/publications'); 
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const isMobile = windowWidth < 768;
  const filteredArticles = articles.filter(article =>
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
              <div className="article-content">
                <h2 className="article-title">{article.title}</h2>
                <p className="article-body">{article.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {!isMobile && selectedArticle && (
        <div className="article-content">
          <h2 className="article-title">{selectedArticle.title}</h2>
          <p className="article-body">{selectedArticle.content}</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
