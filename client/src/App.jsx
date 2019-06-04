import React from 'react';

import ApiProvider from './graphql/provider';
import { AuthProvider } from './context/auth';
import Layout from './layout';

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
