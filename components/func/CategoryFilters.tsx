import { Box } from '@mui/material';
import React, { memo } from 'react';

import Icon from '../Icon';
import Dialog from '../Dialog';
import { Typography } from '../modular';
import { palette } from '@/styles/theme';
import { addOpacityToHexColorAsRGBA } from '@/utils';


export type CategoryFilterProps = {
  isOpen?: boolean;
  onClose?: () => void;
}

const CategoryFilters = (props: CategoryFilterProps) => {
  return (
    <Dialog
      open={props.isOpen ?? false}
      onOverlayClick={props.onClose}
      maxWidth="560px"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          '& > span': {
            fontSize: '1.1rem',
            fontWeight: 500,
            letterSpacing: 'calc(var(--default-letter-spacing) / 3)',
            color: 'var(--text-color)',
          },

          '& > .icon': {
            fontWeight: 300,
            cursor: 'pointer',
            padding: '.32rem',
            borderRadius: '50%',
            color: palette.theme.red,

            '&:hover': {
              backgroundColor: addOpacityToHexColorAsRGBA(palette.theme.red, 0.1),
            },
          },
        }}
      >
        <div style={{ width: '34.23px' }}></div>
        <Typography.Title>Category Filters</Typography.Title>
        <Icon
          icon="close"
          role="button"
          tabIndex={0}
          onClick={props.onClose}
        />
      </Box>
    </Dialog>
  );
};

export default memo(CategoryFilters);
