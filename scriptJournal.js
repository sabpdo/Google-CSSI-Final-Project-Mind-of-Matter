//Note: need to change all the index.html

const enterButton = document.querySelector('#createJournal');
const clearButton = document.querySelector('#journalClear');
let prevJournalEntry = document.querySelector('#journalEntries');
let input = document.querySelector('#journaltext');

//Login
let loginButton = document.querySelector("#loginButton");
let popUp = document.querySelector("#login");

//To Close Modal
let closeButton = document.querySelector("#close");

//Text that Shows What User is Logged In
let userText = document.querySelector("#listedUser");


//Modal Pops Up When You Press Log In
loginButton.addEventListener("click", () => {
  popUp.style.display = "block";
});

//Modal Closes When You Click Close
closeButton.addEventListener("click", () => {
  popUp.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == popUp) {
        popUp.style.display = "none";
    }
};
//Show Current User
if ((JSON.parse(localStorage.getItem('currentUser'))!=undefined) && (JSON.parse(localStorage.getItem('currentUser'))!=null)){
  userText.innerHTML = `<p class = "subtitle is-size-5 has-text-left"> Current User: ${JSON.parse(localStorage.getItem('currentUser')).name}</p><button class="logOutBtn" id="LogOut" type="submit" onclick="LogOut()">Log Out</button>`;
} else {
   userText.innerHTML = `<p class = "subtitle is-size-5 has-text-left"> Nobody is Logged In Currently </p>`;
};




//If window is in the journal page
if (window.location.href == "https://google-cssi-final-project-matter-of-mind.sabrinado.repl.co/journal.html") {

  
  //If somebody is logged in, set up the account (meaning log the previous entries)
  if (JSON.parse(localStorage.getItem('validLogin')) == true) {
    setUpAccount();
  };

  //Basically resets and logs past journal entries
  function setUpAccount() {
    //Randomizes Color
    let color = randomColor();
    //Initializes to find correct current user info
    var currentUserInfoString = localStorage.getItem('all_users');
    var currentUserInfo = JSON.parse(currentUserInfoString);
    var currentUser = JSON.parse(localStorage.getItem('currentUser')).name;
    let index = 0;
    for (var i = 0; i<currentUserInfo.length; i++){
      if (currentUserInfo[i].name == currentUser){
        index = i;
        break;
      };
    };

    prevJournalEntry.innerHTML = "";
    currentUserJournal = currentUserInfo[index].journal;
    //Circles through all journal entries of the current users, grabs date and entry values and adds them to the html
    for (var j = 0; j< currentUserJournal.length; j++) {
      dateValue = currentUserJournal[j].date;
      entryValue = currentUserJournal[j].entry;
      if (j == 0){
        prevJournalEntry.innerHTML = `<div class = "entryOuter">
         <div class = "entry" style="background-color: ${color};">
         <h3>${dateValue}</h3>
         <p>${entryValue}</p>
         </div>
         </div>`
      } else {
        prevJournalEntry.innerHTML += `<div class = "entryOuter">
        <div class = "entry" style="background-color: ${color};">
        <h3>${dateValue}</h3>
        <p>${entryValue}</p>
        </div>
        </div>`
      };
    };
  };
  
  //Clear Button Functionality
  clearButton.addEventListener('click', () => {
    input.value = "";
  });

  //Count for those who are not logged in
  let nonLoggedCount = 0;
  
  //Enter Journal entry
  enterButton.addEventListener("click", () => {
    //Current Date Information
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    var journalDate = today;

    let color = randomColor(); //Randomize Color

    
    let index = 0;
    if (input.value!="") { //Cannot submit entry unless entry has string text
      if ((JSON.parse(localStorage.getItem('validLogin')) == true)) { //If user is logged in
        //Get current user info
        var currentUserInfoString = localStorage.getItem('all_users');
        var currentUserInfo = JSON.parse(currentUserInfoString);
        var currentUser = JSON.parse(localStorage.getItem('currentUser')).name;
        for (let i = 0; i<currentUserInfo.length; i++) {
          if (currentUserInfo[i].name === currentUser) {
            index = i;
            break;
          };
        };
            
        if (currentUserInfo[index].journal.length == 0) {
            prevJournalEntry.innerHTML = `<div class = "entryOuter">
              <div class = "entry" style="background-color: ${color};">
              <h3>${today}</h3>
              <p>${input.value}</p>
              </div>
              </div>`;
              currentUserInfo[index].count++;
        } else {
            prevJournalEntry.innerHTML += `<div class = "entryOuter">
            <div class = "entry" style="background-color: ${color};">
            <h3>${today}</h3>
            <p>${input.value}</p>
            </div>
            </div>`;
           currentUserInfo[index].count++;
        };
        currentUserInfo[index].journal.push({date: today, entry: input.value});
        localStorage.setItem('all_users', JSON.stringify(currentUserInfo));
        input.value = "";
      } else {
        //for those who do not log in
        if(nonLoggedCount==0) {
          prevJournalEntry.innerHTML = `<div class = "entryOuter">
            <div class = "entry" style="background-color: ${color};">
            <h3>${today}</h3>
            <p>${input.value}</p>
            </div>
            </div>`;
          input.value = "";
          nonLoggedCount++;
        } else {
          prevJournalEntry.innerHTML += `<div class = "entryOuter">
            <div class = "entry" style="background-color: ${color};">
            <h3>${today}</h3>
            <p>${input.value}</p>
            </div>
            </div>`;
        };
      };
    };
  });
};


