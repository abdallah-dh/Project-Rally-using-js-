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
      window.location.href = '/user/index.html'
      alert('Welcome ' + user.username)
    }
  })
  //------Admin Login----------

  if (!found) {
    if (
      password == 'admin' &&
      email == 'abdallahgg@gmail.com' &&
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
    alert('please enter the required infos')
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
      alert('sent successfully  ')
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
