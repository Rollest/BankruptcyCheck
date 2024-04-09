$(document).ready(function () {
  const feedbackName = $('#feedback-name');
  const feedbackEmail = $('#feedback-email');
  const feedbackPhone = $('#feedback-phone');
  const feedbackMessage = $('#feedback-message');
  const feedbackBtn = $('#feedback-btn');

  console.log(feedbackBtn);

  $(feedbackBtn).click(function () {
    console.log('feeeeed back');
    if (allInputsAreOK()) {
      $.post(
        'feedback',
        {
          name: $(feedbackName).val(),
          email: $(feedbackEmail).val(),
          phone: $(feedbackPhone).val(),
          message: $(feedbackMessage).val(),
        },
        function (data) {
          console.log(data);
        },
        'json',
      ).fail(function (xhr, status, error) {
        console.log('Произошла ошибка: ' + error);
      });
    }
  });

  function allInputsAreOK() {
    let result = true;
    if ($(feedbackName).val() == '') {
      console.log('name is not ok');
      result = false;
    }
    if ($(feedbackEmail).val() == '') {
      console.log('mail is not ok');
      result = false;
    }
    if ($(feedbackPhone).val() == '') {
      console.log('phone is not ok');
      result = false;
    }
    if ($(feedbackMessage).val() == '') {
      console.log('message is not ok');
      result = false;
    }
    return result;
  }
});
