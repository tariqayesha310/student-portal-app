# Student Portal - Notes Organizer

A modern, professional web application for students to organize and manage their study materials, notes, and timetable.

## Features

- **📚 Note Management**: Upload, organize, and view notes by subject and tags
- **📅 Timetable**: Schedule and manage classes, study sessions, and assignments
- **🔍 Smart Search**: Find notes quickly with advanced search and filtering
- **📤 File Upload**: Support for multiple file formats (PDF, DOC, images, etc.)
- **👤 User Authentication**: Secure login and registration system
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Beautiful gradient backgrounds and glassmorphism effects

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS with modern design patterns
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Testing**: Vitest with React Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tariqayesha310/student-portal-app.git
cd student-portal-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   └── PrivateRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication page
│   ├── Notes.tsx       # Notes listing
│   ├── NoteViewer.tsx  # Individual note view
│   ├── Timetable.tsx   # Schedule management
│   └── UploadNote.tsx  # File upload page
├── test/               # Test utilities
└── types/              # TypeScript type definitions
```

## Features in Detail

### Authentication
- Secure login and registration
- Protected routes for authenticated users only
- Persistent login state with localStorage

### Note Management
- Upload notes with metadata (title, course, tags)
- Organize notes by subject and custom tags
- Search and filter functionality
- View notes in various formats

### Timetable
- Add and manage schedule events
- Different event types (classes, study sessions, exams)
- Weekly view with day selection

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev/)
- UI inspiration from modern web design trends
- Built with ❤️ for the student community
