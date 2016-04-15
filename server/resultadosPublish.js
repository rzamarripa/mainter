Meteor.publish("resultados", function(){
	return Resultados.find({estatus:true});
});