import React, {
  useState, useRef, useMemo, useContext,
} from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Helmet from 'react-helmet';

import WebNav from './webNav';
import MobileNav from './mobileNav';
import Footer from './footer';

import DataContext from './dataContext';
import Lightbox from './lightbox';

import { DISTANCE } from '../constants';

import './fonts.css';
import './style.css';

const PerspectiveContainer = styled.div`
  overflow: hidden;
  perspective: ${DISTANCE}px; 
  perspective-origin: center center;
  background-color: black;
  height: 100vh;
  overflow-y: scroll;
`;

const PageContainer = styled.div`
  position: relative;
  left: ${(props) => (props.rotated ? '200px' : '0')};
  transform: ${(props) => (props.rotated ? `rotateY(${props.angle}deg)` : 'unset')};
  transform-origin: left;
  transition: transform 0.4s, left 0.4s;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  transform-style: preserve-3d;
  background-color: white;
`;

const ChildrenContainer = styled.div`
  flex: 1 0 auto;
`;

const Layout = ({ children }) => {
// const data = useStaticQuery(graphql`
//   query SiteTitleQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `);
  const screen = useRef(null);
  const [buttonStatus, setButtonStatus] = useState(false);

  const toggleButtonStatus = () => {
    setButtonStatus(!buttonStatus);
  };

  const closeMenu = () => {
    if (buttonStatus) {
      setButtonStatus(false);
    }
  };

  const close = () => setButtonStatus(false);

  const { state } = useContext(DataContext);

  const angle = useMemo(() => {
    if (screen.current) {
      const knownAngle = Math.atan(screen.current.offsetWidth / (2 * DISTANCE));
      const knownWidth = screen.current.offsetWidth - 200;
      // using law of sines
      return 90 - (Math.asin(
        ((knownWidth * (Math.sin(Math.PI / 2 + knownAngle))) / screen.current.offsetWidth),
      ) + knownAngle) * (180 / Math.PI);
    }
    return 0;
  }, [screen.current]);

  return (
    <>
      <Helmet>
        <title>Simon</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" rel="stylesheet" />
      </Helmet>

      <PerspectiveContainer ref={screen}>
        <PageContainer rotated={buttonStatus} angle={angle} onClick={closeMenu}>
          <ChildrenContainer>
            {children}
          </ChildrenContainer>
          <Footer />
        </PageContainer>
      </PerspectiveContainer>

      <WebNav />
      <MobileNav buttonClick={toggleButtonStatus} close={close} show={buttonStatus} />
      <Lightbox show={state.galleryOpen} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
