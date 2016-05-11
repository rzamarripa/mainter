Meteor.publish("sucursales", function(){
	return Sucursales.find({estatus:true});
});


Meteor.publish("sucursale", function(params){
	return Sucursales.find(params.id);
});