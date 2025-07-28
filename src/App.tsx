import { ThemeProvider } from '@/context/theme/theme-provider';
import { MainLayout } from '@/layouts/main-layout';

function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
