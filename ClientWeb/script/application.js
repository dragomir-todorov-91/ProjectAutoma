// Главен код от приложението
var serverPath = "http://kristiqn.com/drago/Server/public";
var storagesJSON;
var storagesDataJSON = {};
var multitaskFlag = 0;

var IPAddress;
var ClientPrivateKey;
var ClientPublicKey;
var ServerPublicKey;

$(document).ready(function()
{  
  // Глобални променливи
  var selectedItem = 0;
  var mainC = $('#mainContent');

  // Използваме jsonip api за да разберем ip адреса ни
  $.getJSON("http://jsonip.com/", function (data) {
	IPAddress = data.ip;
	console.log("Your IP address is " + IPAddress);  
});
  
  
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
				case 1: {$(this).addClass('selected-item'); manageScreen(); break; }
				case 2: {$(this).addClass('selected-item'); testScreen(); break; }
				case 3: {$(this).addClass('selected-item'); registerScreen(); break; }
				case 4: {$(this).addClass('selected-item'); manageScreen(); break; }
				case 5: {$(this).addClass('selected-item'); testScreen(); break; }
			}
		}
	}
  });

  function registerScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#registerScreen').removeClass('hidden');
  }
  
  function manageScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#manageScreen').removeClass('hidden');
  }
  
  function testScreen()
  {
		mainC.find('.content').addClass('hidden');
		mainC.find('#testScreen').removeClass('hidden');
  }

  
  // Функция за получаване на информацията за 
  $(document).on("click", "#connect", function()
  {
	  
	// За достъп до REST api-то
	$.support.cors=true;
  
	 $.get( serverPath + "/server/storages", function( data )
	{
		if(data == null)
		{
			alert("Sorry, but there was an error requesting the storage adressess");
		}
		else
		{
			// Променяме цвета на хедъра за индикация на свързаност със сървъра
			$("header").addClass('secondaryHeaderBack');
			
			// Инициализираме променливата
			storagesJSON = $.parseJSON(data);
			
			// Съставяме таблицата по следния шаблона
			/*
			----------------------------------------------
			| адрес на хранилището | статус | свързаност |
			----------------------------------------------
			*/
			
			var connectionTable;
			connectionTable = "<table class='connect-storage-row'>";
			
			for(var i = 0; i < storagesJSON['storages'].length; i++)
			{
				connectionTable += "<tr><td class='connect-storage-fields'>" + storagesJSON['storages'][i] + "</td>";
				
				connectionTable += "<td class='storage-status connect-storage-fields' ><img src='res/images/loading-animation.gif' width='24px' hight='24px'/></td>";
				
				connectionTable += "<td class='storage-connection connect-storage-fields' data-id='"+i+"'>Свържи се</td></tr>";
			}
			
			connectionTable += "</table>";
			$("#response").append(connectionTable);
			
			$("#connect").addClass('hidden');
			
			for(var i=0; i < storagesJSON['storages'].length; i++)
			{
				var j = 0;
				$.get(storagesJSON['storages'][i] + "storage/clients", function(data)
				{
					// Поради работата с общи данни ограничаваме критичната секция
					while( multitaskFlag != 0)
					{
					}
					multitaskFlag = 1;
					
					//if(data != 0)
					//{				
					
						try 
						{
							storagesDataJSON[j] = $.parseJSON(data);
						}
						catch (e) 
						{
							console.log("error: "+e);
						};
						
						
						
						//if(storagesDataJSON != null)
						//{
							
							$('.storage-status:eq('+j+')').find("img").attr("src","res/images/available.png");
							//$(".storage-status:eq( " + (i+1) + " )").text("hello");
						//}
						
						
						$("#response").append("</br>" + data + " from query " + j); // TODO remove - testing purposes only
						
						j++;
						
					// }
					
					multitaskFlag = 0;
				});
			}
		}	
	});
  });
  
  
  // Register Client
  $(document).on("click", ".storage-connection", function()
  {
	/*
		В тази функция правим следните неща
		1. Вземаме ID-то което сме запазили в data-id атрибута
		2. Генерираме двойка ключове
		3. Запазваме частния ключ във променлива ( файл / cookie / localstorage !? )
		4. Post заявка за регистрация в съответния storage
		5. Отбелязваме регистрацията чрез клас, променлива
	*/
	 
	// 1. Вземаме ID-то което сме запазили в data-id атрибута
	var id = $(this).data('id');
	console.log('Item with id '+id);
	
	
	// 1.5. Вземаме генерирани ключове, ако имаме такива
	ClientPublicKey = localStorage.getItem('ClientPublicKey');
	ClientPrivateKey = localStorage.getItem('ClientPrivateKey');
	
	
	if(ClientPublicKey == null || ClientPublicKey == null)
	{
		console.log("Generation of new pair of keys!");
		
		// 2. При нужда генерираме двойка ключове
		$.get( "php/generate.key.pair.php", function( data )
		{
			var parsedData;
			
			try 
			{
				parsedData = $.parseJSON(data);
			
				// Присвояваме ключовете в променливи
				ClientPublicKey = parsedData[0];
				ClientPrivateKey = parsedData[1];
				
				//console.log(ClientPrivateKey);
				console.log(ClientPublicKey);
				
		
				// 3. Запазваме частния ключ във localstorage
				localStorage.setItem('ClientPrivateKey',ClientPrivateKey);
				localStorage.setItem('ClientPublicKey',ClientPublicKey);
			}
			catch (e) 
			{
				console.log("error: "+e);
			};
			
		});
	}
	else
	{
				//console.log(ClientPrivateKey);
				console.log(ClientPublicKey);
	}
	
	
	/*
	var data = "Hello World!";
	var encryptedData = "Encrypted";
	var decryptedData = "Decrypted";
	
	$.get( "php/private.encode.php?message=" + data + "?privkey=" + ClientPrivateKey, function( data )
	{
		encryptedData = data;
		console.log(encryptedData);
	});
	*/
	
	
	// 4. Post заявка за регистрация в съответния storage
	var registrationData = '{"ipaddress":"' + IPAddress + '","publickey":"' + ClientPublicKey + '"}';
	registrationData = saveEncodedJson(registrationData);
	
	console.log(registrationData);
	
	$.post(storagesJSON['storages'][id] + "storage/register", registrationData)
		  .done(function( data ) 
		{
			console.log("Recieved data is: " + data);
			
			//ClientPrivateKey = saveEncodedJson(ClientPrivateKey);
			
			// Using Post Query
			var encryptedMessage = '{"data":"' + data + '","privatekey":"' + ClientPrivateKey + '"}';
			encryptedMessage = saveEncodedJson(encryptedMessage);
			
			$.post("php/private.decode.php", encryptedMessage)
			.done(function( data ) 
			{
				console.log("Recieved data from private.decode: " + data);
			});
			
			// Using get query
			/*
			$.get( "php/private.decode.php?privatekey=" + ClientPrivateKey + "&message=" + data, function( data )
			{
				
				encryptedData = data;
				console.log("FINAL DATA: \n" + encryptedData);
			});
			*/
			
			// 5. Отбелязваме регистрацията чрез клас, променлива
			removeStorageConnection(this);
			
		});	
  });
  
  // функция за декодиране на стринг
  function saveEncodedJson(str) 
  {
	return str.replace(/\n/g, "\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
  };
  
  function removeStorageConnection(item)
  {
	  console.log("Removing item!");
	  
	$(item).removeClass("storage-connection").addClass("storage-connected");
  }
  
});