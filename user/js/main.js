//-------------------------------------------------

function Getter(localvar) {
  let list = [];
  const storedData = localStorage.getItem(localvar);
  if (storedData !== null && storedData.trim() !== "") {
    list = JSON.parse(storedData);
  }
  return list;
}
//-----------------------------------------------
function logout() {
  localStorage.setItem("auth", "");
  const userInfo = JSON.parse(localStorage.getItem("user"));
  //-----Register the event-------------------------
  AddEvent(userInfo.username, " logged out", "login");
  //------------------------------
  alert("See you later " + userInfo.username);
  window.location.href = "/";
}

function Home() {
  window.location.href = "/user/index.html";
}
///------display info--------------
//--------------------------------

function displayuserinfo() {
  // get user info
  const userinfo = document.getElementById("user-info");

  const userInfo = JSON.parse(localStorage.getItem("user"));

  // display pfp in mainpage and profile
  let userimg = document.getElementById("userimg");
  if (userimg) {
    userimg.src = userInfo.image;
  }

  userimg = document.getElementById("userimgprofile");
  if (userimg) {
    userimg.src = userInfo.image;
  }

  userinfo.innerHTML = "";

  // create div for email
  let userElement = document.createElement("div");
  userElement.innerHTML = `
      <span>${userInfo.email}</span>
  `;
  userinfo.appendChild(userElement);

  // create div for username
  userElement = document.createElement("div");
  userElement.innerHTML = `
    <span>${userInfo.username}</span>
  `;
  userinfo.appendChild(userElement);

  // create div for password
  userElement = document.createElement("div");
  userElement.innerHTML = `
    <span>${userInfo.password}</span>
  `;

  userinfo.appendChild(userElement);
}

window.addEventListener("load", displayuserinfo);

//---------------------------------
//---------------function to change pfp -------------------
function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const image = e.target.result;

    //----manipulate the img tag-----------
    //--------we will use the Base64-encoded string as the image source ------

    //----- display pfp in mainpage and profile-----------
    let userimg = document.getElementById("userimg");
    if (userimg) {
      userimg.src = image;
    }

    userimg = document.getElementById("userimgprofile");
    if (userimg) {
      userimg.src = image;
    }

    //---update user info ----------
    // Get the user object from localStorage
    let user = JSON.parse(localStorage.getItem("user"));

    // Update or add the image attribute to the user object
    user.image = image;
    console.log(image);
    // Store the updated user object back to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    //---------------update the users list----------------
    // Get all users from local storage
    let users = JSON.parse(localStorage.getItem("users"));

    // Loop through each user object and replace it with the updated one
    users = users.map((userr) => {
      if (userr.username === user.username) {
        userr.image = image;
      }
      return userr;
    });

    // Store the updated users back to localStorage
    localStorage.setItem("users", JSON.stringify(users));
  };
  reader.readAsDataURL(file);
}
function home() {
  window.location.href = "/user/index.html";
}
function Profile() {
  window.location.href = "/user/newProfile.html";
}

