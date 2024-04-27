$(document).ready(function () {
  const minPasswordLength = 6;
  const minLoginLength = 6;
  let commentDiv;
  let loginComment;
  let loginCommentText;
  let passwordComment;
  let passwordCommentText;

  const loginBtn = $('#login-btn');
  const registrationBtn = $('#registration-btn');

  loginBtn.click(function () {
    const loginInput = $('#login-login');
    const passwordInput = $('#login-password');
    commentDiv = $('#enter-comment');
    loginComment = $('#enter-login-comment');
    passwordComment = $('#enter-password-comment');

    const isLoginOK = isLoginCorrect(loginInput);
    const isPasswordOK = isPasswordCorrect(passwordInput);
    manageComments();

    if (isLoginOK && isPasswordOK) {
      loginInput.css({ 'border-color': 'green' });
      passwordInput.css({ 'border-color': 'green' });

      $.post(
        'auth/login',
        { login: loginInput.val(), password: passwordInput.val() },
        function (data) {
          location.reload();
          userIsLogged = true;
        },
        'json',
      ).fail(function (xhr, status, error) {
        if (xhr.status === 401) {
          console.log('Ошибка 401: Пользователь не авторизован.');
          loginCommentText = 'Пользователь с таким логином и паролем не найден';
          manageComments();
        } else {
          console.log('Произошла ошибка: ' + error);
        }
      });
    }
  });

  registrationBtn.click(function () {
    const loginInput = $('#registration-login');
    const passwordInput = $('#registration-password');
    const passwordAgainInput = $('#registration-password-again');
    commentDiv = $('#registration-comment');
    loginComment = $('#registration-login-comment');
    passwordComment = $('#registration-password-comment');

    const isLoginOK = isLoginCorrect(loginInput);
    const isPasswordOK = isPasswordCorrect(passwordInput, passwordAgainInput);
    manageComments();

    if (isLoginOK && isPasswordOK) {
      $.post(
        '../users',
        { login: loginInput.val(), password: passwordInput.val() },
        function (data) {
          loginCommentText = 'Вы успешно зарегистрировались';
          manageComments();
        },
        'json',
      ).fail(function (xhr, status, error) {
        if (xhr.status === 400) {
          loginCommentText = 'Пользователь с таким логином уже существует';
          manageComments();
        } else {
          console.log('Произошла ошибка: ' + error);
        }
      });
    }
  });

  function isLoginCorrect(loginInput) {
    if (loginInput.val().length >= minLoginLength) {
      loginCommentText = '';
      return true;
    }
    loginCommentText = 'Логин должен состоять минимум из 6 символов';
    return false;
  }

  function isPasswordCorrect(passwordInput, passwordAgainInput = null) {
    if (passwordInput.val().length < minPasswordLength) {
      passwordCommentText = 'Пароль должен состоять минимум из 6 символов';
      return false;
    }
    if (passwordAgainInput == null) {
      passwordCommentText = '';
      return true;
    } else {
      if (passwordInput.val() == passwordAgainInput.val()) {
        passwordCommentText = '';
        return true;
      } else {
        passwordCommentText = 'Введенные пароли не совпадают';
        return false;
      }
    }
  }

  function manageComments() {
    if (passwordCommentText != '') {
      $(commentDiv).css({ display: 'block' });
      $(passwordComment).css({ display: 'block' });
      $(passwordComment).text(passwordCommentText);
    } else {
      $(passwordComment).css({ display: 'none' });
    }
    if (loginCommentText != '') {
      $(commentDiv).css({ display: 'block' });
      $(loginComment).css({ display: 'block' });
      if (loginCommentText == 'Вы успешно зарегистрировались') {
        $(loginComment).css({ color: 'green' });
      } else {
        $(loginComment).css({ color: 'red' });
      }
      $(loginComment).text(loginCommentText);
    } else {
      $(loginComment).css({ display: 'none' });
    }
    if (loginCommentText == '' && passwordCommentText == '') {
      $(commentDiv).css({ display: 'none' });
      $(passwordComment).css({ display: 'none' });
      $(loginComment).css({ display: 'none' });
    }
  }

  const signoutBtn = $('#exit-btn');
  signoutBtn.click(function () {
    $.get('auth/signout').done(function (data) {
      if (
        !location.href.includes('constructor') &&
        !location.href.includes('admin')
      ) {
        location.reload();
      } else {
        location.assign('./');
      }
      userIsLogged = false;
    });
  });

  const username = $('#username');
  username.html();
});
