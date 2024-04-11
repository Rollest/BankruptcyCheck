$(document).ready(function () {
  const feedbackBtn = $('.feedback-btn');
  const feedbackForm = $('.feedback-form');
  const closeButton = $('<span class="close-button">&times;</span>'); // Создаем элемент кнопки закрытия

  feedbackBtn.on('click', function () {
    feedbackForm.css('display', 'block');
    feedbackForm.append(closeButton);
  });

  $('body').on('click', '.close-button', function () {
    feedbackForm.find('input').val('');
    feedbackForm.find('textarea').val('');
    feedbackForm.css('display', 'none');
    $(this).remove(); // Удаляем кнопку закрытия
  });
});
