const questions = [
  {
    id: 1,
    question: 'Какие долги вы хотите списать?',
    options: [
      {
        id: 2,
        text: 'требования о возмещении вреда жизни или здоровью, о выплате заработной платы и выходного пособия, о возмещении морального вреда, о взыскании алиментов',
        nextQuestionId: 30,
        isPicked: false,
        totalQuestions: 4,
      },
      {
        id: 3,
        text: 'долги по потребительским кредитам, займам, налогам, страховым взносам, коммунальным услугам',
        nextQuestionId: 31,
        isPicked: false,
        totalQuestions: 4,
      },
    ],
    questionShort: 'Какие долги вы хотите списать?',
  },
  {
    id: 2,
    question: 'Вы уже проходили через процедуру банкротства ранее?',
    options: [
      { id: 4, text: 'Нет', nextQuestionId: 3, isPicked: false },
      {
        id: 5,
        text: 'Да, 5 и более лет назад',
        nextQuestionId: 3,
        isPicked: false,
      },
      {
        id: 6,
        text: 'Да, менее 5 лет назад ',
        nextQuestionId: 32,
        isPicked: false,
      },
    ],
    questionShort: 'Уже были банкротом?',
  },
  {
    id: 3,
    question:
      'Какая  у вас сумма долга? Сумму задолженности по налогам и сборам можно проверить на сайте nalog.ru. По автоштрафам - на сайте ГИБДД. В случае наличия в отношении вас исполнительного производства, т.е. взыскания долгов судебными приставами - на сайте Федеральной службы судебных приставов.',
    options: [
      {
        id: 7,
        text: 'менее 25 000 рублей',
        nextQuestionId: 33,
        isPicked: false,
      },
      {
        id: 8,
        text: 'от 25 000 рублей до 500 000 рублей',
        nextQuestionId: 4,
        isPicked: false,
      },
      {
        id: 9,
        text: 'более 500 000 рублей',
        nextQuestionId: 5,
        isPicked: false,
      },
    ],
    questionShort: 'Сумма долга',
  },
  {
    id: 4,
    question:
      'Окончено ли в отношении вас производство по взысканию долга(на основании судебного решения) судебным приставом, так как у вас не обнаружено судебным приставом имущества для уплаты долга, и нет других таких неоконченных производств по взысканию денежных средств?',
    options: [
      { id: 10, text: 'Да', nextQuestionId: 6, isPicked: false },
      { id: 11, text: 'Нет', nextQuestionId: 8, isPicked: false },
    ],
    questionShort: 'Окночено ли взыскание долга?',
  },
  {
    id: 6,
    question: 'Вы уже подавали заявление на внесудебное банкротство?',
    options: [
      { id: 12, text: 'Да', nextQuestionId: 14, isPicked: false },
      { id: 13, text: 'Нет', nextQuestionId: 34, isPicked: false },
    ],
    questionShort: 'Подавали на внесудебное банкротство?',
  },
  {
    id: 14,
    question: 'Месяц после возвращения заявления прошел?',
    options: [
      { id: 14, text: 'Да', nextQuestionId: 34, isPicked: false },
      { id: 15, text: 'Нет', nextQuestionId: 12, isPicked: false },
    ],
    questionShort: 'Прошел месяц с возврата заявления?',
  },
  {
    id: 12,
    question:
      'Ожидайте истечения месячного срока с момента возврата заявления, затем вам будет доступно внесудебное банкротство. В данном случае вам также могут подойти процедуры реструктуризации и (или) рефинансирования кредитов, они не будут влечь за собой тех негативных последствий что банкротство. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в  банке А. Но возможно вы подходите под специальный случай судебного банкротства (не нужно иметь 500 тыс. рублей долгов для его начала). А именно, если вы предвидели банкротство, так как не можете возвратить долг в срок, и при этом у вас нет имущества, которое по стоимости превышает размер долгов, и (или) вы не способны удовлетворить требования кредиторов, например, имеете более 10 % долгов, срок возврата которых наступил, и которые не возвращены уже более 1 месяца (например, сумма долгов 400 тыс. рублей, 50 тыс. рублей (больше 10%) по данным долгам должны были уплатить кредиторам 15 января, но они так и не были уплачены хотя уже наступил март) . Исключение, если планируемый дохода в скором времени поможет выплатит все долги. ',
    options: [],
  },
  {
    id: 8,
    question:
      'Были ли в отношении вас судебное решение и, выданный на основании решения, исполнительный документ (выдача документа не позднее 1 года назад), по которому судебный пристав не смог взыскать в полном объеме долги?',
    options: [
      { id: 16, text: 'Да', nextQuestionId: 7, isPicked: false },
      { id: 17, text: 'Нет', nextQuestionId: 35, isPicked: false },
    ],
    questionShort: 'ыфвфвфыв?',
  },
  {
    id: 7,
    question:
      'У вас отсутствует имущество, на которое может быть обращено взыскание, кроме пенсий?',
    options: [
      { id: 18, text: 'Да', nextQuestionId: 9, isPicked: false },
      { id: 19, text: 'Нет', nextQuestionId: 35, isPicked: false },
    ],
    questionShort: 'фывфывфывфывфывфыв?',
  },
  {
    id: 9,
    question:
      'Ваш основной доход составляет страховая пенсия, пенсия по государственному пенсионному обеспечению, накопительная пенсия, срочная пенсионная выплата или пенсия за службу?',
    options: [
      { id: 20, text: 'Да', nextQuestionId: 66, isPicked: false },
      { id: 21, text: 'Нет', nextQuestionId: 11, isPicked: false },
    ],
    questionShort: 'фывфывфывфывфывфыв?',
  },
  {
    id: 11,
    question:
      'Вы являетесь получателем ежемесячного пособия в связи с рождением и воспитанием ребенка?',
    options: [
      { id: 22, text: 'Да', nextQuestionId: 666, isPicked: false },
      { id: 23, text: 'Нет', nextQuestionId: 35, isPicked: false },
    ],
    questionShort: 'фывфывфывывфывфыфывфыфывфыв?',
  },
  {
    id: 5,
    question:
      'Выплата вами долга одному или нескольким кредиторам приведет к тому, что вы не сможете полностью выплатить долги перед другими кредиторами на сумму 500 тысяч рублей?',
    options: [
      { id: 24, text: 'Да', nextQuestionId: 36, isPicked: false },
      { id: 25, text: 'Нет', nextQuestionId: 10, isPicked: false },
    ],
    questionShort: 'фвфввывывыавыа?',
  },
  {
    id: 10,
    question: 'Сумма ваших долгов составляет менее 1 млн рублей?',
    options: [
      { id: 26, text: 'Да', nextQuestionId: 4, isPicked: false },
      { id: 27, text: 'Нет', nextQuestionId: 37, isPicked: false },
    ],
    questionShort: 'ываыввыаы?',
  },
  {
    id: 30,
    question:
      'Данные долги нельзя списать в рамках процедуры банкротства согласно ст. 213.28 ФЗ "О несостоятельности (банкротстве)". Вам могут подойти процедуры реструктуризации и (или) рефинансирования кредитов. Реструктуризация — это изменение условий для заемщика по уже взятому кредиту. Ее может провести тот банк, в котором был оформлен кредит. В таком случае может сократиться ежемесячный платеж, снижается процентная ставка, увеличивается срок выплаты. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в  банке А.',
    options: [],
  },
  {
    id: 31,
    question:
      'Данные долги возможно списать в рамках процедуры банкротства согласно статье 213.28 ФЗ "О несостоятельности (банкротстве)"',
    options: [{ id: 28, nextQuestionId: 2, isPicked: false }],
    questionShort: 'счмвываывав?',
  },
  {
    id: 32,
    question:
      'В вашем случае невозможно прохождение процедуры банкротства вновь, так как с завершения предыдущей процедуры банкротства прошло менее пяти лет, п. 8 ст. 223.2 ФЗ "О несостоятельности (банкротстве)". Вам могут подойти процедуры реструктуризации и (или) рефинансирования кредитов. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в  банке А.',
    options: [],
  },
  {
    id: 33,
    question:
      'В данном случае вам могут подойти процедуры реструктуризации и (или) рефинансирования кредитов. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в банке А. Минимальная сумма для прохождения процедуры внесудебного банкротства 25 тыс. рублей, а для судебного банкротства - 500 000 рублей. Но возможно вы подходите под специальный случай судебного банкротства (не нужно иметь 500 тыс. рублей долгов для его начала). А именно, если вы предвидели банкротство, так как не можете возвратить долг в срок, и при этом у вас нет имущества, которое по стоимости превышает размер долгов, и (или) вы не способны удовлетворить требования кредиторов, например, имеете более 10 % долгов, срок возврата которых наступил, и которые не возвращены уже более 1 месяца (например, сумма долгов 400 тыс. рублей, 50 тыс. рублей (больше 10%) по данным долгам должны были уплатить кредиторам 15 января, но они так и не были уплачены хотя уже наступил март). Исключение, если планируемый дохода в скором времени поможет выплатит все долги.',
    options: [],
  },
  {
    id: 34,
    question:
      'Вам доступна процедура внесудебного банкротства. В данном случае вам также могут подойти процедуры реструктуризации и (или) рефинансирования кредитов, они не будут влечь за собой тех негативных последствий что банкротство. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в  банке А. Но возможно вы подходите под специальный случай судебного банкротства (не нужно иметь 500 тыс. рублей долгов для его начала). А именно, если вы предвидели банкротство, так как не можете возвратить долг в срок, и при этом у вас нет имущества, которое по стоимости превышает размер долгов, и (или) вы не способны удовлетворить требования кредиторов, например, имеете более 10 % долгов, срок возврата которых наступил, и которые не возвращены уже более 1 месяца (например, сумма долгов 400 тыс. рублей, 50 тыс. рублей (больше 10%) по данным долгам должны были уплатить кредиторам 15 января, но они так и не были уплачены хотя уже наступил март) . Исключение, если планируемый дохода в скором времени поможет выплатит все долги.',
    options: [],
  },
  {
    id: 35,
    question:
      'Вам не доступна процедура внесудебного банкротства, так как вы не подходите под условия. В данном случае вам также могут подойти процедуры реструктуризации и (или) рефинансирования кредитов, они не будут влечь за собой тех негативных последствий что банкротство. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в  банке А. Но возможно вы подходите под специальный случай судебного банкротства (не нужно иметь 500 тыс. рублей долгов для его начала). А именно, если вы предвидели банкротство, так как не можете возвратить долг в срок, и при этом у вас нет имущества, которое по стоимости превышает размер долгов, и (или) вы не способны удовлетворить требования кредиторов, например, имеете более 10 % долгов, срок возврата которых наступил, и которые не возвращены уже более 1 месяца (например, сумма долгов 400 тыс. рублей, 50 тыс. рублей (больше 10%) по данным долгам должны были уплатить кредиторам 15 января, но они так и не были уплачены хотя уже наступил март) . Исключение, если планируемый дохода в скором времени поможет выплатит все долги. ',
    options: [],
  },
  {
    id: 36,
    question:
      'Вы обязаны обратится в арбитражный суд с заявлением о признании банкротом не позднее 30 рабочих дней со дня, когда вы узнали о том, что выплата вами долга одному или нескольким кредиторам приведет к тому, что вы не сможете полностью выплатить долги перед другими кредиторами на сумму 500 тысяч рублей. согласно п. 1 статьи 213.4 ФЗ "О несостоятельности (банкротстве)".',
    options: [],
  },
  {
    id: 37,
    question:
      'Вы вправе обратится в суд с заявлением о банкротстве. Рекомендуем вам ознакомится с рисками и последствиями банкротства перед началом процедуры. В данном случае вам также могут подойти процедуры реструктуризации и (или) рефинансирования кредитов, они не будут влечь за собой тех негативных последствий что банкротство. Например, был взят кредит сроком на 1 год под 15%, а банк реструктуризировал и срок стал 3 года, а ежемесячный платеж стал соответственно меньше. Рефинансирование кредита — это фактически смена одной кредитной организации на другую, то есть перезаем на более выгодных условиях  с целью полностью или частично погасить старый займ. Например, был взят кредит в банке А под 20% годовых, затем лицо обратилось в банк Б и оформило кредит под 15% годовых и закрыло этими деньгами кредит в банке А.',
    options: [],
  },
];

