// script.js
function submitForm() {
    const radios = document.querySelectorAll('input[type="radio"]');
    let totalScore = 0;
    let group1Score = 0; // For questions 1, 5, 7, 8, 9, 10, 11, 12, 14
    let group2Score = 0; // For questions 2, 3, 4, 6, 13

    const group1Questions = [1, 5, 7, 8, 9, 10, 11, 12, 14];
    const group2Questions = [2, 3, 4, 6, 13];

    const numQuestions = radios.length / 5;

    for (let i = 0; i < numQuestions; i++) {
        let questionScore = 0;
        const radioName = `question${i + 1}`;
        const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
        if (selectedRadio) {
            questionScore = parseInt(selectedRadio.value);
            totalScore += questionScore;
            if (group1Questions.includes(i + 1)) {
                group1Score += questionScore;
            } else if (group2Questions.includes(i + 1)) {
                group2Score += questionScore;
            }
        }
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `Your total score is: ${totalScore} <br>`;

    let comment = "";
    if (totalScore <= 29) {
        comment = "You need to improve your listening skills. The people around you probably feel that you don't pay attention to them when they talk to you, and they may feel that you don't understand them. You can boost your listening skills with some simple steps.";
    } else if (totalScore <= 49) {
        comment = "Your listening skills are OK, but there's definitely room for improvement. Use the tools that we suggest below to develop your listening skills. Pay special attention to the advice on empathic listening – this is great for taking your listening skills to the next level.";
    } else if (totalScore <= 70) {
        comment = "You have good listening skills. People feel that they are able to approach you if they need someone to listen to them, and they trust that you'll give them your full attention. They also know that you'll give them space to talk freely, without interrupting or talking too much about yourself. But that doesn't mean you have to stop here. Read our guidance below to see if you can develop your skills even further. You could also help others to develop their listening skills through coaching or mentoring.";
    } else {
        comment = "Thank you! We are thrilled that you loved our product.";
    }

    resultsDiv.innerHTML += `<strong>${comment}</strong> <br><br>`;

    resultsDiv.innerHTML += "Listening is considered a fundamental skill that is important for many aspects of life, including communication, relationships, and leadership.<br>";
    resultsDiv.innerHTML += "Listening is arguably the most crucial skill, though it's more than a mere skill – it's a virtue.<br><br>";

    resultsDiv.innerHTML += `Active Listening: ${group1Score} <br>`;
    resultsDiv.innerHTML += `Empathic Listening: ${group2Score} <br>`;
    resultsDiv.innerHTML += `Total Group Score: ${group1Score + group2Score} <br><br>`;

    const scores = [group1Score, group2Score];
    const minScore = Math.min(...scores);
    const sortedScores = [...scores].sort((a, b) => a - b);
    const colors = scores.map(score => {
        if (score === minScore) return "red";
        if (score === sortedScores[1]) return "blue";
        return "grey";
    });

    let barChartHTML = "<div style='display: flex;'>";
    for (let i = 0; i < scores.length; i++) {
        barChartHTML += `<div class="bar ${colors[i]}" style="height: ${scores[i] * 10}px;">${scores[i]}</div>`;
    }
    barChartHTML += "</div>";

    resultsDiv.innerHTML += barChartHTML;

    resultsDiv.innerHTML += "<button onclick='window.print()'>Print</button>";
}

