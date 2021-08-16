let quizzInCreation = {
    title: '',
    image: '',
    numberQuestions: 0,
    numberLevels: 0,
    questions: [],
    levels: []
}

function createEmptyQuestion() {
    const question = {
        title: '',
        color: '',
        correctAnswer: {
            text: '',
            image: ''
        },
        wrongAnswers: [
            {text: '', image: ''},
            {text: '', image: ''},
            {text: '', image: ''}
        ]
    }
    return question
}

function createEmptyLevel() {
    const level = {
        title: '',
        minValue: 0,
        image: '',
        text: ''
    }

    return level
}

function createSetInfoFunction(info) {
    if (typeof(info) === typeof('')) return value => quizzInCreation[info] = value

    let stringFunction = 'quizzInCreation'
    info.forEach(subInfo => {
        if (typeof(subInfo) === typeof('')){
            stringFunction += `['${subInfo}']`
        } else {
            stringFunction += `[${subInfo}]`
        }
    })

    stringFunction += ' = value'

    return new Function('value', stringFunction)
}

function syncInputValueWithInfo(inputCell, info) {
    const setInfo = createSetInfoFunction(info)
    inputCell.addEventListener('change', () => setInfo(inputCell.value))
}

function addListenersToInitialInputs() {
    const inputClassToQuizzInfo = {
        'input-quizz-title': 'title',
        'input-image': 'image',
        'number-questions': 'numberQuestions',
        'number-levels': 'numberLevels'
    }

    for (const inputClass of Object.keys(inputClassToQuizzInfo)) {
        const info = inputClassToQuizzInfo[inputClass]
        const inputCell = document.querySelector('.' + inputClass)

        syncInputValueWithInfo(inputCell, info)
    }
}

function addListenersToQuestionInput(questionElement, questionNumber) {
    const inputClassToQuizzInfo = {
        'input-question': ['title'],
        'input-background-color': ['color'],
        'input-right-answer': ['correctAnswer', 'text'],
        'input-url-image-correct-answer': ['correctAnswer', 'image'],
        'input-wrong-answer': ['wrongAnswers', 0, 'text'],
        'input-url-image-wrong-answer': ['wrongAnswers', 0, 'image'],
        'input-wrong-answer2': ['wrongAnswers', 1, 'text'],
        'input-url-image-wrong-answer2': ['wrongAnswers', 1, 'image'],
        'input-wrong-answer3': ['wrongAnswers', 2, 'text'],
        'input-url-image-wrong-answer3': ['wrongAnswers', 2, 'image']
    }

    for (const inputClass of Object.keys(inputClassToQuizzInfo)) {
        let info = inputClassToQuizzInfo[inputClass]

        const inputCell = questionElement.querySelector('.' + inputClass)

        info = ['questions', questionNumber, ...info]

        syncInputValueWithInfo(inputCell, info)
    }
}

function addListenersToLevelInput(levelElement, levelNumber) {
    const inputClassToQuizzInfo = {
        'input-level-title': ['title'],
        'input-perc-hits': ['minValue'],
        'input-url-image-level': ['image'],
        'level-description': ['text']
    }

    for (const inputClass of Object.keys(inputClassToQuizzInfo)) {
        let info = inputClassToQuizzInfo[inputClass]

        const inputCell = levelElement.querySelector('.' + inputClass)

        info = ['levels', levelNumber, ...info]

        syncInputValueWithInfo(inputCell, info)
    }
}

function addListenersToAllQuestionsInputs() {
    const questionsList = document.querySelectorAll('.create-box > :is(.pergunta, .pergunta-fechada)')

    for (let i = 0; i < quizzInCreation.numberQuestions; i++) {
        addListenersToQuestionInput(questionsList[i], i)
    }
}

function addListenersToAllLevelsInputs() {
    const levelsList = document.querySelectorAll('.levels-box > :is(.level, .pergunta-fechada)')

    for (let i = 0; i < quizzInCreation.numberLevels; i++) {
        addListenersToLevelInput(levelsList[i], i)
    }
}

