import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div.attrs((props) => ({
  style: {
    transform: `rotateX(${props.deg}deg)`,
  },
}))`
  position: relative;
  transition: transform 1.4s;
  cursor: pointer;
  user-select: none;
`;

const Front = styled.div`
  backface-visibility: hidden;
`;

const Back = styled.div`  
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: rotateX(180deg);
  backface-visibility: hidden;
`;

const Card = ({
  children, back, onClick, className, rotation,
}) => {
  // use degrees instead of rotations in case we want some weird value
  const [deg, setDeg] = useState(0);

  const rotate = useCallback(() => {
    if (onClick) {
      onClick();
    }
    if (rotation === null) {
      setDeg(deg + 360);
    }
  }, [rotation, deg, onClick]);

  return (
    <CardContainer onClick={rotate} deg={rotation || deg} className={className}>
      <Front>{children}</Front>
      <Back>{back}</Back>
    </CardContainer>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  back: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  rotation: PropTypes.number,
};

Card.defaultProps = {
  children: null,
  back: null,
  onClick: null,
  className: null,
  rotation: null,
};

export default Card;
