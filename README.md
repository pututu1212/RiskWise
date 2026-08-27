# RiskWise

RiskWise is a machine-learning powered credit risk assessment application that predicts the probability of credit card default from an applicant's financial and demographic information.

The application provides a simple web interface where users can enter applicant details and receive a real-time risk assessment, including the predicted default probability and an interpretable risk level.

## What RiskWise Does

RiskWise takes applicant information such as:

- Credit limit
- Age
- Education
- Marital status
- Payment history
- Previous billing amounts
- Previous payment amounts

and sends the data to a FastAPI backend.

A trained Random Forest classifier processes the applicant's financial profile and returns:

- Default probability
- Risk classification
- Risk explanation

The frontend then presents the result through a clean, Netflix-inspired dark interface.

## Example

A submitted applicant may receive a result such as:

```text
Default Probability: 47.8%

Risk Level: MODERATE

The applicant presents a moderate probability
of credit default. Additional review may be appropriate.
