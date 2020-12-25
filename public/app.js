console.log(firebase);
var provider = new firebase.auth.GoogleAuthProvider();

// Next 2 lines so that I can request an oAuth Access Token
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');

firebase.auth().onAuthStateChanged(user=>{

    if (user){
        document.getElementById("result").innerText += " Logged In";
    } else {
        document.getElementById("result").innerText += " Logged Out";
    }
});

document.getElementById("btnLogin").addEventListener('click', function(e){

    // VERY VERY IMP!!!!!!!!!!!!!!!!!!!!!!!!!!!  I want Access Token that is why I am using signInWithRedirect ... if I just wanted Authentication I would 
    // call the function signInWithPopup instead
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        document.getElementById("result").innerText = user.displayName;  // check F12/Application/IndexedDB/FirebaseLocal Storage for structure of user
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        document.getElementById("result").innerText = errorMessage;
      });
});

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log("This is the Access Token:", token);
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorMessage);
    // ...
  });



document.getElementById("btnLogout").addEventListener('click', function(e){
firebase.auth().signOut();
});
