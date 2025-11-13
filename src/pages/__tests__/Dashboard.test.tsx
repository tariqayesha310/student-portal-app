import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard', () => {
  test('renders welcome message', () => {
    renderDashboard();
    expect(screen.getByText('Welcome to Student Portal!')).toBeInTheDocument();
    expect(screen.getByText('Organize your notes and manage your study schedule')).toBeInTheDocument();
  });

  test('renders action cards', () => {
    renderDashboard();
    expect(screen.getByText('Upload Notes')).toBeInTheDocument();
    expect(screen.getByText('Browse Notes')).toBeInTheDocument();
    expect(screen.getByText('Timetable')).toBeInTheDocument();
  });

  test('displays recent notes', () => {
    renderDashboard();
    expect(screen.getByText('Introduction to Algorithms')).toBeInTheDocument();
    expect(screen.getByText('Calculus Notes')).toBeInTheDocument();
    expect(screen.getByText('Physics Fundamentals')).toBeInTheDocument();
  });

  test('renders search functionality', () => {
    renderDashboard();
    const searchInput = screen.getByPlaceholderText('Search notes...');
    expect(searchInput).toBeInTheDocument();
  });
});
