import gql from "graphql-tag";

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($slug: String!) {
    categories(where: { slug: $slug }) {
      name
      posts {
        id
        title
        content
        slug
        cover {
          url
        }
        category {
          id
          name
          slug
        }
      }
    }
  }
`;

export default CATEGORY_ARTICLES_QUERY;
