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
		var results = Events.findAll(searchObj).fetch();
		if(typeof results == "undefined" || results == NULL) {
			$("#search_results").innerHTML = "<h3>No Results!</h3>";
		} else {
			results.forEach(insertEventResult);
		}
		
		oldInput = e.currentTarget.value
	}
	
	/*Processes input field and converts it to a string for the database
	*args: none
	*return: string for database search*/
	function getUserDate() {
		var udate = $("#search_field").value;
		//TODO - convert user's string (e.g. "December 15") to database formatted time (e.g. 17263275482)
		return udate;
	}
	
	/*Extract data from argument, apply HTML formatting, add to "search_results" element
	*args: array of events
	*return: none*/
	function insertEventResult(entry, index, arr) {
		var evt_name = entry.name,
		evt_date = entry.date,
		evt_city = entry.city,
		evt_state = entry.state;
		
		var entryHTML = "<div id=\"result"+(index+1)+"\" class=\"result_entry\">"+
		"<span name=\"name\">"+event_name+"</span>"+
		"<span name=\"date\">"+evt_date+"</span>"+
		"<span name=\"city\">"+evt_city+"</span>"+
		"<span name=\"state\">"+evt_state+"</span>"+
		entryHTML += "</div>";
		/*var new_result = document.createElement("div");
		new_result.id = "result"+(index+1);
		new_result.className = "result_entry";*/
		
		$("#search_results").appendChild(new_result);
	}
}

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
        Events = new Meteor.Collection('events');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
