const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const users = {};
const authTokens = {};
const events = {};

app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    if (users[email]) {
        return res.status(409).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword, name };
    users[email] = user;

    const token = uuid();
    authTokens[token] = email;

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.json({ email, name });
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users[email];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = uuid();
    authTokens[token] = email;

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.json({ email, name: user.name });
});

app.delete("/api/auth/logout", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        delete authTokens[token];
    }
    res.clearCookie("token");
    res.status(204).end();
});

function authenticate(req, res, next) {
    const token = req.cookies.token;
    const email = authTokens[token];

    if (!email) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    req.user = users[email];
    next();
}

app.get("/api/events", authenticate, (req, res) => {
    const userEvents = Object.values(events).filter(
        (e) => e.owner === req.user.email,
    );
    res.json(userEvents);
});

app.post("/api/events", authenticate, (req, res) => {
    const { name, location, maxSongs, allowDuplicates, autoplay } = req.body;
    const id = uuid();
    const code =
        name.replace(/\s+/g, "").slice(0, 6).toUpperCase() +
        Math.floor(Math.random() * 100);

    const event = {
        id,
        name,
        location,
        code,
        maxSongs: maxSongs || 20,
        allowDuplicates: allowDuplicates || false,
        autoplay: autoplay || true,
        owner: req.user.email,
        queue: [],
        status: "active",
    };

    events[id] = event;
    res.json(event);
});

app.get("/api/events/:id", authenticate, (req, res) => {
    const event = events[req.params.id];
    if (!event) {
        return res.status(404).json({ msg: "Event not found" });
    }
    res.json(event);
});

app.post("/api/events/:id/queue", authenticate, (req, res) => {
    const event = events[req.params.id];
    if (!event) {
        return res.status(404).json({ msg: "Event not found" });
    }

    const { title, artist, source } = req.body;
    const queueItem = {
        id: uuid(),
        title,
        artist,
        source,
        votes: 0,
        addedBy: req.user.email,
    };

    event.queue.push(queueItem);
    res.json(queueItem);
});

app.get("/api/quote", async (req, res) => {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch quote" });
    }
});

app.get("/api/search", authenticate, async (req, res) => {
    const { query, source } = req.query;

    const mockResults = [
        {
            id: "1",
            title: `${query} Track 1`,
            artist: "Artist A",
            source: source || "soundcloud",
        },
        {
            id: "2",
            title: `${query} Track 2`,
            artist: "Artist B",
            source: source || "soundcloud",
        },
        {
            id: "3",
            title: `${query} Remix`,
            artist: "Artist C",
            source: source || "soundcloud",
        },
    ];

    res.json(mockResults);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
