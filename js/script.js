let correctAnswersCount = 0
let wrongAnswersCount = 0
let currentQuizz = {
	id: 1,
	title: "Título do quizz",
	image: "https://http.cat/411.jpg",
	questions: [
		{
			title: "Título da pergunta 1",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 2",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		},
		{
			title: "Título da pergunta 3",
			color: "#123456",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true
				},
				{
					text: "Texto da resposta 2",
					image: "https://http.cat/412.jpg",
					isCorrectAnswer: false
				}
			]
		}
	],
	levels: [
		{
			title: "Título do nível 1",
			image: "https://http.cat/411.jpg",
			text: "Descrição do nível 1",
			minValue: 0
		},
		{
			title: "Título do nível 2",
			image: "https://http.cat/412.jpg",
			text: "Descrição do nível 2",
			minValue: 50
		}
	]
}

function getIndexOfAnElement(element) {
	const listOfChilds = element.parentNode.children
	const indexOfElement = [...listOfChilds].indexOf(element)

	return indexOfElement
}

function setOtherItemsAsUnSelected(item) {
	let alternatives = item.parentNode.parentNode.querySelectorAll('.alternative')

	alternatives = [...alternatives]

	alternatives.forEach(alternative => alternative.classList.add('unselected'))
	item.classList.remove('unselected')
}

function updateCorrectAndWrongAnswers(question) {
	const questionIndex = getIndexOfAnElement(question)

	const questionAnswers = currentQuizz.questions[questionIndex].answers
	const questionAlternativesElements = [...question.querySelectorAll('.alternative')]

	questionAnswers.forEach((answer, index) => {
		const alternative = questionAlternativesElements[index]
		if (answer.isCorrectAnswer) {
			alternative.classList.add('correct')
		} else {
			alternative.classList.add('wrong')
		}
	})
}

function updateCounters(alternative) {
	if (alternative.classList.contains('correct')) {
		correctAnswersCount++
	} else {
		wrongAnswersCount++
	}
}

function removeOnClick(element) {
	element.removeAttribute("onclick")
}

function scrollToAndCenter(element, behavior='smooth') {

	window.scrollTo({ top: element.offsetTop, behavior: behavior })
}

function scrollToNextElement(element) {
	const nextElement = element.nextSibling

	if (nextElement !== null) scrollToAndCenter(nextElement)
}

function calculateScore() {
	let score = correctAnswersCount / currentQuizz.questions.length
	score *= 100
	return Math.round(score)
}

function getLevel(score) {
	const levelsThatAreSatisfied = currentQuizz.levels.filter(level => level.minValue <= score)
	const level = levelsThatAreSatisfied[levelsThatAreSatisfied.length - 1]
	return level
}

function renderResult(level, score) {
	const ulBoxes = document.querySelector('ul.boxes')
	ulBoxes.innerHTML += `<li class="result">
		<p>${score}% de acerto: ${level.title}</p>
		<div class="result-description-container">
			<img src="${level.image}">
			<p>${level.text}</p>
		</div>
	</li>`

	setTimeout(()=> scrollToAndCenter(ulBoxes.lastChild), 2000)
}

function handleClickOnItem(item) {
	const thisQuestion = item.parentNode.parentNode
	const allAlternatives = thisQuestion.querySelectorAll('.alternative')
	const numberOfQuestions = currentQuizz.questions.length

	allAlternatives.forEach(removeOnClick)

	setOtherItemsAsUnSelected(item)
	updateCorrectAndWrongAnswers(thisQuestion)

	updateCounters(item)

	const isFinished = numberOfQuestions === correctAnswersCount + wrongAnswersCount

	if (isFinished) {
		const score = calculateScore()
		const level = getLevel(score)
		renderResult(level, score)
	}

	setTimeout(() => scrollToNextElement(thisQuestion), 2000)
}

function randomComparison() {
    return Math.random() - 0.5
}

function loadAlternative(answer) {
    const htmlAlternative = `<div class="alternative" onclick="handleClickOnItem(this)">
        <img src="${answer.image}">
        <p>${answer.text}</p>
    </div>`

    return htmlAlternative
}

function loadAllAlternatives(answers) {
    let htmlAlternatives = ''
    answers.forEach(answer => htmlAlternatives += loadAlternative(answer) + '\n')

    return htmlAlternatives
}

function renderQuestion(question) {
	const htmlAlternatives = loadAllAlternatives(question.answers)

    document.querySelector('ul.boxes').innerHTML += `<li class="question">
        <p style="background-color: ${question.color};">${question.title}</p>
        <div class="alternatives-wrapper">
            ${htmlAlternatives}
        </div>
    </li>`

}

function renderQuizz() {
    document.querySelector('.top-banner > .quizz-title').innerHTML = currentQuizz.title
    document.querySelector('.top-banner > img').src = currentQuizz.image
	document.querySelector('ul.boxes').innerHTML = ''

    currentQuizz.questions.map(renderQuestion)
}

