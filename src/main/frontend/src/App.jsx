import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import { useState } from 'react';

const queryClient = new QueryClient();
function App() {

  const [ outletAddress, setOutletAddress ] = useState(''); // 주소 표시 비동기 임시 처리
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet context={{outletAddress, setOutletAddress}} />  {/* context = 주소 표시 비동기 임시 처리*/}
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;