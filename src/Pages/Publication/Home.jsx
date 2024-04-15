import React, { useState } from 'react';
import Sidebar from '../../Components/Publiation/Sidebar/Sidebar'; // Corrected import path
import ArticleDisplay from '../../Components/Publiation/Read/Read'; // Corrected import path
import Navbar from "../../Components/Layout/Navbar";

const Home = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Callback function for updating selected article ID
  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
  };

  return (
    <div>
      <Navbar />
      <Sidebar onArticleSelect={handleArticleSelect} />
      {/* Passing handleArticleSelect to ArticleDisplay */}
      <ArticleDisplay
        selectedArticleId={selectedArticleId}
        onSelectArticle={handleArticleSelect} // Passing the function to handle selection
      />
    </div>
  );
};

export default Home;
