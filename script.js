const questions = [
    { question: "Who is known as the Father of the Indian Nation?", options: ["Nehru", "Gandhi", "Patel", "Bose"], answer: "Gandhi" },
    { question: "Which city is known as the Silicon Valley of India?", options: ["Hyderabad", "Chennai", "Bangalore", "Mumbai"], answer: "Bangalore" },
    { question: "What is the national animal of India?", options: ["Lion", "Elephant", "Tiger", "Peacock"], answer: "Tiger" },
    { question: "Who wrote the Indian National Anthem?", options: ["Tagore", "Premchand", "Sarojini Naidu", "Subhash Bose"], answer: "Tagore" },
    { question: "What is the currency of India?", options: ["Dollar", "Rupee", "Yen", "Peso"], answer: "Rupee" },
    { question: "Which is the longest river in India?", options: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"], answer: "Ganga" },
    { question: "Which Indian festival is called the 'Festival of Lights'?", options: ["Holi", "Diwali", "Dussehra", "Eid"], answer: "Diwali" },
    { question: "Who was India's first Prime Minister?", options: ["Gandhi", "Nehru", "Patel", "Ambedkar"], answer: "Nehru" },
    { question: "Which is the largest state in India by area?", options: ["UP", "Maharashtra", "Rajasthan", "MP"], answer: "Rajasthan" },
    { question: "Which Indian sportsperson has won the most Olympic medals?", options: ["Dhyan Chand", "Sushil Kumar", "PV Sindhu", "Abhinav Bindra"], answer: "PV Sindhu" },
];

let shuffledQuestions = questions.sort(() => Math.random() - 0.5);

let currentQuestionIndex = 0;
let score = 0;
let playerName = "";

document.getElementById("start-btn").addEventListener("click", function () {
    let nameInput = document.getElementById("username").value.trim();
    if (nameInput === "") {
        alert("Please enter your name to start the quiz.");
        return;
    }
    playerName = nameInput;
    
    document.getElementById("welcome-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");

    loadQuestion();
});

function loadQuestion() {
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    let q = shuffledQuestions[currentQuestionIndex];
    let questionElement = document.createElement("h2");
    questionElement.innerText = q.question;
    quizContainer.appendChild(questionElement);

    q.options.forEach(option => {
        let optionElement = document.createElement("div");
        optionElement.innerText = option;
        optionElement.classList.add("option");
        optionElement.onclick = () => checkAnswer(option, optionElement);
        quizContainer.appendChild(optionElement);
    });
}

function checkAnswer(selected, element) {
    let correctAnswer = shuffledQuestions[currentQuestionIndex].answer;

   
    document.querySelectorAll(".option").forEach(opt => opt.onclick = null);

    if (selected === correctAnswer) {
        element.style.backgroundColor = "#4CAF50"; 
        score += 10;
    } else {
        element.style.backgroundColor = "#FF4C4C"; 
        document.querySelectorAll(".option").forEach(opt => {
            if (opt.innerText === correctAnswer) opt.style.backgroundColor = "#4CAF50";
        });
    }

    currentQuestionIndex++;
    setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById("score").innerText = score;
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
}

document.getElementById("submit-score").addEventListener("click", function () {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    displayLeaderboard(leaderboard);
});

function displayLeaderboard(leaderboard) {
    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${index + 1}. ${entry.name} - ${entry.score} pts`;
        if (entry.name === playerName) listItem.style.fontWeight = "bold";
        leaderboardList.appendChild(listItem);
    });

    document.getElementById("leaderboard").classList.remove("hidden");
}
