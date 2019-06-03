import React from 'react';

import ApiProvider from './graphql/provider';
import Welcome from './welcome';

function App() {
  return (
    <ApiProvider>
      <Welcome />
    </ApiProvider>
  );
}

export default App;
