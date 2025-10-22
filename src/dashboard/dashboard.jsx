import React from 'react';

export function Dashboard() {
  return (
    <main>
      <section>
        <h2>Create New Event</h2>
        <form>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              required
              placeholder="Friday Night Set"
            />
          </div>
          <div>
            <label htmlFor="eventLocation">Venue/Location:</label>
            <input
              type="text"
              id="eventLocation"
              name="location"
              placeholder="Club Downtown"
            />
          </div>
          <div>
            <label htmlFor="maxSongs">Max Songs in Queue:</label>
            <input
              type="number"
              id="maxSongs"
              name="maxSongs"
              min="5"
              max="50"
              defaultValue="20"
            />
          </div>
          <div>
            <label>
              <input type="checkbox" name="allowDuplicates" />
              Allow duplicate songs
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="autoplay" defaultChecked />
              Auto-advance queue
            </label>
          </div>
          <button type="submit">Create Event</button>
        </form>
      </section>

      <section>
        <h2>Your Events</h2>
        <div id="eventsList">
          <div className="event-card">
            <h3>Friday Night Set</h3>
            <p>Status: <strong>Active</strong></p>
            <p>Songs in Queue: <span>7</span></p>
            <p>Connected Users: <span>23</span></p>
            <p>Event Code: <strong>FN2024</strong></p>
            <p>
              Share Link:
              <input
                type="text"
                defaultValue="https://beatqueue.click/join?code=FN2024"
                readOnly
              />
            </p>
            <div>
              <button>Manage Event</button>
              <button>End Event</button>
              <button>Copy Link</button>
            </div>
          </div>

          <div className="event-card">
            <h3>Saturday House Party</h3>
            <p>Status: <strong>Paused</strong></p>
            <p>Songs in Queue: <span>3</span></p>
            <p>Connected Users: <span>8</span></p>
            <p>Event Code: <strong>HP2024</strong></p>
            <div>
              <button>Resume Event</button>
              <button>End Event</button>
            </div>
          </div>

          <div className="event-card">
            <h3>Last Week - Club Mix</h3>
            <p>Status: <strong>Ended</strong></p>
            <p>Total Songs Played: <span>45</span></p>
            <p>Peak Users: <span>67</span></p>
            <p>Duration: 4h 32m</p>
            <div>
              <button>View Analytics</button>
              <button>Export Playlist</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Recent Database Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Song Added</th>
              <th>Artist</th>
              <th>Votes</th>
              <th>Time</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Friday Night Set</td>
              <td>Levels</td>
              <td>Avicii</td>
              <td>12</td>
              <td>2 min ago</td>
              <td>Guest_847</td>
            </tr>
            <tr>
              <td>Friday Night Set</td>
              <td>One More Time</td>
              <td>Daft Punk</td>
              <td>8</td>
              <td>5 min ago</td>
              <td>MusicLover23</td>
            </tr>
            <tr>
              <td>Saturday House Party</td>
              <td>Titanium (Remix)</td>
              <td>David Guetta</td>
              <td>15</td>
              <td>1 hour ago</td>
              <td>DanceFan99</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Live Updates</h2>
        <div id="liveUpdates">
          <p>Recent Activity:</p>
          <div id="updateFeed">
            <p>Guest_847 added "Levels" by Avicii</p>
            <p>MusicLover23 upvoted "One More Time"</p>
            <p>DJ Awesome marked "Animals" as now playing</p>
            <p>5 new users joined Friday Night Set</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Profile & Settings</h2>
        <div>
          <img
            src="/placeholder.png"
            alt="DJ Profile"
            width="120"
            height="120"
          />
          <h3>DJ Profile</h3>
          <p>Name: DJ Awesome</p>
          <p>Email: dj@email.com</p>
          <p>Events Created: 3</p>
          <p>Total Songs Played: 127</p>
          <p>Member Since: January 2024</p>

          <h4>Music Service Connections</h4>
          <p>Apple Music: ✅ Connected</p>
          <p>SoundCloud: ✅ Connected</p>
          <button>Reconnect Services</button>
        </div>
      </section>
    </main>
  );
}
