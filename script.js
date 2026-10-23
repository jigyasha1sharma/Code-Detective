
const questions = [
    {
        question: "Why does this variable print undefined?",
        code: 'let age;\nconsole.log(age);',
        options: [
            "The variable has no value assigned",
            "console.log is incorrect",
            "let cannot store numbers"
        ],
        answer: 0,
        explanation: "The variable is declared but no value is assigned to it."
    },
    {
        question: "What is wrong with this condition?",
        code: 'let age = 20;\nif (age = 18) {\n    console.log("Adult");\n}',
        options: [
            "The variable should be const",
            "Use a comparison operator instead of =",
            "The console statement is wrong"
        ],
        answer: 1,
        explanation: "A single = assigns a value. Use >= to check whether age is at least 18."
    },
    {
        question: "Why does this print undefined?",
        code: 'let colors = ["red", "blue"];\nconsole.log(colors[2]);',
        options: [
            "Arrays cannot store strings",
            "The array is empty",
            "Index 2 does not exist in this array"
        ],
        answer: 2,
        explanation: "Array indexes start at 0. These elements are at indexes 0 and 1."
    },
    {
        question: "Why does this loop never stop?",
        code: 'for (let i = 0; i < 5; ) {\n    console.log(i);\n}',
        options: [
            "The counter is never increased",
            "The condition is incorrect",
            "Loops cannot use let"
        ],
        answer: 0,
        explanation: "Add i++ to increase the counter after every iteration."
    },
    {
        question: "Why does this function return undefined?",
        code: 'function add(a, b) {\n    a + b;\n}\nconsole.log(add(2, 3));',
        options: [
            "Functions cannot add numbers",
            "The function needs a return statement",
            "The parameters are incorrect"
        ],
        answer: 1,
        explanation: "Write return a + b; so the function sends the result back."
    },
    {
        question: "Why does this comparison return false?",
        code: 'let name = "Mira";\nconsole.log(name === "mira");',
        options: [
            "Strings cannot use ===",
            "The variable name is invalid",
            "JavaScript comparisons are case-sensitive"
        ],
        answer: 2,
        explanation: '"Mira" and "mira" have different capitalization.'
    },
    {
        question: "Why can this code cause an error?",
        code: 'let heading = document.getElementById("title");\nheading.textContent = "Hello";',
        options: [
            "The element may not exist or its ID may be incorrect",
            "textContent cannot change text",
            "getElementById returns a number"
        ],
        answer: 0,
        explanation: "If no element has the ID title, heading will be null."
    },
    {
        question: "Why does this array contain undefined values?",
        code: 'let nums = [1, 2, 3];\nlet result = nums.map(n => {\n    n * 2;\n});',
        options: [
            "map cannot work with numbers",
            "The callback needs to return the result",
            "Arrow functions cannot use arrays"
        ],
        answer: 1,
        explanation: "When using curly braces in an arrow function, write return n * 2."
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question");
const codeBlock = document.getElementById("code");
const optionsBox = document.getElementById("options");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent = q.question;
    codeBlock.textContent = q.code;

    optionsBox.innerHTML = "";
    message.textContent = "";
    nextBtn.disabled = true;

    q.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.textContent = String.fromCharCode(65 + index) + ". " + option;
        button.className = "option";

        button.addEventListener("click", function() {
            checkAnswer(index);
        });

        optionsBox.appendChild(button);
    });
}

function checkAnswer(selected) {
    if (answered) {
        return;
    }

    answered = true;

    const q = questions[currentQuestion];
    const buttons = optionsBox.querySelectorAll(".option");

    buttons.forEach(function(button) {
        button.disabled = true;
    });

    if (selected === q.answer) {
        score += 10;
        scoreText.textContent = score;

        buttons[selected].classList.add("correct");
        message.textContent = "Correct! " + q.explanation;
    } else {
        buttons[selected].classList.add("wrong");
        buttons[q.answer].classList.add("correct");

        message.textContent = "Not quite. " + q.explanation;
    }

    nextBtn.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "See Result";
    }
}

function nextQuestion() {
    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextBtn.textContent = "Next Question";
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionNumber.textContent = "Quiz completed!";
    questionText.textContent = "Your final score: " + score;
    codeBlock.textContent = "You completed all 8 debugging questions.";
    optionsBox.innerHTML = "";

    let result;

    if (score >= 70) {
        result = "Excellent debugging skills!";
    } else if (score >= 40) {
        result = "Good work! Keep practising.";
    } else {
        result = "Keep learning. Try the quiz again!";
    }

    message.textContent = result;
    nextBtn.disabled = true;
    nextBtn.textContent = "Completed";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    scoreText.textContent = score;
    nextBtn.textContent = "Next Question";

    showQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

showQuestion();

