import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';
import { vi } from 'vitest';

const TestComponent = () => {
  const { user, loading } = useAuth();

  return (
    <div>
      {loading && <div>Loading...</div>}
      {user ? (
        <div>
          <span>Welcome {user.name}</span>
        </div>
      ) : (
        <div>
          <span>Not authenticated</span>
        </div>
      )}
    </div>
  );
};

const renderWithAuthProvider = () => {
  return render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders not authenticated state after loading', async () => {
    renderWithAuthProvider();
    await waitFor(() => {
      expect(screen.getByText('Not authenticated')).toBeInTheDocument();
    });
  });
});
