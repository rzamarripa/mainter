Resultados 						= new Mongo.Collection("resultados");
Resultados.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});