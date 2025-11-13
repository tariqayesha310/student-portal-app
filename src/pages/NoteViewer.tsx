import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Download, Share2, Trash2, ArrowLeft } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  fileUrl: string;
  thumbnailUrl?: string;
  textContent?: string;
}

const NoteViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadNote(id);
    }
  }, [id]);

  const loadNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`);
      if (response.ok) {
        const noteData = await response.json();
        setNote(noteData);
      } else {
        setError('Note not found');
      }
    } catch (err) {
      console.error('Error loading note:', err);
      setError('Failed to load note');
      // Mock data for development
      setNote({
        id: noteId,
        title: 'Sample Note',
        course: 'CS101',
        tags: ['sample', 'demo'],
        uploadDate: new Date().toISOString(),
        fileUrl: '#',
        textContent: 'This is sample note content for development purposes.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (note?.fileUrl) {
      // In a real app, this would trigger a download
      window.open(note.fileUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share && note) {
      try {
        await navigator.share({
          title: note.title,
          text: `Check out this note: ${note.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDelete = async () => {
    if (!note || !window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await fetch(`/api/notes/${note.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        navigate('/notes');
      } else {
        alert('Failed to delete note');
      }
    } catch (err) {
      console.error('Error deleting note:', err);
      alert('Failed to delete note');
    }
  };

  if (loading) {
    return (
      <div className="note-viewer">
        <div className="loading">Loading note...</div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="note-viewer">
        <div className="error-state">
          <FileText size={48} />
          <h2>{error || 'Note not found'}</h2>
          <button onClick={() => navigate('/notes')} className="btn-primary">
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-viewer">
      <div className="viewer-header">
        <button onClick={() => navigate('/notes')} className="back-btn">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="note-actions">
          <button onClick={handleDownload} className="action-btn" title="Download">
            <Download size={18} />
          </button>
          <button onClick={handleShare} className="action-btn" title="Share">
            <Share2 size={18} />
          </button>
          <button onClick={handleDelete} className="action-btn delete" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="note-content">
        <div className="note-header">
          <h1>{note.title}</h1>
          <div className="note-meta">
            <span className="course">{note.course}</span>
            <span className="date">
              {new Date(note.uploadDate).toLocaleDateString()}
            </span>
          </div>
          <div className="tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="note-body">
          {note.textContent ? (
            <div className="text-content">
              <pre>{note.textContent}</pre>
            </div>
          ) : (
            <div className="file-preview">
              <iframe
                src={note.fileUrl}
                title={note.title}
                className="file-iframe"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
