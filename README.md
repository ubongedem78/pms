# pms

A Parking Management System

<p align="center">
  <img src="https://img.shields.io/badge/Smart%20Parking%20Space-v1.0.0-blue" alt="Version" />
  <img src="https://img.shields.io/badge/Node.js-v16.x-green" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-v14-blue" alt="Postgres" />
  <img src="https://img.shields.io/badge/React-v18.2.0-blue" alt="React" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

# 🚗 Smart Parking Space

A **Smart Car Parking Management System** with real-time slot monitoring, reservations, and an admin dashboard,all built on a **Node.js/Express** + **PostgreSQL** backend and a **React/Tailwind CSS** frontend.

---

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚙️ Prerequisites](#️-prerequisites)
- [🔧 Installation & Setup](#-installation--setup)
  - [1. Clone & Install](#1-clone--install)
  - [2. Configure Environment](#2-configure-environment)
  - [3. Seed Admin User](#3-seed-admin-user)
  - [4. Run Backend & Frontend](#4-run-backend--frontend)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [⚖️ License](#️-license)

## 🎯 Features

- 🟢 **Real‑time Slot Status** via MQTT updates
- 🔒 **JWT Authentication** for users & admins
- 📅 **Flexible Reservations** with start/end times & auto‑calculated fees
- 📧 **Email Receipts** on booking and overtime reminders
- 🔄 **Admin Dashboard** for viewing, filtering, resetting bookings
- 🎛 **Sensor Simulator** to emulate ESP32 + PIR data on MQTT

---

## 🛠 Tech Stack

| Layer     | Technology             |
| --------- | ---------------------- |
| Backend   | Node.js, Express.js    |
| ORM       | Sequelize (PostgreSQL) |
| Auth      | JSON Web Tokens (JWT)  |
| Frontend  | React, React Router    |
| Styling   | Tailwind CSS           |
| Real‑Time | MQTT (mqtt.js)         |
| Email     | nodemailer             |

---

## ⚙️ Prerequisites

- **Node.js** v16+
- **npm** or **yarn**
- **PostgreSQL** v14+ (running locally or via cloud)
- **MQTT Broker** (e.g. Mosquitto)

---

## 🔧 Installation & Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/smart-parking-space.git
cd smart-parking-space
```

Install **backend** dependencies:

```bash
cd backend
npm install
```

Install **frontend** dependencies:

```bash
cd ../frontend
npm install
```

### 2. Configure Environment

Create a `.env` in `backend/`:

```env
# backend/.env
PORT=5000
DB_NAME=smart_parking
DB_USER=your_pg_user
DB_PASSWORD=your_pg_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=supersecretkey
```

And in `frontend/.env`:

```env
# frontend/.env
VITE_API_BASE=http://localhost:5000
```

### 3. Seed Admin User

Run the seed script to create a default admin:

```bash
cd backend
node seedAdmin.js
```

### 4. Run Backend & Frontend

**Backend** (auto syncs tables & starts server):

```bash
cd backend
npm run dev     # nodemon server.js
```

**Frontend**:

```bash
cd frontend
npm run dev     # starts Vite on http://localhost:5173
```

## 🚀 Usage

1. **Home Page**: choose “Log In” (user flow) or “Admin”
2. **Book Slot**: fill in username, car number, start & end times (cannot select past)
3. **Payment**: auto‑calculate fee (₦30/min), generate dynamic UPI ID
4. **Admin Login**: email `admin@nile.edu` + your seeded password
5. **Dashboard**: view unique usernames, car numbers, time ranges; reset bookings; return Home

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -m 'Add foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a Pull Request

---

## ⚖️ License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
