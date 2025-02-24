import React from 'react';

import { useRender } from '@/hooks';
import { Wrapper } from '@/components';


const App = () => {
  useRender(() => {
    document.title = 'Home Page | Cyber Security Warehouse';
  });

  return (
    <Wrapper>
      {/*<Markdown
        transparent
        allowTranslation
        contentEditable={false}
        initialContent={HOME_PAGE}
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '1rem 1.1rem 4rem',

          '&, & > *, & > * *': {
            userSelect: 'text !important',
          },
        }}
      />*/}
    </Wrapper>
  );
};

export default App;
