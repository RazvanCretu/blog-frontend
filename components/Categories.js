import React from "react";
import CATEGORIES_QUERY from "../apollo/queries/category/categories.js";
import { Query } from "react-apollo";
import styled, { withTheme } from "styled-components";
import Link from "next/link";
import Button from "@material-ui/core/Button";

const Block = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 300px;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0px;
`;

const CategoryItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 2.5px;

  button {
    background: ${(props) => props.theme.button};
  }
`;

const Categories = () => {
  return (
    <Query query={CATEGORIES_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return null;
        if (error) return `Error! ${error}`;

        return (
          <Block>
            <CategoryContainer>
              <CategoryList>
                {data.categories.map((category) => {
                  return (
                    <Link
                      href="/[category]"
                      as={`/${category.slug}`}
                      key={category.slug}
                    >
                      <CategoryItem>
                        <Button variant="contained" color="primary">
                          <a className="uk-link-reset"> #{category.slug}</a>
                        </Button>
                      </CategoryItem>
                    </Link>
                  );
                })}
              </CategoryList>
            </CategoryContainer>
            <hr></hr>
          </Block>
        );
      }}
    </Query>
  );
};

export default withTheme(Categories);
