# Safe-Inbox 
AI-powered Chrome Extension to Detect Phishing & Email Threats

## Overview
**Safe-Inbox** is a security-focused Chrome extension that analyzes email content in real time to detect potential phishing attempts.  
It combines a browser extension with a backend API to analyze:
- Email subject & body
- Embedded URLs
- Suspicious patterns and risk indicators

The goal is to help users **understand risks instantly** before clicking malicious links.
## Project Architecture
Safe-Inbox/
│
├── chrome-extension/ # Browser Extension
│ ├── manifest.json
│ ├── background.js
│ ├── content.js
│ ├── popup.html
│ ├── popup.js
│ └── style.css
│
├── api/ # Backend API (FastAPI / ML)
│ ├──_pycache_
│ ├── app.py
│ ├── requirements.txt
│ ├── email-model.pkl
│ ├── email-vectorizer.pkl
│ ├── phishing_url_model.pkl
│ 
│
├── .gitignore
└── README.md


---

## 🛠️ Tech Stack

### Frontend (Chrome Extension)
- JavaScript
- HTML / CSS
- Chrome Extension APIs (Manifest V3)

### Backend (API)
- Python
- FastAPI
- Machine Learning (Phishing Detection Model)
- REST APIs

---

## How It Works

1. User opens an email
2. Chrome extension extracts:
   - Subject
   - Body
   - URLs
3. Data is sent to backend APIs
4. API analyzes content & URLs
5. Risk score + explanation is shown in popup UI

---

##  Features

- Email content scanning
- URL extraction & analysis
- Phishing risk score
- User-friendly alerts
- ML-based threat detection
- Modular extension + API design

---

## Setup Instructions

### 1.Clone the repository
git clone https://github.com/vysh-hub/Safe-Inbox.git
cd Safe-Inbox
### 2.Run the backend api
cd api
pip install -r requirements.txt
uvicorn app:app --reload
API runs at:
http://127.0.0.1:8000
### 3.Load chrome extention
Open Chrome → chrome://extensions
Enable Developer mode
Click Load unpacked
Select the chrome-extension/ folder
### Use Cases
Prevent phishing attacks
Increase email security awareness
Assist non-technical users
Enterprise & personal inbox protection
### Future Enhancements
LLM-based explanation of risks
Gmail / Outlook deep integration
Cloud deployment
User risk history dashboard
Multilingual support
### Author
Vyshnavi
Computer Science Student | Security & ML Enthusiast
### License
This project is for educational purpose.

