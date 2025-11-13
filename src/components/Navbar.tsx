import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Calendar, Upload, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FileText size={24} />
          <span>Student Portal</span>
        </Link>

        {user && (
          <div className="navbar-links">
            <Link to="/" className="navbar-link">
              <FileText size={18} />
              <span>Dashboard</span>
            </Link>
            <Link to="/notes" className="navbar-link">
              <FileText size={18} />
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
        )}

        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <User size={18} />
              <span>{user.name}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
