import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Upload, Home, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpen size={24} />
          <span>Student Portal</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            <Home size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/notes" className="navbar-link">
            <BookOpen size={18} />
            <span>Notes</span>
          </Link>
          <Link to="/upload" className="navbar-link">
            <Upload size={18} />
            <span>Upload</span>
          </Link>
          <Link to="/timetable" className="navbar-link">
            <Calendar size={18} />
            <span>Timetable</span>
          </Link>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <User size={18} />
            <span>{user?.name || user?.email}</span>
          </div>
          <button onClick={logout} className="logout-btn">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
