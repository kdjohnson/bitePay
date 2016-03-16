$(document).ready(function() {
    var prices = 0;
    var totalPrice = 0;
    var stack = [];

    $(".list-group-item").each(function(i) {
	$(this).attr('id', 'item' + i );
    });
    
    $(".badge").each(function(y) {
	$(this).attr('id', 'num' + y);
    });

    $("[id^=item]").click(function(event){
	var x = $(this).attr('id');
	var z = x.charAt(4);
	if( $("#num" + z).attr('id') && $("#num" + z).attr('class') == "badge") {
	    $("#num" + z).removeAttr("class");
	    stack.push(parseFloat($(this).attr('value')));
	    console.log(stack);
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
