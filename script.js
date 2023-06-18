console.log("Hii Moin Khan");

// Making JSON From where we will fetch our all data( quizes )

const questions = [
    {
        question: "Which type of JavaScript language is ___",
        answers: [
            { text: "Object_Based", correct: "true" },
            { text: "Object_Oriented", correct: "false" },
            { text: "Assembly_Language", correct: "false" },
            { text: "High_Level", correct: "false" }

        ],
    }, {
        question: "Which one of the following also known as Conditional Expression:",
        answers: [
            { text: "Alternative to if-else", correct: "false" },
            { text: "Switch statement", correct: "false" },
            { text: "If-then-else statement", correct: "false" },
            { text: "immediate if", correct: "true" }

        ],
    }, {
        question: " In JavaScript, what is a block of statement?",
        answers: [
            { text: "Conditional block", correct: "false" },
            { text: "Block that combines a number of statements into a single compund statement", correct: "true" },
            { text: "Both conditional block and a single statement", correct: "false" },
            { text: "Block that contains a single statement", correct: "false" }

        ],
    }, {
        question: "When interpreter encounter an empty statements , what it will do: ",
        answers: [
            { text: "Shows a warning", correct: "false" },
            { text: "Prompts to complete the statement", correct: "false" },
            { text: "Throws an error", correct: "false" },
            { text: "Ignores the statements", correct: "true" }

        ],
    }, {
        question: "The  \" function \" and \"var\" are known as : ",
        answers: [
            { text: "Keywords", correct: "false" },
            { text: "Data Types", correct: "false" },
            { text: "Declaration Statements", correct: "true" },
            { text: "Prototypes", correct: "false" }

        ],
    }, {
        question: "Which one of the following is the correct way for calling the JavaScript code?",
        answers: [
            { text: "Preprocessor", correct: "false" },
            { text: "Triggering Event", correct: "false" },
            { text: "RMI", correct: "false" },
            { text: "Function/Method", correct: "true" }

        ],
    }, {
        question: "Which of the following type of a variable is volatile?",
        answers: [
            { text: "Mutable variable", correct: "true" },
            { text: "Dynamic Variable", correct: "false" },
            { text: "Volatile Variable", correct: "false" },
            { text: "Immutable Variable", correct: "false" }

        ],
    }, {
        question: " Which of the following option is used as hexadecimal literal beginning?",
        answers: [
            { text: "00", correct: "false" },
            { text: "0x", correct: "false" },
            { text: "0X", correct: "false" },
            { text: "Both 0x and 0X", correct: "true" }

        ],
    }, {
        question: " In the JavaScript, which one of the following is not considered as an error:",
        answers: [
            { text: "Syntax error", correct: "false" },
            { text: "Missing of semicolons", correct: "false" },
            { text: "Division by zero", correct: "true" },
            { text: "Missing of Bracket", correct: "false" }

        ],
    }, {
        question: " Which of the following number object function returns the value of the number? ",
        answers: [
            { text: "toString()", correct: "false" },
            { text: "valueOf()", correct: "true" },
            { text: "toLocaleString()", correct: "false" },
            { text: "toPrecision()", correct: "false" }

        ],

    }
]

// Getting all the required Elements 
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answerButtons')
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let scoreElement = document.getElementById('score');
let attemptedElement = document.getElementById('attempt');


// Declaring all the varibale
let currentQuestionNo = 0;
let score = 0;
var startingMuinutes = 2;
let time = startingMuinutes * 60;

// Function which is used to check the answers are correct or not?  
function selectAnswer(event) {
    // Getting the particular button 
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct == "true";
    if (isCorrect) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Once the user clicked then making each button disabled so that he/she will not be able to click again.
    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            // Showing the correct answer
            button.classList.add('correct');
        }
    })
    nextButton.style.display = 'block';
}

// Function which is used to hide previous question 
function hidePrevious() {
    nextButton.style.display = 'none';
    // Removing each child of answerButtons to hide previous options
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

// Function which is used to show the curent question. 
function showQuestions() {
    // Showing the current question but hiding the previous options first.
    hidePrevious();
    const currentQuestion = questions[currentQuestionNo];
    questionElement.innerText = currentQuestion.question;

    // Getting all the options from the json corresponding to their questions
    currentQuestion.answers.forEach((ans) => {
        const button = document.createElement('button');
        button.innerHTML = ans['text']
        button.classList.add('btn1');
        answerButtons.appendChild(button);
        if (ans.correct) {
            // Adding dataset to mark the button as true or false.
            button.dataset.correct = ans.correct;
        }
        button.addEventListener('click', selectAnswer);
    })

    // Showing the information on the Form
    nextButton.innerHTML = "Next &rarr;";
    scoreElement.innerText = `Score : ${score}`;
    attemptedElement.innerText = `Attempted : ${currentQuestionNo} of ${questions.length}`
}

function updateTime() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    // seconds = seconds < 5 ? 0 + seconds : seconds;
    timeToEnd.innerHTML = `Left : ${minutes} - ${seconds}`
    console.log(minutes, seconds);
    if (minutes <= 0 && seconds <= 0) {
        document.getElementById('timeToEnd').innerHTML = '<h4 style="color:red">TimeOut</h4>';
        showScore();
        clearInterval(clrIntervel)
        seconds = time % 60;
        console.log(minutes, seconds)
        console.log(startingMuinutes)
    }
    time--;
}
// Function - Use to start the process / Quiz.
function startQuiz() {
    // prevButton.style.display = 'none';
    document.getElementById('startQuiz').style.display = 'none';
    currentQuestionNo = 0;
    score = 0;
    showQuestions();
    clrIntervel = setInterval(updateTime, 1000)
}


