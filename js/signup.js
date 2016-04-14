$(document).ready(function() {
    var ref = new Firebase('https://shining-fire-5792.firebaseio.com');
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {

	var $this = $(this),
	    label = $this.prev('label');

	    if (e.type === 'keyup') {
		if ($this.val() === '') {
		    label.removeClass('active highlight');
		} else {
		    label.addClass('active highlight');
		}
	    } else if (e.type === 'blur') {
		if( $this.val() === '' ) {
		    label.removeClass('active highlight'); 
		} else {
		    label.removeClass('highlight');   
		}   
	    } else if (e.type === 'focus') {

		if( $this.val() === '' ) {
		    label.removeClass('highlight'); 
		} 
		else if( $this.val() !== '' ) {
		    label.addClass('highlight');
		}
	    }

    });

    $('.tab a').on('click', function (e) {

	e.preventDefault();

	$(this).parent().addClass('active');
	$(this).parent().siblings().removeClass('active');

	target = $(this).attr('href');

	$('.tab-content > div').not(target).hide();

	$(target).fadeIn(600);

    });

    $('form').submit( function(event){
	event.preventDefault();
	if( $(this).attr('class') == 'signup' ){
	    alert("bitch we in here");
	    console.log($('#email').val());

	    ref.createUser({
		email: $("#email").val(),
		password: $("#pass").val(),
		username: $("#name").val()

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

		    var mail = $("#email").val();
		    var pass = $("#pass").val();
		    var uName = $("#name").val();
		    ref.child("users").push({
			list: {
			    email: $("#email").val(),
			    password: $("#pass").val(),
			    username: $("#name").val()
			}
		    });

		    console.log("Successfully created user account with uid:", userData.uid);
		}
	    });

	    setTimeout(function() {

		ref.authWithPassword({
		    email: $("#email").val(),
		    password: $("#pass").val()
		}, function(error, authData) {
		    if (error) {
			console.log("Login Failed!", error);
		    } else {
			console.log("Authenticated successfully with payload:", authData);
			alert(ref.getAuth().auth.uid);
			window.location.href='/';
		    }
		});
	    }, 2000);
	} else {
	    setTimeout( function() {
		ref.authWithPassword({
		    email    : $('#loginName').val(),
		    password : $('#passLogin').val()
		}, function(error, authData){
		    if(error) {
			console.log("Shit done broke son", error);
		    } else {
			console.log("Authenticated bitch", authData);
			alert(ref.getAuth().auth.uid);
			window.location.href='/';
		    }
		});
	    }, 2000);
	}
    });
});
