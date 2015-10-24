Router.route('/', {
    template: 'index'
});
Router.route('/inner', {
    template: 'inner'
});
Router.route('/createEvent', {
    template: 'createEvent'
});

if (Meteor.isServer) {
	Organization = new Meteor.Collection('organization');
    Events = new Meteor.Collection('events');
	var pageRendered = false;
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
			pinterest: true,
			shareData: {
			  url: 'http://google.com'
			}
		  };
		  return opts;
		}
	});
	  
	  
	Template.lmSocialShare.rendered = function(){
		var icon = "<div class='socialBubble'><i class='fa fa-facebook-f'></i></div>";
		$('.lm-social-share-facebook').html(icon);
		
		var icon = "<div class='socialBubble'><i class='fa fa-twitter'></i></div>";
		$('.lm-social-share-twitter').html(icon);
		
		var icon = "<div class='socialBubble'><i class='fa fa-pinterest-p'></i></div>";
		$('.lm-social-share-pinterest').html(icon);
	 };
	 
	 
	Template.index.rendered = function(){
		if(pageRendered) return;
		pageRendered = true;
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
					var searchObj = {name: new RegExp($("#user_search")[0].value, 'i')}
					break;
				case "organization":
					var searchObj = {organization: new RegExp($("#user_search")[0].value, 'i')}
					break;
				case "location":
					var searchObj = {city: new RegExp($("#user_search")[0].value, 'i') }
					break;
				case "tags":
					var tags = $("#user_search")[0].value.split(' ');
					var regexarr = [];
					tags.forEach(function(e, index, arr){regexarr.push(new RegExp(e, 'i'))});
					var searchObj = {tags:{ $in: regexarr }}
					break;
			}
			var results = Events.find(searchObj, {sort: {startDate:1}}).fetch();
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
			evt_date = new Date(entry.startDate),
			evt_city = entry.city,
			evt_state = entry.state,
			evt_org = entry.organization;
			
			//method 1
			var entryHTML = "<div id=\"result"+(index+1)+"\" class=\"result_entry\">"+
			"<span name=\"name\">"+evt_name+"</span>"+
			"<span name=\"city\">"+evt_city+"</span>"+
			"<span name=\"date\">"+evt_date.toDateString()+"</span>"+
			"<span name=\"organization\">"+evt_org+"</span>"+
			"</div><br/>";
			$("#search_results")[0].innerHTML += entryHTML;
			
			//console.log("new entry html: " + entryHTML);
		}
		
		function radioButtonSelect(e) {
			currentFilter = e.currentTarget.value;
			if(e.currentTarget.value == "tags")
				$("#user_search").attr("placeholder", "Children Elderly etc.");
			else
				$("#user_search").attr("placeholder", "");
			inputSearch();
		}
	};
	
	Template.createEvent.rendered = function() {
		if(pageRendered) return;
		pageRendered = true;
		
		$("table div:last-of-type").on("click", submitClick);
		
		function submitClick(e) {
			//form_date = new Date($("#date").val()),
			//form_date = new Date(document.getElementById("date").value),
			
			var input_date = $('#scheduleDate').val();
			var myDate = new Date(input_date);
			var start_date = myDate.getTime() + $("#startTime");
			
			var tag_list = new Array();
			$("input[name='filterCheck']").each(function(i, e){
				if(e.checked)
					tag_list.push(e.value);
			});
			
			console.log("startDate: " + MyDate.toDateString() + " " + $("#startTime").val())
			console.log("endDate: " + MyDate.toDateString() + " " + $("#endTime").val())
			
			var newEvt = {
				"name": $("#eventName"),
				"organization": $("#organizationName").val(),
				"description": $("#eventDescription").val(),
				"createtime": Date.now(),
				"startDate": Date.parse(MyDate.toDateString() + " " + $("#startTime").val()),
				"endDate": Date.parse(MyDate.toDateString() + " " + $("#endTime").val()),
				"volunteer": $("#numberOfVolunteers").val(),
				"address": $("#locationAddress").val(),
				"city": $("#city").val(),
				"state": $("#").val(),
				"zip": $("#zip").val(),
				"tags": tag_list,
				"signups": "",
				"organizers": ""
			};
			insertEvent(newEvt);
		}
		
		function insertEvent(obj) {
			console.log(obj);
		}
	};
}


