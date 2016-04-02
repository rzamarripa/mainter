Meteor.publish("ventas", function(){
	return Ventas.find({estatus:true});
});