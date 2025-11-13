import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Upload, Calendar, Search } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  thumbnailUrl?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Load recent notes - replace with actual API call
    const loadRecentNotes = async () => {
      try {
        const response = await fetch('/api/notes/recent');
        if (response.ok) {
          const notes = await response.json();
          setRecentNotes(notes);
        }
      } catch (error) {
        console.error('Error loading recent notes:', error);
        // Mock data for development
        setRecentNotes([
          {
            id: '1',
            title: 'Introduction to Algorithms',
            course: 'CS101',
            tags: ['algorithms', 'computer science'],
            uploadDate: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Calculus Notes',
            course: 'MATH201',
            tags: ['calculus', 'mathematics'],
            uploadDate: new Date().toISOString(),
          },
        ]);
      }
    };

    loadRecentNotes();
  }, []);

  const filteredNotes = recentNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Manage your study materials and schedule</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/upload" className="action-card">
          <Upload size={24} />
          <h3>Upload Notes</h3>
          <p>Add new study materials</p>
        </Link>
        <Link to="/notes" className="action-card">
          <FileText size={24} />
          <h3>Browse Notes</h3>
          <p>View all your notes</p>
        </Link>
        <Link to="/timetable" className="action-card">
          <Calendar size={24} />
          <h3>Timetable</h3>
          <p>Manage your schedule</p>
        </Link>
      </div>

      <div className="recent-notes">
        <div className="section-header">
          <h2>Recent Notes</h2>
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="notes-grid">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <Link key={note.id} to={`/notes/${note.id}`} className="note-card">
                <div className="note-thumbnail">
                  {note.thumbnailUrl ? (
                    <img src={note.thumbnailUrl} alt={note.title} />
                  ) : (
                    <FileText size={48} />
                  )}
                </div>
                <div className="note-info">
                  <h3>{note.title}</h3>
                  <p className="course">{note.course}</p>
                  <div className="tags">
                    {note.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <p className="date">
                    {new Date(note.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <FileText size={48} />
              <h3>No notes found</h3>
              <p>Upload your first note to get started</p>
              <Link to="/upload" className="btn-primary">Upload Notes</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
