function Getter(localvar) {
  let list = []
  const storedData = localStorage.getItem(localvar)
  if (storedData !== null && storedData.trim() !== '') {
    list = JSON.parse(storedData)
  }
  return list
}
//------id generator ----------
//------------------------------
function generateID() {
  let id = '';
  const characters = '0123456789';
  const length = 8;

  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return id
}

//-----------------------------------

//-----------------------------------

function adduser() {
  const usernameInput = document.querySelector('input[name="username"]')
  const emailInput = document.querySelector('input[name="email"]')
  const passwordInput = document.querySelector('input[name="pass"]')

  const email = emailInput.value
  const password = passwordInput.value
  //----Get Local storage ------
  const storedData = localStorage.getItem('users')
  let users = []
  if (storedData !== null && storedData.trim() !== '') {
    users = JSON.parse(storedData)
  }
  //----------------------------
  if (password === '' || email === '' || usernameInput === '') {
    //--Nothing
  } else {
    //------add user------------
    let exist = false
    //----------------------------
    users.forEach((user) => {
      if (usernameInput.value === user.username) {
        exist = true
      }
    })
    //---------------
    //----Verify user if exists ----
    if (!exist) {
      //----------generate a unique id (creat new id)-----
      let makeid = generateID()
      let used = true
      while (used) {
        used = false
        users.forEach((user) => {
          if (user.id === makeid) {
            used = true
          }
        })
      }
      
      //-----------------------------------
      const user = {
        id: makeid,
        password: password,
        email: email,
        username: usernameInput.value,
        created: date(),
      }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      //------
      alert('creted successfully  ')
      ///------display -----------------
      displayUsers()
      // //(users)
    } else {
      alert('already exists ')
    }
  }
}

//----------display requests(les demandes) --------
function displayReq() {
  const reqList = document.getElementById('demandes')
  let requests = Getter('requests')
  reqList.innerHTML = ''

  requests.forEach((req) => {
    const listed = document.createElement("tr")
    const emailEl = document.createElement('td')
    emailEl.innerHTML = req.email
    const nameEl = document.createElement('td')
    nameEl.innerHTML = req.username
    const editEl = document.createElement('td')
    editEl.innerHTML = `<button onclick="deleteReq('${req.username}')">Delete</button>`
    listed.appendChild(emailEl)
    listed.appendChild(nameEl)
    listed.appendChild(editEl)
    reqList.appendChild(listed)
  })

}
window.addEventListener('load', displayReq)
//--------delete request(demande)--------
function deleteReq(username) {
  let requests = Getter('requests')
  // Find the user by username and remove it
  const index = requests.findIndex((req) => req.username === username)
  if (index !== -1) {
    // //('found')
    requests.splice(index, 1)
    localStorage.setItem('requests', JSON.stringify(requests))
  }
  ///------display -----------------
  displayReq()
}

//---------------logout----------------------------------
function logout() {
  localStorage.setItem('auth', '')
  alert('See you later Admin')
  window.location.href = '/'
}

//----------display users --------
function displayUsers() {
  const userList = document.getElementById('userTable')
  let users = Getter('users')
  userList.innerHTML = ''

  users.forEach((user) => {
    const listed = document.createElement("tr")
    const emailEl = document.createElement('td')
    emailEl.innerHTML = user.email
    const nameEl = document.createElement('td')
    nameEl.innerHTML = user.username
    const passwordEl = document.createElement('td')
    passwordEl.innerHTML = user.password
    const editEl = document.createElement('td')
    editEl.innerHTML = `<button onclick="deleteUser('${user.username}')">Delete</button>`
    listed.appendChild(emailEl)
    listed.appendChild(nameEl)
    listed.appendChild(passwordEl)
    listed.appendChild(editEl)
    userList.appendChild(listed)
  })
}
window.addEventListener('load', displayUsers)
//--------delete user--------
function deleteUser(username) {
  let users = Getter('users')

  // Find the user by username and remove it
  const index = users.findIndex((user) => user.username === username)
  if (index !== -1) {
    users.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(users))
  }
  ///------display -----------------
  displayUsers()
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

//----------display events --------
function displayEvents() {
  const eventList = document.getElementById('events')
  let events = Getter('events')

  eventList.innerHTML = ''

  events.forEach((event) => {
    const listed = document.createElement("tr")
    const username = document.createElement('td')
    username.innerHTML = event.username ? event.username : event.event.split(' ')[0]
    const eventtype = document.createElement('td')
    eventtype.innerHTML = event.eventtype ? event.eventtype : 'logged in'
    const time = document.createElement('td')
    time.innerHTML = event.time
    listed.appendChild(username)
    listed.appendChild(eventtype)
    listed.appendChild(time)
    eventList.appendChild(listed)
  })
}
window.addEventListener('load', displayEvents)

