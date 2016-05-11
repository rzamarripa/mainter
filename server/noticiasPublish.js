Meteor.publish("noticias", function(){
	return Noticias.find({estatus:true});
});


Meteor.publish("noticiasHome", function(){
	return Noticias.find({estatus:true}, {limit: 3});
});