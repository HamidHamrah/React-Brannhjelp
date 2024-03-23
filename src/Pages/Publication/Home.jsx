import React, { useState } from 'react';
import Sidebar from '../../Components/Publiation/Search/Sidebar'; // Adjust the import path as necessary
import ArticleDisplay from '../../Components/Publiation//Read/Read'; // Adjust the import path as necessary
import Navbar from "../../Components/Layout/Navbar";

const ArticlesPage = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [userId, setUserId] = useState(null); // Assuming you have a way to set this, e.g., from user authentication

  return (
    <div>
      <Navbar />
      <Sidebar onSelectArticle={setSelectedArticleId} />
      {selectedArticleId && <ArticleDisplay articleId={selectedArticleId} userId={userId} />}
    </div>
  );
};

export default ArticlesPage;
