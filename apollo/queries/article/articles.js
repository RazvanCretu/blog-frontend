import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
  query Articles($skip: Int) {
    articles(sort: "published_at:desc", limit: 5, start: $skip) {
      title
      content
      slug
      image {
        url
      }
      category {
        name
        slug
      }
      published_at
    }
  }
`;

export default ARTICLES_QUERY;
