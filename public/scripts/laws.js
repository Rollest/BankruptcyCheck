$(document).ready(function () {
  function formatDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return day + '.' + month + '.' + year;
  }

  function formatDateToStandard(dateString) {
    var date = new Date(dateString);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }

  function populateLaws(laws) {
    $('#laws-list').empty();
    laws.forEach(function (law) {
      var formattedDate = formatDate(law.releaseDate);
      var card = `
        <div class="law-card">
          <h4>${law.heading}</h4>
          <p>Дата принятия: ${formattedDate}</p>
          <p>${law.mainText}</p>
        </div>
      `;
      $('#laws-list').append(card);
    });
  }

  let lawsArray;
  function loadLaws() {
    $.ajax({
      url: '/laws',
      method: 'GET',
      success: function (laws) {
        lawsArray = laws;
        populateLaws(laws);
      },
      error: function (err) {
        console.error('Error loading laws:', err);
      },
    });
  }

  loadLaws();

  $('#filterByName').on('input', function () {
    filterAndSortLaws();
  });

  $('#filterStartDate, #filterEndDate').on('change', function () {
    filterAndSortLaws();
  });

  $('#sortOptions').on('change', function () {
    filterAndSortLaws();
  });

  function filterAndSortLaws() {
    var nameFilter = $('#filterByName').val().toLowerCase();
    var startDate = $('#filterStartDate').val()
      ? new Date($('#filterStartDate').val())
      : null;
    var endDate = $('#filterEndDate').val()
      ? new Date($('#filterEndDate').val())
      : null;
    var sortOption = $('#sortOptions').val();

    var filteredLaws = lawsArray.filter(function (law) {
      var lawDate = new Date(law.releaseDate);
      var nameMatches = law.heading.toLowerCase().includes(nameFilter);
      var dateMatches = true;

      if (startDate && endDate) {
        dateMatches = lawDate >= startDate && lawDate <= endDate;
      } else if (startDate) {
        dateMatches = lawDate >= startDate;
      } else if (endDate) {
        dateMatches = lawDate <= endDate;
      }

      return nameMatches && dateMatches;
    });

    if (sortOption === 'date-asc') {
      filteredLaws.sort(function (a, b) {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      });
    } else if (sortOption === 'date-desc') {
      filteredLaws.sort(function (a, b) {
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      });
    }

    populateLaws(filteredLaws);
  }
});
