
var lastSettings, lastUserSettings;

$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  var userProfile;
  var secondsValue, minutesValue, hoursValue, daysValue;
  //var raspberryIP='localhost';
  var raspberryIP = "192.168.0.106";
  
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
     $('#seconds').removeClass('hidden');
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
                showLightTable(10);
                showTempTable(10);
                showUpdatedSettings();
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
    var manageTurnAirCond = ($('#manageTurnAirCond').is(":checked"))?0:1;
    var manageTemperature = $('#manageTemperature').val();
    var manageTurnLight = $('#manageTurnLight').is(":checked")?0:1;
    var manageLightLevel = $('#manageLightLevel').val();
    
    if(manageSleeptime != "" && manageTemperature != "" && manageLightLevel != "")
    {
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
              	
                var manageTurnAirCondParse, manageTurnLightParse;
                if(manageTurnAirCond == 0)
                  manageTurnAirCondParse = true;
                else manageTurnAirCondParse = false;
                if(manageTurnLight == 0)
                  manageTurnLightParse = true;
                else manageTurnLightParse = false;
                
              	// Setting data
              	settings.set("userid", userProfile.id);
              	settings.set("sleeptime", parseInt(manageSleeptime));
              	settings.set("lightlevel", parseInt(manageLightLevel));
              	settings.set("turnlight", manageTurnLightParse);
              	settings.set("turnaircond", manageTurnAirCondParse);
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
    }
    else
    {
      alert('Моля въведете всички стойности!');
    }
    
  });


  // Спомагателни функции за настройка на периода на отчитане
  var dialog = $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 500,
      title: "Период на отчитане:",
      modal: true,
      buttons: {
        "Запази": updateTimeField,
        "Върни предишните": resetCurrentDialog,
        "Откажи": function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        console.log('Time not changed!');
      }
    });
 
    $(document).on('click', '#setupSleeptime', function() {
      
      // Update fields based on value
      
      var manageSleeptime = parseInt($('#manageSleeptime').val());
      
      secondsValue = manageSleeptime;
      daysValue = Math.floor(secondsValue / 86400);
      
      secondsValue = secondsValue - (daysValue * 86400);
      hoursValue = Math.floor(secondsValue / 3600);
    
      secondsValue = secondsValue - (hoursValue * 3600);
      minutesValue = Math.floor(secondsValue / 60);
      
      secondsValue = secondsValue % 60;
      
      $("#time-picker-seconds").val(secondsValue);
      $("#time-picker-minutes").val(minutesValue);
      $("#time-picker-hours").val(hoursValue);
      $("#time-picker-days").val(daysValue);
      
      dialog.dialog( "open" );
    });
    
    function updateTimeField()
    {
      var newSleeptime = parseInt($("#time-picker-seconds").val()) + parseInt($("#time-picker-minutes").val())*60 + 
                          parseInt($("#time-picker-hours").val())*3600 + parseInt($("#time-picker-days").val())*86400;
      $('#manageSleeptime').val(newSleeptime);
      
      dialog.dialog( "close" );
    }
    
    function resetCurrentDialog()
    {
      $("#time-picker-seconds").val(secondsValue);
      $("#time-picker-minutes").val(minutesValue);
      $("#time-picker-hours").val(hoursValue);
      $("#time-picker-days").val(daysValue);
    }


  
  
  $( "#tempNumberValues" ).change(function() {
    showTempTable($( "select#tempNumberValues option:selected" ).val());
  });
  
  
  
  $( "#lightNumberValues" ).change(function() {
    showLightTable($( "select#lightNumberValues option:selected" ).val());
  });
  
  
  // Таблица със отчитания на светлината (графика TODO)
  function showLightTable(lightNumber)
  {
    if(userProfile.get('accessData') == true)
    {
      var lightReadingsParse = Parse.Object.extend("LightReadings");
      var query = new Parse.Query(lightReadingsParse);
      query.descending("date,time");
      query.limit(lightNumber);
      query.find({
          success: function(results) 
          {
              if(results.length > 0)
              {
                lightReadings = results;
                
                 $("#lightTable").text('');
                
                 var htmlLightTable = "Октрити са: "+ lightReadings.length + " записа<br><table class='data_table highchart' data-graph-container-before='1' data-graph-type='column'>";
                 htmlLightTable += "<tr><td>№</td><td>Дата</td><td>Час</td><td>Стойност (в %)</td></tr>";
                 
                 var data = [];
                 var categories = [];
                 
                 for(var i = 0; i < lightReadings.length; i++)
                 {
                   data.push(parseFloat(lightReadings[lightReadings.length-i-1].get("value").toFixed(2)));
                   categories.push(i+1);
                   
                   htmlLightTable += "<tr data-id='" + lightReadings[i].id + "'>"
                                     +  "<td>" + (lightReadings.length-i) + "</td>"
                                     +  "<td>" + lightReadings[i].get("date") + "</td>"
                                     +  "<td>" + lightReadings[i].get("time") + "</td>"
                                     +  "<td>" + lightReadings[i].get("value") + "</td></tr>";
                 }
                 
                 htmlLightTable += "</table>";
                 $("#lightTable").append(htmlLightTable);
                
                
                 // Chart showing
                 $('#containerLight').highcharts({
                 title: {
                    text: 'Осветеност в периода на заредените стойности',
                    x: -20 //center
                 },
                 subtitle: {
                    text: 'Източник: Raspberry Pi',
                    x: -20
                 },
                 xAxis: {
                    categories: categories
                 },
                 yAxis: {
                    title: {
                        text: 'Осветеност (%)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                 },
                 tooltip: {
                    valueSuffix: '%'
                 },
                 legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                 },
                 series: [
                  {
                    name: 'Стая',
                    data: data
                 }]
                 });
                
              }
              else
              {
                alert("Настъпи неочаквана грешка :(");
              }
          }
      });
    }  
    else
    {
      $("#lightTable").text('Потребителя няма права да вижда стойностите за осветеността');
      $(" select").addClass('hidden');
      $("div#containerLight").addClass('hidden');
    }
  }
  
  
  
  // Таблица със отчитания на светлината (графика TODO)
  function showTempTable(tempNumber)
  {
    if(userProfile.get('accessData') == true)
    {
      var tempReadingsParse = Parse.Object.extend("TempReadings");
      var query = new Parse.Query(tempReadingsParse);
      query.descending("date,time");
      query.limit(tempNumber);
      query.find({
          success: function(results) 
          {
              if(results.length > 0)
              {
                tempReadings = results;
                
                 $("#tempTable").text('');
                
                 var htmlTempTable = "Октрити са: "+ tempReadings.length + " записа<br><table class='data_table  class='data_table highchart2' data-graph-container-before='1' data-graph-type='column>";
                 htmlTempTable += "<tr><td>№</td><td>Дата</td><td>Час</td><td>Стойност</td></tr>";
                 
                 var data = [];
                 var categories = [];
                 
                 for(var i = 0; i < tempReadings.length; i++)
                 {               
                   
                   data.push(parseFloat(tempReadings[tempReadings.length-i-1].get("value").toFixed(2)));
                   categories.push(i+1);
                   
                   htmlTempTable += "<tr data-id='" + tempReadings[i].id + "'>"
                                     +  "<td>" + (tempReadings.length-i) + "</td>"
                                     +  "<td>" + tempReadings[i].get("date") + "</td>"
                                     +  "<td>" + tempReadings[i].get("time") + "</td>"
                                     +  "<td>" + tempReadings[i].get("value").toFixed(2) + "</td></tr>";
                 }
                 
                 htmlTempTable += "</table>";
                 $("#tempTable").append(htmlTempTable);
                 
                 // Chart showing
                 $('#containerTemp').highcharts({
                 title: {
                    text: 'Температури в периода на заредените стойности',
                    x: -20 //center
                 },
                 subtitle: {
                    text: 'Източник: Raspberry Pi',
                    x: -20
                 },
                 xAxis: {
                    categories: categories
                 },
                 yAxis: {
                    title: {
                        text: 'Temperature (°C)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                 },
                 tooltip: {
                    valueSuffix: '°C'
                 },
                 legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                 },
                 series: [
                  {
                    name: 'Стая',
                    data: data
                 }]
                 });
              }
              else
              {
                alert("Настъпи неочаквана грешка :(");
              }
          }
      });  
    }
    else
    {
      $("#tempTable").text('Потребителя няма права да вижда стойностите за температурата');
      $("select").addClass('hidden');
      $("div#containerTemp").addClass('hidden');
    }
  }
  
  
  function showUpdatedSettings()
  {
    // TODO
    // Зарежда последните настройки
    // Зарежда последните потребителски настройки и ако не съвпадат с горните се предлага да се заменят
    
    
    var settingsParse = Parse.Object.extend("Settings");
    var query = new Parse.Query(settingsParse);
    query.equalTo("userid", userProfile.id);
    query.ascending("createdAt");
    query.limit(1);
    query.find({
        success: function(results) 
        {
          lastUserSettings = results[0];
          showChangedSettings();
        }
    });  
    
    
    var settingsParse = Parse.Object.extend("Settings");
    var query = new Parse.Query(settingsParse);
    query.descending("createdAt");
    query.limit(1);
    query.find({
        success: function(results) 
        {
          lastSettings = results[0];
          setSettings(lastSettings);
          showChangedSettings();
          
        }
    });  
  }
  
});


