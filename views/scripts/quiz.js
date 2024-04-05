fetch('./views/scripts/quiz_questions.json').then(async (response) => {
  let questions = [];
  questions = await response.json();
  console.log(questions);

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
      input.id = options[option].id;
      input.value = JSON.stringify(options[option]);
      input.checked = options[option].isPicked;
      const label = document.createElement('label');
      const labelText = options[option].text; // Получаем текст опции
      const linkText = labelText.replace(
        /<a href='(.*)'>(.*?)<\/a>/g,
        '<a href="$1">$2</a>',
      ); // Заменяем текст ссылок внутри метки
      label.innerHTML = linkText; // Устанавливаем обработанный HTML в метку
      label.htmlFor = input.id;
      optionsContainer.appendChild(input);
      optionsContainer.appendChild(label);
      optionsContainer.appendChild(document.createElement('br'));
    }
  }

  function addCurrentToHistory() {
    if (typeof currentQuestion.questionShort !== 'undefined') {
      let arrow = '';
      if ($(quizHistory).children().length != 0) {
        arrow = ' > ';
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
        if (
          questions[question].id == JSON.parse(selectedOption).nextQuestionId
        ) {
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

  displayQuestion();
  updateButtons();
});
