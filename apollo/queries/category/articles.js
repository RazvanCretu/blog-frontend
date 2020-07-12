import gql from "graphql-tag";

const CATEGORY_ARTICLES_QUERY = gql`
  query Category($slug: String!) {
    categories(where: { slug: $slug }) {
      name
      articles {
        id
        title
        content
        slug
        image {
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
