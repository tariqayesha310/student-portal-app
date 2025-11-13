import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Edit, Trash2, FileText } from 'lucide-react';

const NoteViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock note data - in real app this would come from API
  const [note] = useState({
    id: id || '1',
    title: 'Introduction to Algorithms',
    course: 'Computer Science',
    tags: ['algorithms', 'cs', 'study'],
    uploadDate: '2024-01-15',
    content: `# Introduction to Algorithms

## What are Algorithms?

Algorithms are step-by-step procedures or formulas for solving problems. They are the foundation of computer science and programming.

### Key Characteristics:
- **Finite**: Must terminate after a finite number of steps
- **Definite**: Each step must be precisely defined
- **Effective**: Must be effective and feasible

## Types of Algorithms

### 1. Sorting Algorithms
- Bubble Sort
- Quick Sort
- Merge Sort

### 2. Search Algorithms
- Linear Search
- Binary Search

## Time Complexity

Time complexity measures how the runtime of an algorithm increases with the size of the input.

- **O(1)**: Constant time
- **O(log n)**: Logarithmic time
- **O(n)**: Linear time
- **O(n²)**: Quadratic time

## Example: Binary Search

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1
\`\`\`

This algorithm efficiently finds an element in a sorted array with O(log n) time complexity.`
  });

  const handleDownload = () => {
    // Mock download functionality
    const blob = new Blob([note.content], { type: 'text/markdown' });
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
    if (window.confirm('Are you sure you want to delete this note?')) {
      // Mock delete
      navigate('/notes');
    }
  };

  return (
    <div className="note-viewer">
      <div className="viewer-header">
        <button onClick={() => navigate('/notes')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Notes
        </button>

        <div className="note-actions">
          <button onClick={handleDownload} className="action-btn">
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
          <div className="content-preview">
            <FileText size={48} />
            <p>This is a preview of the note content. In a full implementation, this would render the actual file content (PDF, image, or markdown).</p>
          </div>

          {/* For markdown content, you could use a library like react-markdown */}
          <div className="markdown-content">
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {note.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
