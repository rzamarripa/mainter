Meteor.publish("archivos", function(){
	return Archivos.find({estatus:true});
});