var myReptiles = [];

var h1element = document.querySelector(".my-heading");
console.log("my h1 element", h1element);

var reptileButton = document.querySelector(".reptiles-button");
console.log("my reptile button element", reptileButton);

reptileButton.onclick = function () {
  console.log("reptile button was clicked");

// reptile species  
  var reptileSpeciesInput = document.querySelector("#reptile-input");
  console.log("my input element:", reptileSpeciesInput);
  console.log("input element text:", reptileSpeciesInput.value);

  var reptileSpeciesInput = document.querySelector("#reptile-species");
  var reptileMorphInput = document.querySelector("#reptile-morph");
  var reptileIntakeInput = document.querySelector("#reptile-intake_date");
  var reptileWeightInput = document.querySelector("#reptile-weight");
  var reptileSupplementsInput = document.querySelector("#reptile-supplements");
  var reptileFeedInput = document.querySelector("#reptile-feed_date");
  var repitleCommentsInput = document.querySelector("#reptile-comments");

  self.createReptileOnServer(reptileSpeciesInput.value,reptileMorphInput.value, reptileIntakeInput.value, reptileWeightInput.value, reptileSupplementsInput.value, reptileFeedInput.value, repitleCommentsInput.value);

  reptileSpeciesInput.value = "";
  reptileMorphInput.value = "";
  reptileIntakeInput.value = "";
  reptileWeightInput.value = "";
  reptileSupplementsInput.value = "";
  reptileFeedInput.value = "";
  repitleCommentsInput.value = "";

};

function loadReptilesFromServer() {
  fetch("https://python-railway-demo-production.up.railway.app/reptiles", {
    credentials:'include'
    }).then(function (response) {
      if (response.status == 401){
        /*not logged in hide reptiles*/
        console.log("You are not logged in.")
        document.querySelector('#reptile-input').hidden = true
        /* show log in register*/
        document.querySelector('#account-input-fields').hidden = false
        return;
      }
      /*hide log in register*/
    document.querySelector('#account-input-fields').hidden = true
      /*show reptiles*/
    document.querySelector('#reptile-input').hidden = false

    response.json().then(function (data) {
      console.log("data received from server:", data);
      myReptiles = data;

      var reptileList = document.querySelector("#reptile-list");
      console.log("my list element:", reptileList);
      reptileList.innerHTML = "";

// for reptile in myReptiles:
      myReptiles.forEach(function (reptile) {
        var newReptile = document.createElement("li");

        var reptileIdDiv = document.createElement("div");
        reptileIdDiv.innerHTML = reptile.id;
        reptileIdDiv.classList.add("#reptile-input");
        newReptile.appendChild(reptileIdDiv);

        var speciesDiv = document.createElement("div");
        speciesDiv.innerHTML = reptile.species;
        speciesDiv.classList.add("#reptile-species");
        newReptile.appendChild(speciesDiv);

        var morphDiv = document.createElement("div");
        morphDiv.innerHTML = reptile.morph;
        morphDiv.classList.add("#reptile-morph");
        newReptile.appendChild(morphDiv);

        var intakeDiv = document.createElement("div");
        intakeDiv.innerHTML = reptile.intake_date;
        intakeDiv.classList.add("#reptile-intake_date");
        newReptile.appendChild(intakeDiv);

        var weightDiv = document.createElement("div");
        weightDiv.innerHTML = reptile.weight;
        weightDiv.classList.add("#reptile-weight");
        newReptile.appendChild(weightDiv);

        var supplementsDiv = document.createElement("div");
        supplementsDiv.innerHTML = reptile.supplements;
        supplementsDiv.classList.add("#reptile-supplements");
        newReptile.appendChild(supplementsDiv);

        var feedDiv = document.createElement("div");
        feedDiv.innerHTML = reptile.feed_date;
        feedDiv.classList.add("#reptile-feed_date");
        newReptile.appendChild(feedDiv);

        var commentsDiv = document.createElement("div");
        commentsDiv.innerHTML = reptile.comments;
        commentsDiv.classList.add("#reptile-comments");
        newReptile.appendChild(commentsDiv);

        var deleteButton = document.createElement("button")
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function(){
          console.log("delete button was clicked for ", reptile.species);
          if(confirm("Are you sure you want to delete " + reptile.species +" ?")){
            deleteReptileFromServer(reptile.id);
          }
        };
        newReptile.appendChild(deleteButton);

        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = function(){
            updateReptileFromServer(reptile.id);
          };
        newReptile.appendChild(editButton);

        reptileList.appendChild(newReptile);
        updateReptileFromServer(reptileSpeciesInput.value,reptileMorphInput.value, reptileIntakeInput.value, reptileWeightInput.value, reptileSupplementsInput.value, reptileFeedInput.value, repitleCommentsInput.value);
      });
    }); 
  });
}

function deleteReptileFromServer(reptileId) {
  fetch("https://python-railway-demo-production.up.railway.app/reptiles/" + reptileId, {
    method: "DELETE",
    credentials: 'include'
  }).then(function (response) {
    if (response.status == 200) {
      loadReptilesFromServer();
    } else {
      console.log("server responded with", response.status, "when trying to delete a reptile");
    }
   });
}

