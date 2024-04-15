import React, { useState, useEffect } from 'react';
import Sidebar from '../../Components/Publiation/Sidebar/Sidebar'; // Corrected import path
import ArticleDisplay from '../../Components/Publiation/Read/Read'; // Corrected import path
import Navbar from "../../Components/Layout/Navbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Dummy authentication check (replace with your actual authentication logic)
  const isAuthenticated = () => {
    // You should replace this with actual logic to check if user is logged in
    return false; // Returning false to simulate not logged in
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      // Set a timeout to delay navigation
      const timer = setTimeout(() => {
        navigate('/login'); // Redirect to login page after 5 seconds
      }, 5000); // 5000 milliseconds equals 5 seconds

      return () => clearTimeout(timer); // Clear the timer when the component unmounts
    }
  }, []); // Empty dependency array to run only on component mount

  // Callback function for updating selected article ID
  const handleArticleSelect = (articleId) => {
    setSelectedArticleId(articleId);
  };

  return (
    <div>
      <Navbar />
      <Sidebar onArticleSelect={handleArticleSelect} />
      <ArticleDisplay
        selectedArticleId={selectedArticleId}
        onSelectArticle={handleArticleSelect}
      />
    </div>
  );
};

export default Home;