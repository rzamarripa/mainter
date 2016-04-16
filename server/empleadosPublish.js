Meteor.publish("empleados", function(params){
	return Empleados.find(params);
});