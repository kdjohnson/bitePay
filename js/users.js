$(document).ready(function() {
//Reference to the Firebase this is used to everything with Firebase.
var ref = new Firebase("https://torrid-fire-980.firebaseio.com");

$('.submit').click(function(event) {

    ref.createUser({
	email: $("#mail").val(),
	password: $("#password").val()

    }, function(error, userData) {
	if (error) {
	    switch (error.code) {
		    case "EMAIL_TAKEN":
			console.log("The new user account cannot be created because the email is already in use.");
			break;
		    case "INVALID_EMAIL":
			console.log("The specified email is not a valid email.");
			break;
		    default:
			console.log("Error creating user:", error);
	    }
	} else {

	    var mail = $("#mail").val();
	    var pass = $("#password").val();
	    
	    ref.child("users").push({
		    list: {
			email: $("#mail").val(),
			password: $("#password").val()
		    }
		});

	    console.log("Successfully created user account with uid:", userData.uid);
	}
	});

	ref.authWithPassword({
		email: $("#mail").val(),
		password: $("#password").val()
	    }, function(error, authData) {
	    if (error) {
		console.log("Login Failed!", error);
	    } else {
		console.log("Authenticated successfully with payload:", authData);
		alert(ref.getAuth().auth.uid);	
	    }
	});
    });

/*
 * Implement once Nikole finishes the login html 
$('.login').click(function(event) {
	ref.authWithPassword({
		//email    : "bobtony@firebase.com",
		//password : "correcthorsebatterystaple"
	    });
    });
*/
$('.logout').click(function(event) {
	ref.unauth();
	alert(ref.getAuth());
	if( ref.getAuth() == null ){
	    console.log("Successfull logout.");
	} else {
	    console.log("I don't know");    
	}
    });
});
