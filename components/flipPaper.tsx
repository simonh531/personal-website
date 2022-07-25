import React, { ReactNode, useState } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const appear = keyframes`
  from {
    opacity: 0;
    bottom: 10px;
  }

  to {
    opacity: 1;
    bottom: 0;
  }
`;

export default function FlipPaper({
  delay, variant, angleOverride, clickOverride, typographySx, children,
}:{
  delay: number,
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' | 'inherit' | undefined,
  clickOverride?: () => void,
  angleOverride?: number,
  typographySx?: Record<string, string>,
  children: ReactNode
}) {
  const [angle, setAngle] = useState(0);
  return (
    <Box
      sx={{
        cursor: 'pointer',
        position: 'relative',
        width: 'fit-content',
        background: 'transparent',
      }}
      onClick={clickOverride || (() => setAngle((currentAngle) => currentAngle + 360))}
    >
      <Paper
        square
        elevation={1}
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(255,255,255,0.1)',
          width: 'fit-content',
          padding: '10px',
          backfaceVisibility: 'hidden',
          backdropFilter: 'blur(2px)',
          transform: `perspective(1000px) rotateX(${(angleOverride || angle)}deg)`,
          transition: 'transform 2s',
          animation: `${appear} 1s ${delay}s both`,
        }}
      >
        <Typography
          variant={variant}
          sx={{
            fontSize: {
              xs: '2rem',
              sm: '3rem',
              md: '4rem',
              lg: '5rem',
              xl: '6rem',
            },
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(255,255,255,0.87)',
            color: 'rgba(255,255,255,0.87)',
            letterSpacing: '2px',
            // textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
            // backgroundClip: 'text',
            ...typographySx,
          }}
        >
          {children}
        </Typography>
      </Paper>
      <Paper
        square
        sx={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backfaceVisibility: 'hidden',
          backdropFilter: 'blur(2px)',
          transform: `perspective(1000px) rotateX(${(angleOverride || angle) + 180}deg)`,
          transition: 'transform 2s',
        }}
      />
    </Box>
  );
}
