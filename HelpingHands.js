if (Meteor.isClient) {
	
	Template.socialShareBasic.helpers({
		opts: function() {
		  var opts ={
			facebook: true,
			twitter: true,
			pinterest: false,
			shareData: {
			  url: 'http://google.com'
			}
		  };
		  return opts;
		}
	  });
	  
	  
	 Template.lmSocialShare.rendered = function(){
		var inner = $('.lm-social-share-facebook').html();
		var icon = "<i class='fa fa-facebook-square'></i>";
		$('.lm-social-share-facebook').html(icon + inner);
		
		var inner = $('.lm-social-share-twitter').html();
		var icon = "<i class='fa fa-twitter-square'></i>";
		$('.lm-social-share-twitter').html(icon + inner);
	 };
  
	oldInput = "";
	currentFilter = "name";	//1 - name, 2 - date+time, 3 - location, 4 - tag list
	Organization = new Meteor.Collection('organization');
        Events = new Meteor.Collection('events');
	
	
	$("#user_search").addEventListener("input", handleInput);
	$("$search_submit").addEventListener("click", handleInput);
	function handleInput(e) {
		if(oldInput == $("#user_search")[0].value)
			return;
		
		//Clear results
		while($("#search_results").firstChild)
			$("#search_results").removeChild($("#search_results"));
		
		switch(currentFilter) {
			case "name":
				var searchObj = {organization:$("#user_search")[0].value}
				break;
			case "date":
				var searchObj = {date:getUserDate()}
				break;
			case "location":
				var searchObj = {location:$("#user_search")[0].value}
				break;
			case "tag list":
				var searchObj = {tag_list:$("#user_search")[0].value}
				break;
		}
		var results = Events.find(searchObj).fetch();
		if(typeof results == "undefined" || results == NULL) {
			$("#search_results")[0].innerHTML = "<h3>No Results!</h3>";
		} else {
			results.forEach(insertEventResult);
		}
		
		oldInput = $("#user_search")[0].value
	}
	
	/*Processes input field and converts it to a string for the database
	*args: none
	*return: string for database search*/
	function getUserDate() {
		var udate = $("#search_field")[0].value;
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
		
		//method 1
		var entryHTML = "<div id=\"result"+(index+1)+"\" class=\"result_entry\">"+
		"<span name=\"name\">"+evt_name+"</span>"+
		"<span name=\"date\">"+evt_date+"</span>"+
		"<span name=\"city\">"+evt_city+"</span>"+
		"<span name=\"state\">"+evt_state+"</span>"+
		"</div><br/>";
		$("#search_results")[0].innerHTML += entryHTML;
		
		//method 2
		/*var new_result = document.createElement("div");
		new_result.id = "result"+(index+1);
		new_result.className = "result_entry";
		$("#search_results").appendChild(new_result);*/
		
		//console.log("new entry html: " + entryHTML);
	}
	
	/*populate = function() {
		var tmp_search = {name:"TestOne"};
		var tmp_result = Events.find(/*tmp_search* /).fetch();
		tmp_result.forEach(insertEventResult);
	}*/
}

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
        Events = new Meteor.Collection('events');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
