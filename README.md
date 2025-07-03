# Saanjh Sahayak

## 1. Overview
Saanjh Sahayak is a clinical decision support system designed for **Saanjh**, a home for the elderly. The application helps track health records of elderly residents and predict disease risks using LLM technology. It serves as a comprehensive healthcare management solution for caregivers, doctors, and administrators.

---

## 2. Problem Statement
Saanjh, the elderly care home, needs assistance in tracking health records of residents and predicting potential disease risks. This application addresses this need by implementing a clinical decision support system and disease risk prediction functionality using an existing LLM model.

---

## 3. Solution Modules

### 🔹 Health Records Manager
- Store and retrieve resident vitals, medications, and medical history  
- Role-based access for caregivers and doctors  

### 🔹 Risk Prediction Engine
- Uses LLM-powered disease risk scoring  
- Provides diagnostic insights  

### 🔹 Data Retrieval Chatbot
- Interactive interface for querying patient data  
- Simplifies access to health records  
- Supports healthcare staff with information access  

---

## 4. Technology Stack

### 💻 Backend
- Node.js  
- Express.js  
- MongoDB  
- Flask  
- Ollama (LLM integration)  

### 🎨 Frontend
- React.js

---

## 5. Configure Environment Variables

Create a `.env` file in **both** the `backend/` and `flask-server/` directories.

### 📁 `backend/.env`
```env
MONGODB_URI=mongodb://localhost:27017/saanjh
PORT=5000
