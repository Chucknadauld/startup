import React from "react";

export function Dashboard() {
    const [quote, setQuote] = React.useState("");
    const [eventName, setEventName] = React.useState("");
    const [eventLocation, setEventLocation] = React.useState("");
    const [maxSongs, setMaxSongs] = React.useState(20);
    const [allowDuplicates, setAllowDuplicates] = React.useState(false);
    const [autoplay, setAutoplay] = React.useState(true);
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.quotable.io/random")
            .then((res) => res.json())
            .then((data) => setQuote(`"${data.content}" - ${data.author}`))
            .catch((err) => console.error("Quote error:", err));
    }, []);

    React.useEffect(() => {
        fetch("/api/events")
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch(() => {});
    }, []);

    function persist(next) {
        localStorage.setItem("events", JSON.stringify(next));
        setEvents(next);
    }

    async function handleCreate(e) {
        e.preventDefault();
        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: eventName,
                    location: eventLocation,
                    maxSongs: Number(maxSongs),
                    allowDuplicates,
                    autoplay,
                }),
            });

            if (response.ok) {
                const evt = await response.json();
                const next = [evt, ...events];
                persist(next);
                setEventName("");
                setEventLocation("");
                setMaxSongs(20);
                setAllowDuplicates(false);
                setAutoplay(true);
            }
        } catch (err) {
            console.error("Failed to create event");
        }
    }

    function endEvent(id) {
        const next = events.map((e) =>
            e.id === id ? { ...e, status: "Ended" } : e,
        );
        persist(next);
    }

    function removeEvent(id) {
        const next = events.filter((e) => e.id !== id);
        persist(next);
    }

    return (
        <main>
            <section>
                <h2>Create New Event</h2>
                <form onSubmit={handleCreate}>
                    <div>
                        <label htmlFor="eventName">Event Name:</label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            required
                            placeholder="Friday Night Set"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="eventLocation">Venue/Location:</label>
                        <input
                            type="text"
                            id="eventLocation"
                            name="location"
                            placeholder="Club Downtown"
                            value={eventLocation}
                            onChange={(e) => setEventLocation(e.target.value)}
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
                            value={maxSongs}
                            onChange={(e) => setMaxSongs(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="allowDuplicates"
                                checked={allowDuplicates}
                                onChange={(e) =>
                                    setAllowDuplicates(e.target.checked)
                                }
                            />
                            Allow duplicate songs
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="autoplay"
                                checked={autoplay}
                                onChange={(e) => setAutoplay(e.target.checked)}
                            />
                            Auto-advance queue
                        </label>
                    </div>
                    <button type="submit">Create Event</button>
                </form>
            </section>

            <section>
                <h2>Your Events</h2>
                <div id="eventsList">
                    {events.map((e) => (
                        <div className="event-card" key={e.id}>
                            <h3>{e.name}</h3>
                            <p>
                                Status: <strong>{e.status}</strong>
                            </p>
                            <p>
                                Songs in Queue: <span>{e.songsInQueue}</span>
                            </p>
                            <p>
                                Connected Users: <span>{e.connectedUsers}</span>
                            </p>
                            <p>
                                Event Code: <strong>{e.code}</strong>
                            </p>
                            <p>
                                Share Link:
                                <input type="text" value={e.share} readOnly />
                            </p>
                            <div>
                                <button onClick={() => endEvent(e.id)}>
                                    End Event
                                </button>
                                <button onClick={() => removeEvent(e.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="event-card">
                        <h3>Friday Night Set</h3>
                        <p>
                            Status: <strong>Active</strong>
                        </p>
                        <p>
                            Songs in Queue: <span>7</span>
                        </p>
                        <p>
                            Connected Users: <span>23</span>
                        </p>
                        <p>
                            Event Code: <strong>FN2024</strong>
                        </p>
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
                        <p>
                            Status: <strong>Paused</strong>
                        </p>
                        <p>
                            Songs in Queue: <span>3</span>
                        </p>
                        <p>
                            Connected Users: <span>8</span>
                        </p>
                        <p>
                            Event Code: <strong>HP2024</strong>
                        </p>
                        <div>
                            <button>Resume Event</button>
                            <button>End Event</button>
                        </div>
                    </div>

                    <div className="event-card">
                        <h3>Last Week - Club Mix</h3>
                        <p>
                            Status: <strong>Ended</strong>
                        </p>
                        <p>
                            Total Songs Played: <span>45</span>
                        </p>
                        <p>
                            Peak Users: <span>67</span>
                        </p>
                        <p>Duration: 4h 32m</p>
                        <div>
                            <button>View Analytics</button>
                            <button>Export Playlist</button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2>Daily Inspiration</h2>
                <p>{quote || "Loading quote..."}</p>
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
