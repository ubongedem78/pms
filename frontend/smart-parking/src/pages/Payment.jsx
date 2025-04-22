import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UPIPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  const [npmsID, setNpmsID] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!userData) {
      navigate("/");
      return;
    }

    // generate a pseudo-random NPMS ID
    const random6 = Math.floor(100000 + Math.random() * 900000);
    setNpmsID(`${random6}@nile`);

    // calculate minutes between start and end
    const start = new Date(userData.startTime);
    const end = new Date(userData.endTime);
    const minutes = Math.ceil((end - start) / 60000);
    setAmount(minutes * 30);
  }, [userData, navigate]);

  const handlePayment = () => {
    setTimeout(() => {
      alert(`Payment of ₦${amount} Successful ✅`);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg p-6 rounded-xl text-center">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">NPMS Payment</h2>
      <p className="text-gray-600 mb-4">Pay ₦{amount} to confirm your slot.</p>
      <div className="bg-gray-100 p-4 mb-4 rounded">
        <p className="text-sm font-semibold">NPMS ID:</p>
        <p className="text-lg font-mono text-gray-800">{npmsID}</p>
      </div>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default UPIPayment;
