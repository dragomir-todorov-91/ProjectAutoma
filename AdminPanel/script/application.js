$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent'); 
  var userProfile;
  var allUsers;
  
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
                
                
                // Запаметяваме потребителя в локална променлива
                userProfile = results[0];
                clearForm();
                showManageProfile();
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
     //TODO add UI elements on manage screen and tie them to an html-data element with user id
     var htmlManageTable = "<table>";
     
     for(var i = 0; i < allUsers.length; i++)
     {
       htmlManageTable += "<tr data-id=" + allUsers[i].get("userid") + "><td>" + allUsers[i].get("name") + "</td>"
                       +  "<td>" + allUsers.get("email") + "</td>"
                       +  "<td>" + allUsers.get("email") + "</td>"
                       +  "<td>" + allUsers.get("email") + "</td>"
                       +  "</tr>";
       
     }
     
     htmlManageTable += "</table>";
     $("#manageTable").append(htmlManageTable);
  }
  
  function clearForm()
  {
      $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
      $(':checkbox, :radio').prop('checked', false);
  }
  

});