# Student Portal App

A comprehensive React TypeScript application for students to organize their notes and manage timetables. Built with Vite, featuring authentication, note management, and schedule planning.

## Features

- 🔐 **Authentication**: Secure login and registration system
- 📝 **Note Management**: Create, view, edit, and organize study notes
- 📅 **Timetable**: Schedule and manage classes, study sessions, exams, and assignments
- 🔍 **Search & Filter**: Find notes quickly with advanced search and filtering
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 💾 **Local Storage**: All data persists locally in your browser

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: CSS with modern design patterns
- **Icons**: Lucide React
- **Routing**: React Router
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tariqayesha310/student-portal-app.git
   cd student-portal-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Usage

### Authentication
- **Register**: Create a new account with email and name
- **Login**: Sign in with any email/password combination (demo mode)

### Managing Notes
- **View Notes**: Browse all your notes on the Notes page
- **Search**: Use the search bar to find notes by title or content
- **Filter**: Filter by course or tags
- **Create Note**: Click "Upload" to add new notes with content
- **View Note**: Click on any note card to view full content
- **Download**: Download notes as markdown files
- **Delete**: Remove notes you no longer need

### Timetable Management
- **View Schedule**: See your weekly schedule organized by day
- **Add Events**: Create classes, study sessions, exams, or assignments
- **Edit Events**: Modify existing events
- **Delete Events**: Remove events from your schedule

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   └── PrivateRoute.tsx # Route protection
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/             # Page components
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Login.tsx      # Authentication page
│   ├── Notes.tsx      # Notes listing page
│   ├── NoteViewer.tsx # Individual note view
│   ├── Timetable.tsx  # Schedule management
│   └── UploadNote.tsx # Note creation form
├── App.tsx            # Main app component
├── App.css            # Global styles
└── main.ts           # App entry point
```

## Testing

The app includes comprehensive unit tests for components and contexts:

```bash
npm run test
```

Tests cover:
- Authentication logic
- Component rendering
- User interactions
- Route protection

## Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add deploy script to package.json:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons from [Lucide](https://lucide.dev/)
- UI inspired by modern design principles