function createQuestion(number, isOpen=true, isHidden=false) {
    let classesToAppend = ''
    if (isHidden) {
        classesToAppend = 'pergunta hidden'
    } else if (isOpen) {
        classesToAppend = 'pergunta'
    } else {
        classesToAppend = 'pergunta-fechada'
    }
 
    let htmlQuestion = `<div class="${classesToAppend}">
        <p>Pergunta ${number}</p>
        <ul class="definindo-pergunta">
            <li>
                <input class="input-question" type="text" placeholder="Texto da pergunta">
            </li>
            <li>
                <input class="input-background-color" type="text" placeholder="Cor de fundo da pergunta">
            </li>
        </ul>
        <p>Resposta correta</p>
        <ul class="resposta-correta">
            <li>
                <input class="input-right-answer" type="text" placeholder="Resposta correta">
            </li>
            <li>
                <input class="input-url-image-correct-answer" type="text" placeholder="URL da imagem">
            </li>
        </ul>
        <p>Respostas incorreta</p>
        <ul class="resposta-incorreta">
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
        <span class='to-show-when-closed'>Pergunta ${number}</span>
        <ion-icon class='to-show-when-closed' name="create-outline" onclick="editQuestion(this)"></ion-icon>                                   
    </div>`

    return htmlQuestion
}

function createLevel(number, isOpen=true, isHidden=false) {
    let classesToAppend = ''
    if (isHidden) {
        classesToAppend = 'level hidden'
    } else if (isOpen) {
        classesToAppend = 'level'
    } else {
        classesToAppend = 'pergunta-fechada'
    }
 
    let htmlLevel = `
        <div class="${classesToAppend}">
            <p>Nível ${number}</p>
            <ul class="definindo-nivel">
                <li>
                    <input class="input-level-title" type="text" placeholder="Título do nível">
                </li>
                <li>
                    <input class="input-perc-hits" type="text" placeholder="% de acerto mínima">
                </li>
                <li>
                    <input class="input-url-image-level" type="text" placeholder="URL da imagem do nível">
                </li>
                <li>
                    <input class="level-description" type="text" placeholder="Descrição do nível">
                </li>
            </ul>
            <span class='to-show-when-closed'>Nível ${number}</span>
            <ion-icon class='to-show-when-closed' name="create-outline" onclick="editLevel(this)"></ion-icon>
        </div>`

    return htmlLevel
}

function editQuestion(element) {
    const thisQuestion = element.parentNode
    const openedQuestion = document.querySelector('.pergunta')

    setTimeout(() => scrollToAndCenter(thisQuestion), 300)

    // Fechando pergunta já aberta
    openedQuestion.classList.remove('pergunta')
    openedQuestion.classList.add('pergunta-fechada')
    // Abrindo essa pergunta
    thisQuestion.classList.add('pergunta')
    thisQuestion.classList.remove('pergunta-fechada')
}

function editLevel(element) {
    const thisLevel = element.parentNode
    const openedLevel = document.querySelector('.level')

    setTimeout(() => scrollToAndCenter(thisLevel), 300)

    // Fechando level já aberto
    openedLevel.classList.remove('level')
    openedLevel.classList.add('pergunta-fechada')
    // Abrindo esse level
    thisLevel.classList.add('level')
    thisLevel.classList.remove('pergunta-fechada')
}

function createAllQuestions() {
    let htmlOfAllQuestions = createQuestion(1, isOpen=true)
    
    for (let i = 2; i <= quizzInCreation.numberQuestions; i++) {
        const shouldBeShowed = i <= quizzInCreation.numberQuestions        
        htmlOfAllQuestions += createQuestion(i, isOpen=false, isHidden=!shouldBeShowed)
    }

    return htmlOfAllQuestions
}

function createAllLevels() {
    let htmlOfAllLevels = createLevel(1, isOpen=true)
    
    for (let i = 2; i <= quizzInCreation.numberLevels; i++) {
        const shouldBeShowed = i <= quizzInCreation.numberLevels

        htmlOfAllLevels += createLevel(i, isOpen=false, isHidden=!shouldBeShowed)
    }

    return htmlOfAllLevels
}

