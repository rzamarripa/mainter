angular
  .module('interCeramic')
  .controller('EventosCtrl', EventosCtrl);
 
function EventosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr, $compile, $rootScope) {
	rc = $reactive(this).attach($scope);
  $rootScope.home = false;

	this.evento = {};
  this.actionAgregar = true;
  this.colorSeleccionado = null;
  
  var eventosTotales = [];
  
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  
  this.subscribe("eventos", () => {
	  return [{
		  estatus : true
	  }]
  });


  this.subscribe('departamentos',()=>{
    return [{_id: this.getReactively('departamento_id')}]
  });
  	
	this.helpers({
		eventos : () => {
			this.eventosTotales = Eventos.find().count();
			return Eventos.find();
		},
    departamento : ()  =>  {
    return Departamentos.findOne();
    },
    departamento_id : ()=>{
      if(Meteor.user() != undefined){
        if(Meteor.user().profile != undefined){
          return Meteor.user().profile.departamento_id;
        }
      }
      return '';
    }
	});
  

  this.fecha = function(fechaNac)
  {
    if(new Date(fechaNac).getDate() == new Date().getDate() && new Date(fechaNac).getMonth() == new Date().getMonth()){
      return true; 
    }else{
      return false;
      }     
  }
	

  this.agregarEvento = function(evento){
    this.evento.user = Meteor.userId();
    console.log(rc.departamento);
	  evento.estatus = true;
	  evento.start 	= moment(evento.start).format("YYYY-MM-DD HH:mm");
		evento.end 		= moment(evento.end).format("YYYY-MM-DD HH:mm");
    evento.backgroundColor = rc.departamento.className;
	  Eventos.insert(evento);
    console.log(evento);
	  this.evento 	= {};
  }
   this.alertOnEventClick = function(date, jsEvent, view)
  {
    rc.evento = angular.copy(date);
     if (this.evento == Meteor.userId()) 
  

  
    rc.colorSeleccionado = date.className;
    rc.evento.start   = moment(date.start).format("YYYY-MM-DD HH:mm");
    rc.evento.end     = moment(date.end).format("YYYY-MM-DD HH:mm");
    rc.actionAgregar = false;
    $("#eventInfo").html(rc.evento.description);
    $("#eventContent").dialog({ modal: true, title: rc.evento.title });
    $("#startTime").html(rc.evento.start);
    $("#endTime").html(rc.evento.end);

  
  };
  
  
  this.cancelarEvento = function(){
	  this.actionAgregar = true; 
	  this.evento 	= {};
  }

  this.modificarEvento = function(evento){
     
	  var idTemp = evento._id;
	  console.log(idTemp);
		delete evento._id;	
		delete evento._end;	
		delete evento._start;	
		delete evento._allDay;	
		Eventos.update({_id:idTemp},{$set:evento});
		this.actionAgregar = true;
     if (Meteor.userId() == this.evento) 
		this.evento = {};
  }

	/* remove event */
  this.eliminarEvento = function(id)
	{
   
		var evento = Eventos.findOne({_id:id});
		if(evento.estatus == true)
			evento.estatus = false;
		else
			evento.estatus = true;
		
		Eventos.update({_id: id},{$set :  {estatus : evento.estatus}});
		rc.evento = {};
		rc.actionAgregar = true;
  };
  
  this.esJefeArea = function(){
	  if(Meteor.user().roles[0] == "jefeArea" || Meteor.user().roles[0] == "admin"){
		  return true;
	  }else{
		  return false;
	  }
  }
  
	/* alert on eventClick */
 
  
  /* alert on Drop */
	this.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
		console.log(delta);		
		console.log(event);
		rc.evento._id = event._id;
		rc.evento.title = event.title;
		rc.evento.description = event.description;
		rc.evento.className = event.className;
		rc.evento.start 	= moment(event.start).format("YYYY-MM-DD HH:mm");
    rc.evento.end 		= moment(event.end).format("YYYY-MM-DD HH:mm");
		//rc.evento.start 	= moment(rc.evento.start).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		//rc.evento.end 		= moment(rc.evento.end).add(delta).add('hours', -1).format("YYYY-MM-DD HH:mm");
		rc.actionAgregar = false;
  };
  
  /* alert on Resize */
  this.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
     this.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
    
  /* Render Tooltip */
  this.eventRender = function( event, element, view ) { 
    console.log("event", event)
    console.log("element", element)
    console.log("view", view)
    if (!event.description == "") {
        element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description +
            "</span>");
    }   
    if(view.name === 'month') {
        $(element).height(40);
    }
     //$("#eventContent").dialog({ modal: true, title: event.title });
  };
  
  /* config object */
  this.uiConfig = {
    calendar:{
      height: 800,
      editable: true,
      lang:'es',
      defaultView:'month',
      weekends : true,
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      buttonText: {
        prev: 'Atrás',
        next: 'Siguiente',
        today: 'Hoy',        
    	},
      allDaySlot:false,
      columnFormat: {
        month: 'dddd',
        week: 'dddd',
        day: 'dddd'
      },
      dayNames : ["Domingo", "Lunes", "Martes", "Miécoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort : ["Dom", "Lun", "Ma", "Mi", "Jue", "Vie", "Sab"],
      eventClick: this.alertOnEventClick,
      eventDrop: this.alertOnDrop,
      eventResize: this.alertOnResize,
      eventRender: this.eventRender
    }
  };

  /* event southises array*/
  this.eventSources = [this.eventos, eventosTotales];
};