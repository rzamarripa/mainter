Meteor.publish("users", function(params){
	return Meteor.users.find(params);
});