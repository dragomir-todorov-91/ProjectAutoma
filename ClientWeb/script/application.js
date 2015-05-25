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
	var username = $("#usernameFormField").val();
	var email = $("#emailFormField").val();
	var password = $("#passwordFormField").val();
	var password2 = $("#password2FormField").val();
	
	// To be removed!
 	console.log("Form information: " + username + "," + email + "," + password + "," + password2 + "!");
	
	// Creating parse object
    var userTest = Parse.Object.extend("Users");
    var user = new userTest();
	
	var s = username+password+"";
	console.log(s);
	// Genaration of userid, name, email, accessData, verified
	var hashCode = function(s){
				return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
				}
				
	console.log(hashCode);
	
	
	user.save({name: "hello", userid: 10}, 
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
	
	
  });
  
});