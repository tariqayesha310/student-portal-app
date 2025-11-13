import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  content?: string;
}

const UploadNote: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !course) return;

    setUploading(true);

    // Create new note object
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      course,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      uploadDate: new Date().toISOString().split('T')[0],
      content: content || undefined
    };

    // Get existing notes from localStorage
    const existingNotes = JSON.parse(localStorage.getItem('student-notes') || '[]');

    // Add new note
    const updatedNotes = [...existingNotes, newNote];

    // Save to localStorage
    localStorage.setItem('student-notes', JSON.stringify(updatedNotes));

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      navigate('/notes');
    }, 1000);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Upload Notes</h1>
      </div>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Note Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course/Subject *</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., algorithms, cs, study"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content (optional)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content here..."
            rows={6}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">File *</label>
          <div className="file-upload">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
            />
            <label htmlFor="file" className="file-upload-btn">
              <Upload size={24} />
              Choose File
            </label>
            {file && (
              <div className="file-info">
                <FileText size={16} />
                <span>{file.name}</span>
                <button type="button" onClick={removeFile} className="remove-file">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          <small>Supported formats: PDF, DOC, DOCX, TXT, MD, JPG, PNG (optional - you can just enter content above)</small>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/notes')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={!title || !course || uploading}
            title={uploading ? 'Uploading note...' : 'Save note'}
          >
            {uploading ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadNote;
