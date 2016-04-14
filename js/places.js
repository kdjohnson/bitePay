$(document).ready(function() {
    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/'); //Connect to Firebase
    var f = window.location.pathname; //Get URL for displaying correct restaurant.

    var map = new Map(); //Key, Value pair for the menu items and prices from Firebase.
    var peopleInline = []; //Array of people in line;
    var values = []; //Array to hold the prices of the menu item 
    var price; //Price the clicked item individually.
    var total = 0; //All the selected items prices added up.
    var count = 0; //How many of that item;

    //Set name and location
    $('.page-header').html("<h1>" + f.substring(8, f.length) + "<small> Oakland Center</small>" + "</h1>" );

    /*
     * Query of Firebase to get the elements to populate the page.
     * Gets the key and checks that against the page it's on. So it'll display the correct data. 
     */
    ref.on("child_added", function(snapshot, prevChildKey) {
    //console.log(snapshot.key());
	snapshot.forEach(function(childSnapshot){
	    if(snapshot.key() === f.substring(8, f.length) && snapshot.key() !== "Inline"){
		map.set(childSnapshot.key(), childSnapshot.val());
	    } else if( snapshot.key() === "Inline" ) {
		if( childSnapshot.key() === f.substring(8, f.length) ){
		    childSnapshot.forEach(function(grandChildSnapshot){
			console.log(grandChildSnapshot.key());
			peopleInline.push(grandChildSnapshot.key()); //Gets the people in line at this restaurant. 
		    });
		}
	    } else {
		return true; 
	    }
	});

	var menuItems = map.keys();
	var menuPrices = map.values();
	var itemsArray = [];
	var pricesArray = [];

	for( var j = 0; j < map.size; j++ ){
	    itemsArray[j] = menuItems.next().value;
	    pricesArray[j] = menuPrices.next().value;
	}


	$(".list-group").html('');
	var loopPrices; 
	var loopItems; 
	for( var j = 0; j < map.size; j++ ){
	    var b = j.toString();
	    $(".list-group").append('<li class="list-group-item" id=item'+ j + ' value=' + pricesArray[j] +'>' + itemsArray[j] + '<div class="side"><span class="badge">$' + pricesArray[j] + '</span>' + '<div class="increment"><button class="btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></button><p class="quantity" id="portion' + j + '">0</p><button class="btn btn-primary" type="button"><span class="glyphicon glyphicon-minus"></button></div></div>' + '</li>');
	}

	$(".list > .list-group-item").each(function(i) {
	    $(this).prop('id', 'item' + i );
	});

	$(".increment > .btn-default").each(function(i) {
	    $(this).prop('id', 'plusBtn' + i );
	});

	$(".increment > .btn-primary").each(function(i) {
	    $(this).prop('id', 'minusBtn' + i );
	});

	/*
	 *	Gives the badge item a unique number identifier
	 */
	$(".badge").each(function(y) {
	    $(this).attr('id', 'num' + y);
	});


	/*
	 *	An event for when the plus or minus buttons are clicked.
	 *	It takes the id attribute and checks if plus or minus has been hit.
	 *	If plus is hit the count is raised by one. Or if minus is hit the 
	 *	count is lowered. Also, the price is raised or lowered accordingly. 
	 */

	$('[id^=plusBtn]').click(function() {
	    //Convert p tags html to a float.
	    count = parseFloat($('#portion' + $(this).prop('id').substring(7, $(this).prop('id').length) ).prop('innerHTML') );
	    //Check if the count is at the limit if not the add to the count and the total
	    //If it is  then don't add to count and animate to tell user.
	    if( count < 10 ) {
		count++;
		price = $('#num' + $(this).prop('id').substring(7, $(this).prop('id').length) ).prop('innerHTML');
		values.push( parseFloat(price.substring(1, price.length)) );
		total = values.reduce(function(a, b) {
		    return a + b;
		});
		$('.price').prop('innerHTML', 'Total: $' + parseFloat(total));
		$('#portion' + $(this).prop('id').substring(7, $(this).prop('id').length) ).prop('innerHTML', count)
	    } else {
		$(this).addClass('animated wobble');
	    }

	});

	//Listen for minus button click
	$('[id^=minusBtn]').click(function() {

	    count = parseFloat($('#portion' + $(this).prop('id').substring(8, $(this).prop('id').length) ).prop('innerHTML') );
	    //Check if count is greater than lower limit.
	    if( count > 0 ) {
		count--;
		price = $('#num' + $(this).prop('id').substring(8, $(this).prop('id').length) ).prop('innerHTML');

		//Check for the index of this items price to be removed from array.
		if(values.indexOf(parseFloat(price.substring(1, price.length))) > -1 ){
		    values.splice(values.indexOf(parseFloat(price.substring(1, price.length))), 1);
		}

		//Check if empty array
		if( values.length <= 0 ) {
		    $('.price').prop('innerHTML', 'Total: $');
		    $('#portion' + $(this).prop('id').substring(8, $(this).prop('id').length) ).prop('innerHTML', count)
		} else {
		    total = values.reduce(function(a, b) {
			return a + b;
		    });
		    $('.price').prop('innerHTML', 'Total: $' + parseFloat(total));
		    $('#portion' + $(this).prop('id').substring(8, $(this).prop('id').length) ).prop('innerHTML', count)
		}
	    } else {
		$(this).addClass('animated wobble');
	    }
	});
    });


    $('#menuItems').click(function() {
	if( $(this).attr('aria-expanded') === 'false' ) {
	    $('#menuItems > span').removeClass();
	    $('#menuItems > span').addClass('glyphicon glyphicon-minus animated rotateIn');
	} else {
	    $('#menuItems > span').removeClass();
	    $('#menuItems > span').addClass('glyphicon glyphicon-plus animated rollIn');
	}
    });


    $('#Grizz').click(function() {

	if( $(this).attr('aria-expanded') === 'false' ) {
	    $('#Grizz > span').removeClass();
	    $('#Grizz > span').addClass('glyphicon glyphicon-minus animated rotateIn');
	} else {
	    $('#Grizz > span').removeClass();
	    $('#Grizz > span').addClass('glyphicon glyphicon-plus animated rollIn');
	}
	for(var i = 0; i < peopleInline.length; i++){
	    if($("#peeps" + i ).text() === peopleInline[i] ) {
		console.log("Fuck");
	    } else {
		for(var i = 0; i < peopleInline.length; i++) {
		    $('.toggles').append("<label class='btn' id='peeps" + i + "'><input type='checkbox' autocomplete='off'>" + peopleInline[i] + "</label>"); 
		}
	    }
	}
	$("label").click(function() {
	    $(this).addClass('animated pulse');
	});
    });

});