//----formater events
function formaterEvents() {
  let empty = []
  localStorage.setItem('events', '')
  displayEvents()
  //displayRacers()
}
document.getElementById("clearEvents").addEventListener("click",()=>{
  formaterEvents()
})
//--------Racers----------------------------
//------------------------------------------
function addracer() {
  const racernameInput = document.querySelector('input[name="racername"]')
  const racerageInput = document.querySelector('input[name="racerage"]')
  const raceremailInput = document.querySelector('input[name="raceremail"]')
  const racerCarInput = document.getElementById("racerCar")

  const racername = racernameInput.value
  const raceage = racerageInput.value
  const racerEmail = raceremailInput.value
  const racerCar = racerCarInput.options[racerCarInput.selectedIndex].value;
  console.log(racerCar, racername, raceage, racerEmail)
  //----Get Local storage ------
  let racers = Getter('racers')

  //----------------------------
  if (raceage === '' || racername === '' || racerEmail === '' || racerCarInput === '') {
    alert('enter all info please')
  } else {
    //------add racer ------------
    let exist = false
    racers.forEach((racer) => {
      if (racername === racer.name) {
        exist = true
      }
    })
    //-------------------------
    if (!exist) {
      const makeid = ''
      const racer = {
        id: makeid,
        name: racername,
        age: raceage,
        email: racerEmail,
        created: date(),
        car: racerCar,
      }
      racers.push(racer)
      localStorage.setItem('racers', JSON.stringify(racers))
      //------
      alert('creted successfully  ')
      ///------display -----------------
      displayRacers()
      // //(users)
    } else {
      alert('already exists ')
    }
  }
}
function displayRacers() {
  const racersList = document.querySelector('[name="racer1"]')
  const racers2List = document.querySelector('[name="racer2"]')
  let racers = Getter('racers')
  racersList.innerHTML = ''
  const racerDefaultElement = document.createElement('option')
  racerDefaultElement.innerHTML = "Select Racer one"
  racersList.appendChild(racerDefaultElement)
  const racerDefault2Element = document.createElement('option')
  racerDefault2Element.innerHTML = "Select Racer two"
  racers2List.appendChild(racerDefault2Element)
  racers.forEach((racer) => {
    const racerElement = document.createElement('option')
    racerElement.setAttribute("value", racer.name)
    racerElement.innerHTML = racer.name
    racersList.appendChild(racerElement)
  })
  racers.forEach((racer) => {
    const racerElement = document.createElement('option')
    racerElement.setAttribute("value", racer.name)
    racerElement.innerHTML = racer.name
    racers2List.appendChild(racerElement)
  })
}
window.addEventListener('load', displayRacers)

function deleteracer(name) {
  let racers = Getter('racers')

  // Find the car by mat and remove it
  const index = racers.findIndex((racer) => racer.name === name)
  if (index !== -1) {
    // //('found')
    racers.splice(index, 1)
    localStorage.setItem('racers', JSON.stringify(racers))
  }
  ///------display -----------------
  displayRacers()
}
function formaterRacers() {
  let empty = []
  localStorage.setItem('racers', '')
  displayRacers()

  //displayRacers()
}

//-------------Cars-----------
//--------------------------------
/*function getColor() {
  const colorPicker = document.getElementById('color-picker')
  const colorValue = colorPicker.value
  return colorValue
}*/

function addcar() {
  const carmatInput = document.querySelector('input[name="mat"]')
  const carbrandInput = document.querySelector('input[name="brand"]')
  const carmodelInput = document.querySelector('input[name="model"]')

  const carmat = carmatInput.value
  const carbrand = carbrandInput.value
  const carmodel = carmodelInput.value
  //----Get(jib) Local storage ------
  let cars = Getter('cars')
  //----------------------------
  if (carmat === '' || carbrand === '' || carmodel === '') {
    //--Nothing
  } else {
    //------add cars------------
    let exist = false
    //(cars)
    cars.forEach((car) => {
      if (carmat === car.mat) {
        exist = true
      }
    })
    //---------------
    //----Verify car if exists ----
    if (!exist) {
      const car = {
        mat: carmat,
        brand: carbrand,
        model: carmodel,
        created: date(),
      }
      cars.push(car)
      localStorage.setItem('cars', JSON.stringify(cars))
      //------
      alert('creted successfully')
      ///------display -----------------
      addCartoRacer()
      displayCars()
      // //(users)
    } else {
      alert('already exists ')
    }
  }
}

