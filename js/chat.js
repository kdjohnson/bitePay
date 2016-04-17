$(document).ready(function(){
    // CREATE A REFERENCE TO FIREBASE
    var ref = new Firebase('https://shining-fire-5792.firebaseio.com/');
    var messagesRef = new Firebase('https://bitepayusers.firebaseio.com/'); 
    //var roomName = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);
    var user1;
    var user2;
    var roomName = {};

    ref.onAuth(function(authData) {
	ref.once("value", function(snapshot) {
	    ref.orderByKey().on("child_added", function(childSnapshot) {
		if( childSnapshot.key() === 'users'){
		    childSnapshot.forEach(function(grandChildSnapshot){
			grandChildSnapshot.forEach(function(greatGChildSnapshot){
			    greatGChildSnapshot.forEach(function(GGGChildSnapshot) {
				if( GGGChildSnapshot.key() === 'email' ) {
				    if( GGGChildSnapshot.val() === authData.password.email ) {
					user1 = greatGChildSnapshot.val().username;
					user2 = greatGChildSnapshot.val().chat;
					alert(user1);
					alert(user2);
					roomName['chat'] = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1)
					messagesRef.set({'chat': roomName['chat']});
					messagesRefChild = messagesRef.child(roomName['chat']); 
					// REGISTER DOM ELEMENTS
					var messageField = $('#messageInput');
					var nameField = $('#nameInput');
					var messageList = $('#example-messages');
					// LISTEN FOR KEYPRESS EVENT
					messageField.keypress(function (e) {
					    if (e.keyCode == 13) {
						//FIELD VALUES
						var username = user1;
						var message = messageField.val();
						//SAVE DATA TO FIREBASE AND EMPTY FIELD
						messagesRefChild.push({name:username, text:message});
						messageField.val('');
					    }
					});

					// Add a callback that is triggered for each chat message.
					messagesRefChild.limitToLast(10).on('child_added', function (snapshot) {
					    //GET DATA
					    var data = snapshot.val();
					    var username = data.name || "anonymous";
					    var message = data.text;

					    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
					    var messageElement = $("<li>");
					    var nameElement = $("<strong class='example-chat-username'></strong>")
					    nameElement.text(username);
					    messageElement.text(message).prepend(nameElement);

					    //ADD MESSAGE
					    messageList.append(messageElement)
					    //SCROLL TO BOTTOM OF MESSAGE LIST
					    messageList[0].scrollTop = messageList[0].scrollHeight;
					});
				    }
				}
			    });
			});
		    });
		}
	    });
	});
    });

});
