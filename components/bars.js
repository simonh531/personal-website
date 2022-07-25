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

const minSaturation = 20;
const maxSaturation = 40;
const minLight = 70;
const maxLight = 90;

const minBarSaturation = 20;
const maxBarSaturation = 40;
const minBarLight = 70;
const maxBarLight = 90;

const minAngle = Math.PI / 16;
const maxAngle = 3 * (Math.PI / 8);

const minWidth = 50;

const Bars = ({
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
        const maxWidth = Math.min(offsetWidth / 5, 200);
        const ctx = canvas.current.getContext('2d');

        const hue = Math.random() * 360;
        const angle = randomRange(minAngle, maxAngle);

        ctx.rect(-100, -100, offsetWidth + 200, offsetHeight + 200);
        ctx.fillStyle = `hsl(${hue},${
          minSaturation + Math.random() * (maxSaturation - minSaturation)
        }%,${
          minLight + Math.random() * (maxLight - minLight)
        }%)`;
        ctx.fill();

        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        for (let i = 0; i < (offsetWidth + Math.tan(angle) * offsetHeight) / maxWidth; i += 1) {
          const width = randomRange(minWidth, maxWidth) / Math.sin(angle);
          const origin = Math.random() * (offsetWidth + Math.tan(angle) * offsetHeight);
          ctx.beginPath();
          ctx.shadowBlur = Math.random() * 10;
          ctx.fillStyle = `hsl(
          ${Math.random() * 360},
          ${randomRange(minBarSaturation, maxBarSaturation)}%,
          ${randomRange(minBarLight, maxBarLight)}%
          )`;
          ctx.moveTo(origin - Math.tan(angle) * offsetHeight, 0);
          ctx.lineTo(origin + width - Math.tan(angle) * offsetHeight, 0);
          ctx.lineTo(origin + width, offsetHeight);
          ctx.lineTo(origin, offsetHeight);
          ctx.fill();

          const width2 = randomRange(minWidth, maxWidth) / Math.sin(angle + Math.PI / 2);
          const origin2 = Math.random()
            * (offsetWidth + Math.tan(angle + Math.PI / 2) * offsetHeight);
          ctx.beginPath();
          ctx.shadowBlur = randomRange(2, 10);
          ctx.fillStyle = `hsl(
          ${Math.random() * 360},
          ${randomRange(minBarSaturation, maxBarSaturation)}%,
          ${randomRange(minBarLight, maxBarLight)}%
          )`;
          ctx.moveTo(origin2, 0);
          ctx.lineTo(origin2 + width2, 0);
          ctx.lineTo(origin2 + width2 + Math.tan(angle + Math.PI / 2) * offsetHeight, offsetHeight);
          ctx.lineTo(origin2 + Math.tan(angle + Math.PI / 2) * offsetHeight, offsetHeight);
          ctx.fill();
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

Bars.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  as: PropTypes.string,
};

Bars.defaultProps = {
  children: null,
  className: null,
  as: null,
};

export default Bars;
