Meteor.publish("gerentes", function(){
	return Gerentes.find({estatus:true});
});

Meteor.publish("gerente", function(params){
	return Gerentes.find(params.id);
});