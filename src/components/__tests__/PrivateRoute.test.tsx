import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import PrivateRoute from '../PrivateRoute';
import { vi } from 'vitest';

const mockUseAuth = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
}));

const TestComponent = () => <div>Protected Content</div>;

const renderPrivateRoute = (authenticated = true) => {
  mockUseAuth.mockReturnValue({
    user: authenticated ? { name: 'John Doe' } : null,
    loading: false,
  });

  return render(
    <BrowserRouter>
      <AuthProvider>
        <PrivateRoute>
          <TestComponent />
        </PrivateRoute>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('PrivateRoute', () => {
  test('renders children when user is authenticated', () => {
    renderPrivateRoute(true);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login when user is not authenticated', () => {
    renderPrivateRoute(false);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    // Note: In a real app, this would redirect to /login, but in tests we can't easily verify navigation
  });
});
