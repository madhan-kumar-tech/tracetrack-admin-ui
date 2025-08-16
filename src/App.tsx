import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { queryClient } from './config/query-client';
import { HomePage, DetailPage } from './pages';
import { AuthenticatedLayout } from './components/layouts';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />

          {/* Protected routes - all nested under AuthenticatedLayout */}
          <Route path="/admin" element={<AuthenticatedLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="dashboard/:type" element={<DetailPage />} />
            <Route path="requests" element={<div>Requests Page</div>} />
            <Route path="clients" element={<div>Clients Page</div>} />
            {/* Add more protected routes here without individual protection */}
            {/* <Route path="users" element={<UsersPage />} /> */}
            {/* <Route path="settings" element={<SettingsPage />} /> */}
          </Route>

          {/* Redirect /dashboard to /admin/dashboard for backwards compatibility */}
          <Route
            path="/dashboard"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      {import.meta.env.DEV && (
        <ReactQueryDevtools
          data-testid="react-query-devtools"
          initialIsOpen={false}
        />
      )}
    </QueryClientProvider>
  );
}

export default App;
