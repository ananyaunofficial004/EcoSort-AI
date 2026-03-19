localStorage.setItem("ecoScore", score);
let score = 0;

// Waste disposal guide
const guide = {
    "Plastic": "🟦 Blue Bin (Recyclable)",
    "Organic": "🟩 Green Bin (Biodegradable)",
    "Metal": "♻ Recycling Center",
    "E-Waste": "⚠ E-Waste Facility"
};

async function detectWaste() {

    let resultDiv = document.getElementById("result");

    // Loading effect
    resultDiv.innerHTML = "⏳ Detecting waste...";

    try {
        let response = await fetch("http://127.0.0.1:5000/detect", {
            method: "POST"
        });

        let data = await response.json();

        let wasteType = data.waste;

        // Show result + guide
        resultDiv.innerHTML = `
            <strong>Detected:</strong> ${wasteType} <br>
            <strong>Dispose in:</strong> ${guide[wasteType]}
        `;

        // Update score
        score += 10;

        let scoreElement = document.getElementById("score");
        if (scoreElement) {
            scoreElement.innerHTML = "Eco Score: " + score;
        }

    } catch (error) {
        resultDiv.innerHTML = "❌ Error connecting to server";
    }
}
