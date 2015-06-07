var Users = Parse.Object.extend("Users");
	
Parse.Cloud.beforeSave("Users", function(request, response) 
{
	if (!request.object.isNew()) 
	{
	  // Let existing object updates go through
	  response.success();
	}
	
	var query = new Parse.Query(Users);
	
	// Add query filters to check for uniqueness
	query.equalTo("name", request.object.get("name"));
	query.first().then(function(existingObject) 
	{
	  if (existingObject) 
	  {
		// Update existing object -> dont want to do that
		//existingObject.set("score", request.object.get("score"));
		console.log("Existing user!");
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
	