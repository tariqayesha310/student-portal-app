import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, Plus, BookOpen } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  course: string;
  tags: string[];
  uploadDate: string;
  thumbnailUrl?: string;
  content?: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('student-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Set default notes if none exist
      const defaultNotes: Note[] = [
        {
          id: '1',
          title: 'Introduction to Algorithms',
          course: 'Computer Science',
          tags: ['algorithms', 'cs', 'study'],
          uploadDate: '2024-01-15',
          content: `# Introduction to Algorithms

## What are Algorithms?

Algorithms are step-by-step procedures for solving problems.`
        },
        {
          id: '2',
          title: 'Calculus Notes',
          course: 'Mathematics',
          tags: ['calculus', 'math', 'derivatives'],
          uploadDate: '2024-01-14',
          content: `# Calculus Fundamentals

## Derivatives

The derivative measures the rate of change of a function.`
        },
        {
          id: '3',
          title: 'Physics Fundamentals',
          course: 'Physics',
          tags: ['physics', 'mechanics', 'laws'],
          uploadDate: '2024-01-13',
          content: `# Physics Fundamentals

## Newton's Laws

1. An object at rest stays at rest...`
        }
      ];
      setNotes(defaultNotes);
      localStorage.setItem('student-notes', JSON.stringify(defaultNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('student-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    extractFilters(notes);
    filterNotes();
  }, [notes, searchQuery, selectedCourse, selectedTags]);

  const extractFilters = (notesData: Note[]) => {
    const uniqueCourses = [...new Set(notesData.map(note => note.course))];
    const uniqueTags = [...new Set(notesData.flatMap(note => note.tags))];
    setCourses(uniqueCourses);
    setAllTags(uniqueTags);
  };

  const filterNotes = () => {
    let filtered = notes;

    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(note => note.course === selectedCourse);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.some(tag => note.tags.includes(tag))
      );
    }

    setFilteredNotes(filtered);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="notes-page">
      <div className="page-header">
        <h1>My Notes</h1>
        <Link to="/upload" className="btn-primary">
          <Plus size={18} />
          Upload Notes
        </Link>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-filter"
            title="Filter by course"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>

          <div className="tags-filter">
            <Filter size={18} />
            <div className="tag-buttons">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
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
                  <BookOpen size={48} />
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
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
