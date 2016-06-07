Meteor.publish("secciones", function(params){
	return Secciones.find(params);
});
Meteor.publish("seccionesResultado", function(params){
	return SeccionesResultado.find(params);
});
Meteor.publish("seccionesLibrero", function(params){
	return SeccionesLibrero.find(params);
});