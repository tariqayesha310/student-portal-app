import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import UploadNote from './pages/UploadNote';
import NoteViewer from './pages/NoteViewer';
import Timetable from './pages/Timetable';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/notes" element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            } />
            <Route path="/notes/:id" element={
              <PrivateRoute>
                <NoteViewer />
              </PrivateRoute>
            } />
            <Route path="/upload" element={
              <PrivateRoute>
                <UploadNote />
              </PrivateRoute>
            } />
            <Route path="/timetable" element={
              <PrivateRoute>
                <Timetable />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
