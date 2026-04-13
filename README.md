# 🌾 Wheat Leaf Disease Detection System (Minor Project)

An AI-powered web application developed as a **Minor Project** to detect diseases in wheat leaves using image processing and machine learning.

---

## 📌 Project Overview

This project aims to assist farmers and agricultural experts by providing an easy-to-use platform for identifying wheat leaf diseases through image uploads. The system uses a deep learning-based approach (to be integrated) to classify diseases and suggest basic treatments.

---

## 🎯 Objectives

* Detect wheat leaf diseases using images
* Provide quick and user-friendly diagnosis
* Assist in early disease prevention
* Build a complete full-stack AI application

---

## 🚀 Features

* 📸 Upload wheat leaf image
* 🔍 Analyze image using backend API
* 🧠 Disease prediction (currently dummy output)
* 📊 Displays:

  * Disease name
  * Confidence level
  * Severity level
* 🧾 Scan history tracking
* 💊 Basic treatment recommendations

---

## 🛠️ Tech Stack

### Frontend

* Next.js (React Framework)
* Tailwind CSS
* TypeScript

### Backend

* FastAPI (Python)

### Machine Learning

* CNN-based model (to be integrated)

---

## ⚙️ System Workflow

1. User uploads wheat leaf image
2. Image is sent to backend API (`/predict`)
3. Backend processes the image
4. Model (future integration) predicts disease
5. Result is displayed on UI

---

## 📂 Project Structure

```
v0-wheat-disease-dashboard/
│
├── app/                # Main frontend pages
├── components/         # UI components
├── public/             # Static assets
├── styles/             # Styling files
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

---

## ⚠️ Current Status

* ✅ Frontend fully developed
* ✅ Backend API integrated
* ✅ Image upload & processing working
* ❌ Machine Learning model not yet integrated

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/student-mahirajak/v0-wheat-disease-dashboard.git
cd v0-wheat-disease-dashboard
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Frontend

```bash
npm run dev
```

👉 Open in browser: http://localhost:3000

---

### 4️⃣ Run Backend (if available)

```bash
cd backend
uvicorn main:app --reload
```

👉 Open API docs: http://127.0.0.1:8000/docs

---

## 📈 Future Scope

* Integrate trained CNN model
* Improve prediction accuracy
* Add multiple crop disease detection
* Deploy application online
* Add farmer-friendly interface

---

## 👥 Project Type

📚 **Minor Project (Group Project)**
Department of Computer Science & Engineering

---

## 👨‍💻 Developed By

* Mahi Rajak
* Team Members (add names here)

---

## 🙌 Acknowledgement

We would like to thank our faculty and institution for their guidance and support in completing this project.

---

## ⭐ GitHub

If you find this project useful, consider giving it a ⭐

---

