import React, { useState } from 'react';
import Sidebar from '../../Components/Publication/Sidebar/Sidebar.tsx'; // Corrected import path
import ArticleDisplay from '../../Components/Publication/Read/Read.tsx'; // Corrected import path
import Navbar from "../../Components/Layout/Navbar.tsx";

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
