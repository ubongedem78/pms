require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize, User } = require("./models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    const plain = "password"; // <-- change to whatever you like
    const hash = await bcrypt.hash(plain, 10);

    const [admin, created] = await User.findOrCreate({
      where: { email: "admin@nileuni.edu" },
      defaults: { password: hash, role: "admin" },
    });

    if (created) {
      console.log(`✅ Admin user created: ${admin.email}`);
    } else {
      console.log(`ℹ️ Admin already exists: ${admin.email}`);
    }
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    process.exit();
  }
})();