function ChangeInfo() {
  const emailInput = document.querySelector('input[name="email"]');
  const passwordInput = document.querySelector('input[name="pass"]');
  const usernameInput = document.querySelector('input[name="username"]');

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  //-----original info--------------
  const userInfo = JSON.parse(localStorage.getItem("user"));

  //----change username
  if (username == "") {
  } else {
    //-----chnage info in list localstorage
    //-------extract the old info
    let newuser = {};
    const userInfo = JSON.parse(localStorage.getItem("user"));
    //---------------------------
    //---------------------------
    let users = Getter("users");
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (
        userInfo.username == user.username &&
        userInfo.password == user.password &&
        userInfo.email == user.email
      ) {
        //--------------------------------------
        //------new object with new values -----
        newuser = {
          id: user.id,
          username: username,
          password: user.password,
          email: user.email,
          created: user.created,
        };
        //----drop the old object --------------
        users = users.filter(
          (user) =>
            user.username !== userInfo.username &&
            user.password !== userInfo.password &&
            user.email !== userInfo.email
        );
        //------replace with the new object
        users.push(newuser);
        //------update the localstorage
        localStorage.setItem("users", JSON.stringify(users));
        alert("username changed successfully ");
      }
    }
    //-----change info in user localstorage
    localStorage.setItem("user", JSON.stringify(newuser));
  }
  //----change password
  if (email == "") {
  } else {
    //-----chnage info in list localstorage
    //-------extract the old info
    let newuser = {};
    const userInfo = JSON.parse(localStorage.getItem("user"));
    //---------------------------
    //---------------------------
    let users = Getter("users");

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (
        userInfo.username == user.username &&
        userInfo.password == user.password &&
        userInfo.email == user.email
      ) {
        //------new object with new values -----
        newuser = {
          id: user.id,
          username: user.username,
          password: user.password,
          email: email,
          created: user.created,
        };
        //----drop the old object --------------
        users = users.filter(
          (user) =>
            user.username !== userInfo.username &&
            user.password !== userInfo.password &&
            user.email !== userInfo.email
        );
        //------replace with the new object
        users.push(newuser);
        //------update the localstorage
        localStorage.setItem("users", JSON.stringify(users));
        alert("email changed successfully ");
      }
    }
    //-----change info in user localstorage
    localStorage.setItem("user", JSON.stringify(newuser));
  }
  //----change email
  if (password == "") {
  } else {
    //-----chnage info in list localstorage
    //-------extract the old info
    let newuser = {};
    const userInfo = JSON.parse(localStorage.getItem("user"));
    //---------------------------
    //---------------------------
    let users = Getter("users");
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (
        userInfo.username == user.username &&
        userInfo.password == user.password &&
        userInfo.email == user.email
      ) {
        //------new object with new values -----
        newuser = {
          id: user.id,
          username: user.username,
          password: password,
          email: user.email,
          created: user.created,
        };
        //----drop the old object --------------
        users = users.filter(
          (user) =>
            user.username !== userInfo.username &&
            user.password !== userInfo.password &&
            user.email !== userInfo.email
        );
        //------replace with the new object
        users.push(newuser);
        //------update the localstorage
        localStorage.setItem("users", JSON.stringify(users));
        alert("password changed successfully ");
      }
    }
    //-----change info in user localstorage
    localStorage.setItem("user", JSON.stringify(newuser));
  }
  //-----Register the event-------------------------
  AddEvent(userInfo.username, " chnaged his info ", "change");
  //---display new info
  displayuserinfo();
}

//------to store events like logins and users changing thiere info
function AddEvent(
  username = "user one",
  eventtype = "chnaged his info",
  type = "change"
) {
  let events = Getter("events");
  //----------------------------

  //------add event------------
  let eventmsg = username + eventtype;
  //---------------
  const eve = {
    username: username,
    eventtype: eventtype,
    time: date(),
    type: type,
  };
  events.push(eve);
  localStorage.setItem("events", JSON.stringify(events));
}

