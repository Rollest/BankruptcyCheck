$(document).ready(function () {

  const openLoginBtn = $("#open-login-btn")
  const openRegistrationBtn = $("#open-registration-btn")

  openLoginBtn.click(function(){
    openLoginCloseRegistration()
  })
  openRegistrationBtn.click(function(){
    openRegistrationCloseLogin()
  })

  function openLoginCloseRegistration(){
    const loginBlock = $(".login-form")
    const registrationBlock = $(".registration-form")

    loginBlock.css({display: 'block'})
    registrationBlock.css({display: 'none'})

    const loginInput = $("#registration-login")
    const passwordInput = $("#registration-password")

    loginInput.val("")
    passwordInput.val("") 

    loginInput.css({'border-color': 'gray'})
    passwordInput.css({'border-color': 'gray'})
  }

  function openRegistrationCloseLogin(){
    const loginBlock = $(".login-form")
    const registrationBlock = $(".registration-form")

    loginBlock.css({display: 'none'})
    registrationBlock.css({display: 'block'})

    const loginInput = $("#login-login")
    const passwordInput = $("#login-password")

    loginInput.val("")
    passwordInput.val("")

    loginInput.css({'border-color': 'gray'})
    passwordInput.css({'border-color': 'gray'})
  }

  const minPasswordLength = 6
  const minLoginLength = 6

  const loginBtn = $("#login-btn")
  const loginRegistrationBtn = $('#login-registration-btn')

  loginBtn.click(function(){
    const loginInput = $("#login-login")
    const passwordInput = $("#login-password")

    const isLoginOK = isLoginCorrect(loginInput)
    const isPasswordOK = isPasswordCorrect(passwordInput)

    if(isLoginOK && isPasswordOK){
      loginInput.css({'border-color': 'green'})
      passwordInput.css({'border-color': 'green'})

      $.post( "auth/login", { 'login': loginInput.val(), 'password': passwordInput.val() }, function( data ){
        document.location.href = './'
        console.log( data ); 
      }, "json");

      function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

      console.log("login");
    }else{
      if(!isLoginOK){
        loginInput.css({'border-color': 'red'})
      }else{
        loginInput.css({'border-color': 'green'})
      }
      if(!isPasswordOK){
        passwordInput.css({'border-color': 'red'})
      }else{
        passwordInput.css({'border-color': 'green'})
      }
    }
  })

  loginRegistrationBtn.click(function(){
    openRegistrationCloseLogin()
  })

  const registrationBtn = $("#registration-btn")
  const registrationLoginBtn = $('#registration-login-btn')

  registrationBtn.click(function(){
    const loginInput = $("#registration-login")
    const passwordInput = $("#registration-password")

    const isLoginOK = isLoginCorrect(loginInput)
    const isPasswordOK = isPasswordCorrect(passwordInput)

    if(isLoginOK && isPasswordOK){
      loginInput.css({'border-color': 'green'})
      passwordInput.css({'border-color': 'green'})
      $.post( "users", { 'login': loginInput.val(), 'password': passwordInput.val() } , function( data ) {console.log( data ); }, "json");
      console.log("registration");

    }else{
      if(!isLoginOK){
        loginInput.css({'border-color': 'red'})
      }
      if(!isPasswordOK){
        passwordInput.css({'border-color': 'red'})
      }
    }
  })

  registrationLoginBtn.click(function(){
    openLoginCloseRegistration()
  })

  function isLoginCorrect(loginInput){
    if(loginInput.val().length >= minLoginLength){
      return true
    }
    return false
  }

  function isPasswordCorrect(passwordInput){
    if(passwordInput.val().length >= minPasswordLength){
      return true
    }
    return false
  }




  const exitBtn = $('#exit-btn')
  exitBtn.click(function(){
    $.get( "auth/signout")
    .done(function( data ) {
      document.location.href = './'
    });
  })

  const username = $('#username')
  username.html()



})



