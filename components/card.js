import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

const Card = ({ article }) => {
  const imageUrl =
    process.env.NODE_ENV !== "development"
      ? article.cover.url
      : article.cover.url;
  return (
    <Link
      href="/[category]/[slug]"
      as={`/${article.category.slug}/${article.slug}`}
    >
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <Image src={imageUrl} alt={article.cover.url} height="100" />
          </div>
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
