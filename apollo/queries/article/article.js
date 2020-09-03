import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
  query Posts($slug: String!) {
    posts(where: { slug: $slug }) {
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
    morePosts: posts(
      sort: "published_at:desc"
      limit: 2
      where: { slug_ne: $slug }
    ) {
      title
      slug
      published_at
      category {
        name
        slug
      }
      cover {
        url
      }
    }
  }
`;

export default ARTICLE_QUERY;
