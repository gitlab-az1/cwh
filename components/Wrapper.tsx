import { Box } from '@mui/material';
import React, { memo } from 'react';

import Sidebar from './Sidebar';


export type WrapperProps = {
  readonly children?: React.ReactNode;
};

const Wrapper = (props: WrapperProps) => {
  return (
    <>
      <Sidebar />
      <Box className="wrapper">
        {props.children}
      </Box>
    </>
  );
};

export default memo(Wrapper);
