import React from 'react';

export const AuthState = {
  Unknown: 'Unknown',
  Authenticated: 'Authenticated',
  Unauthenticated: 'Unauthenticated',
};

export function Login({ userName, authState, onAuthChange }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [regName, setRegName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  const [regConfirm, setRegConfirm] = React.useState('');
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setStatus(`Welcome back, ${storedUser}`);
    } else {
      setStatus('Not logged in');
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const loginUser = email?.split('@')[0] || 'dj';
    onAuthChange(loginUser, AuthState.Authenticated);
    setStatus(`Logged in as ${loginUser}`);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      setStatus('Passwords do not match');
      return;
    }
    const newUser = regName || (regEmail?.split('@')[0] || 'dj');
    onAuthChange(newUser, AuthState.Authenticated);
    setStatus(`Registered and logged in as ${newUser}`);
  }

  return (
    <main>
      <section>
        <h2>Welcome to BeatQueue</h2>
        <p>
          Manage song requests in real-time and keep your crowd engaged
        </p>
        <p>Session: {status}</p>

        <div>
          <h3>DJ Login</h3>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        <div>
          <h3>New DJ? Register Here</h3>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="reg-name">DJ Name:</label>
              <input
                type="text"
                id="reg-name"
                name="djName"
                required
                placeholder="DJ Awesome"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
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
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reg-password">Password:</label>
              <input
                type="password"
                id="reg-password"
                name="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                required
                value={regConfirm}
                onChange={(e) => setRegConfirm(e.target.value)}
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
        <p>Logged in as: <span id="currentUser">{authState === AuthState.Authenticated ? (userName || localStorage.getItem('userName')) : 'Not logged in'}</span></p>
        <p>Active Events: <span id="activeEvents">0</span></p>

        <div>
          <h4>Service Status</h4>
          <p>
            Music Services:
            <span id="musicStatus">{authState === AuthState.Authenticated ? 'Connected' : 'Connecting...'}</span>
          </p>
          <p>Connected Users: <span id="connectedUsers">0</span></p>
        </div>
      </section>
    </main>
  );
}