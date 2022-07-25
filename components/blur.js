import React, {
  useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { randomRange } from '../utils';

const Container = styled.div`
  height: 100%;
  position: relative;
`;

const Background = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const minSaturation = 30;
const maxSaturation = 50;
const minLight = 60;
const maxLight = 80;

const minCircleSaturation = 40;
const maxCircleSaturation = 60;
const minCircleLight = 50;
const maxCircleLight = 70;

const minCircleRadius = 10;
const maxCircleRadius = 50;

const Blur = ({
  children, className, as,
}) => {
  const canvas = useRef(null);
  const requestFrameId = useRef(null);

  useEffect(() => {
    const updateDim = () => {
      if (requestFrameId.current) {
        cancelAnimationFrame(requestFrameId.current);
      }
      if (canvas.current && canvas.current.getContext) {
        const { offsetHeight, offsetWidth } = canvas.current;
        canvas.current.height = offsetHeight;
        canvas.current.width = offsetWidth;
        const ctx = canvas.current.getContext('2d');
        const hue = Math.random() * 360;

        ctx.filter = 'blur(2px)';
        ctx.rect(-100, -100, offsetWidth + 200, offsetHeight + 200);
        ctx.fillStyle = `hsl(${hue},${
          minSaturation + Math.random() * (maxSaturation - minSaturation)
        }%,${
          minLight + Math.random() * (maxLight - minLight)
        }%)`;
        ctx.fill();

        const rows = Math.floor(offsetHeight / maxCircleRadius);
        const columns = Math.floor(offsetWidth / maxCircleRadius);
        const rowHeight = offsetHeight / rows;
        const columnWidth = offsetWidth / columns;
        for (let i = 0; i < rows; i += 1) {
          for (let j = 0; j < columns; j += 1) {
            ctx.beginPath();
            ctx.arc(
              Math.random() * columnWidth + columnWidth * j,
              Math.random() * rowHeight + rowHeight * i,
              randomRange(minCircleRadius, maxCircleRadius),
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = `hsla(${
              (Math.random() * 120 + hue + 300) % 360
            },${
              randomRange(minCircleSaturation, maxCircleSaturation)
            }%,${
              randomRange(minCircleLight, maxCircleLight)
            }%, 0.8)`;
            ctx.fill();
          }
        }
      }
    };

    updateDim();
    window.addEventListener('resize', updateDim);

    return () => {
      window.removeEventListener('resize', updateDim);
    };
  }, []);

  return (
    <Container className={className} as={as}>
      <Background ref={canvas} />
      {children}
    </Container>
  );
};

Blur.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  as: PropTypes.string,
};

Blur.defaultProps = {
  children: null,
  className: null,
  as: null,
};

export default Blur;
