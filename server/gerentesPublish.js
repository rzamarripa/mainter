Meteor.publish("gerentes", function(){
	return Gerentes.find({estatus:true});
});