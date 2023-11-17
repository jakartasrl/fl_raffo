var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
		
		$('.motivoRechazo').prop('disabled', true);
		if($('#motivoRechazo').text().trim() != '') {
			$('.motivoRechazo').show();
		}else{
			$('.motivoRechazo').hide();
		}	
	},
	
	onEdit: {
		
		custom: function() {
			
			$('#fecha').arqdatetimepicker({
				pickTime: false, 
				language:'es', 
				format:'dd/mm/yyyy', 
				autoclose: true, 
				todayHighlight: true,
				multidate: false
			});
	
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if(dd<10) {
				dd='0'+dd;
			} 

			if(mm<10) {
				mm='0'+mm;
			} 

			today = dd+'/'+mm+'/'+yyyy;
			
			$('#fecha').val(today);
	
			$('#mesInversion').arqdatetimepicker({
				language:'es', 
				format:'mm/yyyy', 
				autoclose: true, 
				multidate: false,
				startView: "months", 
				minViewMode: "months"
			});
			
			$('#nombreAPM').arqzoom({
				datasetId: 'RAF08-AgentePropagandaMedica',
				resultFields: ['distritoCodigo','distrito','matricula','nombre','email'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "nombre",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        },
					        {
					        	"_field" : "distritoCodigo",
					        	"_initialValue": $('#lineaRegionCodigo').val(),
					        	"_finalValue" : $('#lineaRegionCodigo').val(),
					        	"_type": 1, //SHOULD
					        	"_likeSearch": true
					        }
					     ];
				},
				template: {
					row: [{ field: 'nombre', header:"Nombre y Apellido"}],
					width: "400px",
				},
				displayKey: function(res){
					return res['nombre'];
				},
		        callback: function(res){
		        	$('#matriculaAPM').val(res['matricula']);
		        	$('#emailAPM').val(res['email']);
		        },
		        clean: function(res){
		        	$('#matriculaAPM').val('');
		        	$('#emailAPM').val('');
		        }
			});
			
			$('#tipoInversion').arqzoom({
				datasetId: 'RAF10-TipoInversion',
				resultFields: ['codigo','descripcion'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "descripcion",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        },
					     ];
				},
				template: {
					row: [{ field: 'codigo', header:"Código"}, { field: 'descripcion', header:"Descripción"}],
					width: "400px",
				},
				displayKey: function(res){
					return res['descripcion'];
				},
		        callback: function(res){
		        	$('#tipoInversionCodigo').val(res['codigo']);
		        	$('#tipoInversion').val(res['descripcion']);
		        },
		        clean: function(res){
		        	$('#tipoInversionCodigo').val('');
		        	$('#tipoInversion').val('');
		        }
			});
			
			$('#tipoProducto').arqzoom({
				datasetId: 'RAF10-TipoProducto',
				resultFields: ['codigo','descripcion','grupoDerivacion','codGrupoDerivacion'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : "descripcion",
					        	"_initialValue": '%'+searchValue+'%',
					        	"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": true
					        },
					     ];
				},
				template: {
					row: [{ field: 'codigo', header:"Código"}, { field: 'descripcion', header:"Descripción"}],
					width: "400px",
				},
				displayKey: function(res){
					return res['descripcion'];
				},
		        callback: function(res){
		        	$('#tipoProducto').val(res['descripcion']);
		        	$('#tipoProductoCodigo').val(res['codigo']);
		        	$('#grupoDerivacion').val(res['grupoDerivacion']);
		        	$('#codGrupoDerivacion').val("Pool:Group:" + res['codGrupoDerivacion']);
		        },
		        clean: function(res){
		        	$('#tipoProducto').val('');
		        	$('#tipoProductoCodigo').val('');
		        	$('#grupoDerivacion').val('');
		        	$('#codGrupoDerivacion').val('');
		        }
			});
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0,4],  
				custom: function() {
					
					if($('#esGteDistrito').val() == 'true') {
						$('#nombreAPM').arqzoom('disabled',false);
					}else{
						$('#nombreAPM').arqzoom('disabled',true);
					}
					
				},
				'otherwise': function() {
				}
			},
			"Completar solicitud": {
				task: [10],  
				custom: function() {
					
					$('#nombreAPM').arqzoom('disabled',true);
					$('#tipoProducto').arqzoom('disabled',true);
					$('#tipoProducto').attr("data-parsley-required", "false");
					$('#tipoInversion').arqzoom('disabled',true);
					$('#tipoInversion').attr("data-parsley-required", "false");
				
				},
				'otherwise': function() {
				}
			},
			"Revisar solicitud": {
				task: [12],  
				custom: function() {
					//arqFormOpts.habilitarCampos('onEdit');
				
				},
				'otherwise': function() {
				}
			},
			"Aprobar Solicitud": {
				task: [5],  
				custom: function() {
					arqFormOpts.disableAllFields();
					$('.hidden-print').hide();
					$('.motivoRechazo').show();
					$('.motivoRechazo').prop('disabled', false);
				},
				'otherwise': function() {
				}
			},
			"otherwise": { 
				custom: function() {
					// Si no aplica ninguna de las tareas. 
					arqFormOpts.disableAllFields();
					$('.hidden-print').hide();
					$('.motivoRechazo').hide();
				}
			}
		},
		
		ged: function() {
		}
	},
	
    disableField: function(selector){
    	if($(selector).arqzoom('instance')){
			$(selector).arqzoom('disabled', true);
		} else {
			$(selector).prop('disabled', true);
		}
    },
    
    disableAllFields: function() {
    	$('#arqForm :input:not(.tt-input, .tt-hint, [id^="__arqzoom__"])').each(function(){
    		arqFormOpts.disableField(this);
    	});
	},
	habilitarCampos: function(modo){
		
		if(modo == 'onView') {
			
		}else{
			
		}
		
	}

};