$(document).ready(function () {
  $('.answer').hide();

  // Обработчик событий для основных аккордеонов
  $('.faq_question').click(function () {
    var accordionItem = $(this).parent();
    accordionItem.toggleClass('active');
    accordionItem.find('.answer').slideToggle('slow'); // Используем slideToggle() с параметром 'slow' для плавного открытия и закрытия
    $(this).toggleClass('active');

    // Находим значок в текущем заголовке и переключаем класс 'rotate'
    $(this).find('.toggle-icon-faq').toggleClass('rotate');
  });
  /*
  function toggleAnswer(id) {
    var answer = document.getElementById('answer' + id);
    answer.classList.toggle('show-answer').slideToggle('slow');
  }*/
});