function isImageURL(string) {
    const possibleImagesURL = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'webp',
        'bmp',
        'raw',
        'svg'
    ]

    for (const possibleEnd of possibleImagesURL) {
        if (string.includes(possibleEnd)) return true
    }
    return false
}

function lengthIsBetween(string, min=1, max=null) {
    const len = string.length

    if (len < min) return false
    if (max === null) return true
    if (len > max) return false
    return true
}

function isColorHexa(string) {
    return /#[a-fA-F0-9]{6}/.test(string)
}

function notSatifiedInitialConditions() {
    const { title, image, numberQuestions, numberLevels} = quizzInCreation
    const conditions = [
        ['O título deve ter entre 20 e 65 letras.', lengthIsBetween(title, min=20, max=65)],
        ['O valor informado não é uma URL válida', isImageURL(image)],
        ['Devem haver pelo menos 3 questões', numberQuestions >= 3],
        ['Devem haver pelo menos 2 níveis', numberLevels >= 2]
    ]

    return conditions.filter(value => !value[1]).map(value => value[0])
}

function isValidInitialConditions() {
    return notSatifiedInitialConditions().length === 0
}

function isAValidQuestion(question) {
    const {title, color, correctAnswer, wrongAnswers} = question

    let conditions = [
        lengthIsBetween(title, min=1),
        isColorHexa(color),
        lengthIsBetween(correctAnswer.text, min=1),
        isImageURL(correctAnswer.image)
    ]

    const notEmptyWrongAnswers = wrongAnswers.filter(answer => answer.text !== '' || answer.image !== '')

    conditions.push(notEmptyWrongAnswers.length > 0)

    const invalidAnswers = notEmptyWrongAnswers.filter(answer => {
        const {text, image} = answer
        return !lengthIsBetween(text, min=1) || !isImageURL(image)
    })

    conditions.push(invalidAnswers.length === 0)

    return conditions.every(bool => bool)
}

function isAValidLevel(level) {
    const { title, minValue, image, text } = level

    const conditions = [
        lengthIsBetween(title, min=10),
        0 <= minValue && minValue <= 100,
        isImageURL(image),
        lengthIsBetween(text, min=30)
    ]

    return conditions.every(bool => bool)
}

function areAllLevelsValid() {
    const { levels } = quizzInCreation

    let conditions = []

    levels.forEach(level => conditions.push(isAValidLevel(level)))

    const levelsWithMinValueZero = levels.filter(level => Number(level.minValue) === 0)

    conditions.push(levelsWithMinValueZero.length > 0)

    return conditions.every(bool => bool)
}

function areAllQuestionsValid() {
    const { questions } = quizzInCreation

    let conditions = []

    questions.forEach(question => conditions.push(isAValidQuestion(question)))

    return conditions.every(bool => bool)
}

