require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Postgres via Sequelize");
    await sequelize.sync({ alter: true });
    console.log("✅ Models synchronized");
  } catch (err) {
    console.error("❌ Unable to connect/sync DB:", err);
    process.exit(1);
  }
})();

app.use("/", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
