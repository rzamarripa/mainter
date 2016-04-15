Meteor.publish("asesorVentas", function(){
	return AsesorVentas.find({estatus:true});
});