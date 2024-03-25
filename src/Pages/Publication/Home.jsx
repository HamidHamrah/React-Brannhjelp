import React, { useState } from 'react';
import Sidebar from '../../Components/Publiation/Sidebar/Sidebar'; // Adjust the import path as necessary
import ArticleDisplay from '../../Components/Publiation//Read/Read'; // Adjust the import path as necessary
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
          <ArticleDisplay selectedArticleId={selectedArticleId} />
          {/* Other components like Navbar can remain as is */}
      </div>
  );
};

export default Home;