$(document).ready(function () {
  var modal = document.getElementById('popup');
  var modal2 = document.getElementById('popup-2');

  var enter = document.getElementById('open-login-btn');
  var reg = document.getElementById('open-registration-btn');

  var span = document.getElementsByClassName('close')[0];
  var span2 = document.getElementsByClassName('close2')[0];

  // enter
  enter.onclick = function () {
    modal.style.display = 'block';
  };

  // reg
  reg.onclick = function () {
    modal2.style.display = 'block';
  };

  // Когда пользователь нажимает на <span> (x), закрывает popup
  span.onclick = function () {
    modal.style.display = 'none';
  };
  span2.onclick = function () {
    modal2.style.display = 'none';
  };

  // Когда пользователь щелкает в любом месте за пределами popup, закрывает его
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
    if (event.target == modal2) {
      modal2.style.display = 'none';
    }
  };
});
