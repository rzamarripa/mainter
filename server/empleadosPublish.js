Meteor.publish("empleados", function(params){
	return Empleados.find();
});

Meteor.publish("empleado", function(params){
	return Empleados.find(params.id);
});