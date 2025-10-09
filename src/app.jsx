import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header>
        <nav>
          <div>
            <h1>BeatQueue</h1>
            <p>Real-Time Collaborative Playlists for DJs</p>
          </div>
          <div>
            <a href="index.html">Home</a>
            <a href="dashboard.html">Dashboard</a>
            <a href="event.html">Live Event</a>
            <a href="join.html">Join Event</a>
          </div>
        </nav>
      </header>

      <main>App components go here</main>

      <footer>
        <div>
          <p>&copy; 2025 BeatQueue - Built by Chuck Nadauld</p>
          <p>
            <a href="https://github.com/Chucknadauld/startup">View on GitHub</a>
          </p>
        </div>
      </footer>
    </div>
  );
}