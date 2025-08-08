import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </SnackbarProvider>
  );
}

export default App;