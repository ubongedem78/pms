import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.jsx";
import SlotBook from "./pages/SlotBooking.jsx";
import Admin from "./pages/Admin.jsx";
import UPIPayment from "./pages/Payment.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-slot" element={<SlotBook />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment" element={<UPIPayment />} />
      </Routes>
    </Router>
  );
};

export default App;
