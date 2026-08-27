from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def sample_applicant():
    return {
        "ID": 1,
        "LIMIT_BAL": 200000,
        "SEX": 1,
        "EDUCATION": 2,
        "MARRIAGE": 1,
        "AGE": 30,

        "PAY_0": 0,
        "PAY_2": 0,
        "PAY_3": 0,
        "PAY_4": 0,
        "PAY_5": 0,
        "PAY_6": 0,

        "BILL_AMT1": 50000,
        "BILL_AMT2": 48000,
        "BILL_AMT3": 45000,
        "BILL_AMT4": 42000,
        "BILL_AMT5": 40000,
        "BILL_AMT6": 38000,

        "PAY_AMT1": 5000,
        "PAY_AMT2": 5000,
        "PAY_AMT3": 5000,
        "PAY_AMT4": 5000,
        "PAY_AMT5": 5000,
        "PAY_AMT6": 5000,
    }


def test_root():
    response = client.get("/")

    assert response.status_code == 200


def test_docs():
    response = client.get("/docs")

    assert response.status_code == 200


def test_openapi():
    response = client.get("/openapi.json")

    assert response.status_code == 200


def test_prediction_endpoint():
    response = client.post(
        "/predict",
        json=sample_applicant()
    )

    assert response.status_code == 200

    data = response.json()

    assert "prediction" in data
    assert "default_probability" in data
    assert "risk_level" in data


def test_prediction_probability_range():
    response = client.post(
        "/predict",
        json=sample_applicant()
    )

    assert response.status_code == 200

    data = response.json()

    probability = data["default_probability"]

    assert 0 <= probability <= 1


def test_prediction_risk_level():
    response = client.post(
        "/predict",
        json=sample_applicant()
    )

    assert response.status_code == 200

    data = response.json()

    assert data["risk_level"] in [
        "Low",
        "Moderate",
        "High"
    ]