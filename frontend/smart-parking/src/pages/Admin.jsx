import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiclient";

const Admin = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      setStep("dashboard");
    }
  }, []);

  useEffect(() => {
    if (step === "dashboard") fetchBookings();
  }, [step]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/login", { email, password });
      if (data.role !== "admin") {
        setError("❌ Not an admin user");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setStep("dashboard");
    } catch {
      setError("❌ Invalid credentials");
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get("/get-all-bookings");
      setBookings(res.data);
    } catch (err) {
      setMessage("Failed to fetch bookings. " + err.message);
    }
  };

  const resetBookings = async () => {
    try {
      const res = await api.delete("/reset-bookings");
      setMessage(res.data.message);
      setBookings([]);
    } catch (err) {
      setMessage("Failed to reset bookings. " + err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setStep("login");
    setBookings([]);
    navigate("/");
  };

  const formatRange = (b) => {
    const s = new Date(b.startTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const e = new Date(b.endTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${s} – ${e}`;
  };

  if (step === "login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl mb-4">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />
          <button className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded">
            Log In
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Home button */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
        >
          Home
        </button>

        <h2 className="text-4xl mb-10 text-blue-300 drop-shadow-lg">
          🚗 Admin Dashboard
        </h2>

        {message && (
          <div className="bg-yellow-800 text-yellow-200 p-4 mb-6 rounded">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Usernames */}
          <div className="bg-white/10 p-6 rounded-2xl border-blue-800 border shadow-lg">
            <h3 className="text-xl text-blue-400 mb-3">👤 Usernames</h3>
            <ul className="list-disc list-inside text-sm">
              {[...new Set(bookings.map((b) => b.username))].map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
          {/* Car Numbers */}
          <div className="bg-white/10 p-6 rounded-2xl border-green-800 border shadow-lg">
            <h3 className="text-xl text-green-400 mb-3">🚘 Car Numbers</h3>
            <ul className="list-disc list-inside text-sm">
              {[...new Set(bookings.map((b) => b.carNumber))].map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          {/* Time Slots */}
          <div className="bg-white/10 p-6 rounded-2xl border-purple-800 border shadow-lg">
            <h3 className="text-xl text-purple-400 mb-3">🕓 Time Slots</h3>
            <ul className="list-disc list-inside text-sm">
              {[...new Set(bookings.map(formatRange))].map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={resetBookings}
            className="cursor-pointer bg-red-600 py-2 rounded text-white"
          >
            Reset Bookings
          </button>
          <button
            onClick={logout}
            className="cursor-pointer bg-gray-600 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
