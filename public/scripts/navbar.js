$(document).ready(function () {
  const url = window.location.href;

  if (url.includes('about')) {
    $('#a-about').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  } else if (url.includes('faq')) {
    $('#a-faq').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  } else if (url.includes('laws')) {
    $('#a-laws').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  } else if (url.includes('constructor')) {
    $('#a-constructor').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  } else if (url.includes('admin')) {
    $('#a-admin').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  } else {
    $('#a-main').css({
      'text-decoration': 'underline',
      'text-underline-offset': '6px',
    });
  }
});
