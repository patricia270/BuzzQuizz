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

function scrollToNextElement(element) {
	const nextElement = element.nextSibling
	if (nextElement !== null) {
		nextElement.scrollIntoView({behavior: 'smooth'})
	}
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

	setTimeout(()=>ulBoxes.lastChild.scrollIntoView({behavior: 'smooth'}), 2000)
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

	setTimeout(() => scrollToNextElement(thisQuestion.firstChild), 2000)
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

function startQuizz() {
	window.scrollTo({ top: document.querySelector('.top-banner'), behavior: 'smooth'})
	shuffleAnswers()

	renderQuizz()
}

startQuizz()