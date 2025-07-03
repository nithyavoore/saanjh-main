# Saanjh Sahayak

## Overview
Saanjh Sahayak is a clinical decision support system designed for **Saanjh**, a home for the elderly. The application helps track health records of elderly residents and predict disease risks using LLM technology. It serves as a comprehensive healthcare management solution for caregivers, doctors, and administrators.

## Problem Statement
Saanjh, the elderly care home, needs assistance in tracking health records of residents and predicting potential disease risks. This application addresses this need by implementing a clinical decision support system and disease risk prediction functionality using an existing LLM model.

## Solution Modules
1. **Health Records Manager**  
   - Store and retrieve resident vitals, medications, histories  
   - Role-based access for caregivers and doctors  
2. **Risk Prediction Engine**  
   - LLM-powered disease risk scoring  
   - Provides diagnostic insights  
3. **Data Retrieval Chatbot**  
   - Interactive interface for querying patient data  
   - Simplifies access to health records  
   - Supports healthcare staff with information access  

## Technology Stack

**Backend**  
- Node.js  
- Express.js  
- MongoDB  
- Flask  
- Ollama (LLM integration)  

**Frontend**  
- React.js  

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)  
- **MongoDB**  
- **Python** (3.8+) for Flask  
- **npm** or **yarn**  

### Installation
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/saanjh-sahayak.git
cd saanjh-sahayak

# 2. Install backend deps
cd backend
npm install

# 3. Install Flask server deps
cd ../flask-server
pip install -r requirements.txt

# 4. Install frontend deps
cd ../frontend
npm install
