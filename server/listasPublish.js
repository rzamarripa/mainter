Meteor.publish("listas", function(){
	return Listas.find({estatus:true});
});