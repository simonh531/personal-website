import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import DataContext from './dataContext';

const Box = styled.div`
  background-color: #333333;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px 2px rgba(0,0,0,0.5);
  position: fixed;
  top: 10vh;
  left: 0;
  right: 0;
  bottom: 10vh;
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  opacity: ${(props) => (props.show ? '1' : '0')};
  transition: opacity 0.3s;
`;

const Close = styled.span`
  position: absolute;
  top: 0;
  right: 10vw;
  color: white;
  cursor: pointer;
`;

const SectionContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: ${(props) => props.position.top};
  left: ${(props) => props.position.left}px;
  width: ${(props) => props.position.width};
  height: ${(props) => props.position.height};
  transition: top 0.3s, left 0.3s, width 0.3s, height 0.3s;
`;

const Image = styled(Img)`
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  width: 100%;
  height: 100%;
`;

const FrameContainer = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  margin: 2em 0 1em;
`;

const TextContainer = styled.div`
  max-height: 20vh;
  flex-shrink: 0;
  color: white;
  font-family: 'Montserrat', sans-serif;
  padding: 0 10vw;
  white-space: pre-line;
  margin: 1em 0;
  overflow-y: scroll;
`;

const ToggleDescription = styled.span`
  color: deepskyblue;
  text-decoration: underline;
`;
const imgStyle = { objectFit: 'contain' };

const ImageSection = ({
  name, picture, description, shortDescription, refObject,
}) => {
  const { state } = useContext(DataContext);
  const { galleryOpen, focusedImage } = state;

  const position = {
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  };
  if (refObject && !galleryOpen) {
    position.top = `calc(${refObject.current.getBoundingClientRect().top}px - 10vh - 2em)`;
    position.height = `${refObject.current.getBoundingClientRect().height}px`;
    position.width = `${refObject.current.getBoundingClientRect().width}px`;
    position.left = refObject.current.getBoundingClientRect().left;
  }

  if (picture) {
    const dangerouslySetInnerHTML = {
      __html: shortDescription.childMarkdownRemark.html,
    };
    return (
      <SectionContainer show={focusedImage === name}>
        <FrameContainer>
          <ImageContainer position={position}>
            <Image
              fluid={picture.fluid}
              show={galleryOpen && focusedImage === name}
              imgStyle={imgStyle}
            />
          </ImageContainer>
        </FrameContainer>
        <TextContainer>
          <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
          <ToggleDescription>Show more</ToggleDescription>
        </TextContainer>
      </SectionContainer>
    );
  }
  return null;
};

const Lightbox = () => {
  const { state, dispatch } = useContext(DataContext);
  const { galleryOpen, images } = state;

  const close = () => dispatch({ type: 'setGalleryOpen', value: false });

  const imageElements = useMemo(() => images.map(({
    name, picture, description, shortDescription, ref,
  }) => (
    <ImageSection
      key={name}
      name={name}
      picture={picture}
      description={description}
      shortDescription={shortDescription}
      refObject={ref}
    />
  )), [images]);

  return (
    <Box show={galleryOpen}>
      {imageElements}
      <Close className="material-icons" onClick={close}>
        close
      </Close>
    </Box>
  );
};

export default Lightbox;
