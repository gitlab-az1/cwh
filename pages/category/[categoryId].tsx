import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { GetServerSidePropsContext } from 'next';

import { delayed } from '@/utils';
import { palette } from '@/styles/theme';
import { useMediaQuery, useQueryState } from '@/hooks';
import CategoryFilters from '@/components/func/CategoryFilters';
import { Category as ICategory, findCategories } from '@/resources/static/categories';
import { Button, Container, Icon, Link, Loader, SearchBox, Typography, Wrapper } from '@/components';


type QueryStringState = {
  q: string;
};


export type CategoryProps = {
  readonly category: ICategory;
};

const Category = (props: CategoryProps) => {
  const isMobile = useMediaQuery('(max-width: 48.25rem)');
  const { query, ...queryState } = useQueryState<QueryStringState>();

  const [records, setRecords] = useState<unknown[]>([]);
  const [queryTime, setQueryTime] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);

  useEffect(() => {
    document.title = `${props.category.name} | Cyber Security Warehouse`;

    (async function() {
      setIsLoading(true);

      delayed(() => setIsLoading(false), 2000);
    })();
  }, [props.category]);

  return (
    <Wrapper>
      <CategoryFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      />
      <Container size="sx">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            '& > span': {
              fontSize: '1.18rem',
              fontWeight: 600,
              letterSpacing: 'calc(var(--default-letter-spacing) / 3)',
            },
          }}
        >
          <Typography.Text>
            {props.category.name}
          </Typography.Text>
          <Button
            onClick={() => {
              if(isLoading)
                return;

              delayed(() => setIsFiltersOpen(true), 10);
            }}
            variant="discreet"
            disabled={isLoading || records.length === 0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '.72rem',
              borderRadius: '25px',
              border: '1px solid transparent',

              '&:active': {
                borderColor: 'var(--theme-gray)',
              },

              '& > .icon': {
                fontSize: '22px',
                fontWeight: 300,
                color: 'unset',
              },

              '& > span': {
                fontSize: '.95rem',
                fontWeight: 500,
                paddingRight: '6px',
                display: 'inline-block',
              },

              '&[disabled]': {
                '&, &:active, &:hover': {
                  cursor: 'default',
                  backgroundColor: palette.theme['gray-lighter'],
                  color: 'var(--text-secondary)',
                  borderColor: 'transparent',
                  boxShadow: 'none',
                },
              },
            }}
          >
            <Icon icon="filter" />
            <Typography.Text>Fitlers</Typography.Text>
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            marginTop: '1rem',

            '& > span': {
              fontSize: '.92rem',
              fontWeight: 'normal',
              letterSpacing: 'calc(var(--default-letter-spacing) / 2)',
              color: isLoading ? 'var(--theme-orange)' : 'var(--text-secondary)',
              marginTop: isMobile ? '.38rem' : undefined,
            },
          }}
        >
          <SearchBox
            height="42px"
            fontWeight="nromal"
            width={isMobile ? '100%' : '50%'}
            disabled={isLoading || records.length < 2}
            placeholder={`Search anything under "${props.category.name.toLowerCase()}"`}
            onUpdate={value => {
              delayed(() => void queryState.set('q', value), 110);
            }}
          />
          <Typography.Text>
            { isLoading ? 'Loading results...' : `Found ${records.length} records in ${queryTime} ms.` }
          </Typography.Text>
        </Box>
        {
          isLoading ? (
            <Box
              sx={{
                width: '100%',
                marginTop: '15vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                '& > .loader .icon': {
                  fontSize: '22px',
                  fontWeight: 300,
                },
              }}
            >
              <Loader
                fill
                active={isLoading}
                color={palette.theme['gray-dark']}
              />
            </Box>
          ) : records.length === 0 ? (
            <Box
              sx={{
                margin: '22.5vh auto 0',
                maxWidth: '600px',
                width: '100%',
                padding: '.5rem .55rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '2rem',

                '& > span': {
                  width: '100%',
                  display: 'inline-block',
                  textAlign: 'center',
                },

                '& > .icon': {
                  fontSize: '5rem',
                  fontWeight: 300,
                  background: `linear-gradient(-180deg, ${palette.theme.magenta}, ${palette.theme['blue-light']})`,
                  backgroundSize: '100% 200%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'waterfall 5s linear infinite',
                },
              }}
            >
              <Icon icon="blur" className="animate-waterfall" />
              <Typography.Text>
                We don&apos;t have anything about &quot;{props.category.name}&quot; at this moment.
                <br />
                Please come back later or check out our <Link href="/community" target="_self">community forum</Link>.
              </Typography.Text>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: '4.2rem',
                maxWidth: '600px',
                width: '100%',
                padding: '.5rem .55rem',
              }}
            >
              results
            </Box>
          )
        }
      </Container>
    </Wrapper>
  );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = (context.query.categoryId || context.params?.categoryId) as string | undefined;

  if(!categoryId)
    return { notFound: true };

  const category = findCategories(categoryId);

  if(!category)
    return { notFound: true };

  return {
    props: { category },
  };
}


export default Category;
