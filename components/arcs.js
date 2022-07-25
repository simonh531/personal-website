import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
  position: relative;
`;

const Background = styled.svg`
  background-color: ${(props) => props.background};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const minSaturation = 5;
const maxSaturation = 30;
const minLight = 70;
const maxLight = 95;

const arcMinSaturation = 50;
const arcMaxSaturation = 70;
const arcMinLight = 50;
const arcMaxLight = 60;

const calculatePoint = (distance, width, height) => {
  if (distance < width) {
    return `${distance} 0`;
  } if (distance < width + height) {
    return `${width} ${distance - width}`;
  } if (distance < width * 2 + height) {
    return `${width - (distance - width - height)} ${height}`;
  }
  return `0 ${height - (distance - width * 2 - height)}`;
};

const calculateSide = (point, width, height) => {
  if (point < width) {
    return 0;
  } if (point < width + height) {
    return 1;
  } if (point < width * 2 + height) {
    return 2;
  }
  return 3;
};

const calculateCommands = (width, height) => {
  const perimeter = height * 2 + width * 2;
  const centerTendency = 0.5;
  const corners = [
    '0 0',
    `${width} 0`,
    `${width} ${height}`,
    `0 ${height}`,
  ];
  const startPoint = Math.random() * perimeter;
  let endPoint;
  const curvePoint = `${(0.5 + (Math.random() * -0.5) * centerTendency) * width} ${(0.5 + (Math.random() * -0.5) * centerTendency) * height}`;

  let commands = 'M ';

  const startSide = calculateSide(startPoint, width, height);
  if (startSide === 0) {
    endPoint = Math.random() * (perimeter - width) + width;
  } else if (startSide === 1) {
    endPoint = (Math.random() * (perimeter - height) + width + height) % perimeter;
  } else if (startSide === 2) {
    endPoint = (Math.random() * (perimeter - width) + 2 * width + height) % perimeter;
  } else if (startSide === 3) {
    endPoint = Math.random() * (perimeter - height);
  }

  const endSide = calculateSide(endPoint, width, height);
  const distance = (4 + endSide - startSide) % 4;
  if (distance === 1) {
    commands += `${calculatePoint(startPoint, width, height)} Q ${curvePoint} ${calculatePoint(endPoint, width, height)} L ${corners[(startSide + 1) % 4]} Z`;
  } else if (distance === 2) {
    const startToEnd = (endPoint - startPoint + perimeter) % perimeter;
    const endToStart = (startPoint - endPoint + perimeter) % perimeter;
    commands += `${calculatePoint(startPoint, width, height)} Q ${curvePoint} ${calculatePoint(endPoint, width, height)} L `;
    if (startToEnd < endToStart) {
      commands += `${corners[(startSide + 2) % 4]} ${corners[(startSide + 1) % 4]} Z`;
    } else {
      commands += `${corners[(startSide + 3) % 4]} ${corners[startSide]} Z`;
    }
  } else if (distance === 3) {
    commands += `${calculatePoint(startPoint, width, height)} Q ${curvePoint} ${calculatePoint(endPoint, width, height)} L ${corners[startSide]} Z`;
  }
  return commands;
};

const Arcs = ({ children, className, as }) => {
  const background = useRef(
    `hsl(${
      Math.random() * 360
    },${
      minSaturation + Math.random() * (maxSaturation - minSaturation)
    }%,${
      minLight + Math.random() * (maxLight - minLight)
    }%)`,
  );
  const [arcs, setArcs] = useState([]);
  const container = useRef(null);

  const updateDim = useCallback(() => {
    const newArcs = [];
    // const variance = 0.75;
    const arcNum = 5;

    for (let i = 0; i < arcNum; i += 1) {
      const hue = Math.random() * 360;
      const saturation = arcMinSaturation + Math.random() * (arcMaxSaturation - arcMinSaturation);
      const light = arcMinLight + Math.random() * (arcMaxLight - arcMinLight);

      newArcs.push((
        <path
          key={i}
          d={calculateCommands(container.current.offsetWidth, container.current.offsetHeight)}
          fill={`hsla(${hue},${saturation}%,${light}%,0.5)`}
          stroke={`hsla(${hue},${saturation + 10}%,${light}%,0.8)`}
        />
      ));

      setArcs(newArcs);
    }
  }, [container]);

  useEffect(() => {
    updateDim();
    window.addEventListener('resize', updateDim);

    return () => {
      window.removeEventListener('resize', updateDim);
    };
  }, [container]);

  return (
    <Container ref={container} className={className} as={as}>
      <Background background={background.current}>
        {arcs}
      </Background>
      {children}
    </Container>
  );
};

Arcs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  className: PropTypes.string,
  as: PropTypes.string,
};

Arcs.defaultProps = {
  children: null,
  className: null,
  as: null,
};

export default Arcs;
