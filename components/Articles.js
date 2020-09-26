import React from "react";
import Cardy from "./Card";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 400px;
  justify-content: space-evenly;
  align-items: center;
`;

const Articles = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <Container>
      {/* <div>
          {articles.map((article, i) => {
            return (
              <StyledCard article={article} key={`article__${article.slug}`} />
            );
          })}
        </div> */}

      {articles.map((article, i) => {
        return <Cardy article={article} key={`article__${article.slug}`} />;
      })}
    </Container>
  );
};

export default Articles;
