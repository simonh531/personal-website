import React, {
  useEffect, useMemo, useContext,
} from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Card from '../components/card';
import GalleryItem from '../components/galleryItem';

import Triangles from '../components/triangles';
import Lightbox from '../components/lightbox';

import DataContext from '../components/dataContext';

// import SEO from "../components/seo"
import { calcParallax, calcShadow } from '../utils';

const Header = styled(Triangles)`
  position: relative;
  z-index: 1;
  background-color: white;
  ${calcParallax(0.05)}
  ${calcShadow(0.05)}
`;

const Banner = styled.div`
  padding: 100px 50px 80px;
  display: flex;
  ${calcParallax(0.05)}
  
  @media (max-width: 768px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

const StyledCard = styled(Card)`
  position: relative;
  top: 40px;
  font-family: Oswald, sans-serif;
  background-color: rgba(255,255,255,0.8);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  font-size: 3em;
  padding: 4px;
  letter-spacing: 0.2ch;
  text-align: center;
  
  @media (max-width: 768px) {
    top: 20px;
  }
`;

const Gallery = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const Websites = ({ data }) => {
  const { dispatch } = useContext(DataContext);
  useEffect(() => {
    dispatch({ type: 'reset' });
  }, []);

  const galleryItems = useMemo(() => {
    if (data) {
      return data.allContentfulPortfolioItem.edges.map(({ node }) => {
        const {
          name, picture, description, shortDescription,
        } = node;

        return (
          <GalleryItem
            name={name}
            picture={picture[0]}
            description={description}
            shortDescription={shortDescription}
            key={`${name}Gallery`}
          />
        );
      });
    }
    return null;
  }, [data]);

  return (
    <>
      <Header forwardedAs="header">
        <Banner>
          <StyledCard>Web</StyledCard>
        </Banner>
      </Header>
      <Gallery>
        {galleryItems}
      </Gallery>
    </>
  );
};

export const query = graphql`
  query WebPortfolioQuery {
    allContentfulPortfolioItem(filter: {category: {eq: "Web"}}) {
      edges {
        node {
          shortDescription {
            childMarkdownRemark {
              html
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
          name
          tech
          picture {
            fluid(maxWidth: 1920) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default Websites;
