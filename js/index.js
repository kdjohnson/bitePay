$(document).ready(function() {

    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/');
    var ref2 = new Firebase('https://shining-fire-5792.firebaseio.com/Inline');
    var username;

    ref.onAuth(function(data){
	if(data) {
	    console.log(data.password.email);
	    $('#registered').prop('innerHTML', 'Log out');
	} else {
	    console.log('naww');
	}
    });

    $('#registered').click(function(event){
	if($(this).prop('innerText') === 'Log out'){
	    ref.unauth();
	    $(this).prop('href', '/');
	}
    });

    $('[id^=c]').click(function(event) {
	$('[id^=c]').not(this).prop('checked', false);  
	console.log($(this).prop('value'));
    });

    $('#placedInline').click(function(event) {

	ref.onAuth(function(authData) {
	    //var place = $('[id^=c]:checked').prop('value');

	    if (authData) {
		console.log("Authenticated with uid:", authData.uid);
		ref.once("value", function(snapshot) {
		    ref.orderByKey().on("child_added", function(childSnapshot) {
			if( childSnapshot.key() === 'users'){
			    childSnapshot.forEach(function(grandChildSnapshot){
				grandChildSnapshot.forEach(function(greatGChildSnapshot){
				    greatGChildSnapshot.forEach(function(GGGChildSnapshot) {
					if( GGGChildSnapshot.key() === 'email' ) {
					    if( GGGChildSnapshot.val() === authData.password.email ) {
						username = greatGChildSnapshot.val().username;

						switch($('[id^=c]:checked').prop('value')){
						    case 'Chickfila': 
							var Chickfila = {};
							Chickfila[username] = 'inline';
							ref2.update({'Chickfila':Chickfila});
							break;
						    case 'Create': 
							var Create = {};
							Create[username] = 'inline';
							ref2.update({'Create':Create});
							break;
						    case 'Einstein': 
							var Einstein = {};
							Einstein[username] = 'inline';
							ref2.update({'Einstein':Einstein});
							break;
						    case 'Moes': 
							var Moes = {};
							Moes[username] = 'inline';
							ref2.update({'Moes':Moes});
							break;
						    case 'Panda': 
							var Panda = {};
							Panda[username] = 'inline';
							ref2.update({'Panda':Panda});
							break;
						    case 'Subway': 
							var Subway = {};
							Subway[username] = 'inline';
							ref2.update({'Subway':Subway});
							break;
						}
					    }
					}
				    });
				});
			    }); 
			}
		    });
		});

		setTimeout(function() {
		    alert('Hello');
		    window.location.href='/places/' + $('[id^=c]:checked').prop('value');
		}, 1000);
	    } else {
		console.log("Client unauthenticated.")
		$('.alert').css('display', 'block');
	    }
	});
    });

});