//------Time extracting
function date() {
  // Get current date and time
  const now = new Date();

  // Get year, month, day, hour, and minute
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Format the date and time as a string
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

function displayRacers() {
  //----get user info
  const userInfo = JSON.parse(localStorage.getItem("user"));

  //-----ger racers
  const racersList = document.getElementById("racers-list");
  racersList.classList.add("whitecolor");

  let racers = Getter("racers");

  racersList.innerHTML = "";

  racers.forEach((racer) => {
    //----verify the followers list to show the proper button
    let followers = racer.followlist;
    if (followers == undefined) {
      followers = [];
    }
    let following = false;
    followers.forEach((follower) => {
      if (follower == userInfo.id) {
        following = true;
      }
    });
    const racerElement = document.createElement("div");
    racerElement.classList.add("grid");
    racerElement.classList.add("width");
    racerElement.classList.add("padding");

    racerElement.innerHTML = `
      <div>${racer.name}</div>
      <div>${racer.age}</div>
      <div>${racer.car}</div>
      <div> followers : ${followers.length}</div>
    `;

    // Append the racerElement to the document or a parent container
    // Replace "containerId" with the ID of the element where you want to append the racerElement
    racersList.appendChild(racerElement);

    if (!following) {
      racerElement.innerHTML =
        racerElement.innerHTML +
        `
        <button class ="greenbtn" onclick="follow('${racer.name}' ,'${userInfo.id}' )">Folow</button>
        `;
      racersList.appendChild(racerElement);
    } else {
      racerElement.innerHTML =
        racerElement.innerHTML +
        `
        <button class ="redbtn" onclick="Unfollow('${racer.name}' ,'${userInfo.id}')">UnFolow</button>
        `;
      racersList.appendChild(racerElement);
    }
    racersList.appendChild(racerElement);
  });
}
window.addEventListener("load", displayRacers);

function follow(name, newfollower) {
  //----follow racer-------
  //-----------------------
  let racers = Getter("racers");
  console.log(racers);
  racers.forEach((racer, index) => {
    if (racer.name === name) {
      // Get racer follower list and add the new follower
      let followers = racer.followlist;
      if (followers == undefined) {
        followers = [];
      }
      followers.push(newfollower);

      // Create new racer object with updated follow list
      const updatedRacer = { ...racer, followlist: followers };

      // Replace old racer object with updated one
      racers.splice(index, 1, updatedRacer);

      // Update local storage
      localStorage.setItem("racers", JSON.stringify(racers));
    }
  });

  Redisplay();
}

function Unfollow(name, theunfollower) {
  //----follow racer-------
  //-----------------------
  let racers = Getter("racers");
  console.log(racers);
  racers.forEach((racer, index) => {
    if (racer.name === name) {
      // Get racer follower list
      let followers = racer.followlist;
      if (followers == undefined) {
        followers = [];
      }

      // Remove unfollower from the followlist
      let updatedFollowers = followers.filter(
        (follower) => follower !== theunfollower
      );

      // Create new racer object with updated follow list
      const updatedRacer = { ...racer, followlist: updatedFollowers };

      // Replace old racer object with updated one
      racers.splice(index, 1, updatedRacer);

      // Update local storage
      localStorage.setItem("racers", JSON.stringify(racers));
    }
  });

  Redisplay();
}

//------------races----------

function displayRaces() {
  const raceslist = document.getElementById("races");
  let races = Getter("races");
  raceslist.innerHTML = "";

  races.forEach((race, index) => {
    const userElement = document.createElement("div");
    userElement.classList.add("flex");

    let color = "";
    let todayText = "";
    let racedate = "";
    let rankinghead = "";

    const dateStatus = isItToday(race.date);

    if (dateStatus === "green") {
      color = "green";
      todayText = "Live ";
    } else if (dateStatus === "passed") {

      races.splice(index, 1); // Remove the race if the date has already passed
      return; // Skip to the next iteration
    } else if (dateStatus === "not today") {

      color = "red";
      todayText = "not today";
      racedate = "date: " + race.date;
      rankinghead = "--------------Current rank-----------------";
    } else {
      // Handle invalid date format
      console.log("Invalid date format for race:", race.date);
      return; // Skip to the next iteration
    }

    let racee = race.racers;
    userElement.innerHTML = `
      <div class="grid2 padding" style="background-color: ${color};">
        <div>
          <span>${todayText}</span>
          <span>${rankinghead}</span>
        </div>
        <div>
          <span>${racedate}</span>
        </div>
        ${racee}
        <span id="place">${race.place}</span>
      </div>
    `;

    raceslist.appendChild(userElement);
  });

  // Rerendering to simulate the change in ranks in the race every 10 seconds
  setInterval(() => {
    displayRaces();
  }, 10000);
}
window.addEventListener("load", displayRaces);

function isItToday(str) {
  const today = new Date();
  const inputDate = new Date(str);

  if (isNaN(inputDate)) {
    return "invalid";
  }

  if (inputDate.toDateString() === today.toDateString()) {
    return "green";
  } else if (inputDate < today) {
    return "passed";
  } else {
    return "not today";
  }
}

//-----change the order of the racers--------
//-------------------------------------------
function shuffleArray(array, cond) {
  //---is it toady or not
  const newArray = [...array];

  if (cond) {
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
  }
  return newArray;
}

///------------------

function displayPosts() {
  // //-----ger racers
  const postsList = document.getElementById("posts-list");
  postsList.classList.add("whitecolor");

  let posts = Getter("posts");
  // let racers = Getter('racers')

  postsList.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("padding");

    postElement.classList.add("flex");

    postElement.innerHTML = `
          <div ">${post.post}</div>
          <div ">${post.time}</div>
          `;
    postsList.appendChild(postElement);
  });
}
window.addEventListener("load", displayPosts);

function Redisplay() {
  displayPosts();
  displayRaces();
  displayRacers();
}
