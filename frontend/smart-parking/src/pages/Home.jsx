import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/book-slot");
  };

  const AdminLogin = () => {
    navigate("/admin");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-gray-900 animate-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800 via-purple-900 to-black opacity-60 animate-pulse"></div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg animate-fade-in">
          Welcome to <span className="text-blue-400">Nile's</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto animate-fade-in-delay">
          Car Parking Management System — Simplifying urban parking.
        </p>
        <button
          onClick={handleLogin}
          className="m-5 font-bold mt-8 px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Log In
        </button>
        <button
          onClick={AdminLogin}
          className="m-5 font-bold mt-8 px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default HomePage;
