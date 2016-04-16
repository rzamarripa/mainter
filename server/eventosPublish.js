Meteor.publish("eventos", function(options){
	return Eventos.find(options);
});