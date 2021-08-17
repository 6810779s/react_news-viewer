import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';
import usePromise from '../lib/usePromise';

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
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=f50b92133b204c5b96ff478038391ffc`,
    );
  }, [category]);

  if (loading) {
    return <NewListBlock>대기 중...</NewListBlock>;
  }
  if (!response) {
    return null;
  }

  if (error) {
    return <NewListBlock>에러 발생</NewListBlock>;
  }

  const { articles } = response.data;
  return (
    <NewListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewListBlock>
  );
};

export default NewsList;
