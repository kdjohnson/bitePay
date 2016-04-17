$(document).ready(function(){
    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/');
    var amount1;
    ref.onAuth(function(authData) {
	if (authData) {
	    ref.once("value", function(snapshot) {
		ref.orderByKey().on("child_added", function(childSnapshot) {
		    if( childSnapshot.key() === 'users'){
			childSnapshot.forEach(function(grandChildSnapshot){
			    grandChildSnapshot.forEach(function(greatGChildSnapshot){
				greatGChildSnapshot.forEach(function(GGGChildSnapshot) {
				    if( GGGChildSnapshot.key() === 'email' ) {
					if( GGGChildSnapshot.val() === authData.password.email ) {
					    var ref2 = new Firebase('https://shining-fire-5792.firebaseio.com/users/' + grandChildSnapshot.key() +  '/' + greatGChildSnapshot.key()); //Connect to Firebase

					    $('#amount').prop('value', parseFloat(greatGChildSnapshot.val().price) + 2 );
					    amount1 = parseFloat(greatGChildSnapshot.val().price) + 2;
					}
				    }
				});
			    });
			}); 
		    }
		});
	    });
	} else {
	    console.log("Client unauthenticated.")
	}
    });

    $("#pay").click(function(event){
	$.ajax({
	    type: "POST",
	    data:{amount: amount1},
	    url: "templates/result.php",
	    succes: function(data){
		console.log(data); 
	    }
	});
    });

});
