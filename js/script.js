let quizzes = [];

function getQuizzes() {
    const getQuizzesPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes");
    getQuizzesPromise.then(listQuizzes);
}

function openQuizzById(quizzId) {
	for (let quizz of quizzes) {
        if (quizz.id === quizzId) {
            startQuizz(quizz)
            return
        }
    }
}

function renderQuizzes() {
    const ulQuizzes = document.querySelector(".all-quizzes .quizzes-list");

    let htmlQuizzes = ''

    let idListSerial = localStorage.getItem("id");
    let idVetorSerial = JSON.parse(idListSerial);

    if(idVetorSerial === null){
        idVetorSerial = [];
    }
    for (let quizz of quizzes) {
        if (idVetorSerial.indexOf(quizz.id) === -1) {

            htmlQuizzes += `
            <li class="option" id="${quizz.id}" onclick="openQuizzById(${quizz.id})">
                <img class="image-quiz" src="${quizz.image}">
                <div class="image-quiz-box"></div>
                <p>${quizz.title}</p>
            </li>
            `;
        }
    }

    ulQuizzes.innerHTML = htmlQuizzes
}

function listQuizzes(listQuizzesResponse) {
    quizzes = listQuizzesResponse.data;
    renderQuizzes();
    toListUserQuizz();
}
getQuizzes();


function showThirdScreen() {
     const thirdScreen = document.querySelector(".third-screen .initial-informations-quizz");
     const firstScreen = document.querySelector(".first-screen").classList.add("hidden");
     thirdScreen.classList.remove("hidden");
     document.querySelector('.third-screen').classList.remove('hidden')
}

let title;
let image;
let numberQuestions = 0;
let numberLevels = 0;
let divQuestions;

function followCreateQuizz() {
    title = document.querySelector(".input-quizz-title").value;
    image = document.querySelector(".input-image").value;
    numberQuestions = document.querySelector(".number-questions").value;
    numberLevels = document.querySelector(".number-levels").value;
    const createYourQuestion = document.querySelector(".create-your-questions-box");
    const inicialInformationsQuizz = document.querySelector(".initial-informations-quizz").classList.add("hidden");
    createYourQuestion.classList.remove("hidden");   
    divQuestions = document.querySelector(".create-box")
    divQuestions.innerHTML = `
        <h4 class="create-your-questions">Crie suas perguntas</h4> 
    `;
    for (let i = 1; i <= numberQuestions; i++) {
        divQuestions.innerHTML += `
        <div class="pergunta-fechada">
            <span>Pergunta ${i}</span>
            <ion-icon name="create-outline" onclick="editQuestion(this)"></ion-icon>
        </div>     
        `
    }

}

let questionText;
let backgroundColor;
let rightAnswer;
let urlImage;
let wrongAnswer1;
let wrongAnswer2;
let wrongAnswer3;
let urlImage1;
let urlImage2;
let urlImage3;

function followToCreatLevels() {

    questionText = document.querySelector(".input-question").value;
    backgroundColor = document.querySelector(".input-background-color").value;
    rightAnswer = document.querySelector(".input-right-answer").value;
    urlImage = document.querySelector(".input-url-image-correct-answer").value;
    wrongAnswer1 = document.querySelector(".input-wrong-answer").value;
    urlImage1 = document.querySelector(".input-url-image-wrong-answer").value;
    wrongAnswer2 = document.querySelector(".input-wrong-answer2").value;
    urlImage2 = document.querySelector(".input-url-image-wrong-answer2").value;
    wrongAnswer3 = document.querySelector(".input-wrong-answer3").value;
    urlImage3 = document.querySelector(".input-url-image-wrong-answer3").value; 


    const toCreatLevels = document.querySelector(".decide-levels-box");
    const screenCreatYourQuestion = document.querySelector(".create-your-questions-box").classList.add("hidden");
    toCreatLevels.classList.remove("hidden");
   
}

let levelText;
let percentageHits;
let urlImageLevel;
let levelDescription;

function finishQuizz() {
    levelText = document.querySelector(".input-level-title").value;
    percentageHits = document.querySelector(".input-perc-hits").value;
    urlImageLevel = document.querySelector(".input-url-image-level").value;
    levelDescription = document.querySelector(".level-description").value;
    const ToFinishQuizz = document.querySelector(".finish-quizz");
    const screenCreatYourQuestion = document.querySelector(".decide-levels-box").classList.add("hidden");
    ToFinishQuizz.classList.remove("hidden");
}
