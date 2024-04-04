$(document).ready(function () {
  const openLoginBtn = $('#open-login-btn');
  const openRegistrationBtn = $('#open-registration-btn');

  openLoginBtn.click(function () {
    openLoginCloseRegistration();
  });
  openRegistrationBtn.click(function () {
    openRegistrationCloseLogin();
  });

  function openLoginCloseRegistration() {
    const loginBlock = $('.login-form');
    const registrationBlock = $('.registration-form');

    loginBlock.css({ display: 'block' });
    registrationBlock.css({ display: 'none' });

    const loginInput = $('#registration-login');
    const passwordInput = $('#registration-password');

    loginInput.val('');
    passwordInput.val('');

    loginInput.css({ 'border-color': 'gray' });
    passwordInput.css({ 'border-color': 'gray' });
  }

  function openRegistrationCloseLogin() {
    const loginBlock = $('.login-form');
    const registrationBlock = $('.registration-form');

    loginBlock.css({ display: 'none' });
    registrationBlock.css({ display: 'block' });

    const loginInput = $('#login-login');
    const passwordInput = $('#login-password');

    loginInput.val('');
    passwordInput.val('');

    loginInput.css({ 'border-color': 'gray' });
    passwordInput.css({ 'border-color': 'gray' });
  }

  const minPasswordLength = 6;
  const minLoginLength = 6;

  const loginBtn = $('#login-btn');
  const loginRegistrationBtn = $('#login-registration-btn');

  loginBtn.click(function () {
    const loginInput = $('#login-login');
    const passwordInput = $('#login-password');

    const isLoginOK = isLoginCorrect(loginInput);
    const isPasswordOK = isPasswordCorrect(passwordInput);

    if (isLoginOK && isPasswordOK) {
      loginInput.css({ 'border-color': 'green' });
      passwordInput.css({ 'border-color': 'green' });

      $.post(
        '../api/auth/login',
        { login: loginInput.val(), password: passwordInput.val() },
        function (data) {
          location.reload();
          console.log(data);
        },
        'json',
      );

      console.log('login');
    } else {
      if (!isLoginOK) {
        loginInput.css({ 'border-color': 'red' });
      } else {
        loginInput.css({ 'border-color': 'green' });
      }
      if (!isPasswordOK) {
        passwordInput.css({ 'border-color': 'red' });
      } else {
        passwordInput.css({ 'border-color': 'green' });
      }
    }
  });

  loginRegistrationBtn.click(function () {
    openRegistrationCloseLogin();
  });

  const registrationBtn = $('#registration-btn');
  const registrationLoginBtn = $('#registration-login-btn');

  registrationBtn.click(function () {
    const loginInput = $('#registration-login');
    const passwordInput = $('#registration-password');
    const passwordAgainInput = $('#registration-password-again');

    const isLoginOK = isLoginCorrect(loginInput);
    const isPasswordOK = isPasswordCorrect(passwordInput);

    if (
      isLoginOK &&
      isPasswordOK &&
      $(passwordInput).val() == $(passwordAgainInput).val()
    ) {
      loginInput.css({ 'border-color': 'green' });
      passwordInput.css({ 'border-color': 'green' });
      $.post(
        '../api/users',
        { login: loginInput.val(), password: passwordInput.val() },
        function (data) {
          console.log(data);
        },
        'json',
      );
      console.log('registration');
    } else {
      if (!isLoginOK) {
        loginInput.css({ 'border-color': 'red' });
      }
      if (!isPasswordOK) {
        passwordInput.css({ 'border-color': 'red' });
      }
    }
  });

  registrationLoginBtn.click(function () {
    openLoginCloseRegistration();
  });

  function isLoginCorrect(loginInput) {
    if (loginInput.val().length >= minLoginLength) {
      return true;
    }
    return false;
  }

  function isPasswordCorrect(passwordInput) {
    if (passwordInput.val().length >= minPasswordLength) {
      return true;
    }
    return false;
  }

  const signoutBtn = $('#exit-btn');
  signoutBtn.click(function () {
    $.get('../api/auth/signout').done(function (data) {
      location.reload();
    });
  });

  const username = $('#username');
  username.html();
});
