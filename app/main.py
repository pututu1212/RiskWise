from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
import joblib


# --------------------------------------------------
# RiskWise Application
# --------------------------------------------------

app = FastAPI(
    title="RiskWise API",
    description="Credit Risk Prediction API",
    version="1.0.0"
)


# --------------------------------------------------
# Load trained ML artifacts
# --------------------------------------------------

model = joblib.load("models/risk_model.pkl")
preprocessor = joblib.load("models/preprocessor.pkl")


# --------------------------------------------------
# Serve frontend
# --------------------------------------------------

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


@app.get("/")
def root():
    return FileResponse("app/static/index.html")


# --------------------------------------------------
# Applicant input schema
# --------------------------------------------------

class Applicant(BaseModel):

    ID: int

    LIMIT_BAL: float
    SEX: int
    EDUCATION: int
    MARRIAGE: int
    AGE: int

    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int

    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float

    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict(applicant: Applicant):

    # Convert applicant input into DataFrame
    applicant_data = pd.DataFrame(
        [applicant.model_dump()]
    )

    # Apply the exact preprocessing used during training
    processed_data = preprocessor.transform(
        applicant_data
    )

    # Generate prediction
    prediction = model.predict(
        processed_data
    )[0]

    # Generate probability
    probability = model.predict_proba(
        processed_data
    )[0][1]


    # Determine risk level
    if probability < 0.30:
        risk_level = "Low"

    elif probability < 0.60:
        risk_level = "Moderate"

    else:
        risk_level = "High"


    return {
        "prediction": int(prediction),
        "default_probability": round(
            float(probability),
            4
        ),
        "risk_level": risk_level
    }