import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  course: string;
  day: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'study' | 'exam' | 'assignment';
}

const Timetable: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    day: 'Monday',
    startTime: '',
    endTime: '',
    type: 'class' as Event['type']
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('timetable-events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Set default events if none exist
      const defaultEvents: Event[] = [
        {
          id: '1',
          title: 'Introduction to Algorithms',
          course: 'CS101',
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:30',
          type: 'class'
        },
        {
          id: '2',
          title: 'Calculus Study Session',
          course: 'MATH201',
          day: 'Tuesday',
          startTime: '14:00',
          endTime: '16:00',
          type: 'study'
        },
        {
          id: '3',
          title: 'Physics Lab',
          course: 'PHYS101',
          day: 'Wednesday',
          startTime: '10:00',
          endTime: '12:00',
          type: 'class'
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('timetable-events', JSON.stringify(defaultEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('timetable-events', JSON.stringify(events));
  }, [events]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredEvents = events.filter(event => event.day === selectedDay);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'study': return 'bg-green-500';
      case 'exam': return 'bg-red-500';
      case 'assignment': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      course: '',
      day: selectedDay,
      startTime: '',
      endTime: '',
      type: 'class'
    });
    setShowAddForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      course: event.course,
      day: event.day,
      startTime: event.startTime,
      endTime: event.endTime,
      type: event.type
    });
    setShowAddForm(true);
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...formData, id: editingEvent.id }
          : event
      ));
    } else {
      // Add new event
      const newEvent: Event = {
        ...formData,
        id: Date.now().toString()
      };
      setEvents([...events, newEvent]);
    }

    setShowAddForm(false);
    setEditingEvent(null);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="timetable">
      <div className="page-header">
        <h1>My Timetable</h1>
        <button
          onClick={handleAddEvent}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      <div className="timetable-container">
        <div className="day-selector">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`day-btn ${selectedDay === day ? 'active' : ''}`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>

        <div className="day-view">
          <h2>{selectedDay}</h2>

          <div className="events-list">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <div className={`event-type ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </div>
                    <div className="event-actions">
                      <button onClick={() => handleEditEvent(event)} className="action-btn" title="Edit event">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="action-btn delete"
                        title="Delete event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="course">{event.course}</p>
                    <div className="event-time">
                      <Clock size={16} />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <Clock size={48} />
                <h3>No events scheduled</h3>
                <p>Add your first event for {selectedDay}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleSubmitEvent} className="event-form">
              <div className="form-group">
                <label htmlFor="event-title">Title</label>
                <input
                  id="event-title"
                  type="text"
                  placeholder="Event title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-course">Course</label>
                <input
                  id="event-course"
                  type="text"
                  placeholder="Course name"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="event-day">Day</label>
                <select
                  id="event-day"
                  value={formData.day}
                  onChange={(e) => setFormData({...formData, day: e.target.value})}
                >
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="event-start">Start Time</label>
                  <input
                    id="event-start"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="event-end">End Time</label>
                  <input
                    id="event-end"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="event-type">Type</label>
                <select
                  id="event-type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as Event['type']})}
                >
                  <option value="class">Class</option>
                  <option value="study">Study</option>
                  <option value="exam">Exam</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
