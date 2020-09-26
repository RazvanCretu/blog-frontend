import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Image = styled.img`
  height: 200px;
  object-fit: cover;
  width: 100%;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    maxHeight: 320,
  },
  media: {
    height: 140,
  },
});

const Cardy = ({ article }) => {
  const classes = useStyles();
  const imageUrl =
    process.env.NODE_ENV !== "development"
      ? article.cover.url
      : article.cover.url;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.category.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          href="/[category]/[slug]"
          as={`/${article.category.slug}/${article.slug}`}
        >
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
    // <Link
    //   href="/[category]/[slug]"
    //   as={`/${article.category.slug}/${article.slug}`}
    // >
    //   <a className="uk-link-reset">
    //     <div className="uk-card uk-card-muted">
    //       <div className="uk-card-media-top">
    //         <Image src={imageUrl} alt={article.cover.url} height="100" />
    //       </div>
    //       <div className="uk-card-body">
    //         <p id="category" className="uk-text-uppercase">
    //           {article.category.name}
    //         </p>
    //         <p id="title" className="uk-text-large">
    //           {article.title}
    //         </p>
    //       </div>
    //     </div>
    //   </a>
    // </Link>
  );
};

export default Cardy;
