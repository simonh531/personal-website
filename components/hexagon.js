import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Base = styled.div`
  position: relative;
  width: ${(props) => (props.height ? props.height / Math.sqrt(3) : props.width)}px;
  height: ${(props) => (props.height ? props.height : props.width / Math.sqrt(3))}px;
  background-color: ${(props) => props.color};
`;

const Triangle = styled.div`
  position: absolute;
  border: ${(props) => props.size / 2}px solid transparent;
`;

const TriangleTop = styled(Triangle)`
  bottom: 100%;
  border-bottom: ${(props) => props.size / Math.sqrt(3) / 2}px solid ${(props) => props.color};
  border-top: 0;
`;

const TriangleLeft = styled(Triangle)`
  right: 100%;
  border-right: ${(props) => props.size / Math.sqrt(3) / 2}px solid ${(props) => props.color};
  border-left: 0;
`;

const TriangleBottom = styled(Triangle)`
  top: 100%;
  border-top: ${(props) => props.size / Math.sqrt(3) / 2}px solid ${(props) => props.color};
  border-bottom: 0;
`;

const TriangleRight = styled(Triangle)`
  left: 100%;
  border-left: ${(props) => props.size / Math.sqrt(3) / 2}px solid ${(props) => props.color};
  border-right: 0;
`;

const Hexagon = ({
  children, className, color, height, width,
}) => (
  <Base className={className} color={color} height={height} width={width}>
    {height
      ? <TriangleLeft size={height} color={color} />
      : <TriangleTop size={width} color={color} />}
    {height
      ? <TriangleRight size={height} color={color} />
      : <TriangleBottom size={width} color={color} />}
    {children}
  </Base>
);

Hexagon.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

Hexagon.defaultProps = {
  children: null,
  className: null,
  color: 'white',
  height: null,
  width: 100,
};

export default Hexagon;
