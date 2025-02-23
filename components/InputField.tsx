import math from 'typesdk/math';
import { Box } from '@mui/material';
import React, { InputHTMLAttributes, forwardRef, memo, useId } from 'react';

import palette from '@/styles/theme/palette';
import Typography from './modular/typography';
import Icon, { type IconProps } from './Icon';
import Input, { type InputProps } from './Input';
import { addOpacityToHexColor } from '@/utils/react';


type Palette = {
  bg?: string;
  A100: string;
  main: string;
};

export type InputFieldProps = {
  onChange?: ((__event: React.ChangeEvent<HTMLInputElement>) => void);
  onKeyUp?: ((__event: React.KeyboardEvent<HTMLInputElement>) => void);
  onKeyDown?: ((__event: React.KeyboardEvent<HTMLInputElement>) => void);
  onClick?: ((__event: React.MouseEvent<HTMLInputElement>) => void);
  type?: InputProps['type'];
  spellCheck?: 'true' | 'false';
  autoComplete?: 'off' | Omit<string, 'off'>;
  translate?: 'yes' | 'no';
  id?: string;
  className?: string;
  icon?: IconProps['icon'];
  iconProvider?: IconProps['provider'];
  color?: 'red' | 'green' | 'yellow' | 'blue' | Palette;
  label?: string;
  height?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  fontWeight?: number;
  autoFocus?: boolean;
  value?: string | number;
  labelElevationOnFocus?: string | number;
  helpText?: string;
  pattern?: string;
  attr?: InputHTMLAttributes<HTMLInputElement> & Record<string, string>;
}

// eslint-disable-next-line react/display-name
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((props, ref) => {
  const id = props.id ?? useId();

  const p = props.color ? 
    typeof props.color === 'object' ?
      props.color : 
      ({
        red: {
          main: palette.theme.red,
          A100: addOpacityToHexColor(palette.theme.red, 0.1),
          bg: 'var(--box-bg)',
        },
        green: {
          main: palette.theme.green,
          A100: addOpacityToHexColor(palette.theme.green, 0.1),
          bg: 'var(--box-bg)',
        },
        yellow: {
          main: palette.theme.yellow,
          A100: addOpacityToHexColor(palette.theme.yellow, 0.1),
          bg: 'var(--box-bg)',
        },
        blue: {
          main: palette.theme.blue,
          A100: addOpacityToHexColor(palette.theme.blue, 0.1),
          bg: 'var(--box-bg)',
        },
      }[props.color]) : {
      main: palette.theme.default,
      A100: addOpacityToHexColor(palette.theme.default, 0.1),
      bg: 'var(--box-bg)',
    };

  return (
    <Box
      component="div"
      className="field drawer-ui-field-input-component"
      sx={{
        backgroundColor: p.bg ?? 'transparent',
        color: 'var(--text-color)',
        width: '100%',
        height: props.height ?? '38px',
        borderRadius: props.borderRadius ?? '4.2px',
        outlineColor: 'var(--theme-color)',
        outlineWidth: '2px',
        outlineOffset: '1px',
        position: 'relative',

        '& > label, & > i': {
          color: 'var(--text-secondary)',
        },

        '& > input': {
          width: '100%',
          height: '100%',
          outline: 'none',
          border: props.border ?? '1px solid var(--border-color)',
          color: 'var(--text-color)',
          padding: '0 7.8125px',
          paddingLeft: props.icon ? '38px' : '6.25px',
          fontSize: props.fontSize ?? '14px',
          fontWeight: props.fontWeight ?? 500,
          letterSpacing: '0.015em',
          transition: 'border-color .15s ease-in-out',
          borderRadius: 'inherit',
          background: 'transparent',

          '&:focus, &:valid': {
            '& ~ label': {
              transform: props.labelElevationOnFocus ? `translateY(${math.abs(parseInt(String(props.labelElevationOnFocus), 10)) * -1}px)` : 'translateY(-29px)',
              fontSize: props.fontSize ? 
                `${Number(props.fontSize.split(/\D/)[0]) - 2}px` :
                '14px',
            },
          },

          '&:focus': {
            borderColor: p.main,

            '& ~ label, & ~ i': {
              color: p.main,
            },
          },
        },

        '& > i': {
          position: 'absolute',
          top: '50%',
          left: '5px',
          transform: 'translateY(-50%)',
          pointerEvents: 'none !important',
          transition: 'color .15s ease-in-out',
        },

        '& > label': {
          position: 'absolute',
          top: '49%',
          left: props.icon ? '31px' : '9.375px',
          transform: 'translateY(-50%)',
          padding: '0 5px',
          backgroundColor: p.bg ?? 'var(--box-bg)',
          color: 'var(--text-secondary)',
          pointerEvents: 'none',
          transition: 'transform .2s ease-in-out, font-size .1s ease-in-out, color .15s ease-in-out',
          fontWeight: props.fontWeight ?? 'normal',
          fontSize: props.fontSize ?? '16px',
        },

        '& > p': {
          position: 'absolute',
          right: 0,
          bottom: '-18px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'var(--theme-red)',
          pointerEvents: 'none',
        },
      }}
    >
      <Input
        {...props.attr}
        ref={ref}
        type={props.type ?? 'text'}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        onClick={props.onClick}
        spellCheck={props.spellCheck ?? 'false'}
        autoComplete={props.autoComplete ? props.autoComplete as string : 'off'}
        className={props.className}
        autoFocus={props.autoFocus}
        value={props.value}
        pattern={props.pattern}
        translate={props.translate}
        id={id}
        required
      />
      {
        props.label ? (
          <label htmlFor={id}>
            <Typography.Text>
              {props.label}
            </Typography.Text>
          </label>
        ) : '' 
      }
      {
        props.icon ? (
          <Icon
            icon={props.icon}
            provider={props.iconProvider}
            className="field__icon drawer-ui-field-input-component__icon"
          />
        ) : ''
      }
      {
        props.helpText ? (
          <p>
            <Typography.Text>{props.helpText}</Typography.Text>
          </p>
        ) : null
      }
    </Box>
  );
});

export default memo(InputField);
