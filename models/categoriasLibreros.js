CategoriasLibreros						= new Mongo.Collection("CategoriasLibreros");
CategoriasLibreros.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});