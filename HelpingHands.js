if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
    Events = new Meteor.Collection('events');
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
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
	 
	Meteor.startup(function(){
		currentFilter = "event";	//1 - event, 2 - organization, 3 - location, 4 - tag list
		Organization = new Meteor.Collection('organization');
		Events = new Meteor.Collection('events');
		
		
		$("input[name='filter']").each(function(i, e){e.addEventListener("click", radioButtonSelect);});
		$("#user_search").on("input", inputSearch);
		$("#search_submit").on("click", inputSearch);
		
		function inputSearch() {
			$("#search_results").empty();
			if($("#user_search")[0].value == "")
				return 1;
			
			switch(currentFilter) {
				case "event":
					var searchObj = {event: new RegExp($("#user_search")[0].value, 'i')}
					break;
				case "organization":
					var searchObj = {}
					break;
				case "location":
					var searchObj = {city: new RegExp($("#user_search")[0].value, 'i') }
					break;
				case "tag list":
					var searchObj = {tags:{ $in: [ $("#user_search")[0].value.replace(' ', ',') ] }}
					break;
			}
			var results = Events.find(searchObj).fetch();
			if(typeof results == "undefined" || results == null || results.length <= 0) {
				$("#search_results")[0].innerHTML = "<h3>No Results!</h3>";
			} else {
				results.forEach(insertEventResult);
			}
			
			return 0;
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
			console.log("new row: " + entryHTML);
			$("#search_results")[0].innerHTML += entryHTML;
			
			//method 2
			/*var new_result = document.createElement("div");
			new_result.id = "result"+(index+1);
			new_result.className = "result_entry";
			$("#search_results").appendChild(new_result);*/
			
			//console.log("new entry html: " + entryHTML);
		}
		
		function radioButtonSelect(e) {
			currentFilter = e.currentTarget.value;
		}
		
		populate = function() {
			//var tmp_search = {name:"TestOne"};
			var tmp_result = Events.find("One").fetch();
			tmp_result.forEach(insertEventResult);
		}
	
	})
}