let currentQuestionIndex = 1;
let currentQuestion = findQuestionById(currentQuestionIndex);
let prevQuestions = [];
prevQuestions.push(currentQuestionIndex);
let prevQuestionsPointer = 0;

function findQuestionById(id) {
  for (const question in questions) {
    if (questions[question].id == id) {
      return questions[question];
    }
  }
}

const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const quizHistory = document.querySelector('.quiz-history');

function displayQuestion() {
  const question = currentQuestion.question;
  currentQuestionIndex = currentQuestion.id;
  questionCounter = currentQuestion.questionNum;
  totalQuestions = currentQuestion.totalQuestions;
  questionElement.textContent = question;

  optionsContainer.innerHTML = '';
  const options = currentQuestion.options;
  for (const option in options) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'option';
    input.value = JSON.stringify(options[option]);
    input.checked = options[option].isPicked;
    const label = document.createElement('label');
    label.textContent = options[option].text;
    optionsContainer.appendChild(input);
    optionsContainer.appendChild(label);
    optionsContainer.appendChild(document.createElement('br'));
  }
}

function addCurrentToHistory() {
  if (typeof currentQuestion.questionShort !== 'undefined') {
    let arrow = '';
    if ($(quizHistory).children().length != 0) {
      arrow = ' => ';
    }
    var link = $('<a></a>')
      .attr('href', '#')
      .attr('id', currentQuestion.id)
      .text(arrow + currentQuestion.questionShort);

    link.click(function (event) {
      event.preventDefault();

      currentQuestion = findQuestionById(this.id);
      currentQuestionIndex = currentQuestion.id;
      prevQuestionsPointer = findIdInPrevQuestionsByQuestionId(this.id);

      displayQuestion();
      updateButtons();
      console.log(prevQuestions);
      console.log(prevQuestionsPointer);
    });

    $(quizHistory).append(link);
  }

  function findIdInPrevQuestionsByQuestionId(questionId) {
    for (let i = 0; i < prevQuestions.length; i++) {
      const element = prevQuestions[i];
      if (element == questionId) {
        return i;
      }
    }
  }
}

