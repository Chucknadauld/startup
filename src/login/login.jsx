import React from 'react';

export function Login() {
  return (
    <main>
      <section>
        <h2>Welcome to BeatQueue</h2>
        <p>
          Manage song requests in real-time and keep your crowd engaged
        </p>

        <div>
          <h3>DJ Login</h3>
          <form>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div>
          <h3>New DJ? Register Here</h3>
          <form>
            <div>
              <label htmlFor="reg-name">DJ Name:</label>
              <input
                type="text"
                id="reg-name"
                name="djName"
                required
                placeholder="DJ Awesome"
              />
            </div>
            <div>
              <label htmlFor="reg-email">Email:</label>
              <input
                type="email"
                id="reg-email"
                name="email"
                required
                placeholder="dj@email.com"
              />
            </div>
            <div>
              <label htmlFor="reg-password">Password:</label>
              <input
                type="password"
                id="reg-password"
                name="password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </section>

      <section>
        <h3>How It Works</h3>
        <div>
          <div>
            <h4>1. Create Event</h4>
            <p>Start a new event room and get a shareable link</p>
          </div>
          <div>
            <h4>2. Share with Crowd</h4>
            <p>Let your audience join and request songs</p>
          </div>
          <div>
            <h4>3. Real-Time Queue</h4>
            <p>See live updates as songs get added and upvoted</p>
          </div>
        </div>
      </section>

      <section>
        <h3>Current User Status</h3>
        <p>Logged in as: <span id="currentUser">Not logged in</span></p>
        <p>Active Events: <span id="activeEvents">0</span></p>

        <div>
          <h4>Service Status</h4>
          <p>
            Music Services:
            <span id="musicStatus">Connecting...</span>
          </p>
          <p>Connected Users: <span id="connectedUsers">0</span></p>
        </div>
      </section>
    </main>
  );
}