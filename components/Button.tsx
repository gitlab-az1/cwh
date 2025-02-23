import { type SxProps, Box } from '@mui/material';
import React, { ButtonHTMLAttributes, forwardRef, memo } from 'react';

import { palette } from '@/styles/theme';
import { addOpacityToHexColorAsRGBA, getLuminanceContrastColor } from '@/utils';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'discreet' | 'with-icon';
  sx?: SxProps;
  colorStyle?: 'ghost' | 'absolute' | 'hover-opacity';
  color?: string;
  contrastColor?: string;
  hoverContrastColor?: string;
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant,
  colorStyle,
  contrastColor,
  hoverContrastColor,
  color,
  sx,
  ...props
}, ref) => {
  const styles: Record<string, SxProps> = {
    discreet: {
      width: 'max-content',
      cursor: 'pointer',
      background: 'transparent',
      border: '1px solid transparent',
      outline: 'none',
      padding: '.32rem .78rem',
      borderRadius: '4px',
      color: 'var(--text-color)',

      '&:hover': {
        backgroundColor: 'var(--hover-muted-color)',
      },
    },
    default: {},
    'with-icon': {
      width: 'max-content',
      cursor: 'pointer',
      background: colorStyle !== 'absolute' ? 'transparent' : undefined,
      backgroundColor: colorStyle === 'absolute' ?
        color || palette.theme.default :
        colorStyle === 'hover-opacity' ?
          addOpacityToHexColorAsRGBA(color || palette.theme.default, 0.1) :
          undefined,
      border: '1px solid transparent',
      outline: 'none',
      padding: '.32rem .78rem',
      transition: 'background-color .18s ease-in-out, color .13s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      gap: '.72rem',
      borderRadius: '4px',
      color: contrastColor || colorStyle === 'hover-opacity' ?
        color || palette.theme.default :
        getLuminanceContrastColor(color || palette.theme.default),

      '& > span': {
        marginRight: '5px',
        marginTop: '-1px',
        display: 'inline-block',
        fontSize: '.9rem',
        fontWeight: 500,
        letterSpacing: 'calc(var(--default-letter-spacing) / 2)',
      },

      '& > .icon': {
        fontSize: '22px',
        fontWeight: 300,
        color: 'unset',
      },

      '&:hover': {
        backgroundColor: colorStyle === 'absolute' ?
          addOpacityToHexColorAsRGBA(color || palette.theme.default, 0.1) :
          colorStyle === 'hover-opacity' ?
            color || palette.theme.default :
            'var(--hover-muted-color)',

        color: hoverContrastColor || colorStyle === 'absolute' ?
          color || palette.theme.default :
          colorStyle === 'hover-opacity' ?
            hoverContrastColor || getLuminanceContrastColor(color || palette.theme.default) :
            'var(--text-color)',
      },
    },
  };

  if(!props.type) {
    props.type = 'button';
  }

  return (
    <Box
      {...props}
      component="button"
      role={props.role ?? 'button'}
      ref={ref}
      sx={Object.assign({}, variant ? styles[variant] : styles.default, sx)}
    >
      {children}
    </Box>
  );
});

export default memo(Button);
