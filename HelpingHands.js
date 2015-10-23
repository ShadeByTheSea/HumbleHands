if (Meteor.isClient) {
	oldInput = "";
	currentFilter = "name";	//1 - name, 2 - date+time, 3 - location, 4 - tag list
	Organization = new Meteor.Collection('organization');
	document.getElementById("input").addEventListener("input", handleInput);
	
	function handleInput(e) {
		if(oldInput != e.currentTarget.text) {
			switch(currentFilter) {
				case "name":
					var searchObj = {organization:e.currentTarget.text}
					break;
				case "date":
					getUserDate();
					var searchObj = {date:e.currentTarget.text}
					break;
				case "location":
					var searchObj = {location:e.currentTarget.text}
					break;
				case "tag list":
					var searchObj = {tag_list:e.currentTarget.text}
					break;
			}
			var results = Organization.find(searchObj).fetch();
		}
	}
	function getUserDate() {
		var udate = document.getElementById("date").text;
		var utime = document.getElementById("time").text;
	}
}

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
