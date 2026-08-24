// =========================================================
// RISKWISE
// Frontend Application Logic
// =========================================================


// =========================================================
// FORM ELEMENTS
// =========================================================

const riskForm = document.getElementById("riskForm");

const resultSection = document.getElementById("resultSection");
const riskBadge = document.getElementById("riskBadge");
const probabilityElement = document.getElementById("probability");
const progressElement = document.getElementById("progress");
const riskTitle = document.getElementById("riskTitle");
const riskDescription = document.getElementById("riskDescription");


// =========================================================
// FORM SUBMISSION
// =========================================================

riskForm.addEventListener("submit", async function (event) {

    // Prevent normal page reload
    event.preventDefault();

    // -----------------------------------------------------
    // Loading state
    // -----------------------------------------------------

    riskForm.classList.add("loading");

    const button = riskForm.querySelector(".assess-button");

    const originalButtonText = button.innerHTML;

    button.innerHTML = `
        <span>ANALYZING...</span>
        <span class="arrow">◌</span>
    `;


    try {

        // =================================================
        // COLLECT APPLICANT DATA
        // =================================================

        const applicantData = {

            // -------------------------------------------------
            // Basic information
            // -------------------------------------------------

            ID: Number(
                document.getElementById("ID").value
            ),

            LIMIT_BAL: Number(
                document.getElementById("LIMIT_BAL").value
            ),

            SEX: Number(
                document.getElementById("SEX").value
            ),

            EDUCATION: Number(
                document.getElementById("EDUCATION").value
            ),

            MARRIAGE: Number(
                document.getElementById("MARRIAGE").value
            ),

            AGE: Number(
                document.getElementById("AGE").value
            ),


            // -------------------------------------------------
            // Payment history
            // -------------------------------------------------

            PAY_0: Number(
                document.getElementById("PAY_0").value
            ),

            PAY_2: Number(
                document.getElementById("PAY_2").value
            ),

            PAY_3: Number(
                document.getElementById("PAY_3").value
            ),

            PAY_4: Number(
                document.getElementById("PAY_4").value
            ),

            PAY_5: Number(
                document.getElementById("PAY_5").value
            ),

            PAY_6: Number(
                document.getElementById("PAY_6").value
            ),


            // -------------------------------------------------
            // Billing amounts
            // -------------------------------------------------

            BILL_AMT1: Number(
                document.getElementById("BILL_AMT1").value
            ),

            BILL_AMT2: Number(
                document.getElementById("BILL_AMT2").value
            ),

            BILL_AMT3: Number(
                document.getElementById("BILL_AMT3").value
            ),

            BILL_AMT4: Number(
                document.getElementById("BILL_AMT4").value
            ),

            BILL_AMT5: Number(
                document.getElementById("BILL_AMT5").value
            ),

            BILL_AMT6: Number(
                document.getElementById("BILL_AMT6").value
            ),


            // -------------------------------------------------
            // Payment amounts
            // -------------------------------------------------

            PAY_AMT1: Number(
                document.getElementById("PAY_AMT1").value
            ),

            PAY_AMT2: Number(
                document.getElementById("PAY_AMT2").value
            ),

            PAY_AMT3: Number(
                document.getElementById("PAY_AMT3").value
            ),

            PAY_AMT4: Number(
                document.getElementById("PAY_AMT4").value
            ),

            PAY_AMT5: Number(
                document.getElementById("PAY_AMT5").value
            ),

            PAY_AMT6: Number(
                document.getElementById("PAY_AMT6").value
            )
        };


        // =================================================
        // SEND DATA TO FASTAPI
        // =================================================

        const response = await fetch("/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(applicantData)

        });


        // =================================================
        // HANDLE API ERRORS
        // =================================================

        if (!response.ok) {

            let errorMessage =
                "Unable to generate risk assessment.";

            try {

                const errorData =
                    await response.json();

                console.error(
                    "RiskWise API Error:",
                    errorData
                );

            } catch (error) {

                console.error(
                    "Could not read API error."
                );

            }

            throw new Error(errorMessage);
        }


        // =================================================
        // READ MODEL RESULT
        // =================================================

        const result = await response.json();

        console.log(
            "RiskWise prediction:",
            result
        );


        // =================================================
        // DISPLAY RESULT
        // =================================================

        displayResult(result);


    } catch (error) {

        console.error(
            "RiskWise Error:",
            error
        );

        alert(
            "Something went wrong while generating the risk assessment. Please make sure the RiskWise server is running."
        );


    } finally {

        // -------------------------------------------------
        // Remove loading state
        // -------------------------------------------------

        riskForm.classList.remove("loading");


        // -------------------------------------------------
        // Restore button
        // -------------------------------------------------

        button.innerHTML = originalButtonText;

    }

});


// =========================================================
// DISPLAY RESULT
// =========================================================

function displayResult(result) {

    // -----------------------------------------------------
    // Extract prediction values
    // -----------------------------------------------------

    const probability = Number(
        result.default_probability
    );

    const riskLevel = result.risk_level;


    // -----------------------------------------------------
    // Convert probability to percentage
    // -----------------------------------------------------

    const percentage =
        probability * 100;


    // -----------------------------------------------------
    // Display probability
    // -----------------------------------------------------

    probabilityElement.textContent =
        percentage.toFixed(1) + "%";


    // -----------------------------------------------------
    // Display risk level
    // -----------------------------------------------------

    riskTitle.textContent =
        riskLevel + " Risk";

    riskBadge.textContent =
        riskLevel.toUpperCase();


    // =====================================================
    // RISK LEVEL STYLING
    // =====================================================

    if (riskLevel === "Low") {

        riskDescription.textContent =
            "The applicant presents a relatively low probability of credit default based on the model assessment.";

        riskBadge.style.color =
            "#46d369";

        riskBadge.style.borderColor =
            "rgba(70, 211, 105, 0.35)";

        riskBadge.style.background =
            "rgba(70, 211, 105, 0.10)";

        progressElement.style.background =
            "#46d369";

        probabilityElement.style.color =
            "#46d369";

    }


    else if (riskLevel === "Moderate") {

        riskDescription.textContent =
            "The applicant presents a moderate probability of credit default. Additional review may be appropriate.";

        riskBadge.style.color =
            "#f5c518";

        riskBadge.style.borderColor =
            "rgba(245, 197, 24, 0.35)";

        riskBadge.style.background =
            "rgba(245, 197, 24, 0.10)";

        progressElement.style.background =
            "#f5c518";

        probabilityElement.style.color =
            "#f5c518";

    }


    else {

        riskDescription.textContent =
            "The applicant presents a high probability of credit default. Further assessment is recommended before extending credit.";

        riskBadge.style.color =
            "#e50914";

        riskBadge.style.borderColor =
            "rgba(229, 9, 20, 0.35)";

        riskBadge.style.background =
            "rgba(229, 9, 20, 0.10)";

        progressElement.style.background =
            "#e50914";

        probabilityElement.style.color =
            "#e50914";

    }


    // =====================================================
    // RESET PROGRESS BAR
    // =====================================================

    progressElement.style.width =
        "0%";


    // -----------------------------------------------------
    // Animate progress bar
    // -----------------------------------------------------

    setTimeout(() => {

        progressElement.style.width =
            Math.min(percentage, 100) + "%";

    }, 100);


    // =====================================================
    // SHOW RESULT CARD
    // =====================================================

    resultSection.classList.remove("hidden");


    // =====================================================
    // SCROLL TO RESULT
    // =====================================================

    setTimeout(() => {

        resultSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);

}