function updateReptileFromServer(reptileId, reptileSpeciesInput, reptileMorphInput, reptileIntakeInput, reptileWeightInput, reptileSupplementsInput, reptileFeedInput, repitleCommentsInput) {

  var data = "reptile-id=" + encodeURIComponent(reptileId);
  data += "&species=" + encodeURIComponent(reptileSpeciesInput);
  data += "&morph=" + encodeURIComponent(reptileMorphInput);
  data += "&intake_date=" + encodeURIComponent(reptileIntakeInput);
  data += "&weight=" + encodeURIComponent(reptileWeightInput);
  data += "&supplements=" + encodeURIComponent(reptileSupplementsInput);
  data += "&feed_date=" + encodeURIComponent(reptileFeedInput);
  data += "&comments=" + encodeURIComponent(repitleCommentsInput);
  console.log("sending data to server:", data);

  fetch("https://python-railway-demo-production.up.railway.app/reptiles/" + reptileId, {
    method: "PUT",
    credentials:'include'
  }).then(function (response) {
    if (response.status == 200) {
      loadReptilesFromServer();
    } else {
      console.log("server responded with", response.status, "when trying to update a reptile");
    }
   });
}

function createReptileOnServer(reptileId, reptileSpeciesInput, reptileMorphInput, reptileIntakeInput, reptileWeightInput, reptileSupplementsInput, reptileFeedInput, repitleCommentsInput) {
  console.log("attempting to create reptile", reptileId, "on server");

  var data = "reptile-id=" + encodeURIComponent(reptileId);
  data += "&species=" + encodeURIComponent(reptileSpeciesInput);
  data += "&morph=" + encodeURIComponent(reptileMorphInput);
  data += "&intake_date=" + encodeURIComponent(reptileIntakeInput);
  data += "&weight=" + encodeURIComponent(reptileWeightInput);
  data += "&supplements=" + encodeURIComponent(reptileSupplementsInput);
  data += "&feed_date=" + encodeURIComponent(reptileFeedInput);
  data += "&comments=" + encodeURIComponent(repitleCommentsInput);
  console.log("sending data to server:", data);

  fetch("https://python-railway-demo-production.up.railway.app/reptiles", {
    // request details:
    method: "POST",
    body: data,
    credentials:'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    // when the server responds:
    if (response.status == 201) {
      loadReptilesFromServer();
    } else {
      console.log("server responded with", response.status, "when trying to create a reptile list");
    }
  });
}


var Accounts = [];

var addAccountButton = document.querySelector(".add-account-button");
console.log("Add Account Button element", addAccountButton);
addAccountButton.onclick = function () {
  self.createAccountOnServer(email_input.value, fname_input.value, lname_input.value, password_input.value);
  console.log("add account button was clicked");
};

var logInButton = document.querySelector(".log-in-button");
console.log("Log in Button element", logInButton);
logInButton.onclick = function () {

  logInFromServer(email_input.value, password_input.value);
  console.log("log in button was clicked");
};

var accountInput = document.querySelector("#account-input-fields");
console.log("my input element:", accountInput);
console.log("input element text:", accountInput.value);

var email_input = document.querySelector("#email-input");
var password_input = document.querySelector("#password-input");
var fname_input = document.querySelector("#fname-input");
var lname_input = document.querySelector("#lname-input");

function createAccountOnServer(email_input, fname_input, lname_input, password_input) {
    console.log("attempting to add account", email_input, "on server");


  var data = "email=" + encodeURIComponent(email_input);
    data += "&password=" + encodeURIComponent(password_input);
    data += "&fname=" + encodeURIComponent(fname_input);
    data += "&lname=" + encodeURIComponent(lname_input);
    console.log("sending data to server:", data);
    
    fetch("https://python-railway-demo-production.up.railway.app/accounts", {
      method: "POST",
      body: data,
      credentials:'include',
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(function (response) {
      if (response.status == 201) {
        alert("Account created. Log in now.");
      } else if (response.status == 422) {
        alert("Exsisting Account. Log in now.");
      }
     });
 
     
}function logInFromServer(email_input, password_input) {

  var data = "email=" + encodeURIComponent(email_input);
    data += "&password=" + encodeURIComponent(password_input);
    console.log("sending data to server:", data);

    fetch("https://python-railway-demo-production.up.railway.app/sessions", {
      method: "POST",
      body: data,
      credentials:'include'
      }).then(function (response) {
          /*console.log("data received from server:", data);*/
          if (response.status == 401) {
            console.log("No account exsists with provided information");
            alert("Account can not be validated.")
          } else if (response.status == 422) {
            console.log("Information can not be validated.");
            alert("Email/Password can not be validated.")
          } else (response.status == 201); {
            console.log("logging into reptiles");
            loadReptilesFromServer();
          } 
          });
    };
loadReptilesFromServer();