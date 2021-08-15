let quizzes = [];

function getQuizzes() {
    const getQuizzesPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes");
    getQuizzesPromise.then(listQuizzes);
}

function openQuizzById(quizzId) {
	for (let quizz of quizzes) {
        if (quizz.id === quizzId) {
            console.log(quizz)
            startQuizz(quizz)
            return
        }
    }
}

function renderQuizzes() {
    const ulQuizzes = document.querySelector(".all-quizzes .quizzes-list");

    let htmlQuizzes = ''

    for (let quizz of quizzes) {
        htmlQuizzes += `
        <li class="option" id="${quizz.id}" onclick="openQuizzById(${quizz.id})">
            <img class="image-quiz" src="${quizz.image}">
            <div class="image-quiz-box"></div>
            <p>${quizz.title}</p>
        </li>
        `;
    }

    ulQuizzes.innerHTML = htmlQuizzes
}

function listQuizzes(listQuizzesResponse) {
    quizzes = listQuizzesResponse.data;
    console.log(quizzes);
    renderQuizzes();
}
getQuizzes();

function showThirdScreen() {
     const thirdScreen = document.querySelector(".third-screen .initial-informations-quizz");
     const firstScreen = document.querySelector(".first-screen").classList.add("hidden");
     thirdScreen.classList.remove("hidden");
}


function followCreateQuizz() {
    const createYourQuestion = document.querySelector(".create-your-questions-box");
    const inicialInformationsQuizz = document.querySelector(".initial-informations-quizz").classList.add("hidden");
    createYourQuestion.classList.remove("hidden");
    
}

function followToCreatLevels() {
    const ToCreatLevels = document.querySelector(".decide-levels-box");
    const screenCreatYourQuestion = document.querySelector(".create-your-questions-box").classList.add("hidden");
    ToCreatLevels.classList.remove("hidden");
}

function finishQuizz() {
    const ToFinishQuizz = document.querySelector(".finish-quizz");
    const screenCreatYourQuestion = document.querySelector(".decide-levels-box").classList.add("hidden");
    ToFinishQuizz.classList.remove("hidden");
}






