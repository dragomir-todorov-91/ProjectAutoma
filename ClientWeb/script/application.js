$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  
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
		
	Parse.initialize("WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL", "uRvdUCYFENssbGDeJYsQwAwyoBIIt9Smf4VobpXf");
    
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
		
	user.userid = newUserID + "";
	user.name = usernameForm;
	user.email = emailForm;
	user.accessData = false;
	user.verified = false;
	user.save();
	
		
	// Save without checking for duplicate entries (version 1)
	/*
	user.save({userid: (newUserID+""), name: usernameForm, email: emailForm, accessData: false, verified:false }, 
	{
	  success: function(object) 
	  {
		$(".success").show();
		  
	  },
	  error: function(model, error) 
	  {
		$(".error").show();
	  }
	});
	*/
	
	
	// New version with check before duplicates
	
	
	// var GameScore = Parse.Object.extend("GameScore");
	/*
	Parse.Cloud.beforeSave("Users", function(request, response) 
	{
		if (!request.object.isNew()) 
		{
		  // Let existing object updates go through
		  response.success();
		}
		
		var query = new Parse.Query(user);
		// Add query filters to check for uniqueness
		query.equalTo(usernameForm, request.object.get("name"));
		query.first().then(function(existingObject) 
		{
		  if (existingObject) 
		  {
			console.log("Existing user!");
			// Update existing object
			// existingObject.set("score", request.object.get("score"));
			// return existingObject.save();
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