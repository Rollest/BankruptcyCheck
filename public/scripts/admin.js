$(document).ready(function () {
  // Функция для загрузки списка пользователей
  function loadUsers() {
    $.ajax({
      url: '/users', // Замените на ваш маршрут для получения списка пользователей
      method: 'GET',
      success: function (users) {
        displayUsers(users);
      },
      error: function (err) {
        console.error('Error loading users:', err);
      },
    });
  }

  // Функция для отображения списка пользователей в таблице
  function displayUsers(users) {
    $('#userTable tbody').empty();
    users.forEach(function (user) {
      let row = `<tr>
                  <td>${user.id}</td>
                  <td><span class="editable login">${user.login}</span><input type="text" class="edit-input login" value="${user.login}" style="display: none;"></td>
                  <td><span class="editable password">${user.password}</span><input type="text" class="edit-input password" value="${user.password}" style="display: none;"></td>
                  <td>${user.createdAt}</td>
                  <td>${user.updatedAt}</td>
                  <td>${user.deletedAt ? user.deletedAt : '-'}</td>
                  <td><input type="checkbox" class="editable isAdmin" ${user.isAdmin ? 'checked' : ''} disabled><input type="checkbox" class="edit-input isAdmin" ${user.isAdmin ? 'checked' : ''} style="display: none;"></td>
                  <td><input type="checkbox" class="editable isActive" ${user.isActive ? 'checked' : ''} disabled><input type="checkbox" class="edit-input isActive" ${user.isActive ? 'checked' : ''} style="display: none;"></td>
                  <td>
                    <button class="editBtn">Edit</button>
                    <button class="applyBtn" style="display: none;">Apply</button>
                  </td>
                </tr>`;
      $('#userTable tbody').append(row);
    });
  }

  // Загрузка пользователей при загрузке страницы
  loadUsers();

  let loginPrev;
  let passwordPrev;
  let isAdminPrev;
  let isActivePrev;

  // Обработчик нажатия кнопки "Edit"
  $(document).on('click', '.editBtn', function () {
    let row = $(this).closest('tr');
    row.find('.editable').hide();
    row.find('.edit-input').show();
    row.find('.editBtn').hide();
    row.find('.applyBtn').show();

    // Сохраняем предыдущие значения для сравнения
    loginPrev = row.find('.edit-input.login').val();
    passwordPrev = row.find('.edit-input.password').val();
    isAdminPrev = row.find('.edit-input.isAdmin').prop('checked');
    isActivePrev = row.find('.edit-input.isActive').prop('checked');
  });

  // Обработчик нажатия кнопки "Apply"
  $(document).on('click', '.applyBtn', function () {
    let sendDto = {};

    let row = $(this).closest('tr');
    let userId = row.find('td:first').text();

    // Проверяем изменения и устанавливаем соответствующие свойства в объекте sendDto
    if (row.find('.edit-input.login').val() !== loginPrev) {
      sendDto['login'] = row.find('.edit-input.login').val();
    }
    if (row.find('.edit-input.password').val() !== passwordPrev) {
      sendDto['password'] = row.find('.edit-input.password').val();
    }
    if (
      row.find('.edit-input.isAdmin').prop('checked') !== isAdminPrev ||
      true
    ) {
      sendDto['isAdmin'] = row.find('.edit-input.isAdmin').prop('checked');
    }
    if (
      row.find('.edit-input.isActive').prop('checked') !== isActivePrev ||
      true
    ) {
      sendDto['isActive'] = row.find('.edit-input.isActive').prop('checked');
    }

    $.ajax({
      url: `/users/${userId}`, // Замените на ваш маршрут для обновления пользователя
      method: 'PATCH',
      data: sendDto,
      success: function (response) {
        // Обновляем информацию на странице после успешного обновления
        loadUsers();
        Alert('Изменения внесены успешно');
      },
      error: function (err) {
        console.error('Error updating user:', err);
      },
    });
  });
});
