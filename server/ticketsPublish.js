Meteor.publish("tickets", function(options){
	return Tickets.find(options);
});

Meteor.publish("ticketsT", function(){
	return Tickets.find();
});