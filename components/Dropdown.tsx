import { useRouter } from 'next/router';
import { Box, type SxProps } from '@mui/material';
import React, { ButtonHTMLAttributes, HTMLAttributes, useEffect, useId, useRef, useState, memo } from 'react';

import { cn } from '@/utils/react';
import { useClickOutside } from '@/hooks';
import Icon, { type IconProps } from './Icon';
import Button, { type ButtonProps } from './Button';


export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: string;
  minWidth?: string;
  distance?: string;
  height?: string;
  maxHeight?: string;
  buttonTitle?: string;
  buttonStyles?: SxProps;
  float?: 'left' | 'right';
  direction?: 'top' | 'bottom';
  buttonVariant?: ButtonProps['variant'];
  readonly children: React.ReactNode;
  readonly button: React.ReactNode | (() => React.ReactNode);
}

const Dropdown = ({
  id,
  float,
  button,
  height,
  distance,
  maxWidth,
  minWidth,
  children,
  direction,
  className,
  maxHeight,
  buttonTitle,
  buttonStyles,
  buttonVariant,
  ...props
}: DropdownProps) => {
  const cid = id ?? useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);


  useClickOutside(dropdownRef, () => {
    if(isOpen) {
      setIsOpen(false);
    }
  });


  useEffect(() => {
    const fn = () => {
      setIsOpen(false);
    };

    dropdownRef.current?.querySelectorAll('.dropdown-menu-content > button').forEach(item => {
      item.addEventListener('click', fn);
    });

    return () => {
      dropdownRef.current?.querySelectorAll('.dropdown-menu-content > button').forEach(item => {
        item.removeEventListener('click', fn);
      });
    };
  }, [children]);


  return (
    <Box
      {...props}
      ref={dropdownRef}
      id={cid}
      className={cn('drawer-ui-dropdown', 'drawer-ui-dropdown-component', className, { active: isOpen })}
      sx={{
        position: 'relative',

        '& > .drawer-ui-dropdown__content': {
          position: 'absolute',
          [direction === 'top' ? 'bottom' : 'top']: 'calc(100% + 12.5px)',
          [float === 'right' ? 'right' : 'left']: distance ?? '18px',
          width: 'max-content',
          maxWidth: maxWidth ?? '280px',
          minWidth: minWidth ?? '240px',
          maxHeight: maxHeight,
          height: height ?? 'auto',
          padding: '3px 0',
          backgroundColor: 'var(--box-bg)',
          gap: '1px',
          borderRadius: '4px',
          pointerEvents: 'none',
          transform: 'scale(0)',
          transition: 'transform .26s ease',
          zIndex: 300,
          border: '1px solid var(--border-color)',
          boxShadow: '0 1px 18px -1px rgba(0,0,0, .1)',

          '&.active': {
            transform: 'scale(1)',
            pointerEvents: 'auto',
          },
        },
      }}
    >
      <Button
        className="drawer-ui-dropdown__button"
        onClick={() => setIsOpen(!isOpen)}
        title={buttonTitle}
        variant={buttonVariant}
        sx={buttonStyles ?? {
          background: 'transparent',
          border: 'none',
          outline: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        {
          typeof button === 'function' ? 
            (button as () => React.ReactNode)() :
            button
        }
      </Button>
      <div className={cn('dropdown-menu-content', 'drawer-ui-dropdown__content', isOpen ? 'active' : undefined)}>
        {children}
      </div>
    </Box>
  );
};


export interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconProps['icon'] | Omit<React.ReactNode, string>;
  forceNavigation?: boolean;
  height?: string;
  label: string;
  href?: string | {
    pathname: string;
    search?: string;
    hash?: string;
  };
  action?: (() => void);
}

// eslint-disable-next-line react/display-name
export const DropdownItem = memo(({
  href,
  icon,
  label,
  action,
  height,
  forceNavigation,
  ...props
}: DropdownItemProps) => {
  const { push: navigate } = useRouter();

  return (
    <Button
      {...props}
      sx={{
        width: '100%',
        height: height ?? '40px',
        paddingLeft: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        cursor: 'pointer',
        background: 'transparent',
        border: '1px solid transparent',
        outline: 'none',
        transition: 'background-color .18s ease-in-out',

        '&:hover': {
          backgroundColor: 'var(--hover-muted-color)',
        },

        '& > img': {
          '--size': '30px',

          width: 'var(--size)',
          height: 'var(--size)',
          objectFit: 'cover',
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        },

        '& > .icon': {
          fontWeight: 300,
          fontSize: '30px',
          color: 'var(--text-color)',
        },

        '& > span': {
          display: 'inline-block',
          fontSize: '15px',
          fontWeight: 500,
          color: 'var(--text-color)',
        },
      }}
      onClick={() => {
        if(href) {
          if(forceNavigation) {
            window.location.href = (typeof href === 'string' ? href : href.pathname + href.search + href.hash);
          } else {
            navigate(href);
          }
        } else {
          action?.();
        }
      }}
    >
      {
        icon ? 
          typeof icon === 'string' ? (
            <Icon icon={icon as IconProps['icon']} />
          ) : icon as React.ReactNode :
          null
      }
      <span>{label}</span>
    </Button>
  );
});


export default memo(Dropdown);