function convertQuizzToMakePOST() {

    function convertQuestionToMakePOST(question) {
        let questionToPOST = {
            title: question.title,
            color: question.color,
            answers: []
        }

        questionToPOST.answers.push({
            text: question.correctAnswer.text,
            image: question.correctAnswer.image,
            isCorrectAnswer: true
        })

        question.wrongAnswers
            .filter(answer => answer.text !== '' || answer.image !== '')
            .forEach(answer => {
                questionToPOST.answers.push({
                    text: answer.text,
                    image: answer.image,
                    isCorrectAnswer: false
                })
            })
        return questionToPOST
    }


    let quizzToPOST = {
        title: quizzInCreation.title,
        image: quizzInCreation.image,
        questions: [],
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

    quizzInCreation.questions.forEach(question => {
        quizzToPOST.questions.push(convertQuestionToMakePOST(question))
    })

    quizzToPOST.levels = quizzInCreation.levels

    return quizzToPOST
}

function handleClickOnCreateQuizz() {
    addListenersToInitialInputs()

    showThirdScreen()
}

function handleClickOnFollowToCreateQuestions() {
    if (!isValidInitialConditions()) {
        alert('As informações não foram preenchidas corretamente!')
        return
    }

    const createYourQuestion = document.querySelector(".create-your-questions-box");
    createYourQuestion.classList.remove("hidden");
    document.querySelector(".initial-informations-quizz").classList.add("hidden");

    divQuestions = document.querySelector(".create-box")

    divQuestions.innerHTML = '<h4 class="create-your-questions">Crie suas perguntas</h4>'

    divQuestions.innerHTML += createAllQuestions()

    divQuestions.innerHTML += `
        <button 
        class="follow-create-levels" 
        onclick="handleClickOnCreateLevels()">Prosseguir pra criar níveis</button>`

    for(let i = 0; i < quizzInCreation.numberQuestions; i++) {
        quizzInCreation.questions.push(createEmptyQuestion())
    }
    
    addListenersToAllQuestionsInputs()
}


function handleClickOnCreateLevels() {
    if (!areAllQuestionsValid()) {
        alert('As informações não foram preenchidas corretamente!')
        return
    }

    const toCreatLevels = document.querySelector(".decide-levels-box");
    toCreatLevels.classList.remove("hidden");
    document.querySelector(".create-your-questions-box").classList.add("hidden");

    divLevels = document.querySelector('.levels-box')

    divLevels.innerHTML = '<h4 class="create-your-levels">Agora, decida os níveis</h4>'

    divLevels.innerHTML += createAllLevels()

    divLevels.innerHTML += `<button 
    class="button-finish-quizz" 
    onclick="handleClickOnFinishQuizz()">Finalizar Quizz</button>`

    for(let i = 0; i < quizzInCreation.numberLevels; i++) {
        quizzInCreation.levels.push(createEmptyLevel())
    }

    addListenersToAllLevelsInputs()
}

function handleClickOnFinishQuizz() {
    if (!areAllLevelsValid()) {
        alert('As informações não foram preenchidas corretamente!')
        return
    }

    currentQuizz = convertQuizzToMakePOST()

    const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes`, currentQuizz)
    promise.then(toSaveIdUserQuizz);
    getQuizzes()

    

    const ToFinishQuizz = document.querySelector(".finish-quizz");
    ToFinishQuizz.classList.remove("hidden");
    document.querySelector(".decide-levels-box").classList.add("hidden");

    document.querySelector('.quizz-done > p').innerHTML = quizzInCreation.title
    document.querySelector('.image-quiz-done').src = quizzInCreation.image
}
// começando a modificarrrrrr

function toSaveIdUserQuizz(quizzesObjects) {
    
    let idQuizz = quizzesObjects.data.id;
    let idListSerial = localStorage.getItem("id");
    if (idListSerial === null) {
        let idVetor = [idQuizz];
        let idVetorSerial = JSON.stringify(idVetor);
        localStorage.setItem("id", idVetorSerial);
    }
    else {
        let identify = JSON.parse(idListSerial);
        identify.push(idQuizz);
        let idSerial = JSON.stringify(identify);
        localStorage.setItem("id", idSerial);
    }  

}

function toListUserQuizz() {
    let idListSerial = localStorage.getItem("id");
    let idVetorSerial = JSON.parse(idListSerial);
    console.log(idVetorSerial);
    for (let i = 0; i < idVetorSerial.length; i++) {
        let vectorQuizzUserPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/" + idVetorSerial[i]);
        vectorQuizzUserPromise.then(listQuizzesUsers);
    }
}

function listQuizzesUsers(resposta) {
    // document.querySelector('.first-screen').classList.remove('hidden')
	// let thirdScreen = document.querySelector(".third-screen");
	// thirdScreen.classList.add("hidden");
    let vetor = resposta.data;
    document.querySelector(".your-quizzes").classList.remove("hidden")
    let ulQuizzesUsers = document.querySelector(".your-quizzes .quizzes-list");
    document.querySelector(".none-quiz").classList.add("hidden")

    ulQuizzesUsers.innerHTML += `<li class="option">                            
                                    <img class="image-quiz" src="${vetor.image}">
                                    <div class="image-quiz-box"></div>
                                    <p>${vetor.title}</p>
                                </li>
                                `;
}