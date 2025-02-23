import React, { memo } from 'react';
import { useRouter } from 'next/router';

import { cn } from '@/utils';
import Button from './Button';
import { Typography } from './modular';
import LogoImage from './svg/LogoImage';
import Icon, { IconProps } from './Icon';


type MenuItem = {
  index: number;
  path: string | {
    pathname: string;
    hash?: string;
    query?: string;
  };
  htmlTitle?: string;
  label: string;
  icon: IconProps['icon'] | Exclude<React.ReactNode, string>;
  routerMatch?: RegExp;
  matchRoutes?: string[];
  shift?: `${'icon' | 'label' | 'both'}-${'up' | 'down'}` | {
    icon?: 'up' | 'down';
    label?: 'up' | 'down';
  };
};

const Sidebar = () => {
  const { pathname, push: navigate } = useRouter();

  const sidebarMenu: MenuItem[] = [
    {
      index: 0,
      path: '/',
      label: 'Home Page',
      icon: 'home',
      shift: 'label-down',
    },
    {
      index: 1,
      path: '/category',
      label: 'Categories',
      icon: 'category',
    },
  ];

  const specificContentPages: [string | RegExp, MenuItem[]][] = [
    // [string | regular expression; buttons array list]
  ];

  const useSpecificContent = specificContentPages.find(item => {
    if(item[0] instanceof RegExp) return item[0].test(pathname);
    return item[0] === pathname;
  });

  const activeIndex = (useSpecificContent ? useSpecificContent[1] : sidebarMenu).findIndex(item => {
    const currentPath = pathname.split('?')[0];
    
    if(item.routerMatch instanceof RegExp) return item.routerMatch.test(currentPath);

    if(typeof item.path !== 'string') return item.path.pathname === currentPath || item.matchRoutes?.includes(currentPath);
    return item.path === currentPath || item.matchRoutes?.includes(currentPath);
  });

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <LogoImage />
        <Typography.Text>
          <span>cyber security</span>
          <br />
          <span>warehouse</span>
        </Typography.Text>
      </div>
      <div className="sidebar-menu">
        {
          useSpecificContent ? (
            <Button
              variant="discreet"
              className="sidebar-menu__item shift-label-up"
              onClick={() => void navigate('/')}
              title="Back to home"
            >
              <Icon icon="arrow-back" />
              <Typography.Text>Back</Typography.Text>
            </Button>
          ) : null
        }
        {
          (useSpecificContent ? useSpecificContent[1] : sidebarMenu).map((item, index) => {
            const c = {} as Record<string, boolean>;
            const isActive = activeIndex === index && item.index === activeIndex;

            if(typeof item.shift === 'object' && !!item.shift) {
              for(const prop in (item.shift as Record<string, string>)) {
                c[`shift-${prop}-${(item.shift as Record<string, string>)[prop]}`] = true;
              }
            } else if(typeof item.shift === 'string') {
              c[`shift-${item.shift}`] = true;
            }

            return (
              <Button
                key={`sidebar-menu-item-${index}`}
                title={item.htmlTitle || item.label}
                className={cn('sidebar-menu__item', c, { active: isActive })}
                onClick={(({ target }: { target: HTMLButtonElement }) => {
                  if(target.classList.contains('active') || isActive)
                    return;

                  navigate(item.path);
                }) as () => void}
              >
                {
                  typeof item.icon === 'string' ? (
                    <Icon icon={item.icon as any} />
                  ) : item.icon
                }
                <Typography.Text>
                  {item.label}
                </Typography.Text>
              </Button>
            );
          })
        }
      </div>
    </div>
  );
};

export default memo(Sidebar);
