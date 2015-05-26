$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  Parse.initialize("WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL", "uRvdUCYFENssbGDeJYsQwAwyoBIIt9Smf4VobpXf");
  
  // GUI навигация
  $(".navigation-items").on("click",function()
  {
	var tinav = $(this).index();
	if(selectedItem != tinav)
	{
		
		$(".navigation-items").removeClass("selected-item");
		// var mainC = $('#mainContent');
		if((selectedItem+0) != (tinav+0))
		{
			selectedItem = tinav;
			switch(selectedItem)
			{
				case 0: {$(this).addClass('selected-item'); registerScreen(); break; }
				case 1: {$(this).addClass('selected-item'); loginScreen(); break; }
				case 2: {$(this).addClass('selected-item'); homeScreen(); break; }
				case 3: {$(this).addClass('selected-item'); tempScreen(); break; }
				case 4: {$(this).addClass('selected-item'); lightScreen(); break; }
				case 5: {$(this).addClass('selected-item'); deviceScreen(); break; }
			}
		}
	}
  });

  // Функции да покажат съответните екрани: #registerScreen, #loginScreen, #homeScreen, #tempScreen, #lightScreen, #deviceScreen
  function registerScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#registerScreen').removeClass('hidden');
  }
  
  function loginScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#loginScreen').removeClass('hidden');
  }
  
  function homeScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#homeScreen').removeClass('hidden');
  }

  function tempScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#tempScreen').removeClass('hidden');
  }
  
  function lightScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#lightScreen').removeClass('hidden');
  }
  
  function deviceScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#deviceScreen').removeClass('hidden');
  }
  
  // Функция за получаване на информацията
  
  $(document).on("submit", ".registerForm", function()
  {
    event.preventDefault(); // Забраняваме изпълнението на form.submit(), защото пречи на 
	
	// Getting data	
	var usernameForm = $("#usernameFormField").val();
	var emailForm = $("#emailFormField").val();
	var password = $("#passwordFormField").val();
	var password2 = $("#password2FormField").val();
	
	// To be removed!
 	console.log("Form information: " + usernameForm + "," + emailForm + "," + password + "," + password2 + "!");
	
	// Creating parse object
    var userTest = Parse.Object.extend("Users");
    var user = new userTest();
	
	var s = usernameForm+password+"";
	console.log(s);
	// Genaration of userid, name, email, accessData, verified
	var hashCode = function(s){
				return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
				}
	var newUserID = Math.abs(hashCode(s));	
	console.log(newUserID);
	
	
	
	
	// Setting data
	user.set("userid", newUserID+"");
	user.set("name", usernameForm);
	user.set("email", emailForm);
	user.set("accessData", true);
	user.set("verified", false);
	
	
	user.save(null, {
	  success: function(user) {
		// Execute any logic that should take place after the object is saved.
		alert('New object created with objectId: ' + user.id);
        location.reload(); //refreshes the form
	  },
	  error: function(user, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and message.
		alert('Failed to create new object, with error code: ' + error.message);
        location.reload();
	  }
	});
	
	

	/*
	// Save without checking for duplicate entries (version 1)
	user.save(null, 
	{
	  success: function(object) 
	  {
		$(".success").show();
		alert("Success!");
		  
	  },
	  error: function(model, error) 
	  {
		$(".error").show();
	  }
	});
	*/
	
	
	// New version with check before duplicates
	
	/*
	var GameScore = Parse.Object.extend("GameScore");

	Parse.Cloud.beforeSave("GameScore", function(request, response) 
	{
		if (!request.object.isNew()) 
		{
		  // Let existing object updates go through
		  response.success();
		}
		var query = new Parse.Query(GameScore);
		// Add query filters to check for uniqueness
		query.equalTo("playerName", request.object.get("playerName"));
		query.first().then(function(existingObject) 
		{
		  if (existingObject) 
		  {
			// Update existing object
			existingObject.set("score", request.object.get("score"));
			return existingObject.save();
		  } 
		  else 
		  {
			// Pass a flag that this is not an existing object
			return Parse.Promise.as(false);
		  }
		}).then(function(existingObject) 
		  {
			  if (existingObject) 
			  {
				// Existing object, stop initial save
				response.error("Existing object");
			  } 
			  else 
			  {
				// New object, let the save go through
				response.success();
			  }
		  }, function (error) {
		  response.error("Error performing checks or saves.");
		});
	});
	
	*/
	
	
	
  });
  
});