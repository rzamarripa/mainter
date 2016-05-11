Meteor.publish("empleados", function(){
	return Empleados.find({estatus:true});
});

Meteor.publish("empleado", function(params){
	return Empleados.find(params.id);
});