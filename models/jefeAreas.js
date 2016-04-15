JefeAreas 						= new Mongo.Collection("jefeAreas");
JefeAreas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});