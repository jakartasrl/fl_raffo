var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
		$('#tipoInversion, #incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion, #selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
		formatearFechas();
	},
	
	onEdit: {
		
		custom: function() {
			
			$('#tipoInversion, #incluyeAlojamiento, #incluyeTraslado, #incluyeInscripcion, #selAlojamientoPresupuesto, #selTrasladoPresupuesto, #selInscripcionPresupuesto').prop('disabled', true);
			
			$('#nroInversionComercial').arqzoom({
				datasetId: 'RAF11-SolicitudesPosibleBaja',
				resultFields: ['solicitud'],
				filterValues: function(searchValue){
					return [
					        {
					        	"_field" : 'solicitud',
					        	"_initialValue": '%'+searchValue+'%',
					    		"_finalValue" : '%'+searchValue+'%',
					        	"_type": 2, //SHOULD
					        	"_likeSearch": false
					        },
					        {
					        	"_field" : 'areaCodigo',
					        	"_initialValue": $('#areaCodigo').val(),
					        	"_finalValue" : $('#areaCodigo').val(),
					        	"_type": 1, //SHOULD
					        	"_likeSearch": true
					        },
							{
					        	"_field" : 'distritoCodigo',
					        	"_initialValue": $('#distritoCodigo').val(),
					        	"_finalValue" : $('#distritoCodigo').val(),
					        	"_type": 1, //SHOULD
					        	"_likeSearch": true
					        }
					     ];
				},
				template: {
					row: [
					      { field: 'solicitud', header: 'Nro. Solicitud'},
						  { field: 'nombre', header: 'Nombre'},
						  { field: 'apellido', header: 'Apellido'}
					],
				},
				displayKey: function(res){
					return res['solicitud'];
				},
				callback: function(res){
					$('#apellido').val(res['apellido']);
					$('#nombre').val(res['nombre']);
					$('#cuit').val(res['cuit']);
					$('#tipoInversion').val(res['tipoInversion']);
					$('#nombreCongreso').val(res['nombreCongreso']);
					$('#lugarCongreso').val(res['lugarCongreso']);
					$('#incluyeAlojamiento').val(res['incluyeAlojamiento']);
					$('#incluyeInscripcion').val(res['incluyeInscripcion']);
					$('#incluyeTraslado').val(res['incluyeTraslado']);
					$('#seleccionInscripcion').val(res['incluyeInscripcion']);
					$('#selAlojamientoPresupuesto').val(res['seleccionAlojamientoPresupuesto']);
					$('#selTrasladoPresupuesto').val(res['seleccionTrasladoPresupuesto']);
					$('#selInscripcionPresupuesto').val(res['seleccionInscripcionoPresupuesto']);
					$('#mesInversion').val(res['mesInversion']);
					$('#delegado').val(res['delegado']);
					$('#fechaDesdeCongreso').val(res['fechaDesdeCongreso']);
					$('#fechaHastaCongreso').val(res['fechaHastaCongreso']);
					
					formatearFechas();
				},
			    clean: function(res){	
					$('#nroInversionComercial').val('');
					$('#apellido').val('');
					$('#nombre').val('');
					$('#cuit').val('');
					$('#tipoInversion').val('');
					$('#nombreCongreso').val('');
					$('#lugarCongreso').val('');
					$('#incluyeAlojamiento').val('');
					$('#incluyeInscripcion').val('');
					$('#incluyeTraslado').val('');
					$('#seleccionInscripcion').val('');
					$('#selAlojamientoPresupuesto').val('');
					$('#selTrasladoPresupuesto').val('');
					$('#selInscripcionPresupuesto').val('');
					$('#mesInversion').val('');
					$('#delegado').val('');
					$('#fechaDesdeCongreso').val('');
					$('#fechaHastaCongreso').val('');
			    }
			});
			
			
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0,4],  
				custom: function() {
					$('#fechaDesdeCongreso, #fechaHastaCongreso, #mesInversion').prop('disabled', true);
				},
				'otherwise': function() {
				}
			},
			"otherwise": { 
				custom: function() {
					// Si no aplica ninguna de las tareas. 
					arqFormOpts.disableAllFields();
					$('.hidden-print').hide();
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
	
};

function formatearFechas(){

	if($("#fechaDesdeCongreso").val() !== "" && $("#fechaHastaCongreso").val() !== "" && $("#mesInversion").val() !== ""){
		
		var inicio = $("#fechaDesdeCongreso").val().split("-");
		var fin = $("#fechaHastaCongreso").val().split("-");
		var mesInversion = $("#mesInversion").val().split("-");
		
		$("#fechaDesdeCongreso").datepicker({
	        dateFormat: 'dd/mm/yyyy',
			language:'es',
			autoclose: true, 
			todayHighlight: false,
			multidate: false
	    }).datepicker('setDate', new Date(inicio[0],inicio[1]-1,inicio[2]));
		
		$("#fechaHastaCongreso").datepicker({
	        dateFormat: 'dd/mm/yyyy',
			language:'es',
			autoclose: true, 
			todayHighlight: false,
			multidate: false
	    }).datepicker('setDate', new Date(fin[0],fin[1]-1,fin[2]));
	
		$("#mesInversion").datepicker({
	       	language:'es', 
			format:'mm/yyyy', 
			autoclose: true, 
			multidate: false,
			startView: "months", 
			minViewMode: "months" 
	    }).datepicker('setDate', new Date(mesInversion[0],mesInversion[1]-1));
		
		$("#mesInversion").prop('disabled', true);
		$("#mesInversion").next('span').hide();
	}
}
