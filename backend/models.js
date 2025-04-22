const { DataTypes } = require("sequelize");
const sequelize = require("./DB");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user",
  },
});

const Booking = sequelize.define("bookings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "car_number",
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "start_time",
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "end_time",
  },
});

module.exports = { User, Booking, sequelize };
