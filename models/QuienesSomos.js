Quienes 						= new Mongo.Collection("quienes");
Quienes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


Mision 						= new Mongo.Collection("mision");
Mision.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Vision 						= new Mongo.Collection("vision");
Vision.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Valores 						= new Mongo.Collection("valores");
Valores.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});