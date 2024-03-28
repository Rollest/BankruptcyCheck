const questions = [
    {
      id: 1,
      question: "Are you hungry?",
      options: [
        { id: 2, text: "Yes", nextQuestionId: 2, isPicked: false, questionNum: 0, totalQuestions: 4},
        { id: 3, text: "No", nextQuestionId: 10, isPicked: false, questionNum: 0, totalQuestions: 4 }
      ],
      questionNum: 0,
      totalQuestions: 3
    },
    {
      id: 2,
      question: "Do you want pizza or burger?",
      options: [
        { id: 4, text: "Pizza", nextQuestionId: 3, isPicked: false },
        { id: 5, text: "Burger", nextQuestionId: 4, isPicked: false }
      ],
      questionNum: 1,
      totalQuestions: 3
    },
    {
      id: 3,
      question: "What topping do you want on your pizza?",
      options: [
        { id: 6, text: "Pepperoni", nextQuestionId: 6, isPicked: false },
        { id: 7, text: "Veggie", nextQuestionId: 7, isPicked: false }
      ],
      questionNum: 2,
      totalQuestions: 3
    },
    {
      id: 4,
      question: "What type of burger do you prefer?",
      options: [
        { id: 8, text: "Beef", nextQuestionId: 8, isPicked: false },
        { id: 9, text: "Chicken", nextQuestionId: 9, isPicked: false }
      ],
      questionNum: 2,
      totalQuestions: 3
    },
    {
      id: 10,
      question: "No food needed? Okay, have a good day!",
      options: [],
      questionNum: 3,
      totalQuestions: 3
    },
    {
      id: 6,
      question: "Pepperoni pizza? Great choice!",
      options: [],
      questionNum: 3,
      totalQuestions: 3
    },
    {
      id: 7,
      question: "Veggie pizza? Good for health!",
      options: [],
      questionNum: 3,
      totalQuestions: 3
    },
    {
      id: 8,
      question: "Beef burger? Tasty!",
      options: [],
      questionNum: 3,
      totalQuestions: 3
    },
    {
      id: 9,
      question: "Chicken burger? Delicious!",
      options: [],
      questionNum: 3,
      totalQuestions: 3
    }
  ];
  
  let prevQuestions = [];
  let currentQuestionIndex = 1;
  let currentQuestion = findQuestionById(currentQuestionIndex);
  let questionCounter = 0;
  let totalQuestions = 0;

  function findQuestionById(id){
    for(const question in questions){
        if(questions[question].id == id){
            return questions[question]
        }
    }
  }
  
  const questionElement = document.querySelector('.question');
  const optionsContainer = document.querySelector('.options');
  const prevButton = document.getElementById('prevBtn');
  const nextButton = document.getElementById('nextBtn');
  
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
  
  function selectOption() {
    updateIsPicked();
    currentQuestion = findNextQuestion();
    prevQuestions.push(currentQuestionIndex);
    currentQuestionIndex = currentQuestion.id;
    displayQuestion();
    updateButtons();

    function findNextQuestion(){
        const selectedOption = document.querySelector('input[name="option"]:checked').value;
        for(const question in questions){
            if(questions[question].id == JSON.parse(selectedOption).nextQuestionId){
                return questions[question]
            }
        }
    }

    function updateIsPicked(){
        const options = currentQuestion.options;
        for(const option in options){
            options[option].isPicked = false;
        }
        try{
            const selectedOption = document.querySelector('input[name="option"]:checked').value;
            const selected_id = JSON.parse(selectedOption).id;
            for(const option in options){
                if(options[option].id == selected_id){
                    options[option].isPicked = true;
                }
            }
        }catch(e){}
    }
  }
  
  function updateButtons() {
    if (prevQuestions.length == 0) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  
    if (currentQuestion.options.length == 0) {
      nextButton.textContent = 'Завершить';
    } else {
      nextButton.textContent = 'Следующий вопрос';
    }
    updateProgressBar();
  }

  function updateProgressBar() {
    const answeredQuestions = questionCounter;
    console.log(answeredQuestions);
    console.log(totalQuestions);
    const progress = (answeredQuestions / totalQuestions) * 100;
    const progressBar = document.getElementById('progressBar');
    progressBar.value = progress;
    }
  
  prevButton.addEventListener('click', () => {
    currentQuestion = findQuestionById(prevQuestions.pop());
    questionCounter--;
    displayQuestion();
    updateButtons();
  });
  
  nextButton.addEventListener('click', () => {
    selectOption();
  });
  
  displayQuestion();
  updateButtons();
  