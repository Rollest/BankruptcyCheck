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
                    <button class="editBtn">Edit</button>
                    <button class="deleteBtn">Delete</button>
                    <button class="applyBtn" style="display: none;">Apply</button>
                  </td>
                </tr>`;
      $('#userTable tbody').append(row);
    });
  }

  loadUsers();

  let loginPrev;
  let isAdminPrev;
  let isActivePrev;

  $(document).on('click', '.editBtn', function () {
    let row = $(this).closest('tr');
    row.find('.editable').hide();
    row.find('.edit-input').show();
    row.find('.editBtn').hide();
    row.find('.applyBtn').show();

    loginPrev = row.find('.edit-input.login').val();
    isAdminPrev = row.find('.edit-input.isAdmin').prop('checked');
    isActivePrev = row.find('.edit-input.isActive').prop('checked');
  });

  $(document).on('click', '.applyBtn', function () {
    let sendDto = {};

    let row = $(this).closest('tr');
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
  });

  let userId;
  $(document).on('click', '.deleteBtn', function () {
    let row = $(this).closest('tr');
    userId = row.find('td:first').text();
    $('#popup-confirmation').css({ display: 'flex' });
  });

  $('#accept-confirmation-btn').click(function () {
    $.ajax({
      url: `/users/permanent/${userId}`,
      method: 'DELETE',
      success: function (response) {
        loadUsers();
        alert('Удаление прошло успешно');
      },
      error: function (err) {
        console.error('Error updating user:', err);
      },
    });
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
                    <button class="addBtn">Add</button>
                  </td>
                </tr>`;
    $('#userTable tbody').append(row);
  });

  $(document).on('click', '.addBtn', function () {
    let row = $(this).closest('tr');
    let login = row.find('.edit-input.login').val();
    if (login.length > 5 && password.length > 5) {
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
