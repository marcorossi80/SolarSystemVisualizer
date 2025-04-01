import { Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import NotFound from './pages/not-found';
import { useEffect } from 'react';

// This is a simplified approach for GitHub Pages compatibility
// We'll use hash-based URLs which work better on GitHub Pages
function setBrowserConfigForGitHubPages() {
  useEffect(() => {
    // For GitHub Pages - ensure we're using hash routing
    if (window.location.protocol === 'https:' &&
        window.location.hostname.endsWith('github.io') &&
        !window.location.hash) {
      window.location.replace(`${window.location.href}#/`);
    }
  }, []);
}

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Setup our GitHub Pages compatibility hook
  setBrowserConfigForGitHubPages();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;