function selectOption() {
  updateIsPicked();
  const nextQuestion = findNextQuestion();
  if (
    prevQuestions.length - 1 > prevQuestionsPointer &&
    prevQuestions[prevQuestionsPointer + 1] != nextQuestion.id
  ) {
    while (prevQuestions.length - 2 > prevQuestionsPointer) {
      prevQuestions.pop();
      $(quizHistory).children().last().remove();
    }
    prevQuestions.pop();
    currentQuestion = nextQuestion;
    currentQuestionIndex = currentQuestion.id;
    prevQuestions.push(currentQuestionIndex);
    prevQuestionsPointer = prevQuestions.length - 1;
    console.log(prevQuestions);
    console.log(prevQuestionsPointer);
    console.log('first');
  } else if (prevQuestions.length - 1 > prevQuestionsPointer) {
    prevQuestionsPointer++;
    currentQuestion = nextQuestion;
    currentQuestionIndex = currentQuestion.id;
    console.log(prevQuestions);
    console.log(prevQuestionsPointer);
    console.log('second');
  } else {
    addCurrentToHistory();
    currentQuestion = nextQuestion;
    currentQuestionIndex = currentQuestion.id;
    prevQuestions.push(currentQuestionIndex);
    prevQuestionsPointer++;
    console.log(prevQuestions);
    console.log(prevQuestionsPointer);
    console.log('third');
  }
  displayQuestion();
  updateButtons();

  function findNextQuestion() {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked',
    ).value;
    for (const question in questions) {
      if (questions[question].id == JSON.parse(selectedOption).nextQuestionId) {
        return questions[question];
      }
    }
  }
}
function updateIsPicked() {
  const options = currentQuestion.options;
  for (const option in options) {
    options[option].isPicked = false;
  }
  try {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked',
    ).value;
    const selected_id = JSON.parse(selectedOption).id;
    for (const option in options) {
      if (options[option].id == selected_id) {
        options[option].isPicked = true;
      }
    }
  } catch (e) {}
}

function updateButtons() {
  if (currentQuestionIndex != 1) {
    prevButton.disabled = false;
  } else {
    prevButton.disabled = true;
  }

  if (currentQuestion.options.length == 0) {
    nextButton.textContent = 'Завершить';
  } else {
    nextButton.textContent = 'Следующий вопрос';
  }
}

prevButton.addEventListener('click', () => {
  if (prevQuestionsPointer > 0) {
    prevQuestionsPointer--;
  }
  console.log(prevQuestions);
  console.log(prevQuestionsPointer);
  currentQuestion = findQuestionById(prevQuestions[prevQuestionsPointer]);
  displayQuestion();
  updateButtons();
});

nextButton.addEventListener('click', () => {
  selectOption();
});

$(document).ready(function () {
  displayQuestion();
  updateButtons();
});
