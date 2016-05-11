angular.module("interCeramic")
.controller("ListaTicketsCtrl", ListaTicketsCtrl);  
 function ListaTicketsCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
    this.action = true;
    this.ponerFechaCompromiso = false;
    this.users = [];
    
    this.subscribe('users', () => {
	return [{_id : {$in:this.getCollectionReactively('users')}}]
	});

	this.subscribe('tickets', () => {
		//select * from tickets where departamento_id = user.departamento_id and estatus = true
		return [{departamento_id : Meteor.user().profile.departamento_id}]
	});

	this.subscribe('departamentos');
	
	this.ticket={};

	this.helpers({
	  listaTickets : () => {
		  return Tickets.find();
	  },
	  listaTicketsPendientes : () => {
		  return Tickets.find({estatus:1});
	  },

	  listaTicketsProceso : () => {
		  return Tickets.find({estatus:2});
	  },

	  listaTicketsRealizados : () => {
		  return Tickets.find({estatus:3});
	  },
	  departamentos : () => {
		  return Departamentos.find();
	  },
	  users : () =>{
	  	var tickets = this.getReactively('listaTickets');
	  	var users = [];
	  	if(this.listaTickets){
		  	_.each(this.listaTickets, function(_ticket){
		  		users.push(_ticket.emisor_id);
		  	});
	  	}
		  return users
	  }
  	});





	/*this.editar = function(id)
	{
		
	    this.listaTicket = Tickets.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
*/

	
	this.actualizar = function(_ticket)
	{     
        	//this._ticket.emisor_id = Meteor.userId();
		console.log(_ticket);
		var idTemp = _ticket._id;
		delete _ticket._id;	
		delete _ticket.$$hashKey;	
		_ticket.estatus = 2;
		Tickets.update({_id:idTemp},{$set:_ticket});
	
	};

	this.actualizarProceso = function(_ticket)
	{
	 
		console.log(_ticket);
		var idTemp = _ticket._id;
		delete _ticket._id;	
		delete _ticket.$$hashKey;
		_ticket.estatus = 3;	       
		Tickets.update({_id:idTemp},{$set:_ticket});
	
	};

	this.actualizarOtra = function(_ticket)
	{     
        	//this._ticket.emisor_id = Meteor.userId();
		console.log(_ticket);
		var idTemp = _ticket._id;
		delete _ticket._id;	
		delete _ticket.$$hashKey;	
		_ticket.estatus = 2;
		document.getElementById("input").style.visibility = "hidden";
        document.getElementById("boton").style.visibility = "hidden";
		Tickets.update({_id:idTemp},{$set:_ticket});
	
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
		if(departamento)
		//console.log(departamento);
		return departamento.nombre;
	};	
	this.getEmisor= function(emisor_id)
	{
		var emisor = Meteor.users.findOne(emisor_id);
		if(emisor)
		return emisor.profile.nombre;
	};


	$(document).ready(function() {
	  $('#summernote').summernote();
	});  

	this.estaSeleccionado = function(id)
	{		
		this.ticket = Tickets.findOne({_id: id});
		this.ponerFechaCompromiso = true;
		 
	}




$('.ui.rating')
  .rating()
;

this.dada = function(_id, rating){
	Tickets.update({_id:_id},{$set:{rating:rating}});
}

this.mostrarBoton= function()
{
	document.getElementById("edit").style.visibility = "hidden";
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("boton").style.visibility = "visible";	
}



this.agregar= function(_ticket) 
{
   
    document.getElementById("input").style.visibility = "visible";
    document.getElementById("boton").style.visibility = "visible";
    this.ticket = _ticket;
   
}

		
};