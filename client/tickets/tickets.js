angular.module("interCeramic")
.controller("TicketsCtrl", TicketsCtrl);  
 function TicketsCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
   // this.ticket = {};
	this.subscribe('tickets', () => {
		//select * from tickets where departamento_id = user.departamento_id and estatus = true
		return [{departamento_id : Meteor.user().profile.departamento_id, estatus : true}]
	});
	this.subscribe('departamentos');

	this.helpers({
	  tickets : () => {
		  return Tickets.find().fetch();
	  },
	   departamentos : () => {
		  return Departamentos.find();
	  }
	 
  });

	this.nuevo = true;	  
  this.nuevoTicket = function()
  {

    this.action = true;
    this.nuevo = !this.nuevo;
    this.ticket = {};	
    this.ticket.nota = "http://localhost:3000/tickets"	
  };



  this.guardar = function(ticket)
	{   
		this.ticket.departamentoEmisor_id = Meteor.user().profile.departamento_id;
		this.ticket.nota = $('#summernote').summernote('code');
		this.ticket.fecha = new Date();
		var departamento = Departamentos.findOne(this.ticket.departamento_id);
		console.log(departamento);
		Meteor.call('sendEmail',
            departamento.responsableEmail,
            'interceramic123@gmail.com',
            'Sistemas de recursos humanos interceramic',
            this.ticket.nota);
	    //this.ticket.userId = Meteor.userId();
		this.ticket.estatus = true;
		console.log(this.ticket);
		Tickets.insert(this.ticket);
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

     this.getDepartamento= function(departamento_id)
	{
		var departamento = Departamentos.findOne(departamento_id);
		return departamento.nombre;
	};



	    $(document).ready(function() {
  $('#summernote').summernote();
});  
		
};