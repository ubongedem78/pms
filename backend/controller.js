const { User, Booking } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
    res.json({ token, role: user.role });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.bookSlot = async (req, res) => {
  const { username, carNumber, startTime, endTime } = req.body;
  if (!username || !carNumber || !startTime || !endTime) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const booking = await Booking.create({
      username,
      carNumber,
      startTime,
      endTime,
    });
    res.json({ message: "Slot booked successfully!", booking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Error saving booking" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [["startTime", "DESC"]] });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

exports.resetBookings = async (req, res) => {
  try {
    await Booking.destroy({ truncate: true });
    res.json({ message: "All bookings reset." });
  } catch (err) {
    console.error("Error resetting bookings:", err);
    res.status(500).json({ message: "Error resetting bookings" });
  }
};
