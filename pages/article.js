import { useRouter } from "next/router";
// import Query from "../components/query";
import { Query } from "react-apollo";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import ARTICLE_QUERY from "../apollo/queries/article/article";
import StyledCode from "../components/Code";
import emoji from "emoji-dictionary";

function Image(props) {
  return <img {...props} style={{ maxWidth: "100%" }} />;
}

const Article = () => {
  const router = useRouter();

  return (
    <Query query={ARTICLE_QUERY} variables={{ slug: router.query.slug }}>
      {({ data: { article } }) => {
        const imageUrl =
          process.env.NODE_ENV !== "development"
            ? article.image.url
            : process.env.API_URL + article.image.url;

        const emojified = (text) =>
          text.value.replace(/:\w+:/gi, (name) => emoji.getUnicode(name));

        return (
          <div>
            <div
              id="banner"
              className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
              data-src={imageUrl}
              data-srcset={imageUrl}
              data-uk-img
            >
              <h1>{article.title}</h1>
            </div>

            <div className="uk-section">
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
                    code: StyledCode,
                    text: emojified,
                    image: Image,
                  }}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Article;
