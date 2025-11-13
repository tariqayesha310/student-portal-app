import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, MapPin, Trash2 } from 'lucide-react';

interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  location: string;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Timetable: React.FC = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [formData, setFormData] = useState({
    day: 'Monday',
    time: '',
    subject: '',
    location: '',
  });

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const response = await fetch('/api/timetable');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Error loading timetable:', error);
      // Mock data for development
      setEntries([
        {
          id: '1',
          day: 'Monday',
          time: '09:00',
          subject: 'Computer Science 101',
          location: 'Room 101',
        },
        {
          id: '2',
          day: 'Tuesday',
          time: '14:00',
          subject: 'Mathematics 201',
          location: 'Room 205',
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingEntry ? `/api/timetable/${editingEntry.id}` : '/api/timetable';
      const method = editingEntry ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        if (editingEntry) {
          setEntries(entries.map(entry =>
            entry.id === editingEntry.id ? result : entry
          ));
        } else {
          setEntries([...entries, result]);
        }
        resetForm();
      }
    } catch (error) {
      console.error('Error saving timetable entry:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/timetable/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntries(entries.filter(entry => entry.id !== id));
      }
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      day: 'Monday',
      time: '',
      subject: '',
      location: '',
    });
    setEditingEntry(null);
    setShowForm(false);
  };

  const startEdit = (entry: TimetableEntry) => {
    setFormData({
      day: entry.day,
      time: entry.time,
      subject: entry.subject,
      location: entry.location,
    });
    setEditingEntry(entry);
    setShowForm(true);
  };

  const getEntriesForDay = (day: string) => {
    return entries
      .filter(entry => entry.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <div className="timetable-page">
      <div className="page-header">
        <h1>My Timetable</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} />
          Add Entry
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingEntry ? 'Edit Entry' : 'Add New Entry'}</h2>
              <button onClick={resetForm} className="close-btn">×</button>
            </div>
            <form onSubmit={handleSubmit} className="timetable-form">
              <div className="form-group">
                <label htmlFor="day">Day</label>
                <select
                  id="day"
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  required
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="e.g., Computer Science 101"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Room 101"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingEntry ? 'Update' : 'Add'} Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="timetable-grid">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="day-column">
            <h3 className="day-header">{day}</h3>
            <div className="day-entries">
              {getEntriesForDay(day).map(entry => (
                <div key={entry.id} className="timetable-entry">
                  <div className="entry-time">
                    <Clock size={16} />
                    {entry.time}
                  </div>
                  <div className="entry-details">
                    <h4>{entry.subject}</h4>
                    {entry.location && (
                      <div className="entry-location">
                        <MapPin size={14} />
                        {entry.location}
                      </div>
                    )}
                  </div>
                  <div className="entry-actions">
                    <button onClick={() => startEdit(entry)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(entry.id)} className="delete-btn" title="Delete entry">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {getEntriesForDay(day).length === 0 && (
                <div className="empty-day">
                  <Calendar size={24} />
                  <p>No classes scheduled</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
