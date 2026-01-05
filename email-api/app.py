from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load saved files
vectorizer = joblib.load(open("email_vectorizer.pkl", "rb"))
email_model = joblib.load(open("email_model.pkl", "rb"))
url_model = joblib.load(open("phishing_url_model.pkl","rb"))

app = FastAPI()

class EmailRequest(BaseModel):
    subject: str
    body: str
class URLRequest(BaseModel):
    url: str

@app.get("/")
def home():
    return {"message": "Phishing email Detection API is running"}
@app.post("/predict-body")
def predict_email(data: EmailRequest):
    text = data.subject + " " + data.body
    text_vec = vectorizer.transform([text])

    phishing_prob = email_model.predict_proba(text_vec)[0][1]
    legit_prob = email_model.predict_proba(text_vec)[0][0]

    return {
        "phishing_prob": float(phishing_prob),
        "legit_prob": float(legit_prob)
    }
@app.post("/predict-url")
def predict(request: URLRequest):
    prob = url_model.predict_proba([request.url])[0]
    return {
        "url": request.url,
        "legit_prob": float(prob[0]),
        "phishing_prob": float(prob[1])
    }
