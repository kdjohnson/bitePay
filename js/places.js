$(document).ready(function() {
    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/'); //Connect to Firebase
    var f = window.location.pathname; //Get URL for displaying correct restaurant.
    var map = new Map(); //Key, Value pair for the menu items and prices from Firebase.
    var stack = []; //Array to hold the prices of the menu items.

    console.log(f);
    console.log(f.substring(8,f.length));
    //Set name and location
    $('.page-header').html("<h1>" + f.substring(8, f.length) + "<small> Oakland Center</small>" + "</h1>" );

    /*
     * Query of Firebase to get the elements to populate the page.
     * Gets the key and checks that against the page it's on. So it'll display the correct data. 
     */
    ref.on("child_added", function(snapshot, prevChildKey) {
	//console.log(snapshot.key());
	snapshot.forEach(function(childSnapshot){
	    if(snapshot.key() === f.substring(8, f.length)){
		map.set(childSnapshot.key(), childSnapshot.val());
	    } else {
		return true; //exits out from for each. 
	    }
	});

	console.log(map);
	var menuItems = map.keys();
	var menuPrices = map.values();
	var itemsArray = [];
	var pricesArray = [];
	console.log(menuItems);
	console.log(menuPrices);

	for( var j = 0; j < map.size; j++ ){
	    itemsArray[j] = menuItems.next().value;
	    pricesArray[j] = menuPrices.next().value;
	}

	console.log(itemsArray);
	$(".list-group").html('');
	var loopPrices; 
	var loopItems; 
	for( var j = 0; j < map.size; j++ ){
	    var b = j.toString();
	    $(".list-group").append('<li class="list-group-item">' + itemsArray[j] + '<span class="badge">$' + pricesArray[j] + '</span></li>')
	}

	$(".list-group-item").each(function(i) {
	    $(this).attr('id', 'item' + i );
	    $(this).attr('value', pricesArray[i]);
	});

	/*
	 *	Gives the badge item a unique number identifier
	 */
	$(".badge").each(function(y) {
	    $(this).attr('id', 'num' + y);
	});


	/*
	 *	An event for when the list group item is clicked.
	 *	It takes the id attribute and checks if it has the badge class on being clicked.
	 *	If so it will remove it, then take the value of the item and pushes it to the stack. 
	 *	It will then add a bootstrap icon indicating that the item was added.
	 *	The process is reversed if the item has a bootstrap icon instead of a badge.
	 *	I.e. the value is removed from the stack and the icon is changed.
	 */
	$("[id^=item]").click(function(event){
		var x = $(this).attr('id');
		var z = x.charAt(4);
		if( $("#num" + z).attr('id') && $("#num" + z).attr('class') == "badge") {
		$("#num" + z).removeAttr("class");
		stack.push(parseFloat($(this).attr('value')));
		//console.log(stack);
		$("#num" + z).html('');
		$("#num" + z).attr("class", "glyphicon glyphicon-ok");
		$("#total.price").text("Total: $" + stack.reduce(function(a, b){ return a + b; }));
		} else {
		stack.indexOf(parseFloat($(this).attr('value')));
		stack.splice(stack.indexOf(parseFloat($(this).attr('value'))), 1);
		$("#num" + z).removeAttr("class");
		$("#num" + z).html("$" + $(this).attr('value'));
		$("#num" + z).attr("class", "badge");
		jQuery.isEmptyObject(stack)
		if(jQuery.isEmptyObject(stack)){
		$("#total.price").text("Total: $0");
		} else {
		$("#total.price").text("Total: $" + stack.reduce(function(a, b){ return a + b; }));
		}
		}
	});
    });
});
