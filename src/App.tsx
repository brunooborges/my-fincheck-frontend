import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Router } from './Router';
import { AuthProvider } from './app/contexts/AuthContext';
import { WakeUpGate } from './view/components/WakeUpGate';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Above the login check: it calls the API at startup, which would fail while the API sleeps. */}
      <WakeUpGate>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </WakeUpGate>
    </QueryClientProvider>
  );
}
