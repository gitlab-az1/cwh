import React from 'react';

import { useRender } from '@/hooks';
import Wrapper from '@/components/Wrapper';


const App = () => {
  useRender(() => {
    document.title = 'Home Page | Cyber Security Warehouse';
  });

  return (
    <Wrapper></Wrapper>
  );
};

export default App;
