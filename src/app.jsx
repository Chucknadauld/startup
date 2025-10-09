import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Event } from './event/event';
import { Join } from './join/join';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <nav>
            <div>
              <h1>BeatQueue</h1>
              <p>Real-Time Collaborative Playlists for DJs</p>
            </div>
            <div>
              <NavLink to="">Home</NavLink>
              <NavLink to="dashboard">Dashboard</NavLink>
              <NavLink to="event">Live Event</NavLink>
              <NavLink to="join">Join Event</NavLink>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/event' element={<Event />} />
          <Route path='/join' element={<Join />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <div>
            <p>&copy; 2025 BeatQueue - Built by Chuck Nadauld</p>
            <p>
              <a href="https://github.com/Chucknadauld/startup">View on GitHub</a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}