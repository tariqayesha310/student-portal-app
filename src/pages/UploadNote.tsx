import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText } from 'lucide-react';

const UploadNote: React.FC = () => {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'text/markdown'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please select a PDF, image, or markdown file');
        return;
      }
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !course) {
      setError('Please fill in all required fields');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('course', course);
      formData.append('tags', JSON.stringify(tags));

      const response = await fetch('/api/notes/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      navigate('/notes');
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload note. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="page-header">
        <h1>Upload Notes</h1>
      </div>

      <div className="upload-form-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter note title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course *</label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              placeholder="e.g., CS101, MATH201"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <div className="tags-input">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add tags (press Enter)"
              />
              <button type="button" onClick={addTag} className="add-tag-btn">
                Add
              </button>
            </div>
            <div className="tags-list">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="remove-tag"
                    title={`Remove ${tag} tag`}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="file">File *</label>
            <div className="file-upload">
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.md"
                style={{ display: 'none' }}
              />
              <label htmlFor="file" className="file-upload-btn">
                <Upload size={20} />
                Choose File
              </label>
              {file && (
                <div className="file-info">
                  <FileText size={16} />
                  <span>{file.name}</span>
                  <span className="file-size">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>
            <p className="file-help">
              Supported formats: PDF, JPG, PNG, Markdown. Max size: 10MB
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

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
              disabled={uploading}
              className="btn-primary"
            >
              {uploading ? 'Uploading...' : 'Upload Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;
