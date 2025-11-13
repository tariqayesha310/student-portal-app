import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Edit, Trash2, FileText } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  content?: string;
}

const NoteViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  // Load note from localStorage
  useEffect(() => {
    if (id) {
      const savedNotes = JSON.parse(localStorage.getItem('student-notes') || '[]');
      const foundNote = savedNotes.find((n: Note) => n.id === id);
      if (foundNote) {
        setNote(foundNote);
      }
    }
    setLoading(false);
  }, [id]);

  const handleDownload = () => {
    if (!note) return;

    const content = note.content || `# ${note.title}\n\nCourse: ${note.course}\n\nTags: ${note.tags.join(', ')}\n\nUploaded: ${note.uploadDate}`;

    // Mock download functionality
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: `Check out this note: ${note.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleEdit = () => {
    // Navigate to edit page (not implemented yet)
    alert('Edit functionality coming soon!');
  };

  const handleDelete = () => {
    if (!note) return;

    if (window.confirm('Are you sure you want to delete this note?')) {
      // Remove from localStorage
      const savedNotes = JSON.parse(localStorage.getItem('student-notes') || '[]');
      const updatedNotes = savedNotes.filter((n: Note) => n.id !== note.id);
      localStorage.setItem('student-notes', JSON.stringify(updatedNotes));

      navigate('/notes');
    }
  };

  if (loading) {
    return <div className="loading">Loading note...</div>;
  }

  if (!note) {
    return (
      <div className="note-viewer">
        <div className="viewer-header">
          <button onClick={() => navigate('/notes')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Notes
          </button>
        </div>
        <div className="note-content">
          <div className="empty-state">
            <FileText size={48} />
            <h3>Note not found</h3>
            <p>The note you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="note-viewer">
      <div className="viewer-header">
        <button onClick={() => navigate('/notes')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Notes
        </button>

        <div className="note-actions">
          <button onClick={handleDownload} className="action-btn" disabled={!note.content}>
            <Download size={18} />
            Download
          </button>
          <button onClick={handleShare} className="action-btn">
            <Share2 size={18} />
            Share
          </button>
          <button onClick={handleEdit} className="action-btn">
            <Edit size={18} />
            Edit
          </button>
          <button onClick={handleDelete} className="action-btn delete">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className="note-content">
        <div className="note-meta">
          <h1>{note.title}</h1>
          <div className="meta-info">
            <span className="course">{note.course}</span>
            <span className="date">{new Date(note.uploadDate).toLocaleDateString()}</span>
          </div>
          <div className="tags">
            {note.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="note-body">
          {note.content ? (
            <div className="markdown-content">
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {note.content}
              </pre>
            </div>
          ) : (
            <div className="content-preview">
              <FileText size={48} />
              <p>This note doesn't have content yet. You can add content when editing the note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