function shuffleAnswers() {
	const questions = currentQuizz.questions

	function randomizeAnswersOfAQuestion(question) {
		return question.answers.sort(randomComparison)
	}

	const questionsWithShuffledAnswers = questions.map(randomizeAnswersOfAQuestion)

	currentQuizz.questions.answers = questionsWithShuffledAnswers
}

function goToHome() {
	document.querySelector('.first-screen').classList.remove('hidden')
	document.querySelector('.second-screen').classList.add('hidden')
}

function showQuizzPage() {
	document.querySelector('.first-screen').classList.add('hidden')
	document.querySelector('.second-screen').classList.remove('hidden')
	document.querySelector('.third-screen').classList.add('hidden')
}

function startQuizz(quizz) {
	currentQuizz = quizz

	const topBanner = document.querySelector('.top-banner')

	showQuizzPage()

	scrollToAndCenter(topBanner, behavior='auto')

	shuffleAnswers()
	renderQuizz()

	const firstQuestion = document.querySelector('.question')

	setTimeout(()=>scrollToAndCenter(firstQuestion), 500)
}







// let quizzes = [];

// function getQuizzes() {
//     const getQuizzesPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes");
//     getQuizzesPromise.then(listQuizzes);
// }

// function openQuizzById(quizzId) {
// 	for (let quizz of quizzes) {
//         if (quizz.id === quizzId) {
//             console.log(quizz)
//             startQuizz(quizz)
//             return
//         }
//     }
// }

// function renderQuizzes() {
//     const ulQuizzes = document.querySelector(".all-quizzes .quizzes-list");

//     let htmlQuizzes = ''

//     for (let quizz of quizzes) {
//         htmlQuizzes += `
//         <li class="option" id="${quizz.id}" onclick="openQuizzById(${quizz.id})">
//             <img class="image-quiz" src="${quizz.image}">
//             <div class="image-quiz-box"></div>
//             <p>${quizz.title}</p>
//         </li>
//         `;
//     }

//     ulQuizzes.innerHTML = htmlQuizzes
// }

// function listQuizzes(listQuizzesResponse) {
//     quizzes = listQuizzesResponse.data;
//     console.log(quizzes);
//     renderQuizzes();
// }
// getQuizzes();


// function showThirdScreen() {
//      const thirdScreen = document.querySelector(".third-screen .initial-informations-quizz");
//      const firstScreen = document.querySelector(".first-screen").classList.add("hidden");
//      thirdScreen.classList.remove("hidden");
// }

// let title;
// let image;
// let numberQuestions = 0;
// let numberLevels = 0;
// let divQuestions;

// function followCreateQuizz() {
//     title = document.querySelector(".input-quizz-title").value;
//     console.log(title);
//     image = document.querySelector(".input-image").value;
//     console.log(image);
//     numberQuestions = document.querySelector(".number-questions").value;
//     console.log(numberQuestions);
//     numberLevels = document.querySelector(".number-levels").value;
//     console.log(numberLevels);
//     const createYourQuestion = document.querySelector(".create-your-questions-box");
//     const inicialInformationsQuizz = document.querySelector(".initial-informations-quizz").classList.add("hidden");
//     createYourQuestion.classList.remove("hidden");   
//     divQuestions = document.querySelector(".create-box")
//     divQuestions.innerHTML = `
//         <h4 class="create-your-questions">Crie suas perguntas</h4> 
//     `;
//     for (let i = 1; i <= numberQuestions; i++) {
//         divQuestions.innerHTML += `
//         <div class="box-closed">
//             <span>Pergunta ${i}</span>
//             <ion-icon class="edit-icon" name="create-outline" onclick="showQuestionForm(this)"></ion-icon>
//         </div> 
            
//         `
//     }

// }

// let questionText;
// let backgroundColor;
// let rightAnswer;
// let urlImage;
// let wrongAnswer1;
// let wrongAnswer2;
// let wrongAnswer3;
// let urlImage1;
// let urlImage2;
// let urlImage3;

// function followToCreatLevels() {

//     questionText = document.querySelector(".input-question").value;
//     console.log(questionText);
//     backgroundColor = document.querySelector(".input-background-color").value;
//     console.log(backgroundColor);
//     rightAnswer = document.querySelector(".input-right-answer").value;
//     console.log(rightAnswer);
//     urlImage = document.querySelector(".input-url-image-correct-answer").value;
//     console.log(urlImage);
//     wrongAnswer1 = document.querySelector(".input-wrong-answer").value;
//     console.log(wrongAnswer1);
//     urlImage1 = document.querySelector(".input-url-image-wrong-answer").value;
//     console.log(urlImage1);
//     wrongAnswer2 = document.querySelector(".input-wrong-answer2").value;
//     console.log(wrongAnswer2);
//     urlImage2 = document.querySelector(".input-url-image-wrong-answer2").value;
//     console.log(urlImage2);
//     wrongAnswer3 = document.querySelector(".input-wrong-answer3").value;
//     console.log(wrongAnswer3);
//     urlImage3 = document.querySelector(".input-url-image-wrong-answer3").value;
//     console.log(urlImage3);
    


