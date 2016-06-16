Meteor.publish("tickets", function(params){
	return Tickets.find(params);
});

Meteor.publish("ticketsT", function(){
	return Tickets.find();
});