function addCartoRacer() {
  const carlist = document.getElementById("racerCar");
  let cars = Getter("cars");
  carlist.innerHTML = "";
  const racerDefaultElement = document.createElement("option");
  racerDefaultElement.innerHTML = "Select Racer one";
  carlist.appendChild(racerDefaultElement);

  carlist.innerHTML = ''
  cars.forEach((car) => {
    const carElement = document.createElement("option");
    carElement.setAttribute("value", car.brand);
    carElement.innerHTML = car.brand;
    carlist.appendChild(carElement);
  })
}
window.addEventListener('load', addCartoRacer)
function displayCars() {
  const carlist = document.getElementById('cars-data')
  let cars = Getter('cars')

  //(cars)
  carlist.innerHTML = ''
  cars.forEach((car) => {
    const listed = document.createElement("tr")
    const mat = document.createElement('td')
    mat.innerHTML = car.mat
    const brand = document.createElement('td')
    brand.innerHTML = car.brand
    const model = document.createElement('td')
    model.innerHTML = car.model
    const editEl = document.createElement('td')
    editEl.innerHTML = `<button onclick="deleteCar('${car.mat}')">Delete</button>`
    listed.appendChild(mat)
    listed.appendChild(brand)
    listed.appendChild(model)
    listed.appendChild(editEl)
    carlist.appendChild(listed)
  })
}
window.addEventListener('load', displayCars)

function deleteCar(mat) {
  let cars = Getter('cars')

  // Find the car by mat and remove it
  const index = cars.findIndex((car) => car.mat === mat)
  if (index !== -1) {
    // //('found')
    cars.splice(index, 1)
    localStorage.setItem('cars', JSON.stringify(cars))
  }
  ///------display -----------------
  displayCars()
}

//-------------make a race ---------
//--------------------------------
function addrace() {
  const placeInput = document.querySelector('input[name="place"]')
  const racer1Input = document.querySelector('[name="racer1"]')
  const racer2Input = document.querySelector('[name="racer2"]')
  const daterInput = document.querySelector('input[name="dater"]')

  const place = placeInput.value
  const racer1 = racer1Input.value
  const racer2 = racer2Input.value
  const date = daterInput.value

  if (place == '' || racer1 == '' || racer2 == '' || date == '') {
    alert('please enter a date and atleast two racers')
  } else {
    //-------add the race--------------------
    let races = Getter('races')

    let newrace = {
      place: place,
      date: date,
      racers: racer1 + "," + racer2,
    }
    races.push(newrace)
    localStorage.setItem('races', JSON.stringify(races))

    //--------------------------------
    alert('race added successfully')
  }
  displayRaces()
}
function displayRaces() {
  const raceslist = document.getElementById('races')
  let races = Getter('races')
  raceslist.innerHTML = ''

  races.forEach((race) => {
    const listed = document.createElement("tr")
    const place = document.createElement('td')
    place.innerHTML = race.place
    const racers = document.createElement('td')
    racers.innerHTML = race.racers
    const date = document.createElement('td')
    date.innerHTML = race.date
    const editEl = document.createElement('td')
    editEl.innerHTML = `<button onclick="DeleteRace('${race.place}')">Delete</button>`
    listed.appendChild(place)
    listed.appendChild(racers)
    listed.appendChild(date)
    listed.appendChild(editEl)
    raceslist.appendChild(listed)
  })
  
}
window.addEventListener('load', displayRaces)

function addPost(){
  const postInput = document.querySelector("#postArea");
  const post = postInput.value
  let posts = Getter('posts')
  if (post) {
    let newpost = {
      post: post,
      time: date(),
    };
    posts.push(newpost);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert('creat succuful')
  }else{
    alert('please enter a post')
  }
}


function DeleteRace(place) {
  let races = Getter('races')
  const index = races.findIndex((race) => race.place === place)
  if (index !== -1) {
    races.splice(index, 1)
    localStorage.setItem('races', JSON.stringify(races))
  }

  displayRaces()
}

//--------image handler------------------------------------
function handleFileSelect(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const image = e.target.result
    //----store image temp-------
    localStorage.setItem('racerimage', image)

    //----manipulate the img tag-----------
    //--------we will use the Base64-encoded string as the image source ------

    //----- display pfp in mainpage and profile-----------
    let userimg = document.getElementById('userimg')
    if (userimg) {
      userimg.src = image
    }

    //---update user info ----------
    // Get the user object from localStorage
    let user = JSON.parse(localStorage.getItem('user'))

    // Update or add the image attribute to the user object
    user.image = image

    // Store the updated user object back to localStorage
    localStorage.setItem('user', JSON.stringify(user))

    //---------------update the users list----------------
    // Get all users from local storage
    let users = JSON.parse(localStorage.getItem('users'))

    // Loop through each user object and replace it with the updated one
    users = users.map((userr) => {
      if (userr.username === user.username) {
        userr.image = image
      }
      return userr
    })

    // Store the updated users back to localStorage
    localStorage.setItem('users', JSON.stringify(users))
  }
  reader.readAsDataURL(file)
  reader.readAsDataURL(file)
}