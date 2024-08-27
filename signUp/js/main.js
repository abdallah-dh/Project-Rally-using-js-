;(function ($) {
  'use strict'

  /*==================================================================
    [ Validate ]*/
  var input = $('.validate-input .input100')

  $('.validate-form').on('submit', function () {
    var check = true

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i])
        check = false
      }
    }

    return check
  })

  $('.validate-form .input100').each(function () {
    $(this).focus(function () {
      hideValidate(this)
    })
  })

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
          ) == null
      ) {
        return false
      }
    } else {
      if ($(input).val().trim() == '') {
        return false
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent()

    $(thisAlert).addClass('alert-validate')
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent()

    $(thisAlert).removeClass('alert-validate')
  }
})(jQuery)

//---------Functions--------------------
//--------------------------------------
function Getter(localvar) {
  let list = []
  const storedData = localStorage.getItem(localvar)
  if (storedData !== null && storedData.trim() !== '') {
    list = JSON.parse(storedData)
  }
  return list
}
function login() {
  const emailInput = document.querySelector('input[name="email"]')
  const passwordInput = document.querySelector('input[name="pass"]')
  const usernameInput = document.querySelector('input[name="username"]')

  const email = emailInput.value
  const password = passwordInput.value
  const username = usernameInput.value

  //----resivre Local storage ------
  //----------------------------
  let found = false
  //-----local storage users et pilots ------
  let users = Getter('users')
  let racers = Getter('racers')
  //----verification les donnees  ---------

  users.forEach((user) => {
    if (
      user.password == password &&
      user.email == email &&
      user.username == username && 
      !found
    ) {
      found = true
      //-----store user info ------------
      const dataUser = {
        id: user.id,
        email: email,
        password: password,
        username: username,
        image: user.image,
      }
      //----  Store info of the logged in user -----------
      localStorage.setItem('user', JSON.stringify(dataUser))
      //----Register the log in and authentication -----------
      localStorage.setItem('auth', 'user')
      //-----Register the event-------------------------
      AddEvent(username, ' logged in', 'loggedin')
      //------------------------------------------------------
      window.location.href = '/tp-car/user/index.html'
      alert('Welcome ' + user.username)
    }
  })
  //----racer login ------
  if (!found) {
  racers.forEach((racer) => {
    
      if (password == racer.name + racer.age && username == racer.name) {
        const dataUser = {
          password: password,
          username: racer.name,
          image: racer.image,
        }
        localStorage.setItem('user', JSON.stringify(dataUser))
        AddEvent(username, ' logged in', 'loggedin')

        //----Register the log in and authentication -----------
        localStorage.setItem('auth', 'racer')
        //-------------------------------------------------
        window.location.href = '/tp-car/racer/index.html'
        found = true
        alert('Welcome ' + racer.name)
      }
    
  })
} 
  //------Admin Login----------

  if (!found) {
    if (
      password == 'admin' &&
      email == 'abdallah2@gmail.com' &&
      username == 'admin'
    ) {
      //----Register the log in and authentication -----------
      localStorage.setItem('auth', 'admin')
      //-------------------------------------------------
      window.location.href = '/admin/index.html'
      found = true
      alert('Welcome Admin')
    }
  }
  //-----if log in fails
  if (!found) {
    alert('Failed')
  }
}

function formater() {
  let empty = []

  // localStorage.setItem('users', JSON.stringify(empty))
  localStorage.setItem('cars', JSON.stringify(empty))

  localStorage.setItem('user', '')

  //console.log('formater')
}

//--------------Request------------------------
function Create_a_request() {
  //-----create a request object
  const usernameInput = document.querySelector('input[name="usernameReq"]')
  const emailInput = document.querySelector('input[name="emailReq"]')

  const email = emailInput.value
  //----Get Local storage ------
  let requests = Getter('requests')
  let users = Getter('users')

  //----------------------------
  if (email === '' || usernameInput === '') {
    alert("please enter the required infos")
  } else {
    //------------------
    let exist = false
    requests.forEach((req) => {
      if (usernameInput.value === req.username) {
        exist = true
      }
    })

    //---------------
    if (!exist) {
      const req = {
        email: email,
        username: usernameInput.value,
        time: date(),
      }
      requests.push(req)
      localStorage.setItem('requests', JSON.stringify(requests))
      //------
      alert('sent successfully')
      ///------display -----------------
    } else {
      alert('already sent ')
    }
    
  }
}
function formaterreq() {
  let req = []
  localStorage.setItem('requests', JSON.stringify(req))
  //console.log('formater')
}

//------Time extracting
function date() {
  // Get current date and time
  const now = new Date()

  // Get year, month, day, hour, and minute
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()

  // Format the date and time as a string
  const formattedDate = `${year}-${month
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  const formattedTime = `${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  const formattedDateTime = `${formattedDate} ${formattedTime}`
  return formattedDateTime
}

//------to store events like logins and users changing thiere info
function AddEvent(username, eventtype) {
  let events = Getter('events')
  //------add event------------
  let eventmsg = username + eventtype
  //---------------
  const event = {
    event: eventmsg,
    time: date(),
  }
  events.push(event)
  localStorage.setItem('events', JSON.stringify(events))
}

//-----------------------------
//------------Show users in console -----------------
function showusers() {
  let users = Getter('users')
  // console.log(localStorage.getItem('users'))
  users.forEach((user) => {
    console.log(user.email + " - " + user.username + " - " + user.password)
  })
}
window.addEventListener('load', showusers)
//----------get racers-------- 
//-------------------------
function displayRacers() {
  let racers = Getter('racers')
  racers.forEach((racer) => {
    console.log(racer.name)
    console.log(racer.name + racer.age)
    console.log('-------------------------------')
  })
}
window.addEventListener('load', displayRacers)
