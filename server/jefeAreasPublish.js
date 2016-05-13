Meteor.publish("jefeAreas", function(params){
	return JefeAreas.find(params);
});