//Generate Random Color for Sticky Notes
function randomColor() {
	var colors = ['#E0BBE4', '#957DAD', '#D291BC', '#FEC8D8', '#FFDFD3'];
	var random_color = colors[Math.floor(Math.random() * colors.length)];
	return random_color;
};


//When You Login
function Login() {

   if ((JSON.parse(localStorage.getItem('all_users')) == null) || (JSON.parse(localStorage.getItem('all_users')) == undefined)){
    var a = [
      {name: "abc@gmail.com", password: "abc",journal: [], count:0}
    ];
    localStorage.setItem('all_users', JSON.stringify(a));
  };
  
  console.log("Login successful");
  var currentUserInfoString = localStorage.getItem('all_users');
  var currentUserInfo = JSON.parse(currentUserInfoString);

  var username = document.querySelector('#uname').value;
  var password = document.querySelector('#psw').value;

  localStorage.setItem('validLogin', JSON.stringify(false));

  //Check if username and password are correct
  for (let user of currentUserInfo) 
  {
    if(user.name === username && user.password === password) {
      localStorage.setItem('validLogin', JSON.stringify(true));
      localStorage.setItem('currentUser', JSON.stringify(user));
      popUp.style.display = "none";
      userText.innerHTML = `<p class = "subtitle is-size-5 has-text-left"> Current User: ${JSON.parse(localStorage.getItem('currentUser')).name} </p><button class="logOutBtn" id="LogOut" type="submit" onclick="LogOut()">Log Out</button>`;

      //Only in Journal Page
      if (window.location.href == "https://journalpage.sabrinado.repl.co/index.html") {
        setUpAccount();
      };
      break;
    };
  };

  //If the username is not in the storage, it will return an alert
  if (JSON.parse(localStorage.getItem('validLogin')) == false) {
    alert("Wrong Username/Password");
  };
};


//Create Account
function CreateAccount() {
  var username = document.querySelector('#newEmail').value;
  var pass = document.querySelector('#newPsw').value;

  if ((JSON.parse(localStorage.getItem('all_users')) == null) || (JSON.parse(localStorage.getItem('all_users')) == undefined)){
    var a = [
      {name: "abc@gmail.com", password: "abc",journal: [], count:0}
    ];
    localStorage.setItem('all_users', JSON.stringify(a));
  };
  
  var currentUserInfoString = localStorage.getItem('all_users');
  var currentUserInfo = JSON.parse(currentUserInfoString);
  currentUserInfo.push({name: username, //Push new object with new information to allUsers 
    password: pass,
    journal: [],
    count: 0,
  });
  
  localStorage.setItem('all_users', JSON.stringify(currentUserInfo)); //Store in Local Storage
  console.log(JSON.parse(localStorage.getItem('all_users'))); //Console
};

//Reset Password
function ResetPassword() {
   if ((JSON.parse(localStorage.getItem('all_users')) == null) || (JSON.parse(localStorage.getItem('all_users')) == undefined)){
    var a = [
      {name: "abc@gmail.com", password: "abc",journal: [], count:0}
    ];
    localStorage.setItem('all_users', JSON.stringify(a));
  };
  
  var currentUserInfoString = localStorage.getItem('all_users');
  var currentUserInfo = JSON.parse(currentUserInfoString);
  var username = document.querySelector('#user').value;
  var resetPass = document.querySelector('#newPass').value;
  let index = 0;
  let isTrue = false;
  for (var i = 0; i<currentUserInfo.length; i++) { //Iterate through all current Users 
    if (currentUserInfo[i].name == username) {  //if username is in previous users, return true and log the index
      index = i;
      isTrue = true;
      break;
    };
  };

  //if username is not in previous users, alert
  if (isTrue == false) {
    alert("Your username does not exist.");
  } else {
    currentUserInfo[index].password = resetPass;
    localStorage.setItem('all_users', JSON.stringify(currentUserInfo));
  };
};

//Log Out Function
function LogOut() {
  console.log("logging out...");
  var currentUserInfoString = localStorage.getItem('all_users');
  var currentUserInfo = JSON.parse(currentUserInfoString);
  var username = JSON.parse(localStorage.getItem('currentUser')).name;
  for (var i = 0; i<currentUserInfo.length; i++) { //Iterate through all current Users 
    if (currentUserInfo[i].name == username) {  //if username is in previous users, return true and log the index
      index = i;
      isTrue = true;
      break;
    };
  };
  localStorage.setItem('validLogin', JSON.stringify(false));
  localStorage.setItem('currentUser', JSON.stringify(null));
  userText.innerHTML = `<p class = "subtitle is-size-5 has-text-left"> Nobody is Logged In Currently </p>`;
  prevJournalEntry.innerHTML = `<p class = "hero is-size-4 has-text-centered "> <br>You have no entries yet! Please submit one.<br> </p>`;
};



/*
async function blackOut(){
 page.classList.add("has-background-black");

  let myKey = "iCEG4C90b5qOuYiDntZjWtztw0vRR6XC";
  let myQuery = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=failure`;
  const response = await fetch(myQuery);
  const myjson = await response.json();
  console.log(myjson);
  const random = getRandomInt(myjson.data.length);
  
  const image_url = myjson.data[random].images.downsized.url;
  console.log(image_url);
  body.innerHTML =  `<img src = "${image_url}"/>`;

};*/
