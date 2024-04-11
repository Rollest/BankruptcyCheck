$(document).ready(function () {
  $('.accordion-content').hide();

  $('.accordion-header').click(function () {
    var accordionItem = $(this).parent();
    accordionItem.toggleClass('active');
    accordionItem.find('.accordion-content').slideToggle();
    $(this).toggleClass('active');
  });

  // Добавляем обработчик событий для вложенных аккордеонов
  $('.accordion-in-content').hide(); // Скрываем весь контент вложенных аккордеонов изначально

  $('.accordion-in-header').click(function () {
    var accordionInItem = $(this).parent();
    accordionInItem.toggleClass('active');
    accordionInItem.find('.accordion-in-content').slideToggle();
    $(this).toggleClass('active'); // Добавляем/удаляем класс при нажатии
  });

  const checkCourtBtn = $('#download-btn-court');

  $(checkCourtBtn).click(function () {
    console.log('smth');
    const userIsNotLogged = $('.header-login-content').length < 1;
    if (!userIsNotLogged) {
      buildAndDownloadDocument('check_court.docx');
    }
  });

  const checkOutBtn = $('#download-btn-out');

  $(checkOutBtn).click(function () {
    console.log('smth');
    const userIsNotLogged = $('.header-login-content').length < 1;
    if (!userIsNotLogged) {
      buildAndDownloadDocument('check_outcourt.docx');
    }
  });

  function getFile(filename) {
    const path = 'checks/' + filename;
    return fetch(path, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then((blob) => {
        return blob.arrayBuffer();
      })
      .then((arrayBuffer) => {
        return arrayBuffer;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function buildAndDownloadDocument(filename) {
    getFile(filename).then((arrayBuffer) => {
      const blob = new Blob([arrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Имя файла
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
});
