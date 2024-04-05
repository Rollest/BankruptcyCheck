$(document).ready(function () {
  $('.accordion-content').hide(); // Скрываем весь контент изначально

  $('.accordion-header').click(function () {
    var accordionItem = $(this).parent();
    accordionItem.toggleClass('active');
    accordionItem.find('.accordion-content').slideToggle();
    $(this).toggleClass('active'); // Добавляем/удаляем класс при нажатии
  });

  // Добавляем обработчик событий для вложенных аккордеонов
  $('.accordion-in-content').hide(); // Скрываем весь контент вложенных аккордеонов изначально

  $('.accordion-in-header').click(function () {
    var accordionInItem = $(this).parent();
    accordionInItem.toggleClass('active');
    accordionInItem.find('.accordion-in-content').slideToggle();
    $(this).toggleClass('active'); // Добавляем/удаляем класс при нажатии
  });
});
