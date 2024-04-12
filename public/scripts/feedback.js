$(document).ready(function () {
  const feedbackName = $('#feedback-name');
  const feedbackEmail = $('#feedback-email');
  const feedbackPhone = $('#feedback-phone');
  const feedbackMessage = $('#feedback-message');
  const feedbackBtn = $('#feedback-btn');

  $(feedbackBtn).click(function () {
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
          $(feedbackBtn).prop('disabled', true);
          $('#feedback-result').css({ display: 'block' });
        },
        'json',
      ).fail(function (xhr, status, error) {});
    }
  });

  function allInputsAreOK() {
    let result = true;
    if ($(feedbackName).val() == '') {
      result = false;
    }
    if ($(feedbackEmail).val() == '') {
      result = false;
    }
    if ($(feedbackPhone).val() == '') {
      result = false;
    }
    if ($(feedbackMessage).val() == '') {
      result = false;
    }
    return result;
  }
});
