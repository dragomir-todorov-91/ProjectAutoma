$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  var userProfile;
  var allUsers;
  var usersSettings;
  
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
				case 0: {$(this).addClass('selected-item'); showLoginScreen(); break; }
				case 1: {$(this).addClass('selected-item'); showManageScreen(); break; }
				case 2: {$(this).addClass('selected-item'); showSettingsScreen(); break; }
			}
		}
	}
  });

  // Функции да покажат съответните екрани: #registerScreen, #loginScreen, #homeScreen, #tempScreen, #lightScreen, #deviceScreen
  function showLoginScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#loginScreen').removeClass('hidden');
  }
  
  function showManageScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#manageScreen').removeClass('hidden');
  }
  
  function showSettingsScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#settingsScreen').removeClass('hidden');
  }

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
                
                // Проверка на email за съответсващ админски идентификатор
                if (results[0].id != 'Jm6jdCt22D')
                {
                  alert('Това не е валиден админски профил!');
                }
                else
                {
                  // Запаметяваме потребителя в локална променлива
                  userProfile = results[0];
                  clearForm();
                  showManageProfile();
                  showSettingsTable();
                }
              }
              else
              {
                alert("Грешно потребителско име или парола. Моля въведете ги отново.");
              }
          }
      });  
  }

  
  function showManageProfile()
  {
    // Показва профила, скрива разделите за регистрация и вход
    var $header = $('#header');
    $header.find('.logged').removeClass('hidden');
    $header.find('.nonlogged').addClass('hidden');
    $(".navigation-items:nth-child(2)").addClass("selected-item");
    showManageScreen();
    
    
    var user = Parse.Object.extend("Users");
    var query = new Parse.Query(user);
      query.find({
          success: function(results) 
          {
              if(results.length > 0)
              {
                console.log(results[0].get("userid")); // TODO remove
                
                console.log(results);
                
                allUsers = results;
                showAllUsersOnManage();
              }
              else
              {
                alert("Error occured.");
              }
          }
      });  
    
    
  }
  
  function showAllUsersOnManage()
  {
     var htmlManageTable = "<table class='manageTable'>";
     htmlManageTable += "<tr><td>Име</td><td>Email</td><td>Достъп до данните</td><td>Права за контрол</td><td>Промени</td></tr>"
     
     for(var i = 0; i < allUsers.length; i++)
     {
       htmlManageTable += "<tr data-id='" + allUsers[i].id + "'>"
                         +  "<td>" + allUsers[i].get("name") + "</td>"
                         +  "<td>" + allUsers[i].get("email") + "</td>";
                         if(allUsers[i].get("accessData") == true)
                            htmlManageTable += "<td><input type='checkbox' name='accessData' value='accessData' checked='checked'>Data Access</td>";
                          else
                            htmlManageTable += "<td><input type='checkbox' name='accessData' value='accessData'>Data Access</td>";
                          if(allUsers[i].get("verified") == true)
                            htmlManageTable += "<td><input type='checkbox' name='verified' value='verified' checked='checked'>Control Access</td>";
                          else
                            htmlManageTable += "<td><input type='checkbox' name='verified' value='verified'>Control Access</td>";
                       +  "</tr>";
                       htmlManageTable += "<td><input type='button' class='submitUpdatedUsers' value='Промени правата'></td>";
     }
     
     htmlManageTable += "</table>";
     $("#manageTable").append(htmlManageTable);
  }
  
  $(document).on("click", ".submitUpdatedUsers", function()
  {
    // Извлича ID на потребителя
    var updateUserID = $(this).closest('tr').data('id');
    var newDataAccessValue = $(this).parent().prev('td').prev('td').find('input').is(":checked");
    var newVerifiedValue = $(this).parent().prev('td').find('input').is(":checked");
    
    // Изпраща заявка на сървъра за запис
    
    
    // Create a pointer to an object of class Point with id dlkj83d
var Users = Parse.Object.extend("Users");
var user = new Users();
user.id = updateUserID;
user.set('accessData',newDataAccessValue);
user.set('verified',newVerifiedValue);

user.save(null, {
  success: function(point) {
    // Saved successfully.
  },
  error: function(point, error) {
    // The save failed.
    // error is a Parse.Error with an error code and description.
  }
});
    
    
    
  });
    
  function clearForm()
  {
      $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
      $(':checkbox, :radio').prop('checked', false);
  }
  
  
  // Тук ще изкараме всички настройки на потребителте
  function showSettingsTable()
  {
    
    var settingsParse = Parse.Object.extend("Settings");
    var query = new Parse.Query(settingsParse);
    query.find({
        success: function(results) 
        {
            if(results.length > 0)
            {
              usersSettings = results;
              
               $("#settingsTable").text('');
              
               var htmlSettingsTable = "<table class='data_table'>";
               htmlSettingsTable += "<tr><td>Потребител</td><td>Време на отчитане</td><td>Праг на светлината (в %)</td><td>Пусни светлината</td><td>Пусни климатика</td><td>Температурен праг</td></tr>";
               
               for(var i = (usersSettings.length - 1); i >= 0; i--)
               {
                 htmlSettingsTable += "<tr>";
                 var userName;
                 for(j=0; j < allUsers.length; j++)
                 {
                   if(allUsers[j].id == usersSettings[i].get('userid'))
                   {
                     userName = allUsers[j].get('name');
                   }
                 }
                 htmlSettingsTable +=  "<td>" + userName + "</td>"
                                   +  "<td>" + usersSettings[i].get("sleeptime") + "</td>"
                                   +  "<td>" + usersSettings[i].get("lightlevel") + "</td>";
                                   
                 if(usersSettings[i].get('turnlight'))
                  htmlSettingsTable += "<td> Да </td>";
                 else
                  htmlSettingsTable += "<td> Не </td>";
                 
                 if(usersSettings[i].get('turnaircond'))
                  htmlSettingsTable += "<td> Да </td>";
                 else
                  htmlSettingsTable += "<td> Не </td>";
                  
                  htmlSettingsTable += "<td>" + usersSettings[i].get('temperature') + "</td>";
                  
               }
               
               htmlSettingsTable += "</table>";
               $("#settingsTable").append(htmlSettingsTable);
              
            }
            else
            {
              alert("Настъпи неочаквана грешка :(");
            }
        }
    });  
  }
  

});