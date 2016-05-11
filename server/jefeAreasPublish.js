Meteor.publish("jefeAreas", function(){
	return JefeAreas.find({estatus:true});
});

Meteor.publish("jefeArea", function(params){
	return JefeAreas.find(params.id);
});