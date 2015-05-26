$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  Parse.initialize("WxrA9CtdMQ1kVF3sZgxtWdqDxsOhJC1bkvr5NyKL", "uRvdUCYFENssbGDeJYsQwAwyoBIIt9Smf4VobpXf");
  
  
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '844853188931475', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });

        // Run code after the Facebook SDK is loaded.
  };

      (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  
  
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
	
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  $(document).on("click", "#registerButtonFacebook", function()
  {
	  
	  
	  /*
	function updateStatusCallback(){
	alert('Status updated!!');
		// Your logic here
	}
	  
	$.ajaxSetup({ cache: true });
	$.getScript('http://connect.facebook.net/en_US/sdk.js', function(){
		FB.init({
		  appId: '844853188931475',
		  version: 'v2.3' // or v2.0, v2.1, v2.0
		});     
		//$('#loginbutton,#feedbutton').removeAttr('disabled');
		FB.getLoginStatus(updateStatusCallback);
	});
	  
	 
	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	function checkLoginState() {
		FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
		});
	}
	
 /*
	window.fbAsyncInit = function() {
	FB.init({
    appId      : '844853188931475',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.3' // use version 2.2
	});

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });


  /*
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  */	
  
  Parse.FacebookUtils.logIn(null, {
  success: function(user) {
    if (!user.existed()) {
      alert("User signed up and logged in through Facebook!");
    } else {
      alert("User logged in through Facebook!");
    }
  },
  error: function(user, error) {
    alert("User cancelled the Facebook login or did not fully authorize.");
  }
});

  
});


// Спомагателна функция за статус на логването във Facebook
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}




});