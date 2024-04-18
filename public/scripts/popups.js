$(document).ready(function () {
  var modal = $('#popup');
  var modal2 = $('#popup-2');

  var enter = $('#open-login-btn');
  var reg = $('#open-registration-btn');

  var span = $('.close:first');
  var span2 = $('.close2:first');

  // enter
  enter.click(function () {
    openLogin();
  });

  // reg
  reg.click(function () {
    openReg();
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

  $('#login-reg-button').click(function () {
    openReg();
  });

  $('#reg-login-button').click(function () {
    openLogin();
  });

  function openLogin() {
    modal.css('display', 'flex');
    modal2.css('display', 'none');
  }

  function openReg() {
    modal.css('display', 'none');
    modal2.css('display', 'flex');
  }

  $('.constructor-link').on('click', function (event) {
    needToEnter(event);
  });

  function needToEnter(event) {
    const userIsNotLogged = $('.header-login-content').length < 1;
    if (userIsNotLogged) {
      event.preventDefault();
      modal.css('display', 'flex');
    }
  }
});
