$(document).ready(function () {
  setTimeout(() => {
    if (getCookie('disclaimer') != 'true') {
      $('#popup-disclaimer').css({ display: 'flex' });
    }
  }, 3000);

  $('#accept-disclaimer-btn').click(function () {
    document.cookie = 'disclaimer=true';
    $('#popup-disclaimer').css({ display: 'none' });
  });
});

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
