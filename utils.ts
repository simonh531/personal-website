import { DISTANCE } from './src/constants';

export function calcParallax(zDecimal:number) {
  return `
      transform-origin: center center;
      transform: translateZ(${zDecimal * DISTANCE}px) scale(${1 - zDecimal});
    `;
}

export function calcShadow(zDecimal:number) {
  return `
      box-shadow: 0 0 ${zDecimal * 40}px 1px rgba(0,0,0,${1 - zDecimal});
    `;
}

export function randomRange(min:number, max:number) {
  return min + Math.random() * (max - min);
}
