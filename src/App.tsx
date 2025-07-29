import { ThemeProvider } from '@/features/theme-toggle/context/theme-provider';
import { MainLayout } from '@/layouts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
