$(document).ready(function () {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short' });
  $('.relevance-date').text(`Актуально на ${formatter.format(date)}`);
});