function showChangedSettings()
{
          if((lastUserSettings != null) && (lastSettings != null) && (lastUserSettings.get('userid') != lastSettings.get('userid')) )
          {
            $("#updatedSettings").removeClass('hidden');
          }
          
}

function setSettings(settings)
{
  
          $('#manageSleeptime').val( settings.get("sleeptime"));
          
          settings.get('turnlight')? $('#manageTurnLight').prop('checked', true) : $('#manageTurnLight').prop('checked', false);

          $('#manageTemperature').val(settings.get('temperature'));
          
          settings.get('turnaircond')? $('#manageTurnAirCond').prop('checked', true) : $('#manageTurnAirCond').prop('checked', false);
          
          $('#manageLightLevel').val(settings.get('lightlevel'));
}

$(document).on("click", "#resetUserSettings", function()
  {
    setSettings(lastUserSettings);
    $("#updatedSettings").addClass('hidden');
  });
  
function showChangedSettings()
{
          if((lastUserSettings != null) && (lastSettings != null) && (lastUserSettings.get('userid') != lastSettings.get('userid')) )
          {
            $("#updatedSettings").removeClass('hidden');
          }
          
}


$(document).on("click", "#cancelMessage", function()
  {
    $("#updatedSettings").addClass('hidden');
  });
  