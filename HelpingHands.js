if (Meteor.isClient) {
	oldInput = "";
	currentFilter = "name";	//1 - name, 2 - date+time, 3 - location, 4 - tag list
	Organization = new Meteor.Collection('organization');
        Events = new Meteor.Collection('events');
	//document.getElementById("user_search").addEventListener("input", handleInput);
	
	function handleInput(e) {
		if(oldInput == e.currentTarget.value)
			return;
		
		//Clear results
		while($("#search_results").firstChild)
			$("#search_results").removeChild($("#search_results"));
		
		switch(currentFilter) {
			case "name":
				var searchObj = {organization:e.currentTarget.value}
				break;
			case "date":
				var searchObj = {date:getUserDate()}
				break;
			case "location":
				var searchObj = {location:e.currentTarget.value}
				break;
			case "tag list":
				var searchObj = {tag_list:e.currentTarget.value}
				break;
		}
		var results = Organization.findAll(searchObj).fetch();
		if(typeof results == "undefined" || results == NULL) {
			//no results
		} else {
			results.forEach(insertEventResult);
		}
		
		oldInput = e.currentTarget.value
	}
	
	/*Processes input field and converts it to a string for the database
	*args: none
	*return: string for database search*/
	function getUserDate() {
		var udate = document.getElementById("date").text;
		//TODO - udate parsing
		return udate;
	}
	
	/*takes a set of events and shows them in the results field
	*args: array of events
	*return: none*/
	function insertEventResult(entry, index, arr) {
		var org_name = entry.name,
		date = entry.date,
		location = entry.location;
		
		var entryHTML = "<div id=\"result"+(index+1)+"\" class=\"result_entry\">";
		entryHTML += "<span name=\"name\">"+org_name+"</span>";
		entryHTML += "</div>";
	}
}

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
        Events = new Meteor.Collection('events');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
