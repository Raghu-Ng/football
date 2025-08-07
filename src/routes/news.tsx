import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllNews from './AllNews';
import NewsArticle from './NewsArticle';

const NewsRoutes = () => (
  <Routes>
    <Route path="/news" element={<AllNews />} />
    <Route path="/news/:id" element={<NewsArticle />} />
  </Routes>
);

export default NewsRoutes;
