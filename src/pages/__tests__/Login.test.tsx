import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Login from '../Login';
import { vi } from 'vitest';

// Mock the auth functions
const mockSignIn = vi.fn();
const mockSignUp = vi.fn();

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockSignIn,
    register: mockSignUp,
    user: null,
  }),
}));

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
    mockSignUp.mockClear();
  });

  test('renders login form', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  test('toggles between sign in and sign up', () => {
    renderLogin();
    const toggleButton = screen.getByText('Create Account');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('calls signIn on form submit', async () => {
    mockSignIn.mockResolvedValue({ user: { email: 'test@example.com' } });
    renderLogin();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });
});
