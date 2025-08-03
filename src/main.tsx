import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './Components/ErrorBoundary.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
