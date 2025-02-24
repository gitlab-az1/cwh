import React from 'react';
import { Box } from '@mui/material';

import { useRender } from '@/hooks';
import { Typography, Wrapper } from '@/components';


const Categories = () => {
  useRender(() => {
    document.title = 'Explore Categories | Cyber Security Warehouse';
  });

  return (
    <Wrapper>
      <Box
        sx={{
          margin: '18vw auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '1rem 1.1rem',
          color: 'var(--text-secondary)',

          '& > span': {
            fontSize: '1rem',
            fontWeight: 500,
            letterSpacing: 'calc(var(--default-letter-spacing) / 2)',
          },
        }}
      >
        <Typography.Text>
          Click in some category on the left sidebar to see more.
        </Typography.Text>
      </Box>
    </Wrapper>
  );
};

export default Categories;
