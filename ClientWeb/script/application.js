$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  var userProfile;
  var raspberryIP='localhost';
  //raspberryIP = 192.168.0.105
  
  var lightReadings, tempReadings;
  
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
  
  
   var userProfileText = sessionStorage.getItem("profile");
   // Автоматичен логин
   if(userProfileText != null)
   {
     userProfile = JSON.parse(userProfileText);
     // Имаме логнат потребител
      alert("Loging in");
      loginUser(userProfile.userid);
   }
  
  
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
				case 0: {$(this).addClass('selected-item'); showRegisterScreen(); break; }
				case 1: {$(this).addClass('selected-item'); showLoginScreen(); break; }
				case 2: {$(this).addClass('selected-item'); showHomeScreen(); break; }
				case 3: {$(this).addClass('selected-item'); showTempScreen(); break; }
				case 4: {$(this).addClass('selected-item'); showLightScreen(); break; }
				case 5: {$(this).addClass('selected-item'); showDeviceScreen(); break; }
			}
		}
	}
  });

  // Функции да покажат съответните екрани: #registerScreen, #loginScreen, #homeScreen, #tempScreen, #lightScreen, #deviceScreen
  function showRegisterScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#registerScreen').removeClass('hidden');
  }
  
  function showLoginScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#loginScreen').removeClass('hidden');
  }
  
  function showHomeScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#homeScreen').removeClass('hidden');
  }

  function showTempScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#tempScreen').removeClass('hidden');
  }
  
  function showLightScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#lightScreen').removeClass('hidden');
  }
  
  function showDeviceScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#deviceScreen').removeClass('hidden');
  }
  
  
  // Функция за получаване на информацията
  $(document).on("submit", ".registerForm", function()
  {
    event.preventDefault(); // Забраняваме изпълнението на form.submit(), защото пречи на 
	
	  // Вземат се данните от формата	
  	var usernameForm = $("#usernameFormField").val();
  	var emailForm = $("#emailFormField").val();
  	var password = $("#passwordFormField").val();
  	
  	// To be removed!
   	console.log("Form information: " + usernameForm + "," + emailForm + "," + password + "!");
  		
  	var s = usernameForm+password+"";
  	console.log(s);
  	// Genaration of userid, name, email, accessData, verified
  	var hashCode = function(s)
    {
  		return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  	}
  	var newUserID = Math.abs(hashCode(s));	
  	console.log(newUserID);
  
  	// Creating parse object
    var userTest = Parse.Object.extend("Users");
    var user = new userTest();
  	
  	// Setting data
  	user.set("userid", newUserID+"");
  	user.set("name", usernameForm);
  	user.set("email", emailForm);
  	user.set("accessData", true);
  	user.set("verified", false);
  	
  	user.save(null, 
    {
  	  success: function(user) 
      {
    		// Execute any logic that should take place after the object is saved.
    		alert('New object created with objectId: ' + user.id);
  	  },
  	  error: function(user, error) 
      {
    		// Execute any logic that should take place if the save fails.
    		// error is a Parse.Error with an error code and message.
    		alert('Failed to create new object, with error code: ' + error.message);
  	  }
  	});
  	
  });

  
  // Facebook register (login ?)
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
      
      Parse.FacebookUtils.logIn(null, 
      {
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
  
  
      // Спомагателна функция за статус на логването във Facebook
      function statusChangeCallback(response) 
      {
          console.log('statusChangeCallback');
          console.log(response);
          // The response object is returned with a status field that lets the
          // app know the current login status of the person.
          // Full docs on the response object can be found in the documentation
          // for FB.getLoginStatus().
          if (response.status === 'connected')
          {
            // Logged into your app and Facebook.
            testAPI();
          } 
          else if (response.status === 'not_authorized') 
          {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
          } 
          else 
          {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
          }
      }


  });



  // Вход на потребителя
  $(document).on("submit", ".loginForm", function()
  {
    event.preventDefault(); // Забраняваме изпълнението на form.submit(), защото пречи на 
	
  	// Getting data	
  	var usernameForm = $("#loginUsername").val();
  	var password = $("#loginPassword").val();
  	var s = usernameForm+password+"";
  	
  	// Genaration of userid, name, email, accessData, verified
  	var hashCode = function(s){
  				return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  				}
  	var loginUserID = Math.abs(hashCode(s)) + "";	
  	console.log(loginUserID);
  	
  	loginUser(loginUserID);
  });
  
  // Допълнителна функция за автоматично вписване на потребителя
  function loginUser(loginUserID)
  {
    var user = Parse.Object.extend("Users");
    var query = new Parse.Query(user);
  	query.equalTo("userid",loginUserID);
      query.find({
          success: function(results) 
          {
              if(results.length > 0)
              {
                console.log(results[0].get("userid")); // TODO remove
                
                // Запаметяваме потребителя в localStorage, за по-лесно вписване на единичен компютър
                sessionStorage.setItem("profile", JSON.stringify(results[0]));

                // Запаметяваме потребителя в локална променлива
                userProfile = results[0];
                clearForm();
                showProfile();
                showLightTable();
                showTempTable();
              }
              else
              {
                alert("Грешно потребителско име или парола. Моля въведете ги отново.");
              }
          }
      });  
  }

  
  function showProfile()
  {
    // Показва профила, скрива разделите за регистрация и вход
    var $header = $('#header');
    $header.find('.logged').removeClass('hidden');
    $header.find('.nonlogged').addClass('hidden');
    $(".navigation-items:nth-child(3)").addClass("selected-item");
    showHomeScreen();
    
    // Обновява информацията на профилния екран
     $("#profileName").text(userProfile.get("name"));
     $("#profileEmail").text(userProfile.get("email"));
     $("#profileDataAccess").text(userProfile.get("accessData")?"Потребителя има достъп до данните от устройството": "Потребителя няма достъп до данните от устройството");
     $("#profileDeviceAccess").text(userProfile.get("verified")?"Потребителя може да настройва и управлява устройството": "Потребителя няма права да настройва и управлява устройството");
  
  
     //Ако няма права показваме съобщение за неналични права, в противен случай показваме екран за редакция
     if(userProfile.get("verified"))
     {
       $("#manageContainer").removeClass('hidden');
       $("#manageError").addClass('hidden');
     }
     else
     {
       $("#manageContainer").addClass('hidden');
       $("#manageError").removeClass('hidden');
     }
    
  }
  
  // Изход на потребителя
  $(document).on("click", "#logoutButton", function()
  {
    var result = confirm("Сигурен ли сте че изкате да се отпишете?");
    if (result == true) 
    {
      // Премахваме запазения потребител
      sessionStorage.removeItem("profile");
      
      // Показва профила, скрива разделите за регистрация и вход
      var $header = $('#header');
      $header.find('.logged').addClass('hidden');
      $header.find('.nonlogged').removeClass('hidden');
      $(".navigation-items:nth-child(1)").addClass("selected-item");
      showRegisterScreen();
      
      // Обновява информацията на профилния екран
       $("#profileName").text("username");
       $("#profileEmail").text("email");
       $("#profileDataAccess").text("data access");
       $("#profileDeviceAccess").text("user verified");
    } 
  });
  
  function clearForm()
  {
      $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
      $(':checkbox, :radio').prop('checked', false);
  }

  // Екран за настройка на устройство
  $(document).on('click', '#changeDeviceSettings', function()
  {
    var manageSleeptime = $('#manageSleeptime').val();
    var manageTurnAirCond = $('#manageTurnAirCond').is(":checked");
    var manageTemperature = $('#manageTemperature').val();
    var manageTurnLight = $('#manageTurnLight').is(":checked");
    var manageLightLevel = $('#manageLightLevel').val();
    
    
    $.ajax({
    type: "POST",
    dataType: "json",
    url:  "http://"+raspberryIP+"/automa/EmbeddedControllers/pot_once/ManualOverride/manualoverwrite.php",
    
    data: { user: userProfile.id, 
            sleeptime: manageSleeptime,
            turnaircond: manageTurnAirCond,
            turnlight: manageTurnLight,
            lightlevel: manageLightLevel,
            temperature: manageTemperature  }

    })
    .always(function(data) {
      if(data == 1)
      {
        if(!alert('Нещо се обърка...\nНямате права да направите тази промяна!\nЩе презаредим страницата!')){window.location.reload();}
      }
      else if(data == 0)
      {
        console.log("Saving to settings db");
        
        
          	// Creating parse object
            var settingsTest = Parse.Object.extend("Settings");
            var settings = new settingsTest();
          	
          	// Setting data
          	settings.set("userid", userProfile.id);
          	settings.set("sleeptime", parseInt(manageSleeptime));
          	settings.set("lightlevel", parseInt(manageLightLevel));
          	settings.set("turnlight", manageTurnLight);
          	settings.set("turnaircond", manageTurnAirCond);
          	settings.set("temperature", parseInt(manageTemperature));
          	
          	settings.save(null, 
            {
          	  success: function(settings) 
              {
            		alert('Настройките са обновени!');
          	  },
          	  error: function(settings, error) 
              {
            		// Execute any logic that should take place if the save fails.
            		// error is a Parse.Error with an error code and message.
            		alert('Настройките са обновени, но не са запазени в parse.com със следната грешка:\n ' + error.message);
          	  }
          	});
      }
    });     
  });


  // Таблица със отчитания на светлината (графика TODO)
  function showLightTable()
  {
    
    var lightReadingsParse = Parse.Object.extend("LightReadings");
    var query = new Parse.Query(lightReadingsParse);
    query.find({
        success: function(results) 
        {
            if(results.length > 0)
            {
              lightReadings = results;
              
               $("#lightTable").text('');
              
               var htmlLightTable = "<table class='data_table'>";
               htmlLightTable += "<tr><td>Дата</td><td>Час</td><td>Стойност (в %)</td></tr>";
               
               for(var i = (lightReadings.length - 1); i >= 0; i--)
               {
                 htmlLightTable += "<tr data-id='" + lightReadings[i].id + "'>"
                                   +  "<td>" + lightReadings[i].get("date") + "</td>"
                                   +  "<td>" + lightReadings[i].get("time") + "</td>"
                                   +  "<td>" + lightReadings[i].get("value") + "</td></tr>";
               }
               
               htmlLightTable += "</table>";
               $("#lightTable").append(htmlLightTable);
              
            }
            else
            {
              alert("Настъпи неочаквана грешка :(");
            }
        }
    });  
  }
  
  
  
  // Таблица със отчитания на светлината (графика TODO)
  function showTempTable()
  {
    
    var tempReadingsParse = Parse.Object.extend("TempReadings");
    var query = new Parse.Query(tempReadingsParse);
    query.find({
        success: function(results) 
        {
            if(results.length > 0)
            {
              tempReadings = results;
              
               $("#tempTable").text('');
              
               var htmlTempTable = "<table class='data_table'>";
               htmlTempTable += "<tr><td>Дата</td><td>Час</td><td>Стойност</td></tr>";
               
               for(var i = (tempReadings.length - 1); i >= 0; i--)
               {
                 htmlTempTable += "<tr data-id='" + tempReadings[i].id + "'>"
                                   +  "<td>" + tempReadings[i].get("date") + "</td>"
                                   +  "<td>" + tempReadings[i].get("time") + "</td>"
                                   +  "<td>" + tempReadings[i].get("value").toFixed(2) + "</td></tr>";
               }
               
               htmlTempTable += "</table>";
               $("#tempTable").append(htmlTempTable);
              
            }
            else
            {
              alert("Настъпи неочаквана грешка :(");
            }
        }
    });  
  }
  

});