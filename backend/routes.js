const express = require("express");
const auth = require("./controller").login;
const authMiddleware = require("./auth");
const { bookSlot, getAllBookings, resetBookings } = require("./controller");

const router = express.Router();

router.post("/login", auth);

router.post("/book-slot", bookSlot);
router.get("/get-all-bookings", getAllBookings);

router.delete("/reset-bookings", authMiddleware("admin"), resetBookings);

module.exports = router;
