import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Navbar from '../Navbar';
import { vi } from 'vitest';

const mockUseAuth = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockUseAuth(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderNavbar = (authenticated = true) => {
  mockUseAuth.mockReturnValue({
    user: authenticated ? { name: 'John Doe' } : null,
    logout: vi.fn(),
  });

  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  test('renders logo and navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Student Portal')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Timetable')).toBeInTheDocument();
  });
});
