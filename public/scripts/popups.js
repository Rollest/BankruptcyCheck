$(document).ready(function () {
  var modal = $('#popup');
  var modal2 = $('#popup-2');

  var enter = $('#open-login-btn');
  var reg = $('#open-registration-btn');

  var span = $('.close:first');
  var span2 = $('.close2:first');

  // enter
  enter.click(function () {
    modal.css('display', 'block');
  });

  // reg
  reg.click(function () {
    modal2.css('display', 'block');
  });

  // Когда пользователь нажимает на <span> (x), закрывает popup
  span.click(function () {
    modal.css('display', 'none');
    modal.find('input').val('');
  });
  span2.click(function () {
    modal2.css('display', 'none');
    modal2.find('input').val('');
  });

  // Когда пользователь щелкает в любом месте за пределами popup, закрывает его
  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.css('display', 'none');
      modal.find('input').val('');
    }
    if (event.target == modal2[0]) {
      modal2.css('display', 'none');
      modal2.find('input').val('');
    }
  });
});
