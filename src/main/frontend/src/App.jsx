import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import { useState } from 'react';

const queryClient = new QueryClient();
function App() {

  const [ outletAddress, setOutletAddress ] = useState('');
  const [ userPoint, setUserPoint ] = useState('') 
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet context={{outletAddress, setOutletAddress, userPoint, setUserPoint}} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;