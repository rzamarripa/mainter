Meteor.publish("jefeAreas", function(){
	return JefeAreas.find({estatus:true});
});