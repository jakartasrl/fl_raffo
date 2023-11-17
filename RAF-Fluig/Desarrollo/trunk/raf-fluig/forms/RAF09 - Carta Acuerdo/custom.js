var	arqFormOpts = {
	parsley: {
		// Parametros configuracion enviados a parseley
	},
	
	onView: function() {
		$('.hidden-print').hide();
		$('#tipoInversion').prop('disabled', true);
		
		$('.motivoRechazo').prop('disabled', true);
		if($('#motivoRechazo').text().trim() != '') {
			$('.motivoRechazo').show();
		}else{
			$('.motivoRechazo').hide();
		}	

	},
	
	onEdit: {
		
		custom: function() {
		
			$('#tipoInversion').prop('disabled', true);
			
			formatearFechas();
			
		},
		
		bpm: {
			"Inicio Solicitud": {
				task: [0,4],  
				custom: function() {
					
					if(tipoInversion == 'becaNac' || tipoInversion == 'BECA COMPLETA/PARCIAL NACIONAL') {
						$('.becaNac').show();
						//$('#nombreCongreso').prop('readonly', false);
					}else if(tipoInversion == 'becaInt' || tipoInversion == 'BECA COMPLETA/PARCIAL INTERNACIONAL') {
						$('.becaInt').show();
						//$('#nombreCongreso').prop('readonly', false);
					}else{
						$('.becaNac, .becaInt').hide();
						//$('#nombreCongreso').prop('readonly', true);
					}
					
				},
				'otherwise': function() {
				}
			},
			"Editar solicitud": {
				task: [10,12,25],  
				custom: function() {
					$('#fecha, #mesInversion').attr("data-parsley-required", "true");
					
					var tipoInversion = $('#tipoInversion').val();
					
					if(tipoInversion == 'becaNac' || tipoInversion == 'BECA COMPLETA/PARCIAL NACIONAL') {
						$('.becaNac').show();
						//$('#nombreCongreso').prop('readonly', false);
						//$('#nombreCongreso').attr("data-parsley-required", "true");
					}else if(tipoInversion == 'becaInt' || tipoInversion == 'BECA COMPLETA/PARCIAL INTERNACIONAL') {
						$('.becaInt').show();
						//$('#nombreCongreso').prop('readonly', false);
						//$('#nombreCongreso').attr("data-parsley-required", "true");
					}else{
						$('.becaNac, .becaInt').hide();
						//$('#nombreCongreso').prop('readonly', true);
						//$('#nombreCongreso').attr("data-parsley-required", "false");
					}
				
				},
				'otherwise': function() {
				}
			},
			"Auditar Carta Acuerdo": {
				task: [5],  
				custom: function() {
					arqFormOpts.disableAllFields();
					$('.hidden-print').hide();
					$('.motivoRechazo').show();
					$('.motivoRechazo').prop('disabled', false);
					
					var tipoInversion = $('#tipoInversion').val();
					
					if(tipoInversion == 'becaNac' || tipoInversion == 'BECA COMPLETA/PARCIAL NACIONAL') {
						$('.becaNac').show();
					}else if(tipoInversion == 'becaInt' || tipoInversion == 'BECA COMPLETA/PARCIAL INTERNACIONAL') {
						$('.becaInt').show();
					}else{
						$('.becaNac, .becaInt').hide();
					}
					//$('#nombreCongreso').prop('readonly', true);
					
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
	
};

function formatearFechas(){
	var fecha = $("#fecha").val().split("-");
	
	$('#fecha').val(fecha[2]+"/"+fecha[1]+"/"+fecha[0]);


	var mesInversion = $("#mesInversion").val().split("-");
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
