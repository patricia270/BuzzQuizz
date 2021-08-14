let quizzes = [];

function getQuizzes() {
    const getQuizzesPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes");
    getQuizzesPromise.then(listQuizzes);
}

function renderQuizzes() {
    const ulQuizzes = document.querySelector(".all-quizzes .quizzes-list");
    ulQuizzes.innerHTML = `
        <li class="option" id="${quizzes[0].id}">
            <h2>Todos os Quizzes</h2> 
            <img class="image-quiz" src="${quizzes[0].image}">
            <div class="image-quiz-box"></div>
            <p>${quizzes[0].title}</p>
        </li>
        `;

    for (let i = 1; i < quizzes.length; i++) {
        ulQuizzes.innerHTML += `
        <li class="option" id="${quizzes[i].id}">
            <img class="image-quiz" src="${quizzes[i].image}">
            <div class="image-quiz-box"></div>
            <p>${quizzes[i].title}</p>
        </li>
        `;
    }
}

function listQuizzes(listQuizzesResponse) {
    quizzes = listQuizzesResponse.data;
    console.log(quizzes);
    renderQuizzes();
}
getQuizzes()

console.log("carregou")





