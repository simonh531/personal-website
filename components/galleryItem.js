import React, {
  useRef, useEffect, useState, useContext,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

import DataContext from './dataContext';

const Item = styled.div`
  margin: 10px 0;
  cursor: pointer;
`;

const Image = styled(Img)`
  display: block;
  width: 25vw;
  min-width: 180px;
  max-height: 400px;
  margin: 5px 0;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
`;

const Name = styled.div`
  font-family: 'Montserrat', sans-serif;
  text-align: center;
`;

const GalleryItem = ({
  name, picture, description, shortDescription,
}) => {
  const origin = useRef(null);
  const { dispatch } = useContext(DataContext);

  const onMouseOver = () => {
    dispatch({ type: 'setFocusedImage', value: name });
  };

  const onClick = () => {
    dispatch({ type: 'setGalleryOpen', value: true });
    dispatch({ type: 'setFocusedImage', value: name });
  };

  useEffect(() => {
    if (origin && origin.current) {
      dispatch({
        type: 'addImage',
        value: {
          name,
          picture,
          description,
          shortDescription,
          ref: origin.current.imageRef,
        },
      });
    }
  }, [origin]);

  return (
    <Item onClick={onClick} onMouseOver={onMouseOver}>
      <Image fluid={picture.fluid} ref={origin} />
      <Name>{name}</Name>
    </Item>
  );
};
GalleryItem.propTypes = {
};

GalleryItem.defaultProps = {
};

export default GalleryItem;
