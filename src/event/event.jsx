import React from 'react';

export function Event() {
  const [query, setQuery] = React.useState('titanium remix');
  const [source, setSource] = React.useState('apple');
  const [results, setResults] = React.useState([]);
  const [queue, setQueue] = React.useState([]);
  const [nowPlaying, setNowPlaying] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [activity, setActivity] = React.useState([]);

  React.useEffect(() => {
    const savedQueue = localStorage.getItem('eventQueue');
    const savedNow = localStorage.getItem('nowPlaying');
    if (savedQueue) setQueue(JSON.parse(savedQueue));
    if (savedNow) setNowPlaying(JSON.parse(savedNow));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('eventQueue', JSON.stringify(queue));
  }, [queue]);

  React.useEffect(() => {
    localStorage.setItem('nowPlaying', JSON.stringify(nowPlaying));
  }, [nowPlaying]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (nowPlaying) {
        setProgress((p) => {
          const next = p + 1;
          if (next >= nowPlaying.duration) {
            handleMarkPlayed();
            return 0;
          }
          return next;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nowPlaying]);

  React.useEffect(() => {
    const feed = setInterval(() => {
      setActivity((msgs) => {
        const stamp = new Date().toLocaleTimeString();
        const next = [{ id: Date.now(), text: `Update at ${stamp}` }, ...msgs];
        return next.slice(0, 10);
      });
    }, 5000);
    return () => clearInterval(feed);
  }, []);

  function doSearch() {
    const base = [
      { title: 'Titanium', artist: 'David Guetta ft. Sia', album: 'Nothing But The Beat', source: 'apple' },
      { title: 'Titanium (Alesso Remix)', artist: 'David Guetta', album: 'Single', source: 'soundcloud' },
      { title: 'Titanium (Festival Mix)', artist: 'David Guetta', album: 'Bootleg', source: 'soundcloud' },
    ];
    const filtered = source === 'both' ? base : base.filter(b => b.source === source);
    const withIds = filtered.map((r, i) => ({ id: `${r.source}-${i}`, ...r }));
    setResults(withIds);
  }

  function addToQueue(item) {
    const qItem = {
      id: Date.now(),
      title: item.title,
      artist: item.artist,
      source: item.source,
      votes: 0,
      addedBy: 'You',
    };
    setQueue((q) => [...q, qItem]);
    setActivity((msgs) => [{ id: Date.now(), text: `Added "${item.title}"` }, ...msgs].slice(0, 10));
  }

  function upvote(id) {
    setQueue((q) => q.map(it => (it.id === id ? { ...it, votes: it.votes + 1 } : it)));
  }

  function removeFromQueue(id) {
    setQueue((q) => q.filter(it => it.id !== id));
  }

  function handleSkip() {
    if (queue.length) {
      const [next, ...rest] = queue;
      setNowPlaying({ title: next.title, artist: next.artist, source: next.source, duration: 180 });
      setQueue(rest);
      setProgress(0);
      setActivity((msgs) => [{ id: Date.now(), text: `Now playing "${next.title}"` }, ...msgs].slice(0, 10));
    } else {
      setNowPlaying(null);
      setProgress(0);
    }
  }

  function handleMarkPlayed() {
    setActivity((msgs) => [{ id: Date.now(), text: `Finished "${nowPlaying?.title || ''}"` }, ...msgs].slice(0, 10));
    handleSkip();
  }

  function handleFavorite() {
    if (nowPlaying) {
      setActivity((msgs) => [{ id: Date.now(), text: `Favorited "${nowPlaying.title}"` }, ...msgs].slice(0, 10));
    }
  }

  return (
    <main>
      <section>
        <h2>Now Playing</h2>
        <div id="currentTrack">
          <img
            src="/placeholder.png"
            alt="Album Cover"
            width="200"
            height="200"
          />
          <div>
            <h3>{nowPlaying ? nowPlaying.title : 'Nothing playing'}</h3>
            <p>{nowPlaying ? nowPlaying.artist : '—'}</p>
            <p>Source: {nowPlaying ? (nowPlaying.source === 'apple' ? 'Apple Music' : 'SoundCloud') : '—'}</p>
            <div>
              <progress value={nowPlaying ? progress : 0} max={nowPlaying ? nowPlaying.duration : 100}></progress>
              <span>{nowPlaying ? `${Math.floor(progress / 60)}:${String(progress % 60).padStart(2, '0')} / ${Math.floor(nowPlaying.duration / 60)}:${String(nowPlaying.duration % 60).padStart(2, '0')}` : '0:00 / 0:00'}</span>
            </div>
            <p>{nowPlaying ? `Requested by: You | Votes: —` : ''}</p>
          </div>
        </div>

        <div id="djControls">
          <button onClick={handleSkip}>Skip Track</button>
          <button onClick={handleMarkPlayed}>Mark as Played</button>
          <button onClick={handleFavorite}>Add to Favorites</button>
        </div>
      </section>

      <section>
        <h2>Music Search</h2>
        <div>
          <input
            type="text"
            id="searchQuery"
            placeholder="Search for songs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select id="musicSource" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="apple">Apple Music</option>
            <option value="soundcloud">SoundCloud</option>
            <option value="both">Both Sources</option>
          </select>
          <button id="searchBtn" onClick={doSearch}>Search</button>

          <div id="searchResults">
            <h4>Search Results:</h4>
            {results.map((r) => (
              <div className="search-result" key={r.id}>
                <img
                  src="https://via.placeholder.com/60x60"
                  alt="Album Art"
                  width="60"
                  height="60"
                />
                <div>
                  <p>
                    <strong>{r.title}</strong> - {r.artist}
                  </p>
                  <p>{r.source === 'apple' ? 'Apple Music' : 'SoundCloud'}</p>
                </div>
                <button onClick={() => addToQueue(r)}>Add to Queue</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Song Queue</h2>
        <div id="songQueue">
          {queue.map((item, idx) => (
            <div className="queue-item" key={item.id}>
              <span>#{idx + 1}</span>
              <img
                src="https://via.placeholder.com/50x50"
                alt="Album Art"
                width="50"
                height="50"
              />
              <div>
                <p><strong>{item.title}</strong> - {item.artist}</p>
                <p>Requested by: {item.addedBy}</p>
                <p>Source: {item.source === 'apple' ? 'Apple Music' : 'SoundCloud'}</p>
              </div>
              <div className="vote-section">
                <span>{item.votes} votes</span>
                <button onClick={() => upvote(item.id)}>▲</button>
                <button onClick={() => removeFromQueue(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Live Activity Feed</h2>
        <div id="liveActivity">
          <p>Recent Activity:</p>
          <div id="activityFeed">
            {activity.map((m) => (
              <p key={m.id}>{m.text}</p>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2>Event Statistics</h2>
        <div>
          <div>
            <h3>Database Analytics</h3>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total Songs Added:</td>
                  <td>{queue.length}</td>
                </tr>
                <tr>
                  <td>Songs Played:</td>
                  <td>{activity.filter(a => a.text.startsWith('Finished')).length}</td>
                </tr>
                <tr>
                  <td>Total Votes Cast:</td>
                  <td>{queue.reduce((sum, it) => sum + it.votes, 0)}</td>
                </tr>
                <tr>
                  <td>Peak Users:</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Event Duration:</td>
                  <td>—</td>
                </tr>
                <tr>
                  <td>Apple Music Requests:</td>
                  <td>{queue.filter(q => q.source === 'apple').length}</td>
                </tr>
                <tr>
                  <td>SoundCloud Requests:</td>
                  <td>{queue.filter(q => q.source === 'soundcloud').length}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3>Service Status</h3>
            <p>
              Music Services: <span id="musicStatus">Connected</span>
            </p>
            <p>Database: <span id="dbStatus">Connected</span></p>
          </div>
        </div>
      </section>
    </main>
  );
}