// Function - Used to show the score at last.
function showScore() {
    hidePrevious();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = 'block';
    prevButton.style.display = "none";

}

// Function - Handles the next button functioning
function handleNextButton() {
    currentQuestionNo++;
    if (currentQuestionNo < questions.length) {
        showQuestions();
    } else {
        scoreElement.innerHTML = `Score : ${score}`;
        attemptedElement.innerText = `Attempted : ${currentQuestionNo} of ${questions.length}`
        showScore();
    }
}

// Adding Eventlisterner to the nextButton
nextButton.addEventListener('click', () => {
    if (currentQuestionNo < questions.length) {
        handleNextButton();
    } else {
        location.reload();
        location.href = 'http://127.0.0.1:5500/index.html#main';
        startQuiz();
    }
})


// Calling the startQuiz to start process
nextButton.style.display = 'none';
prevButton.style.display = 'none';

document.getElementById('startQuiz').addEventListener('click', () => {
    gsap.from('#app', {
        duration: 1,
        yoyo: true,
        // repeat:1,
        // rotate:360,
        opacity: 0,
        rotationY: 360,
    })
    gsap.to('#incrementLine', {
        opacity: 1,
        duration: 2 * 60,
        width: "100%",
        ease: "linear",

    })
    startQuiz();
})

//      ***********DarkMode /LightMode****************

let mode = document.getElementById('mode');
mode.addEventListener('click', (event) => {
    console.log(event.target.innerHTML);
    if (event.target.classList.contains('light')) {
        event.target.classList.remove('light')
        event.target.classList.add('dark')
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        event.target.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
        timeToEnd.style.color = "black";
        document.getElementById('app').style.backgroundColor = '#2c2c2c';
        document.getElementById('title').style.color = "blueviolet";
        document.getElementById('btn').style.backgroundColor = 'rgba(255,255,255,0.1)';
        document.getElementById('attempt').style.color = '#ff0000c2';
        document.getElementById('timeToEnd').style.color = "whitesmoke";
        // document.querySelectorAll('.bubbles').style.backGround='linear-gradient(45deg,rgba(255,255,255,0.4),blueviolet,red,rgba(255,255,255,0.2)'

    } else {
        event.target.classList.add('light')
        event.target.classList.remove('dark')
        document.body.style.backgroundColor = '#f6f5f5';
        document.body.style.color = 'blueviolet';
        event.target.innerHTML = '<ion-icon name="moon"></ion-icon>';
        document.getElementById('app').style.backgroundColor = 'white';
        document.getElementById('title').style.color = "blueviolet";
        document.getElementById('btn').style.backgroundColor = 'blueviolet';
        document.getElementById('attempt').style.color = 'red';
        document.getElementById('timeToEnd').style.color = "black";

    }
}
)

let app = document.getElementById('app');
// app.addEventListener('mousemove', (e) => {
//     x = e.offsetX;
//     y = e.offsetY;
//     console.log(e);
//     app.style.transition = `translate(${x}, ${y})`;
//     console.log(x,y);
//     gsap.to('#app', {
//         translateX: x,
//         translateY: y,
//         yoyo: true,
//         duration:0.1,
//     })
// })

//   //   //    // ******** GSAP  ********  //  //  //  //

title = document.getElementById('title');
titleScale = gsap.to(title, {
    scale: 1.3, repeat: -1, yoyo: true, paused: true
})
title.addEventListener('mouseenter', () => {
    titleScale.restart();
})
title.addEventListener('mouseleave', () => {
    titleScale.pause();
    gsap.to(title, { scale: 1 })
})
navTime = gsap.timeline()
navTime
    .from('#nav', {
        top: -100,
        opacity: 0,
        duration: 1,
    })
    .from("#nav div h3", {
        opacity: 0,
        x: -20,
        duration: 0.2,
        rotate: 360,
        scale: 1.5,
    })
    .from('.navLinks ul li ,.login a,#mode ion-icon', {
        opacity: 0,
        duration: 1,
        scale: 1.5,
        ease: "linear",
        stagger: 0.2,
        x: -60,
    })
    .from("#main", {
        opacity: 0,
        duration: 0.2,
    })
    .from("#mainLeft", {
        opacity: 0,
        x: -1000,
    })
    .from("#mainRight", {
        opacity: 0,
        x: 2000,
    }, "<0")


gsap.from('#app, #app h1, #app div,#app buttons , #answerButtons ', {
    opacity: 0,
    duration: 2,
    stagger: 0.3,
    transformOrigin:"bottom",
    
    y:100,
    // repeat:-1,
    // yoyo: true,
    ease: "elastic",
    transformOrigin:'0% 50%',

    scrollTrigger: {
        trigger: "#app",
        scroller: "body",
        // markers: true,
        start: "top 120%",


    },

})



document.querySelector('#quizMainSection').addEventListener('mousemove', (e) => {
    // console.log('mousemoved');
    v1 = e.clientX;
    v2 = e.clientY;
    console.log(e);
    // console.log('offset X', v1);
    // console.log('offset Y', v2);
    translate = `${v1}px ${v2}px`; console.log(translate);

    // console.log(trnaslate);
    tl=gsap.timeline();
    tl.fromTo('.bubbles',{opacity:1,scale:1}, {
        translate: translate,
        opacity: 0,
        scale:0.4,
        // repeat: -1,
        transformOrigin: "0% 50%",
        stagger: { each: 0.05, ease: "linear" },
        // duration: 1,
    })


})
