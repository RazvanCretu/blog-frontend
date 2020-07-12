import gql from "graphql-tag";

const ARTICLE_QUERY = gql`
  query Articles($slug: String!, $where_ne: JSON) {
    articles(where: { slug: $slug }) {
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
    moreArticles: articles(
      sort: "published_at:desc"
      limit: 2
      where: $where_ne
    ) {
      title
      slug
      published_at
      category {
        name
        slug
      }
      image {
        url
      }
    }
  }
`;

export default ARTICLE_QUERY;
