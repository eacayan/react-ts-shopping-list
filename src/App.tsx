import { ThemeProvider } from '@/features/theme-toggle/context/theme-provider';
import { MainLayout } from '@/layouts';

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