//     const toCreatLevels = document.querySelector(".decide-levels-box");
//     const screenCreatYourQuestion = document.querySelector(".create-your-questions-box").classList.add("hidden");
//     toCreatLevels.classList.remove("hidden");
   
// }

// function showQuestionForm(element) {
//     let showQuestionForm = document.querySelector(".create-box .edit-icon.selected");
//     let questionSelected = element.parentNode.innerText.substring(8);
//     element.parentNode.classList.remove("box-closed");
//     element.parentNode.innerHTML = `
//     <div class="div-question">
//         <p>Pergunta ${questionSelected}</p>
//         <ul class="set-question">
//             <li>
//                 <input class="input-question" type="text" placeholder="Texto da pergunta">
//             </li>
//             <li>
//                 <input class="input-background-color" type="text" placeholder="Cor de fundo da pergunta">
//             </li>
//         </ul>
//         <p>Resposta correta</p>
//         <ul class="right-answer">
//             <li>
//                 <input class="input-right-answer" type="text" placeholder="Resposta correta">
//             </li>
//             <li>
//                 <input class="input-url-image-correct-answer" type="text" placeholder="URL da imagem">
//             </li>
//         </ul>
//         <p>Respostas incorreta</p>
//         <ul class="wrong-answer">
//             <li>
//                 <input class="input-wrong-answer" type="text" placeholder="Resposta incorreta 1">
//             </li>
//             <li>
//                 <input class="input-url-image-wrong-answer"  type="text" placeholder="URL da imagem 1">
//             </li>
//             <li>
//                 <input class="input-wrong-answer2" type="text" placeholder="Resposta incorreta 2">
//             </li>
//             <li>
//                 <input class="input-url-image-wrong-answer2" type="text" placeholder="URL da imagem 2">
//             </li>
//             <li>
//                 <input class="input-wrong-answer3" type="text" placeholder="Resposta incorreta 3">
//             </li>
//             <li>
//                 <input class="input-url-image-wrong-answer3" type="text" placeholder="URL da imagem 3">
//             </li>

//         </ul>                                    
//     </div>
//     `;
//     let caixa = document.querySelector(".box-closed")

//     if (showQuestionForm !== null) {
//          showQuestionForm.classList.remove("selected");
//      } 
    
//     element.classList.add("selected");

// }

// let levelText;
// let percentageHits;
// let urlImageLevel;
// let levelDescription;

// function finishQuizz() {
//     levelText = document.querySelector(".input-level-title").value;
//     console.log(levelText);
//     percentageHits = document.querySelector(".input-perc-hits").value;
//     console.log(percentageHits);
//     urlImageLevel = document.querySelector(".input-url-image-level").value;
//     console.log(urlImageLevel);
//     levelDescription = document.querySelector(".level-description").value;
//     console.log(levelDescription);
//     const ToFinishQuizz = document.querySelector(".finish-quizz");
//     const screenCreatYourQuestion = document.querySelector(".decide-levels-box").classList.add("hidden");
//     ToFinishQuizz.classList.remove("hidden");
// }


// // function postQuizz() {
// //     const postedQuizz = {
// //         title,
// //         image,
// //         questions: [
// //             {
// //                 title: questionText,
// //                 color: backgroundColor,
// //                 answers: [
// //                     {
// //                         text: rightAnswer,
// //                         image: urlImage,
// //                         isCorrectAnswer: true
// //                     },
// //                     {
// //                         text: wrongAnswer1,
// //                         image: urlImage1,
// //                         isCorrectAnswer: false
// //                     }
// //                 ]
// //             },
// //             {
// //                 title: questionText2,
// //                 color: backgroundColor,
// //                 answers: [
// //                     {
// //                         text: rightAnswer,
// //                         image: urlImage,
// //                         isCorrectAnswer: true
// //                     },
// //                     {
// //                         text: wrongAnswer1,
// //                         image: urlImage1,
// //                         isCorrectAnswer: false
// //                     }
// //                 ]
// //             },
// //             {
// //                 title: questionText3,
// //                 color: backgroundColor,
// //                 answers: [
// //                     {
// //                         text: rightAnswer,
// //                         image: urlImage,
// //                         isCorrectAnswer: true
// //                     },
// //                     {
// //                         text: wrongAnswer1,
// //                         image: urlImage1,
// //                         isCorrectAnswer: false
// //                     }
// //                 ]
// //             }
// //         ],
// //         levels: [
// //             {
// //                 title: levelText,
// //                 image: urlImageLevel,
// //                 text: levelDescription,
// //                 minValue: 0
// //             },
// //             {
// //                 title: levelText,
// //                 image: urlImageLevel,
// //                 text: levelDescription,
// //                 minValue: percentageHits
// //             }
// //         ]
// //     }

// //     const postPromisseQuizz = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes")
// //     postPromisseQuizz.then(quizzSent);
// // }

// // function quizzSent () {
// //     getQuizzes();
// // }










