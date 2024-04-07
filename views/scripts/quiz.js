$(document).ready(function () {
  $.getJSON('../views/scripts/quiz_questions.json', function (questions) {
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

    const questionElement = $('.question');
    const questionCommentElement = $('.question-comment');
    const optionsContainer = $('.options');
    const prevButton = $('#prevBtn');
    const nextButton = $('#nextBtn');
    const quizHistory = $('.quiz-history');

    function displayQuestion() {
      const question = currentQuestion.question;
      const questionComment = currentQuestion.comment;
      currentQuestionIndex = currentQuestion.id;

      questionElement.text(question);

      if (typeof questionComment !== 'undefined') {
        $(questionCommentElement).css({ display: 'block' });
        $(questionCommentElement).html(questionComment);
      } else {
        $(questionCommentElement).css({ display: 'none' });
      }

      optionsContainer.empty();

      const options = currentQuestion.options;
      for (const option in options) {
        const input = $('<input>').attr({
          type: 'radio',
          name: 'option',
          id: options[option].id,
          value: JSON.stringify(options[option]),
          checked: options[option].isPicked,
        });
        const label = $('<label>')
          .html(options[option].text)
          .attr('for', options[option].id);

        optionsContainer.append(input, label, $('<br>'));
      }
    }

    function addCurrentToHistory() {
      if (typeof currentQuestion.questionShort !== 'undefined') {
        let arrow = '';
        if ($(quizHistory).children().length != 0) {
          arrow = ' > ';
        }
        var link = $('<a>')
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
        const selectedOption = $('input[name="option"]:checked').val();
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
        const selectedOption = $('input[name="option"]:checked').val();
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
        prevButton.prop('disabled', false);
      } else {
        prevButton.prop('disabled', true);
      }

      if (currentQuestion.options.length == 0) {
        nextButton.text('Завершить');
      } else {
        nextButton.text('Следующий вопрос');
      }
    }

    prevButton.on('click', function () {
      if (prevQuestionsPointer > 0) {
        prevQuestionsPointer--;
      }
      console.log(prevQuestions);
      console.log(prevQuestionsPointer);
      currentQuestion = findQuestionById(prevQuestions[prevQuestionsPointer]);
      displayQuestion();
      updateButtons();
    });

    nextButton.on('click', function () {
      selectOption();
    });

    displayQuestion();
    updateButtons();
  });
});
