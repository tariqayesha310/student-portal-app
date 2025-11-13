import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Calendar, Search, BookOpen } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  thumbnailUrl?: string;
}

const Dashboard: React.FC = () => {
  const [recentNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Introduction to Algorithms',
      course: 'Computer Science',
      tags: ['algorithms', 'cs', 'study'],
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Calculus Notes',
      course: 'Mathematics',
      tags: ['calculus', 'math', 'derivatives'],
      uploadDate: '2024-01-14'
    },
    {
      id: '3',
      title: 'Physics Fundamentals',
      course: 'Physics',
      tags: ['physics', 'mechanics', 'laws'],
      uploadDate: '2024-01-13'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = recentNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Student Portal!</h1>
        <p>Organize your notes and manage your study schedule</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/upload" className="action-card">
          <Upload size={24} />
          <h3>Upload Notes</h3>
          <p>Add new study materials</p>
        </Link>
        <Link to="/notes" className="action-card">
          <BookOpen size={24} />
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
