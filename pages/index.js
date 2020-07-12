import React from "react";
import Articles from "../components/articles";
// import Query from "../components/query";
import { Query } from "react-apollo";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import styled from "styled-components";
import MorePosts from "../components/Buttons/loadMore.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 50px;
`;

const Index = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ArticlesContainer = styled.div`
  height: 100%;
`;

const Home = () => {
  return (
    <Index>
      <ArticlesContainer>
        <Container className="uk-container uk-container-large">
          <h1>Strapi blog</h1>
          <Query query={ARTICLES_QUERY} variables={{ skip: 0 }}>
            {({ loading, data, error, fetchMore }) => {
              if (loading) return null;
              if (error) return `Error! ${error}`;

              const morePosts = () => {
                fetchMore({
                  variables: { skip: data.articles.length },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      articles: [...prev.articles, ...fetchMoreResult.articles],
                    });
                  },
                });
              };

              return (
                <>
                  <Articles articles={data.articles} />
                  <MorePosts toggle={morePosts} text="Load more..." />
                </>
              );
            }}
          </Query>
        </Container>
      </ArticlesContainer>
    </Index>
  );
};

export default Home;
