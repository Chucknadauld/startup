const { connectToDatabase, getDB } = require("./database");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const { WebSocketServer } = require("ws");

const app = express();
const isProd = process.env.NODE_ENV === "production";
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectToDatabase().catch(console.error);

app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    const db = getDB();
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
        return res.status(409).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({
        email,
        password: hashedPassword,
        name,
    });

    const token = uuid();
    await db.collection("tokens").insertOne({ token, email });

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
    });
    res.json({ email, name });
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const db = getDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = uuid();
    await db.collection("tokens").insertOne({ token, email });

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
    });
    res.json({ email, name: user.name });
});

app.delete("/api/auth/logout", async (req, res) => {
    const token = req.cookies.token;
    if (token) {
        const db = getDB();
        await db.collection("tokens").deleteOne({ token });
    }
    res.clearCookie("token");
    res.status(204).end();
});

async function authenticate(req, res, next) {
    const token = req.cookies.token;

    const db = getDB();
    const authToken = await db.collection("tokens").findOne({ token });

    if (!authToken) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await db
        .collection("users")
        .findOne({ email: authToken.email });
    req.user = user;
    next();
}

app.get("/api/events", authenticate, async (req, res) => {
    const db = getDB();
    const events = await db
        .collection("events")
        .find({ owner: req.user.email })
        .toArray();
    res.json(events);
});

app.post("/api/events", authenticate, async (req, res) => {
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

    const db = getDB();
    await db.collection("events").insertOne(event);
    res.json(event);
});

app.get("/api/events/:id", authenticate, async (req, res) => {
    const db = getDB();
    const event = await db.collection("events").findOne({ id: req.params.id });

    if (!event) {
        return res.status(404).json({ msg: "Event not found" });
    }
    res.json(event);
});

app.post("/api/events/:id/queue", authenticate, async (req, res) => {
    const { title, artist, source } = req.body;
    const queueItem = {
        id: uuid(),
        title,
        artist,
        source,
        votes: 0,
        addedBy: req.user.email,
    };

    const db = getDB();
    await db
        .collection("events")
        .updateOne({ id: req.params.id }, { $push: { queue: queueItem } });

    broadcastQueueUpdate(req.params.id, 'add', queueItem);

    res.json(queueItem);
});

app.patch(
    "/api/events/:id/queue/:queueId/vote",
    authenticate,
    async (req, res) => {
        const db = getDB();

        await db.collection("events").updateOne(
            {
                id: req.params.id,
                "queue.id": req.params.queueId,
            },
            {
                $inc: { "queue.$.votes": 1 },
            },
        );

        const event = await db
            .collection("events")
            .findOne({ id: req.params.id });
        const item = event.queue.find((q) => q.id === req.params.queueId);

        broadcastQueueUpdate(req.params.id, 'vote', item);

        res.json(item);
    },
);

app.get("/api/events/:id/queue", authenticate, async (req, res) => {
    const db = getDB();
    const event = await db.collection("events").findOne({ id: req.params.id });

    if (!event) {
        return res.status(404).json({ msg: "Event not found" });
    }
    res.json(event.queue);
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

app.get("/api/music-trivia", async (req, res) => {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=1&category=12&type=multiple",
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const trivia = data.results[0];
            res.json({
                question: trivia.question,
                correct_answer: trivia.correct_answer,
            });
        } else {
            res.json({ question: "No trivia available at this time." });
        }
    } catch (err) {
        console.error("Trivia API error:", err);
        res.status(500).json({ msg: "Failed to fetch trivia" });
    }
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const wss = new WebSocketServer({ noServer: true });

function broadcastQueueUpdate(eventId, action, data) {
    const message = JSON.stringify({
        type: 'queueUpdate',
        eventId,
        action,
        data
    });

    connections.forEach((c) => {
        if (c.ws.readyState === 1) {
            c.ws.send(message);
        }
    });
}

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

let connections = [];

wss.on('connection', (ws) => {
    const connection = { id: uuid(), alive: true, ws: ws };
    connections.push(connection);

    ws.on('message', (data) => {
        const msg = JSON.parse(data);

        if (msg.type === 'queueUpdate') {
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(JSON.stringify(msg));
                }
            });
        }
    });

    ws.on('close', () => {
        connections = connections.filter((c) => c.id !== connection.id);
    });

    ws.on('pong', () => {
        connection.alive = true;
    });
});

setInterval(() => {
    connections.forEach((c) => {
        if (!c.alive) {
            c.ws.terminate();
        } else {
            c.alive = false;
            c.ws.ping();
        }
    });
}, 10000);

app.delete("/api/events/:id/queue/:queueId", authenticate, async (req, res) => {
    const db = getDB();

    await db
        .collection("events")
        .updateOne(
            { id: req.params.id },
            { $pull: { queue: { id: req.params.queueId } } },
        );

    res.status(204).end();
});

const fallbackPath = path.join(__dirname, "public", "index.html");
app.get("*", (req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ msg: "Not found" });
    }
    res.sendFile(fallbackPath);
});
