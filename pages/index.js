import React from "react";
import Articles from "../components/Articles";
// import Query from "../components/query";
import { Query } from "react-apollo";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import styled from "styled-components";
import MorePosts from "../components/Buttons/loadMore.js";
import Categories from "../components/Categories.js";
import Typist from "react-typist";
import Container from "@material-ui/core/Container";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 100px 50px 75px 50px;
// `;

const Index = styled.div`
  width: 100%;
`;

const ArticlesContainer = styled.div`
  height: 100%;
`;

const Home = () => {
  return (
    <Index>
      <Container>
        <h1>Strapi blog</h1>
        <Query query={ARTICLES_QUERY} variables={{ skip: 0 }}>
          {({ loading, data, error, fetchMore }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;

            const morePosts = () => {
              fetchMore({
                variables: { skip: data.posts.length },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    posts: [...prev.posts, ...fetchMoreResult.posts],
                  });
                },
              });
            };

            return (
              <>
                <Typist
                  cursor={{
                    blink: true,
                    element: "|",
                    hideWhenDone: true,
                    hideWhenDoneDelay: 5000,
                  }}
                >
                  Let's animate this text.
                </Typist>
                <Categories />
                <Articles articles={data.posts} />
                <MorePosts toggle={morePosts} text="Load more..." />
              </>
            );
          }}
        </Query>
      </Container>
    </Index>
  );
};

export default Home;
