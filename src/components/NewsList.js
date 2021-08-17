import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';

const NewListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 2rem auto 0rem auto;
  @media screen and(max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f50b92133b204c5b96ff478038391ffc`,
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <NewListBlock>대기 중...</NewListBlock>;
  }
  if (!articles) {
    return null;
  }

  return (
    <NewListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewListBlock>
  );
};

export default NewsList;
