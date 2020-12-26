console.log("FIREBASE:", firebase);

var provider = new firebase.auth.GoogleAuthProvider();

// Next 2 lines so that I can request an oAuth Access Token
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');

firebase.auth().onAuthStateChanged(user=>{
    console.log("OnAuthStateChanged: User is:", user );

    if (user){                                                              // user is logged in
        document.getElementById("btnLogin").style.display = "none";
        document.getElementById("btnLogout").style.display = "block";        
    } else {                                                                // user is not logged in
      document.getElementById("btnLogin").style.display = "block";
      document.getElementById("btnLogout").style.display = "none";  
    }
});

document.getElementById("btnLogin").addEventListener('click', function(e){

    // I want Access Token that is why I am using signInWithRedirect ... if I just wanted Authentication I would 
    // call the function signInWithPopup instead
    firebase.auth().signInWithRedirect(provider).then(function(result) {
        
        var token = result.credential.accessToken;  // This gives you a Google Access Token. You can use it to access the Google API.        
        var user = result.user;                   // The signed-in user info.

        console.log("signInWithRedirect():", result);

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
  
    console.log("getRedirectResult():", result); 
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
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