// Generates random questions using the specified operations

const operations = ['+', '-', '*', '/','+-','-+','*+','*-','/+','/-','*+/','*-/','/+*','/-*'];
let questions = [];
//the random number generation to produce 2-digit numbers or 1-digit number
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 90) + 10; // 2-digit numbers
    const num2 = Math.floor(Math.random() * 90) + 10;
    const num3 = Math.floor(Math.random() * 90) + 10;;
    const num4 = Math.floor(Math.random() * 10); // 1-digit numbers
    const num5 = Math.floor(Math.random() * 10);
    const num6 = Math.floor(Math.random() * 10);
    const num7 = Math.floor(Math.random() * 10);
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let question, answer;
	
	// question and answer
    switch (operation) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num4} × ${num5}`;
            answer = num4 * num5;
            break;
        case '/':
            answer = Math.floor(num1 / num2);
            question = `${num1 * answer} ÷ ${num1}`;
            break;
        case '+-':
            question = `${num1} + ${num2} - ${num3}`;
            answer = num1 + num2 - num3;
            break;
        case '-+':
            question = `${num1} - ${num2} + ${num3}`;
            answer = num1 - num2 + num3;
            break;
        case '*+':
            question = `${num4} × ${num5} + ${num3}`;
            answer = num4 * num5 + num3;
            break;
        case '*-':
            question = `${num4} × ${num5} - ${num3}`;
            answer = num4 * num5 - num3;
            break;
        case '/+':
            answerdiv = Math.floor(num1 / num2);
            question = `${num1 * answerdiv} ÷ ${num1} + ${num3}`;
			answer = answerdiv + num3;
            break;
        case '/-':
            answerdiv = Math.floor(num1 / num2);
            question = `${num1 * answerdiv} ÷ ${num1} - ${num3}`;
			answer = answerdiv - num3;
            break;
        case '*+/':
            answerdiv = Math.floor(num1 / num2);
            question = `${num4} × ${num5} + ${num1 * answerdiv} ÷ ${num1}`;
			answer = num4* num5 + answerdiv;
            break;
        case '*-/':
            answerdiv = Math.floor(num1 / num2);
            question = `${num4} × ${num5} - ${num1 * answerdiv} ÷ ${num1}`;
			answer = num4 * num5 - answerdiv;
            break;
        case '/+*':
            answerdiv = Math.floor(num1 / num2);
            question = `${num1 * answerdiv} ÷ ${num1} + ${num4} × ${num5}`;
			answer = answerdiv + num4 * num5;
            break;
        case '/-*':
            answerdiv = Math.floor(num1 / num2);
            question = `${num1 * answerdiv} ÷ ${num1} - ${num4} × ${num5}`;
			answer = answerdiv - num4 * num5;
            break;
    }

    return { question, answer };
}

function createQuestionElement(index, { question, answer }) {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
        <span class="question-text">${question} = </span>
        <input type="number" class="answer-input" data-index="${index}" data-answer="${answer}">
        <span class="star" data-index="${index}">★</span>
        <span class="party-popper" data-index="${index}">🎉</span>
    `;
    return div;
}
//Generates a new question when the answer is incorrect
function refreshQuestion(input) {
    const index = parseInt(input.dataset.index);
    const newQuestion = generateQuestion();
    questions[index] = newQuestion;

    const questionElement = input.closest('.question');
    const questionTextElement = questionElement.querySelector('.question-text');
    questionTextElement.textContent = `${newQuestion.question} = `;

    input.value = '';
    input.dataset.answer = newQuestion.answer;
    input.classList.remove('correct', 'incorrect');

    const starElement = questionElement.querySelector('.star');
    starElement.classList.remove('correct');

    const popperElement = questionElement.querySelector('.party-popper');
    popperElement.classList.remove('show');
}


// Generates a new question or ends the game when the score reaches 4
//As typing the answer, it will be checked automatically
//called every time an input value changes
function checkAnswer(input) {
    const userAnswer = parseInt(input.value);
    const correctAnswer = parseInt(input.dataset.answer);
    const starElement = document.querySelector(`.star[data-index="${input.dataset.index}"]`);
    const popperElement = document.querySelector(`.party-popper[data-index="${input.dataset.index}"]`);
	
//toggle the 'correct' class on the star element
    if (userAnswer === correctAnswer) {
        input.classList.add('correct');
        input.classList.remove('incorrect');
        starElement.classList.add('correct'); 
        popperElement.classList.add('show');
        playPopperSound();
        setTimeout(() => popperElement.classList.remove('show'), 3000);
    } else {
        input.classList.add('incorrect');
        input.classList.remove('correct');
        starElement.classList.remove('correct');
        popperElement.classList.remove('show');
        setTimeout(() => {
            if (input.classList.contains('incorrect')) {
                refreshQuestion(input);
            }
        }, 1500); // Refresh after 1.5 seconds if answer is not correct
    }

    checkAllAnswers();
}

function playPopperSound() {
    const audio = new Audio('audios/Voicy_Confetti Sound effect.mp3');
    audio.play();
}

function playCelebrationSound() {
    const audio = new Audio('audios/Voicy_Kids cheering.mp3');
    audio.play();
}


// Add firework after all questions done

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.backgroundColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    return firework;
}

function startFireworks() {
    const container = document.getElementById('fireworks-container');
    container.classList.remove('hidden');
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = createFirework();
            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
    setTimeout(() => {
        container.classList.add('hidden');
        const nextAdventureButton = document.getElementById('next-adventure');
        nextAdventureButton.classList.remove('hidden');
        nextAdventureButton.style.display = 'inline-block';
    }, 5000);
}
function playFireworksSound() {
    const audio = new Audio('audios/Voicy_Multiple Fire Works With Whistling.mp3');
    audio.play();
}

//function checks if all questions are answered correctly and displays the result
// check Answers if correct then play sound, firework, and firworksound
function checkAllAnswers() {
    const inputs = document.querySelectorAll('.answer-input');
    const allCorrect = Array.from(inputs).every(input => input.classList.contains('correct'));

    if (allCorrect) {
        document.getElementById('result').textContent = 'Congratulations, you\'ve done the job well!';
        playCelebrationSound();
        startFireworks();
        playFireworksSound();
    } else {
        document.getElementById('result').textContent = '';
        // Ensure the button is hidden if not all answers are correct
        document.getElementById('next-adventure').classList.add('hidden');
    }
}


// Initialize
function init() {
    const questionsContainer = document.getElementById('questions-container');
    
	//Generates 4 random math questions when the page loads
    for (let i = 0; i < 4; i++) {
        const question = generateQuestion();
        questions.push(question);
        const questionElement = createQuestionElement(i, question);
        questionsContainer.appendChild(questionElement);
    }
	
// Add event listener at the end of init function
//the answer will be checked when the user finishes entering their answer
	
    questionsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('answer-input')) {
            checkAnswer(e.target);
        }
    });

    // Ensure the button is hidden initially
    const nextAdventureButton = document.getElementById('next-adventure');
    nextAdventureButton.classList.add('hidden');
    nextAdventureButton.style.display = 'none';

    nextAdventureButton.addEventListener('click', () => {
        window.location.href = 'room4.html';
    });
}

// Wrap the init function in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    init();
});

