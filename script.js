import {questions}  from "./questions.mjs";

const questionMain = document.getElementById('question-main');
const questionFiled = document.getElementById('field')
const answerMain = document.getElementById('answer-main');
const answerParentDiv = document.querySelector('.answers') 
const buttonMain = document.querySelector('button');
let questionIndex = 0;
let globalScoreTrack = 0;

// On loading the quiz app this shows up....
document.addEventListener('DOMContentLoaded', ()=>{
    questionMain.textContent = "Click Start to begin the Quiz Game."
    answerParentDiv.style.display = 'none';
})

// Reveals the correct answer with green background and the selected answer as red iff its wrong.
const revealAnswer =  (obj) => {
    questionIndex -= 1;
    const correctAnswer = questions[questionIndex].answers.find(element=>element.correct).answer || null;
    //use .find() which returns if atleast one value is true
    const listElements = answerMain.querySelectorAll('li')
    listElements.forEach(listElement => {
        if (listElement.textContent === correctAnswer) {
            listElement.style.backgroundColor = 'green';
        } else {
            if (listElement.textContent !== correctAnswer && obj.target === listElement) {
                listElement.style.backgroundColor = 'red';
            }
        }
    });
    questionIndex +=1;
    return correctAnswer; 
}

// Start the quiz game 
const startQuizGame = () => {

    if(questionIndex == questions.length){
        questionMain.innerHTML = 'ThankYou for playing..'
        questionFiled.innerHTML = `Your final score was ${globalScoreTrack}.`
        answerParentDiv.style.display='none'

        //hide the answer div
        buttonMain.textContent = 'The End'
    }
    questionMain.innerHTML = questions[questionIndex].question;
    questionFiled.innerHTML = questions[questionIndex].field;

    const answers = questions[questionIndex].answers.map(answer => `<li>${answer.answer}</li>`).join('');
    // create a list of all the answer elements using .map() to map the answers
    // then set it as innerHTML
    answerMain.innerHTML=answers;


    answerParentDiv.style.display = 'block';
    buttonMain.textContent = 'Next';
    answerMain.addEventListener('click',handleAnswerClick)
    questionIndex += 1;
}

const handleAnswerClick = (event) => {
    if (event.target.tagName === 'LI') {
        const correctAnswer = revealAnswer(event);
        if (event.target.textContent === correctAnswer) {
            globalScoreTrack++;
        }
        // Remove the event listener once it's triggered
        answerMain.removeEventListener('click', handleAnswerClick);
    }
};

// shows the next stage or question.
buttonMain.addEventListener('click', startQuizGame);
