import { useRouter } from "next/router";
// import Query from "../../components/query";
import { Query } from "react-apollo";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import ARTICLE_QUERY from "../../apollo/queries/article/article";
import CodeBlock from "../../components/Code";
import emoji from "emoji-dictionary";
import styled from "styled-components";

const ArticleContainer = styled.div`
  position: absolute;
  width: 100%;
`;

function Image(props) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const Article = () => {
  const router = useRouter();

  return (
    <Query
      query={ARTICLE_QUERY}
      variables={{
        slug: router.query.slug,
        where_ne: { slug_ne: router.query.slug },
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error}`;

        const article = data.posts[0];
        const moreArticles = data.morePosts;

        const imageUrl =
          process.env.NODE_ENV !== "development"
            ? article.cover.url
            : article.cover.url;

        const emojified = (text) =>
          text.value.replace(/:\w+:/gi, (name) => emoji.getUnicode(name));

        return (
          <ArticleContainer>
            <div
              id="banner"
              className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
              data-src={imageUrl}
              data-srcset={imageUrl}
              data-uk-img
            >
              <h1>{article.title}</h1>
            </div>

            <Div className="uk-section">
              <div className="uk-container uk-container-small">
                <p>
                  Published at:{" "}
                  <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                </p>
                <ReactMarkdown
                  transformImageUri={(uri) =>
                    uri.startsWith("http" | "https")
                      ? uri
                      : `${process.env.API_URL}${uri}`
                  }
                  source={article.content}
                  renderers={{
                    code: CodeBlock,
                    text: emojified,
                    image: Image,
                  }}
                />
              </div>
            </Div>

            <div>
              <h1>More Posts</h1>
            </div>
          </ArticleContainer>
        );
      }}
    </Query>
  );
};

export default Article;

const Div = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
`;
