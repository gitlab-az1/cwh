import React from 'react';
import type { GetServerSidePropsContext } from 'next';

import { Wrapper } from '@/components';


export type CategoryProps = {
  readonly categoryId: string;
};

const Category = (props: CategoryProps) => {
  return (
    <Wrapper>
      {props.categoryId}
    </Wrapper>
  );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const categoryId = (context.query.categoryId || context.params?.categoryId) as string | undefined;

  if(!categoryId)
    return { notFound: true };

  return {
    props: { categoryId },
  };
}


export default Category;
