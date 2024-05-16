$(document).ready(function () {
  function loadUsers() {
    $.ajax({
      url: '/users',
      method: 'GET',
      success: function (users) {
        displayUsers(users);
      },
      error: function (err) {
        console.error('Error loading users:', err);
      },
    });
  }
  function loadLaws() {
    $.ajax({
      url: '/laws',
      method: 'GET',
      success: function (laws) {
        displayLaws(laws);
      },
      error: function (err) {
        console.error('Error loading laws:', err);
      },
    });
  }

  function displayUsers(users) {
    $('#userTable tbody').empty();
    users.forEach(function (user) {
      let row = `<tr>
                  <td>${user.id}</td>
                  <td><span class="editable login">${user.login}</span><input type="text" class="edit-input login" value="${user.login}" style="display: none;"></td>
                  <td><span class="editable password">password</span></td>
                  <td>${user.createdAt}</td>
                  <td>${user.updatedAt}</td>
                  <td>${user.deletedAt ? user.deletedAt : '-'}</td>
                  <td><input type="checkbox" class="editable isAdmin" ${user.isAdmin ? 'checked' : ''} disabled><input type="checkbox" class="edit-input isAdmin" ${user.isAdmin ? 'checked' : ''} style="display: none;"></td>
                  <td><input type="checkbox" class="editable isActive" ${user.isActive ? 'checked' : ''} disabled><input type="checkbox" class="edit-input isActive" ${user.isActive ? 'checked' : ''} style="display: none;"></td>
                  <td>
                    <button class="editBtn">Изменить</button>
                    <button class="deleteBtn">Удалить</button>
                    <button class="applyBtn" style="display: none;">Применить</button>
                  </td>
                </tr>`;
      $('#userTable tbody').append(row);
    });
  }

  function displayLaws(laws) {
    $('#lawTable tbody').empty();
    laws.forEach(function (law) {
      let row = `<tr>
                  <td>${law.id}</td>
                  <td><span class="editable heading">${law.heading}</span><input type="text" class="edit-input heading" value="${law.heading}" style="display: none;"></td>
                  <td><span class="editable mainText">${law.mainText}</span><input type="text" class="edit-input mainText" value="${law.mainText}" style="display: none;"></td>
                  <td><span class="editable releaseDate">${law.releaseDate}</span><input type="text" class="edit-input releaseDate" value="${law.releaseDate}" style="display: none;"></td>
                  <td>${law.createdAt}</td>
                  <td>${law.updatedAt}</td>
                  <td>
                    <button class="editBtn">Изменить</button>
                    <button class="deleteBtn">Удалить</button>
                    <button class="applyBtn" style="display: none;">Применить</button>
                  </td>
                </tr>`;
      $('#lawTable tbody').append(row);
    });
  }

  loadUsers();

  $('#toUserTable').click(() => {
    $('#userTableDiv').show();
    $('#lawTableDiv').hide();
    loadUsers();
  });
  $('#toLawTable').click(() => {
    $('#userTableDiv').hide();
    $('#lawTableDiv').show();
    loadLaws();
  });

  let loginPrev;
  let isAdminPrev;
  let isActivePrev;

  let headingPrev;
  let mainTextPrev;
  let releaseDatePrev;

  $(document).on('click', '.editBtn', function () {
    let row = $(this).closest('tr');
    row.find('.editable').hide();
    row.find('.edit-input').show();
    row.find('.editBtn').hide();
    row.find('.applyBtn').show();

    if ($('#userTableDiv').is(':visible')) {
      loginPrev = row.find('.edit-input.login').val();
      isAdminPrev = row.find('.edit-input.isAdmin').prop('checked');
      isActivePrev = row.find('.edit-input.isActive').prop('checked');
    } else if ($('#lawTableDiv').is(':visible')) {
      headingPrev = row.find('.edit-input.heading').val();
      mainTextPrev = row.find('.edit-input.mainText').val();
      releaseDatePrev = row.find('.edit-input.datePrev').val();
    }
  });

  $(document).on('click', '.applyBtn', function () {
    let sendDto = {};

    let row = $(this).closest('tr');

    if ($('#userTableDiv').is(':visible')) {
      let userId = row.find('td:first').text();

      if (row.find('.edit-input.login').val() !== loginPrev) {
        sendDto['login'] = row.find('.edit-input.login').val();
      }
      if (row.find('.edit-input.isAdmin').prop('checked') !== isAdminPrev) {
        sendDto['isAdmin'] = row.find('.edit-input.isAdmin').prop('checked');
      }
      if (row.find('.edit-input.isActive').prop('checked') !== isActivePrev) {
        sendDto['isActive'] = row.find('.edit-input.isActive').prop('checked');
      }

      $.ajax({
        url: `/users/${userId}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(sendDto),
        success: function (response) {
          loadUsers();
          alert('Изменения внесены успешно');
        },
        error: function (err) {
          console.error('Error updating user:', err);
        },
      });
    } else if ($('#lawTableDiv').is(':visible')) {
      let lawId = row.find('td:first').text();

      if (row.find('.edit-input.heading').val() !== headingPrev) {
        sendDto['heading'] = row.find('.edit-input.heading').val();
      }
      if (row.find('.edit-input.mainText').val() !== mainTextPrev) {
        sendDto['mainText'] = row.find('.edit-input.mainText').val();
      }
      if (row.find('.edit-input.releaseDate').val() !== releaseDatePrev) {
        sendDto['releaseDate'] = row.find('.edit-input.releaseDate').val();
      }

      $.ajax({
        url: `/laws/${lawId}`,
        method: 'PATCH',
        contentType: 'application/json',
        data: JSON.stringify(sendDto),
        success: function (response) {
          loadLaws();
          alert('Изменения внесены успешно');
        },
        error: function (err) {
          console.error('Error updating user:', err);
        },
      });
    }
  });

  let deleteId;
  $(document).on('click', '.deleteBtn', function () {
    let row = $(this).closest('tr');
    deleteId = row.find('td:first').text();
    $('#popup-confirmation').css({ display: 'flex' });
  });

  $('#accept-confirmation-btn').click(function () {
    if ($('#userTableDiv').is(':visible')) {
      $.ajax({
        url: `/users/permanent/${deleteId}`,
        method: 'DELETE',
        success: function (response) {
          loadUsers();
          alert('Удаление прошло успешно');
        },
        error: function (err) {
          console.error('Error updating user:', err);
        },
      });
    } else if ($('#lawTableDiv').is(':visible')) {
      $.ajax({
        url: `/laws/${deleteId}`,
        method: 'DELETE',
        success: function (response) {
          loadLaws();
          alert('Удаление прошло успешно');
        },
        error: function (err) {
          console.error('Error updating law:', err);
        },
      });
    }
    $('#popup-confirmation').css({ display: 'none' });
  });

  $('#deny-confirmation-btn').click(function () {
    $('#popup-confirmation').css({ display: 'none' });
  });

  $('#add-new-user').click(function () {
    let row = `<tr>
                  <td></td>
                  <td><input type="text" class="edit-input login" value=""></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button class="addBtn">Добавить</button>
                  </td>
                </tr>`;
    $('#userTable tbody').append(row);
  });
  $('#add-new-law').click(function () {
    let row = `<tr>
                  <td></td>
                  <td><input type="text" class="edit-input heading" value=""></td>
                  <td><input type="text" class="edit-input mainText" value=""></td>
                  <td><input type="text" class="edit-input releaseDate" value=""></td>
                  <td></td>
                  <td></td>
                  <td>
                    <button class="addBtn">Добавить</button>
                  </td>
                </tr>`;
    $('#lawTable tbody').append(row);
  });

  $(document).on('click', '.addBtn', function () {
    if ($('#userTableDiv').is(':visible')) {
      row = $(this).closest('tr');
      let login = row.find('.edit-input.login').val();
      if (login.length > 5) {
        $.ajax({
          url: `/users`,
          method: 'POST',
          data: {
            login: login,
            password: generateRandomPassword(10),
          },
          success: function (response) {
            loadUsers();
            alert('Добавление произошло успешно');
          },
          error: function (err) {
            console.error('Error updating user:', err);
          },
        });
      } else {
        alert('Логин и пароль должны состоять минимум из 6 символов');
      }
    } else if ($('#lawTableDiv').is(':visible')) {
      row = $(this).closest('tr');
      let heading = row.find('.edit-input.heading').val();
      let mainText = row.find('.edit-input.mainText').val();
      let releaseDate = row.find('.edit-input.releaseDate').val();
      if (heading != '' && mainText != '' && releaseDate != '') {
        $.ajax({
          url: `/laws`,
          method: 'POST',
          data: {
            heading: heading,
            mainText: mainText,
            releaseDate: releaseDate,
          },
          success: function (response) {
            loadLaws();
            alert('Добавление произошло успешно');
          },
          error: function (err) {
            console.error('Error updating user:', err);
          },
        });
      } else {
        alert('Все поля должны быть заполнены');
      }
    }
  });
  function generateRandomPassword(length) {
    var charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    var password = '';
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
});
