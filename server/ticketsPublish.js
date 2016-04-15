Meteor.publish("tickets", function(options){
	return Tickets.find(options);
});