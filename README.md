# RiskWise

RiskWise is a machine-learning based credit risk assessment application I built to estimate the probability of credit default for a loan or credit applicant.

Enter an applicant's demographic, credit-limit, billing, and repayment information and RiskWise processes the data through the same preprocessing pipeline used during model training before generating a default probability and risk classification.

## What it can do

- Accept applicant demographic and financial information
- Process six months of payment history
- Process six months of billing amounts
- Process six months of payment amounts
- Apply the trained preprocessing pipeline to new applicant data
- Generate a credit-default prediction using a Random Forest classifier
- Calculate the applicant's probability of default
- Classify applicants into Low, Moderate, or High risk
- Display the assessment through a responsive web interface
- Provide a visual probability indicator and risk summary

## Why I built it

Credit risk assessment involves evaluating multiple financial and repayment-related factors rather than relying on a single value.

RiskWise was built to demonstrate how a trained machine-learning model can be turned into a usable application by connecting the complete pipeline:

Applicant Input → Data Preprocessing → Machine Learning Model → Risk Assessment → Web Interface

The project focuses not only on training a model, but also on serving the trained model through an API and providing a simple interface through which users can interact with it.

## How it works

1. The user enters applicant information through the RiskWise interface.
2. JavaScript collects the form data and sends it to the FastAPI backend.
3. FastAPI validates the request using a Pydantic schema.
4. The trained preprocessing pipeline transforms the applicant data.
5. The Random Forest classifier generates a prediction and default probability.
6. RiskWise converts the probability into a risk category.
7. The result is returned to the frontend and displayed to the user.

Risk classification is currently based on the model's predicted probability:

- Below 30% → Low Risk
- 30% to below 60% → Moderate Risk
- 60% and above → High Risk

## Tech Stack

- Python
- FastAPI
- Pydantic
- Pandas
- Scikit-learn
- Joblib
- HTML
- CSS
- JavaScript
- Random Forest Classifier

## API

### `POST /predict`

Accepts applicant information and returns a credit risk assessment.

Example response:

```json
{
    "prediction": 0,
    "default_probability": 0.271,
    "risk_level": "Low"
}