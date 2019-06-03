import React from 'react';

import ApiProvider from './graphql/provider';
import Layout from './layout';

function App() {
  return (
    <ApiProvider>
      <Layout />
    </ApiProvider>
  );
}

export default App;
