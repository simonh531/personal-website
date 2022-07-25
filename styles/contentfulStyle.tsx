import { BLOCKS } from '@contentful/rich-text-types';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

const style = {
  renderNode: {
    // const { data } = node;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [BLOCKS.PARAGRAPH]: (node:any, children: ReactNode) => (
      <Typography sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
        {children}
      </Typography>
    )
    ,
  },
};
export default style;
