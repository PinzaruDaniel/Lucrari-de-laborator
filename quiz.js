// Quiz Application
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = 0;

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        console.log(`Loaded ${questions.length} questions`);
        initQuiz();
    } catch (error) {
        console.error('Error loading questions:', error);
        document.getElementById('questionDisplay').textContent = 'Error loading questions. Please make sure questions.json exists.';
    }
}

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = 0;
    displayQuestion();
    updateProgress();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    
    // Update question counter
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Display topic
    document.getElementById('topicDisplay').textContent = question.topic;
    
    // Display question
    document.getElementById('questionDisplay').textContent = question.question;
    
    // Display answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.innerHTML = `<span class="label">${answer.label}:</span>${answer.text}`;
        button.onclick = () => selectAnswer(answer.label);
        answersContainer.appendChild(button);
    });
    
    // Hide feedback and next button
    document.getElementById('feedbackContainer').classList.remove('show');
    document.getElementById('feedbackContainer').className = 'feedback-container';
    document.getElementById('nextBtn').style.display = 'none';
}

// Handle answer selection
function selectAnswer(selectedLabel) {
    const question = questions[currentQuestionIndex];
    const isCorrect = question.correct.includes(selectedLabel);
    
    // Update score
    answeredQuestions++;
    if (isCorrect) {
        score++;
    }
    
    // Disable all answer buttons
    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(btn => {
        btn.disabled = true;
        
        // Get the label from the button
        const btnLabel = btn.querySelector('.label').textContent.replace(':', '');
        
        // Mark correct answers
        if (question.correct.includes(btnLabel)) {
            btn.classList.add('correct');
        }
        
        // Mark the selected incorrect answer
        if (btnLabel === selectedLabel && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Update progress
    updateProgress();
    
    // Show next button
    document.getElementById('nextBtn').style.display = 'block';
}

// Show feedback after answer selection
function showFeedback(isCorrect, question) {
    const feedbackContainer = document.getElementById('feedbackContainer');
    feedbackContainer.classList.add('show');
    
    if (isCorrect) {
        feedbackContainer.classList.add('correct');
        feedbackContainer.innerHTML = `
            <h3>✓ Correct!</h3>
            <p>Well done! You selected the right answer.</p>
        `;
    } else {
        feedbackContainer.classList.add('incorrect');
        const correctAnswersText = question.correct.map(label => {
            const answer = question.answers.find(a => a.label === label);
            return `<strong>${label}: ${answer.text}</strong>`;
        }).join(', ');
        
        feedbackContainer.innerHTML = `
            <h3>✗ Incorrect</h3>
            <p>The correct answer${question.correct.length > 1 ? 's are' : ' is'}: ${correctAnswersText}</p>
        `;
    }
}

// Update progress bar and score display
function updateProgress() {
    const progress = (answeredQuestions / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    const percentage = answeredQuestions > 0 ? Math.round((score / answeredQuestions) * 100) : 0;
    document.getElementById('scoreDisplay').textContent = `Score: ${percentage}%`;
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Show final results
function showResults() {
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    
    const percentage = Math.round((score / questions.length) * 100);
    document.getElementById('finalScore').textContent = `${percentage}%`;
    document.getElementById('scoreBreakdown').textContent = 
        `You answered ${score} out of ${questions.length} questions correctly`;
}

// Restart the quiz
function restartQuiz() {
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';
    initQuiz();
}

// Event listeners
document.getElementById('nextBtn').addEventListener('click', nextQuestion);
document.getElementById('restartBtn').addEventListener('click', restartQuiz);
document.getElementById('restartFinalBtn').addEventListener('click', restartQuiz);

// Load questions when page loads
loadQuestions();
