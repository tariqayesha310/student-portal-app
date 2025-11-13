import React, { useState } from 'react';
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
  const [events, setEvents] = useState<Event[]>([
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
  ]);

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddForm, setShowAddForm] = useState(false);

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

  return (
    <div className="timetable">
      <div className="page-header">
        <h1>My Timetable</h1>
        <button
          onClick={() => setShowAddForm(true)}
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
                      <button className="action-btn">
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="action-btn delete"
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
            <h3>Add New Event</h3>
            <form className="event-form">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Event title" />
              </div>
              <div className="form-group">
                <label>Course</label>
                <input type="text" placeholder="Course name" />
              </div>
              <div className="form-group">
                <label>Day</label>
                <select>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <input type="time" />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input type="time" />
                </div>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select>
                  <option value="class">Class</option>
                  <option value="study">Study</option>
                  <option value="exam">Exam</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Event
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
