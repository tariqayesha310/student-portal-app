import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import UploadNote from './pages/UploadNote';
import NoteViewer from './pages/NoteViewer';
import Timetable from './pages/Timetable';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="App">
        {user && <Navbar />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
