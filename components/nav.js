import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Query } from "react-apollo";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";
import Toggle from "./Buttons/modeButton";
import styled from "styled-components";

const NavContainer = styled.div`
  background: ${(props) => props.theme.navBar.bgPrimary};
  position: sticky;
  top: 0;
  z-index: 100;

  & nav li a {
    color: ${(props) => props.theme.text};
  }
`;

const Nav = ({ toggleTheme, theme }) => {
  const router = useRouter();
  return (
    <Query query={CATEGORIES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! ${error}`;

        return (
          <NavContainer>
            <nav className="uk-navbar-container" data-uk-navbar>
              <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                  <li>
                    <Link href="/">
                      <a>Strapi Blog</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <Toggle toggleTheme={toggleTheme} theme={theme} />
              <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                  {data.categories.map((category, i) => {
                    // handler for ssr routes
                    // const handleClick = (e) => {
                    //   e.preventDefault();
                    //   router.push(
                    //     `/category?slug=${category.slug}`,
                    //     `/${category.slug}`
                    //   );
                    // };

                    return (
                      <li
                        key={category.slug}
                        className={
                          router.asPath === `/${category.slug}` ? "active" : ""
                        }
                      >
                        <Link
                          href="/[category]"
                          // href={{
                          //   pathname: "/category",
                          //   query: { slug: category.slug },
                          // }}
                          as={`/${category.slug}`}
                        >
                          <a className="uk-link-reset">{category.slug}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </NavContainer>
        );
      }}
    </Query>
  );
};

export default Nav;
