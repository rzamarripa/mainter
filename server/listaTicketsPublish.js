Meteor.publish("listaTickets", function(){
	return ListaTickets.find({estatus:true});
});