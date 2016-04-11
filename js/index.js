$(document).ready(function() {

    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/');
    var username;

    $('[id^=c]').click(function(event) {
	$('[id^=c]').not(this).prop('checked', false);  
	console.log($(this).prop('value'));
    });

    $('#placedInline').click(function(event) {
	/*
	if( ref.getAuth().auth.uid ){
	    $('[id^=c]:checked').prop('value');
	    $('#placedInline').prop('href', '/places/' + $('[id^=c]:checked').prop('value'))
	    console.log($('#placedInline').prop('href'));
	} else {
	    console.log("false");	
	    $('.alert').css('display', 'block');
	}
	*/
	ref.onAuth(function(authData) {
	    var place = $('[id^=c]:checked').prop('value');

	    if (authData) {
		ref.once("value", function(snapshot) {
		    ref.orderByKey().on("child_added", function(childSnapshot) {
			if( childSnapshot.key() === 'users'){
			    childSnapshot.forEach(function(grandChildSnapshot){
				grandChildSnapshot.forEach(function(greatGChildSnapshot){
				    greatGChildSnapshot.forEach(function(GGGChildSnapshot) {
					if( GGGChildSnapshot.key() === 'email' ) {
					    if( GGGChildSnapshot.val() === authData.password.email ) {
						username = greatGChildSnapshot.val().username;

						ref.once("value", function(snapshot) {
						    ref.orderByKey().on("child_added", function(childSnapshot) {
							if( childSnapshot.key() === 'Inline') {
							    childSnapshot.forEach(function(gSnapshot){
								if( gSnapshot.key() === $('[id^=c]:checked').prop('value')){
							    var ref2 = new Firebase('https://shining-fire-5792.firebaseio.com/Inline' + '/' + gSnapshot.key());
								    console.log(gSnapshot.key());
								    var updatedObj = {};
								    updatedObj[username] = 'inline';
								    ref2.push({updatedObj});
								}
							    });

							}
						    });	
						});
					    }
					}
				    });
				});
			    }); 
			}
		    });
		});


		console.log("Authenticated with uid:", authData.uid);
		$('[id^=c]:checked').prop('value');
		//$('#placedInline').prop('href', '/places/' + $('[id^=c]:checked').prop('value'))
		console.log($('#placedInline').prop('href'));

	    } else {
		console.log("Client unauthenticated.")
		console.log("Not logged in.");	
		$('.alert').css('display', 'block');
	    }
	});
    });

});
