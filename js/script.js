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

let title;
let image;
let numberQuestions = 0;
let numberLevels = 0;
let divQuestions;

function followCreateQuizz() {
    title = document.querySelector(".input-quizz-title").value;
    console.log(title);
    image = document.querySelector(".input-image").value;
    console.log(image);
    numberQuestions = document.querySelector(".number-questions").value;
    console.log(numberQuestions);
    numberLevels = document.querySelector(".number-levels").value;
    console.log(numberLevels);
    const createYourQuestion = document.querySelector(".create-your-questions-box");
    const inicialInformationsQuizz = document.querySelector(".initial-informations-quizz").classList.add("hidden");
    createYourQuestion.classList.remove("hidden");   
    divQuestions = document.querySelector(".create-box")
    divQuestions.innerHTML = `
        <h4 class="create-your-questions">Crie suas perguntas</h4> 
    `;
    for (let i = 1; i <= numberQuestions; i++) {
        divQuestions.innerHTML += `
        <div class="box-closed">
            <span>Pergunta ${i}</span>
            <ion-icon class="edit-icon" name="create-outline" onclick="showQuestionForm(this)"></ion-icon>
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
    console.log(questionText);
    backgroundColor = document.querySelector(".input-background-color").value;
    console.log(backgroundColor);
    rightAnswer = document.querySelector(".input-right-answer").value;
    console.log(rightAnswer);
    urlImage = document.querySelector(".input-url-image-correct-answer").value;
    console.log(urlImage);
    wrongAnswer1 = document.querySelector(".input-wrong-answer").value;
    console.log(wrongAnswer1);
    urlImage1 = document.querySelector(".input-url-image-wrong-answer").value;
    console.log(urlImage1);
    wrongAnswer2 = document.querySelector(".input-wrong-answer2").value;
    console.log(wrongAnswer2);
    urlImage2 = document.querySelector(".input-url-image-wrong-answer2").value;
    console.log(urlImage2);
    wrongAnswer3 = document.querySelector(".input-wrong-answer3").value;
    console.log(wrongAnswer3);
    urlImage3 = document.querySelector(".input-url-image-wrong-answer3").value;
    console.log(urlImage3);
    


    const ToCreatLevels = document.querySelector(".decide-levels-box");
    const screenCreatYourQuestion = document.querySelector(".create-your-questions-box").classList.add("hidden");
    ToCreatLevels.classList.remove("hidden");
   
}

function showQuestionForm(element) {
    let showQuestionForm = document.querySelector(".create-box .edit-icon.selected");
    let questionSelected = element.parentNode.innerText.substring(8);
    element.parentNode.classList.remove("box-closed");
    element.parentNode.innerHTML = `
    <div class="div-question">
        <p>Pergunta ${questionSelected}</p>
        <ul class="set-question">
            <li>
                <input class="input-question" type="text" placeholder="Texto da pergunta">
            </li>
            <li>
                <input class="input-background-color" type="text" placeholder="Cor de fundo da pergunta">
            </li>
        </ul>
        <p>Resposta correta</p>
        <ul class="right-answer">
            <li>
                <input class="input-right-answer" type="text" placeholder="Resposta correta">
            </li>
            <li>
                <input class="input-url-image-correct-answer" type="text" placeholder="URL da imagem">
            </li>
        </ul>
        <p>Respostas incorreta</p>
        <ul class="wrong-answer">
            <li>
                <input class="input-wrong-answer" type="text" placeholder="Resposta incorreta 1">
            </li>
            <li>
                <input class="input-url-image-wrong-answer"  type="text" placeholder="URL da imagem 1">
            </li>
            <li>
                <input class="input-wrong-answer2" type="text" placeholder="Resposta incorreta 2">
            </li>
            <li>
                <input class="input-url-image-wrong-answer2" type="text" placeholder="URL da imagem 2">
            </li>
            <li>
                <input class="input-wrong-answer3" type="text" placeholder="Resposta incorreta 3">
            </li>
            <li>
                <input class="input-url-image-wrong-answer3" type="text" placeholder="URL da imagem 3">
            </li>

        </ul>                                    
    </div>
    `;
    let caixa = document.querySelector(".box-closed")

    if (showQuestionForm !== null) {
         showQuestionForm.classList.remove("selected");
     } 
    
    element.classList.add("selected");

}

let levelText;
let percentageHits;
let urlImageLevel;
let levelDescription;

function finishQuizz() {
    levelText = document.querySelector(".input-level-title").value;
    console.log(levelText);
    percentageHits = document.querySelector(".input-perc-hits").value;
    console.log(percentageHits);
    urlImageLevel = document.querySelector(".input-url-image-level").value;
    console.log(urlImageLevel);
    levelDescription = document.querySelector(".level-description").value;
    console.log(levelDescription);
    const ToFinishQuizz = document.querySelector(".finish-quizz");
    const screenCreatYourQuestion = document.querySelector(".decide-levels-box").classList.add("hidden");
    ToFinishQuizz.classList.remove("hidden");
}


// function postQuizz() {
//     const postedQuizz = {
//         title,
//         image,
//         questions: [
//             {
//                 title: questionText,
//                 color: backgroundColor,
//                 answers: [
//                     {
//                         text: rightAnswer,
//                         image: urlImage,
//                         isCorrectAnswer: true
//                     },
//                     {
//                         text: wrongAnswer1,
//                         image: urlImage1,
//                         isCorrectAnswer: false
//                     }
//                 ]
//             },
//             {
//                 title: questionText2,
//                 color: backgroundColor,
//                 answers: [
//                     {
//                         text: rightAnswer,
//                         image: urlImage,
//                         isCorrectAnswer: true
//                     },
//                     {
//                         text: wrongAnswer1,
//                         image: urlImage1,
//                         isCorrectAnswer: false
//                     }
//                 ]
//             },
//             {
//                 title: questionText3,
//                 color: backgroundColor,
//                 answers: [
//                     {
//                         text: rightAnswer,
//                         image: urlImage,
//                         isCorrectAnswer: true
//                     },
//                     {
//                         text: wrongAnswer1,
//                         image: urlImage1,
//                         isCorrectAnswer: false
//                     }
//                 ]
//             }
//         ],
//         levels: [
//             {
//                 title: levelText,
//                 image: urlImageLevel,
//                 text: levelDescription,
//                 minValue: 0
//             },
//             {
//                 title: levelText,
//                 image: urlImageLevel,
//                 text: levelDescription,
//                 minValue: percentageHits
//             }
//         ]
//     }

//     const postPromisseQuizz = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes")
//     postPromisseQuizz.then(quizzSent);
// }

// function quizzSent () {
//     getQuizzes();
// }










