angular.module("interCeramic")
.controller("TicketsCtrl", TicketsCtrl);  
 function TicketsCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.nada = undefined;
    this.users = [];
    this.departamento_id = Meteor.user().profile.departamento_id;

   // this.ticket = {};
   /*this.subscribe('ticketsMios', () => {
   	return [{
   		emisor_id : Meteor.userId()
   	}]
   });*/

   this.subscribe('ticketsRecibidos', () => {
   	return [{
   		departamentoReceptor_id : Meteor.user().profile.departamento_id
   	}]
   });

    this.subscribe('departamentos', () => {
    	return [{estatus: true}];
    });

    
	this.subscribe('tickets', () => {
		//select * from tickets where departamento_id = user.departamento_id and estatus = true
		return [{emisor_id : Meteor.userId()}]
	});

	this.subscribe('users', () => {
		return [{_id : {$in:this.getCollectionReactively('users')}}]
	});

	

	this.helpers({
	  tickets : () => {
	  	return Tickets.find().fetch();  	
	  },

	  users : () =>{
	  	var tickets = this.getReactively('tickets');
	  	var users = [];
	  	if(this.tickets){
		  	_.each(this.tickets, function(ticket){
		  		users.push(ticket.emisor_id);
		  	});
	  	}
		  return users
	  },
	  
	   departamentos : () => {
		  return Departamentos.find();
	  },
	    empleados : () => {
		  return Empleados.find();
	  },
	  asesorVentas : () => {
		  return AsesorVentas.find();
	  },
	  gerentes : () => {
		  return Gerentes.find();
	  },
	  jefeAreas : () => {
		  return JefeAreas.find();
	  }

	 
  });

	this.nuevo = true;	  
  this.nuevoTicket = function()
  {

    this.action = true;
    this.nuevo = !this.nuevo;
    this.ticket = {};	
    $('#summernote').summernote('reset');
  };



  this.guardar = function(ticket)
	{  
	    this.ticket.nota = $('#summernote').summernote('code');
	    this.ticket.emisor_id = Meteor.userId();
		this.ticket.departamentoEmisor_id = Meteor.user().profile.departamento_id;
		this.ticket.departamentoReceptor_id = this.ticket.departamento_id;
		this.ticket.fecha = new Date();
		this.ticket.estatus = 1;
		var departamento = Departamentos.findOne(this.ticket.departamento_id);
		Meteor.call('sendEmail',
            departamento.responsableEmail,
            'interceramic123@gmail.com',
            'Sistemas de recursos humanos interceramic',
            this.ticket.nota);
	    //this.ticket.userId = Meteor.userId();
		Tickets.insert(this.ticket);
		console.log(this.ticket);
		this.nuevo = true;
		toastr.success('ticket guardado.');
		this.ticket = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.tickets')
	};
	
	this.editar = function(id)
	{
    this.ticket = Tickets.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};


	this.actualizar = function(ticket)
	{
	    this.ticket.nota = $('#summernote').summernote('code');
		var idTemp = ticket._id;
		delete ticket._id;		
		Tickets.update({_id:idTemp},{$set:ticket});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var ticket = Tickets.findOne({_id:id});
		if(ticket.estatus == true)
			ticket.estatus = false;
		else
			ticket.estatus = true;
		
		Tickets.update({_id: id},{$set :  {estatus : ticket.estatus}});
    };

     this.mostrarArchivos= function(id,rating)
	{   
		if(ticket.estatus == 3)
			this.nada = rating;
		else
			ticket.nada = undefined;
	};	

    
    this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		if(departamento)
		return departamento.nombre;
	};

	this.getEmisor= function(emisor_id)
	{
		var emisor = Meteor.users.findOne(emisor_id);
		console.log(emisor);
		if(emisor)
		return emisor.profile.nombre;
	};



		$('.ui.rating')
		  .rating()
		;

	    $(document).ready(function()
    {
        $('#summernote').summernote();
    });  

	    this.dada = function(_id, rating){
	Tickets.update({_id:_id},{$set:{rating:rating}});
}
		
};