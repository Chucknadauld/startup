import React from "react";

export function Join() {
    const [eventCode, setEventCode] = React.useState("");
    const [guestName, setGuestName] = React.useState("");
    const [connectedUsers, setConnectedUsers] = React.useState(1);
    const [searchText, setSearchText] = React.useState("daft punk");
    const [source, setSource] = React.useState("apple");
    const [results, setResults] = React.useState([]);
    const [queue, setQueue] = React.useState([]);

    React.useEffect(() => {
        const storedGuest = localStorage.getItem("guestName");
        const savedQueue = localStorage.getItem("eventQueue");
        if (storedGuest) setGuestName(storedGuest);
        if (savedQueue) setQueue(JSON.parse(savedQueue));
    }, []);

    React.useEffect(() => {
        const t = setInterval(() => {
            setConnectedUsers((n) => (n < 99 ? n + 1 : 1));
        }, 8000);
        return () => clearInterval(t);
    }, []);

    React.useEffect(() => {
        localStorage.setItem("eventQueue", JSON.stringify(queue));
    }, [queue]);

    function handleJoin(e) {
        e.preventDefault();
        const name = guestName || "Guest";
        localStorage.setItem("guestName", name);
        setGuestName(name);
    }

    function doSearch() {
        const base = [
            {
                title: "One More Time",
                artist: "Daft Punk",
                album: "Discovery",
                source: "apple",
            },
            {
                title: "Around the World",
                artist: "Daft Punk",
                album: "Homework",
                source: "apple",
            },
            {
                title: "Robot Rock (Justice Remix)",
                artist: "Daft Punk",
                album: "Bootleg",
                source: "soundcloud",
            },
        ];
        const filtered =
            source === "both" ? base : base.filter((b) => b.source === source);
        setResults(filtered.map((r, i) => ({ id: `${r.source}-${i}`, ...r })));
    }

    function addToQueue(item) {
        const added = {
            id: Date.now(),
            title: item.title,
            artist: item.artist,
            source: item.source,
            votes: 0,
            addedBy: guestName || "Guest",
        };
        setQueue((q) => [...q, added]);
    }

    async function vote(id) {
        const eventId = localStorage.getItem("currentEventId") || "default";

        try {
            const response = await fetch(
                `/api/events/${eventId}/queue/${id}/vote`,
                {
                    method: "PATCH",
                },
            );

            if (response.ok) {
                setQueue((q) =>
                    q.map((it) =>
                        it.id === id ? { ...it, votes: it.votes + 1 } : it,
                    ),
                );
            }
        } catch (err) {
            console.error("Vote failed");
        }
    }

    return (
        <main>
            <section>
                <h2>Join an Event</h2>
                <div>
                    <h3>Enter Event Code</h3>
                    <form onSubmit={handleJoin}>
                        <div>
                            <label htmlFor="eventCode">Event Code:</label>
                            <input
                                type="text"
                                id="eventCode"
                                name="eventCode"
                                placeholder="FN2024"
                                required
                                value={eventCode}
                                onChange={(e) => setEventCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="guestName">
                                Your Name (optional):
                            </label>
                            <input
                                type="text"
                                id="guestName"
                                name="guestName"
                                placeholder="Guest_123"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                            />
                        </div>
                        <button type="submit">Join Event</button>
                    </form>

                    <p>Don't have a code? Ask your DJ for the event link!</p>
                </div>
            </section>

            <section id="eventInfo">
                <h2>Friday Night Set</h2>
                <p>
                    DJ: <strong>DJ Awesome</strong>
                </p>
                <p>Location: Club Downtown</p>
                <p>
                    Connected as:{" "}
                    <span id="userName">{guestName || "Not connected"}</span>
                </p>
                <p>
                    Users online: <span id="onlineUsers">{connectedUsers}</span>
                </p>

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
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <select
                        id="sourceSelect"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    >
                        <option value="apple">Apple Music</option>
                        <option value="soundcloud">SoundCloud</option>
                        <option value="both">Both Sources</option>
                    </select>
                    <button id="searchButton" onClick={doSearch}>
                        Search
                    </button>

                    <div id="apiResults">
                        <h4>Third-Party API Results:</h4>
                        {results.map((r) => (
                            <div className="search-result" key={r.id}>
                                <img
                                    src="https://via.placeholder.com/80x80"
                                    alt="Album Art"
                                    width="80"
                                    height="80"
                                />
                                <div>
                                    <h5>{r.title}</h5>
                                    <p>{r.artist}</p>
                                    <p>Album: {r.album}</p>
                                    <p>
                                        Source:{" "}
                                        {r.source === "apple"
                                            ? "Apple Music"
                                            : "SoundCloud"}
                                    </p>
                                </div>
                                <button onClick={() => addToQueue(r)}>
                                    Add to Queue
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="currentQueue">
                <h2>Current Queue</h2>
                <div id="queueList">
                    {queue.map((item, idx) => (
                        <div className="queue-item" key={item.id}>
                            <span>{idx + 1}.</span>
                            <img
                                src="https://via.placeholder.com/60x60"
                                alt="Album Art"
                                width="60"
                                height="60"
                            />
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.artist}</p>
                                <p>Added by: {item.addedBy}</p>
                            </div>
                            <div className="vote-section">
                                <span>{item.votes} votes</span>
                                <button onClick={() => vote(item.id)}>
                                    Vote
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Live Chat & Updates</h2>
                <div id="liveUpdatesSection">
                    <div id="chatFeed">
                        <h4>Recent Activity:</h4>
                        <div>
                            <p>
                                <strong>Guest_847:</strong> Great song choice!
                            </p>
                            <p>
                                <strong>MusicLover23:</strong> Can we get some
                                house music?
                            </p>
                            <p>
                                <strong>System:</strong> New song added:
                                "Levels" by Avicii
                            </p>
                            <p>
                                <strong>DanceQueen:</strong> This is my jam!
                            </p>
                            <p>
                                <strong>System:</strong> "One More Time"
                                received an upvote
                            </p>
                            <p>
                                <strong>RaveFan99:</strong> When does the next
                                set start?
                            </p>
                            <p>
                                <strong>System:</strong> RaveFan99 joined the
                                event
                            </p>
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
                                <td>
                                    {
                                        queue.filter(
                                            (q) =>
                                                q.addedBy ===
                                                (guestName || "Guest"),
                                        ).length
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Your Votes Cast</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>Total Event Songs</td>
                                <td>{queue.length}</td>
                            </tr>
                            <tr>
                                <td>Songs Played So Far</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>Event Duration</td>
                                <td>—</td>
                            </tr>
                            <tr>
                                <td>Connected Users</td>
                                <td>{connectedUsers}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Connection Status</h3>
                    <p>
                        Music Services:{" "}
                        <span style={{ color: "green" }}>Connected</span>
                    </p>
                    <p>
                        Last Update: <span id="lastUpdate">Just now</span>
                    </p>
                </div>
            </section>
        </main>
    );
}
