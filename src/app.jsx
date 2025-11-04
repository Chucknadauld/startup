import React from "react";
import {
    BrowserRouter,
    NavLink,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import { Login } from "./login/login";
import { Dashboard } from "./dashboard/dashboard";
import { Event } from "./event/event";
import { Join } from "./join/join";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
    const AuthState = {
        Unknown: "Unknown",
        Authenticated: "Authenticated",
        Unauthenticated: "Unauthenticated",
    };

    const [authState, setAuthState] = React.useState(AuthState.Unknown);
    const [userName, setUserName] = React.useState("");

    React.useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        if (storedUserName) {
            setUserName(storedUserName);
            setAuthState(AuthState.Authenticated);
        } else {
            setAuthState(AuthState.Unauthenticated);
        }
    }, []);

    function handleAuthChange(nextUserName, nextAuthState) {
        setAuthState(nextAuthState);
        setUserName(nextUserName || "");
        if (nextAuthState === AuthState.Authenticated) {
            localStorage.setItem("userName", nextUserName || "");
        } else {
            localStorage.removeItem("userName");
        }
    }

    function RequireAuth({ children }) {
        if (authState !== AuthState.Authenticated) {
            return <Navigate to="/" replace />;
        }
        return children;
    }

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
                            {authState === AuthState.Authenticated && (
                                <>
                                    <NavLink to="dashboard">Dashboard</NavLink>
                                    <NavLink to="event">Live Event</NavLink>
                                    <NavLink to="join">Join Event</NavLink>
                                </>
                            )}
                            {authState === AuthState.Authenticated && (
                                <button
                                    onClick={async () => {
                                        await fetch("/api/auth/logout", {
                                            method: "DELETE",
                                        });
                                        handleAuthChange(
                                            "",
                                            AuthState.Unauthenticated,
                                        );
                                    }}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </nav>
                </header>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(u, s) => handleAuthChange(u, s)}
                            />
                        }
                        exact
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/event"
                        element={
                            <RequireAuth>
                                <Event />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/join"
                        element={
                            <RequireAuth>
                                <Join />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>

                <footer>
                    <div>
                        <p>&copy; 2025 BeatQueue - Built by Chuck Nadauld</p>
                        <p>
                            <a href="https://github.com/Chucknadauld/startup">
                                View on GitHub
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return (
        <main className="container-fluid bg-secondary text-center">
            404: Return to sender. Address unknown.
        </main>
    );
}
