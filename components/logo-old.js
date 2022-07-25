import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Hexagon from './hexagon';

const LogoContainer = styled.div`
  width: ${(props) => (props.width ? props.width : (props.height * 2) / Math.sqrt(3))}px;
  height: ${(props) => (props.height ? props.height : (props.width * 2) / Math.sqrt(3))}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Hexagon isn't inside HomeShadow so it isn't affected by blur
const HomeShadow = styled(Hexagon)`
  position: absolute;
  filter: blur(2px);
`;

const HexText = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  font-family: 'Dancing Script', cursive;
  font-size: ${(props) => props.size}px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
`;

const Logo = ({ width, height }) => (
  <LogoContainer width={width} height={height}>
    <HomeShadow width={width ? width + 2 : null} height={height ? height + 2 : null} color="rgba(0,0,0,0.5)" />
    <Hexagon width={width} height={height}>
      <HexText size={(width || height) - 8}>
        sh
      </HexText>
    </Hexagon>
  </LogoContainer>
);

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Logo.defaultProps = {
  width: 64,
  height: null,
};

export default Logo;
