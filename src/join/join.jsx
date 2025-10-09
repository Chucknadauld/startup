import React from 'react';

export function Join() {
  return (
    <main>
      <section>
        <h2>Join an Event</h2>
        <div>
          <h3>Enter Event Code</h3>
          <form>
            <div>
              <label htmlFor="eventCode">Event Code:</label>
              <input
                type="text"
                id="eventCode"
                name="eventCode"
                placeholder="FN2024"
                required
              />
            </div>
            <div>
              <label htmlFor="guestName">Your Name (optional):</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                placeholder="Guest_123"
              />
            </div>
            <button type="submit">Join Event</button>
          </form>

          <p>Don't have a code? Ask your DJ for the event link!</p>
        </div>
      </section>

      <section id="eventInfo">
        <h2>Friday Night Set</h2>
        <p>DJ: <strong>DJ Awesome</strong></p>
        <p>Location: Club Downtown</p>
        <p>Connected as: <span id="userName">Guest_847</span></p>
        <p>Users online: <span id="onlineUsers">23</span></p>

        <h3>Now Playing</h3>
        <div id="nowPlaying">
          <img
            src="/placeholder.png"
            alt="Album Cover"
            width="150"
            height="150"
          />
          <div>
            <h4>Animals</h4>
            <p>Martin Garrix</p>
            <p>Duration: 1:23 / 3:00</p>
            <p>From: Apple Music</p>
          </div>
        </div>
      </section>

      <section id="songSearch">
        <h2>Add Songs to Queue</h2>
        <div>
          <input
            type="text"
            id="searchInput"
            placeholder="Search for songs, artists..."
            defaultValue="daft punk"
          />
          <select id="sourceSelect">
            <option value="apple">Apple Music</option>
            <option value="soundcloud">SoundCloud</option>
            <option value="both">Both Sources</option>
          </select>
          <button id="searchButton">Search</button>

          <div id="apiResults">
            <h4>Third-Party API Results:</h4>
            <div className="search-result">
              <img
                src="https://via.placeholder.com/80x80"
                alt="Album Art"
                width="80"
                height="80"
              />
              <div>
                <h5>One More Time</h5>
                <p>Daft Punk</p>
                <p>Album: Discovery</p>
                <p>Source: Apple Music</p>
                <audio controls>
                  <source src="#" type="audio/mpeg" />
                  Preview not available
                </audio>
              </div>
              <button>Add to Queue</button>
            </div>

            <div className="search-result">
              <img
                src="https://via.placeholder.com/80x80"
                alt="Album Art"
                width="80"
                height="80"
              />
              <div>
                <h5>Around the World</h5>
                <p>Daft Punk</p>
                <p>Album: Homework</p>
                <p>Source: Apple Music</p>
                <audio controls>
                  <source src="#" type="audio/mpeg" />
                  Preview not available
                </audio>
              </div>
              <button>Add to Queue</button>
            </div>

            <div className="search-result">
              <img
                src="https://via.placeholder.com/80x80"
                alt="Album Art"
                width="80"
                height="80"
              />
              <div>
                <h5>Robot Rock (Justice Remix)</h5>
                <p>Daft Punk</p>
                <p>Remix/Bootleg</p>
                <p>Source: SoundCloud</p>
                <audio controls>
                  <source src="#" type="audio/mpeg" />
                  Preview not available
                </audio>
              </div>
              <button>Add to Queue</button>
            </div>
          </div>
        </div>
      </section>

      <section id="currentQueue">
        <h2>Current Queue</h2>
        <div id="queueList">
          <div className="queue-item">
            <span>1.</span>
            <img
              src="https://via.placeholder.com/60x60"
              alt="Album Art"
              width="60"
              height="60"
            />
            <div>
              <h4>Levels</h4>
              <p>Avicii</p>
              <p>Added by: You (Guest_847)</p>
            </div>
            <div className="vote-section">
              <span>12 votes</span>
              <button disabled>Already Voted</button>
            </div>
          </div>

          <div className="queue-item">
            <span>2.</span>
            <img
              src="https://via.placeholder.com/60x60"
              alt="Album Art"
              width="60"
              height="60"
            />
            <div>
              <h4>One More Time</h4>
              <p>Daft Punk</p>
              <p>Added by: MusicLover23</p>
            </div>
            <div className="vote-section">
              <span>8 votes</span>
              <button>Vote</button>
            </div>
          </div>

          <div className="queue-item">
            <span>3.</span>
            <img
              src="https://via.placeholder.com/60x60"
              alt="Album Art"
              width="60"
              height="60"
            />
            <div>
              <h4>Bangarang (VIP Mix)</h4>
              <p>Skrillex</p>
              <p>Added by: DubstepKing</p>
            </div>
            <div className="vote-section">
              <span>6 votes</span>
              <button>Vote</button>
            </div>
          </div>

          <div className="queue-item">
            <span>4.</span>
            <img
              src="https://via.placeholder.com/60x60"
              alt="Album Art"
              width="60"
              height="60"
            />
            <div>
              <h4>Strobe</h4>
              <p>Deadmau5</p>
              <p>Added by: ProgHouseFan</p>
            </div>
            <div className="vote-section">
              <span>4 votes</span>
              <button>Vote</button>
            </div>
          </div>

          <div className="queue-item">
            <span>5.</span>
            <img
              src="https://via.placeholder.com/60x60"
              alt="Album Art"
              width="60"
              height="60"
            />
            <div>
              <h4>Clarity</h4>
              <p>Zedd</p>
              <p>Added by: EDMFan2024</p>
            </div>
            <div className="vote-section">
              <span>2 votes</span>
              <button>Vote</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Live Chat & Updates</h2>
        <div id="liveUpdatesSection">
          <div id="chatFeed">
            <h4>Recent Activity:</h4>
            <div>
              <p><strong>Guest_847:</strong> Great song choice!</p>
              <p><strong>MusicLover23:</strong> Can we get some house music?</p>
              <p><strong>System:</strong> New song added: "Levels" by Avicii</p>
              <p><strong>DanceQueen:</strong> This is my jam!</p>
              <p><strong>System:</strong> "One More Time" received an upvote</p>
              <p><strong>RaveFan99:</strong> When does the next set start?</p>
              <p><strong>System:</strong> RaveFan99 joined the event</p>
            </div>
          </div>

          <div id="chatInput">
            <input
              type="text"
              placeholder="Send a message to other guests..."
              maxLength="200"
            />
            <button>Send</button>
          </div>
        </div>
      </section>

      <section>
        <h2>Event Data</h2>
        <div>
          <h3>Database Statistics</h3>
          <table>
            <tbody>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Your Songs Added</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Your Votes Cast</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Total Event Songs</td>
                <td>15</td>
              </tr>
              <tr>
                <td>Songs Played So Far</td>
                <td>4</td>
              </tr>
              <tr>
                <td>Event Duration</td>
                <td>2h 15m</td>
              </tr>
              <tr>
                <td>Connected Users</td>
                <td>23</td>
              </tr>
            </tbody>
          </table>

          <h3>Connection Status</h3>
          <p>
            Music Services: <span style={{color: 'green'}}>Connected</span>
          </p>
          <p>Last Update: <span id="lastUpdate">Just now</span></p>
        </div>
      </section>
    </main>
  );
}