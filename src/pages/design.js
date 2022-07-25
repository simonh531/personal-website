import React, { useState, useReducer, useMemo } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Card from '../components/card';
import GalleryItem from '../components/galleryItem';

import Triangles from '../components/triangles';
import Lightbox from '../components/lightbox';

// import SEO from "../components/seo"

const Header = styled(Triangles)`
  position: relative;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
`;

const Banner = styled.div`
  padding-top: 70px;
  padding-left: 50px;
  display: flex;
`;

const StyledCard = styled(Card)`
  font-family: Oswald, sans-serif;
  margin: 4vh 0;
  background-color: rgba(255,255,255,0.8);
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  font-size: 3em;
  padding: 4px;
  letter-spacing: 0.2ch;
  text-align: center;
`;

const Gallery = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.name]: {
          picture: action.picture,
          ref: action.ref,
        },
      };
    default:
      throw new Error();
  }
};

const Design = ({ data }) => {
  const [lightboxDescription, setLightboxDescription] = useState('');
  const [showLightbox, setShowLightbox] = useState(false);
  const [pictures, dispatch] = useReducer(reducer, initialState);
  const [focusedImage, setFocusedImage] = useState('');

  const close = () => setShowLightbox(false);

  const galleryItems = useMemo(() => {
    if (data) {
      return data.allContentfulPortfolioItem.edges.map(({ node }) => {
        const { name, picture, description } = node;

        const clickAction = () => {
          setShowLightbox(true);
          setFocusedImage(name);
        };

        const send = (ref) => dispatch({
          type: 'add',
          name,
          picture,
          ref,
        });

        const hover = () => setLightboxDescription(description.description);

        return (
          <GalleryItem
            picture={picture[0]}
            clickAction={clickAction}
            send={send}
            key={name}
            hover={hover}
          >
            {name}
          </GalleryItem>
        );
      });
    }
    return null;
  }, [data]);

  return (
    <>
      <Lightbox
        close={close}
        focusedImage={focusedImage}
        pictures={pictures}
        show={showLightbox}
      >
        {lightboxDescription}
      </Lightbox>
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
  query DesignPortfolioQuery {
    allContentfulPortfolioItem(filter: {category: {eq: "Design"}}) {
      edges {
        node {
          description {
            description
          }
          name
          tech
          picture {
            fluid {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default Design;
