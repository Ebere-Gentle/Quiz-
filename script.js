// This is a template - you'll need to replace questions with your WPS document content
const questions = [
    // Question 1
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: "Paris"
    },
    // Question 2
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    // Add more questions here (up to 20)
    // ...
    // Question 20
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        answer: "Au"
    }
];

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionSelect = document.getElementById('question-select');
const scoreElement = document.getElementById('score');
const scoreAnimation = document.getElementById('score-animation');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;

// Initialize the quiz
function initQuiz() {
    // Populate question dropdown
    for (let i = 0; i < questions.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Question ${i + 1}`;
        questionSelect.appendChild(option);
    }
    
    // Add event listener for question navigation
    questionSelect.addEventListener('change', (e) => {
        currentQuestionIndex = parseInt(e.target.value);
        showQuestion();
    });
    
    // Show first question
    showQuestion();
}

// Display the current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add new options
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(option, button));
        optionsContainer.appendChild(button);
    });
    
    // Update selected question in dropdown
    questionSelect.value = currentQuestionIndex;
}

// Check if the selected answer is correct
function checkAnswer(selectedOption, button) {
    const question = questions[currentQuestionIndex];
    
    // Disable all buttons
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    if (selectedOption === question.answer) {
        // Correct answer
        button.classList.add('correct');
        correctSound.play();
        
        // Update score
        score += 2;
        scoreElement.textContent = score;
        
        // Show +2 animation
        scoreAnimation.classList.remove('hidden');
        setTimeout(() => {
            scoreAnimation.classList.add('hidden');
        }, 2000);
        
        // Move to next question after delay
        setTimeout(() => {
            moveToNextQuestion();
        }, 2000);
    } else {
        // Wrong answer
        button.classList.add('incorrect');
        wrongSound.play();
        
        // Highlight correct answer
        allButtons.forEach(btn => {
            if (btn.textContent === question.answer) {
                btn.classList.add('correct');
            }
        });
        
        // Move to next question after sound plays (5 seconds)
        setTimeout(() => {
            moveToNextQuestion();
        }, 5000);
    }
}

// Move to the next question
function moveToNextQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    showQuestion();
}

// Initialize the quiz when the page loads
window.addEventListener('DOMContentLoaded', initQuiz);
