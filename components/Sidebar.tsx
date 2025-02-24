import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ssrSafeWindow } from 'typesdk/ssr';
import { useDispatch, useSelector } from 'react-redux';

import { cn } from '@/utils';
import Button from './Button';
import { Typography } from './modular';
import { useMediaQuery } from '@/hooks';
import LogoImage from './svg/LogoImage';
import { palette } from '@/styles/theme';
import Icon, { type IconProps } from './Icon';
import categories from '@/resources/static/categories';
import { type AppState, setIsSidebarOpen } from '@/redux/features/appState';


type MenuItem = {
  path: string | {
    pathname: string;
    hash?: string;
    query?: string;
  };
  htmlTitle?: string;
  color?: string;
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
  const dispatch = useDispatch();

  const { isSidebarOpen } = useSelector<any, AppState>(state => state.appState);
  const { pathname, push: navigate } = useRouter();

  const isMobile = useMediaQuery('(max-width: 48.25rem)');


  const sidebarMenu: MenuItem[] = [
    {
      path: '/',
      label: 'Home Page',
      icon: 'home',
      shift: 'label-down',
      color: palette.theme.cyan,
    },
    {
      path: '/category',
      label: 'Categories',
      icon: 'category',
      color: palette.theme['yellow-dark'],
    },
    {
      path: '/tool',
      label: 'Tools',
      icon: 'build-tools',
      color: palette.theme.pink,
    },
    {
      path: '/community',
      label: 'Community',
      icon: 'forum',
      color: palette.theme.blue,
    },
  ];

  const specificContentPages: [string | RegExp, MenuItem[]][] = [
    // [string | regular expression; buttons array list]
    [
      /^\/category(.*)/,
      (categories.map(item => {
        return {
          label: item.name,
          icon: item.icon || 'category',
          color: item.color || undefined,
          path: `/category/${item.publicShortCode}`,
        } satisfies MenuItem;
      }) as MenuItem[]).sort((a, b) => a.label.localeCompare(b.label)),
    ],
  ];

  const useSpecificContent = specificContentPages.find(item => {
    if(item[0] instanceof RegExp) return item[0].test(pathname);
    return item[0] === pathname;
  });

  const activeIndex = (useSpecificContent?.[1] || sidebarMenu).findIndex(item => {
    const currentPath = ssrSafeWindow?.location.pathname.split('?')[0] || '';
    
    if(item.routerMatch instanceof RegExp) return item.routerMatch.test(currentPath);

    if(typeof item.path !== 'string') return item.path.pathname === currentPath || item.matchRoutes?.includes(currentPath);
    return item.path === currentPath || item.matchRoutes?.includes(currentPath);
  });

  useEffect(() => {
    document.documentElement.classList[isSidebarOpen ? 'add' : 'remove']('sidebar-expand');
    document.body.classList[isSidebarOpen ? 'add' : 'remove']('sidebar-expand');
  }, [isSidebarOpen]);

  useEffect(() => {
    dispatch(setIsSidebarOpen(!isMobile));
  }, [isMobile]);


  return (
    <>
      <Icon
        id="sidebar-handler"
        icon={isSidebarOpen ? 'menu-side-left' : 'menu-open'}
        role="button"
        tabIndex={0}
        title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        onClick={() => {
          dispatch(setIsSidebarOpen(!isSidebarOpen));
        }}
      />
      <div className="sidebar">
        <div className="sidebar__logo" translate="no">
          <LogoImage />
          <Typography.Text translate="no">
            <span>cyber security</span>
            <br />
            <span>warehouse</span>
          </Typography.Text>
        </div>
        <div
          className="sidebar-menu"
          style={{ boxShadow: (useSpecificContent?.[1] || sidebarMenu).length > 9 ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)' : undefined }}
        >
          {
            useSpecificContent ? (
              <Button
                variant="discreet"
                className="sidebar-menu__item"
                onClick={() => void navigate('/')}
                title="Back to home"
                sx={{ marginBottom: '1rem' }}
              >
                <Icon icon="arrow-back" />
                <Typography.Text>Back</Typography.Text>
              </Button>
            ) : null
          }
          {
            (useSpecificContent?.[1] || sidebarMenu).map((item, index) => {
              const c = {} as Record<string, boolean>;
              const isActive = activeIndex === index;
            
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
                  style={item.color ? { '--clr': item.color } as any : undefined}
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
    </>
  );
};

export default memo(Sidebar);
