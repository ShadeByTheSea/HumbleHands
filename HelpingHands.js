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
	//document.getElementById("user_search").addEventListener("input", handleInput);
	
	function handleInput(e) {
		if(oldInput == e.currentTarget.value)
			return;
		
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
		var results = Organization.find(searchObj).fetch();
		results.forEach(insertEventResult);
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
		
		var entryHTML = "<div id=\"result"+(index+1)+"\" class=\"search_results\">";
		entryHTML += "<span name=\"name\">"+org_name+"</span>";
		entryHTML += "</div>";
	}
}

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
