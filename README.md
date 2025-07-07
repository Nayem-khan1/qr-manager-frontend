# 🔗 LinkHub – All-in-One Link-in-Bio & QR Code Manager

LinkHub is a modern, full-stack web application that allows users to create and manage customizable **link-in-bio pages** and **QR codes**. It supports real-time analytics, role-based access (Free, Premium, Admin), Firebase authentication, and a beautiful responsive dashboard built with React and Tailwind CSS.

---

## 🚀 Features

### 🔐 Authentication

- Firebase Email/Password login
- Role-based access (Admin, Free, Premium)
- Secure JWT-based API access with Firebase Admin SDK

### 🧩 Link-in-Bio Pages

- Create beautiful micro landing pages with:
  - Custom slug
  - Bio, profile image
  - Multiple types of links (button, social, video)
  - Custom theme with colors and optional custom CSS
- Link page visibility toggle (Publish/Unpublish)

### 🧾 QR Code Management

- Generate unique QR codes for any URL
- Download QR code image (PNG)
- Update or delete QR codes anytime
- Max QR code limit enforced per user role

### 📊 Advanced Analytics

- **QR Scan Tracking**
  - Country, city, device, browser
- **Link Click Tracking**
  - Total views, device type, country, OS, browser
- Real-time view counter per link page

### 🖥️ Dashboard

- Clean, mobile-friendly dashboard using Tailwind CSS
- Role-based dashboard views:
  - **Users**: Their own QR codes, link pages, and analytics
  - **Admins**: Platform-wide user and analytics management

---

## 🧪 Tech Stack

| Tech          | Description                         |
| ------------- | ----------------------------------- |
| **Frontend**  | React, Tailwind CSS, Lucide Icons   |
| **Backend**   | Express.js, Firebase Admin, MongoDB |
| **Auth**      | Firebase Authentication             |
| **Analytics** | IPAPI.co, ua-parser-js              |

---
