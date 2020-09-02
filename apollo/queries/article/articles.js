import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
query Posts($skip: Int) {
  posts(sort: "published_at:desc", limit: 5, start: $skip) {
    title
    content
    slug
    cover {
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
