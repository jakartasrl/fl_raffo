var	arqForms = {
	initForm: function(formType) {
		var $this = this;
		
		$('#tablaOtraConsulta').ecmmasterdetail();
		
		$(function () {	
			if (formType == "ADD" || formType == "MOD") { 
				$this.onEdit();
			} else {
				$this.onView();
			}
		});
	},

	onView: function() {
		
		$('.btn').hide();
		$('.btnEliminarConsulta').hide(); 
		$('.corregirDatos').hide();
		
		if($("#tablaOtraConsulta tr:gt(1)").length == 0){
			$('.divOtrasconsulta').hide();
		}
		
		$('span').each(function( index, value ) {
			if(trim($(value).text()) == ""){
				$(value).text('-');
			}
		});
		
	},
	
	onEdit: function() {

		if((trim($('#historicoObservaciones').val()) != "" && $('#historicoObservaciones').val().substr(0, 10) != "Tarea Auto") && $('#mostrarHistoricoObservaciones').val() == "1"){
			$('#btnMostrarHistoricoObservaciones').trigger('click');
			$('#mostrarHistoricoObservaciones').val("0");
		}
	
		if($("#tablaOtraConsulta tr:gt(1)").length == 0){
			$('.divOtrasconsulta').hide();
		}
	
		$('#aten_vencimiento').ecmdatetimepicker({
			pickTime: false, 
			language: 'es', 
			format:'dd/mm/yyyy',
			autoclose: true, 
			todayHighlight: true
		});	
				
		$('#aten_producto').ecmzoom({
			datasetId: 'raf-productos-principio-activo',
			dataFields: [
				{id: 'codigoProducto', value: 'C%F3digo'},
				{id: 'descripcionProducto', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['codigoProducto','descripcionProducto','principioActivo'],
			callback: function(res){
				$('#aten_producto').val(res['codigoProducto'] + ' - ' + res['descripcionProducto']).change();
				$('#aten_activo').val(res['principioActivo']);
			}
		});
		$('#aten_producto').blur(function() {
			$('#aten_producto').ecmzoom('option', 'filterValues', [{id: 'textoBusqueda', value: $('.aten_producto', $tr).val()}]); 
		});
		
		$('#aten_tipo').ecmzoom({
			datasetId: 'raf-tipos-consulta-sorted',
			dataFields: [
				{id: 'descripcion', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['descripcion'],
			callback: function(res){
				$('#aten_tipo').val(res['descripcion']).change();
			}
		});
		
		$('#aten_derivacion').ecmzoom({
			datasetId: 'raf-derivaciones-sorted',
			dataFields: [
				{id: 'descripcion', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['descripcion','codigoGrupo'],
			callback: function(res){
				$('#aten_derivacion').val(res['descripcion']).change();
				$('#derivacionCodigoGrupo').val('Pool:Group:' + res['codigoGrupo']).change();
			}
		});
		
		$('#aten_licenciante').ecmzoom({
			datasetId: 'raf-licenciantes-sorted',
			dataFields: [
				{id: 'descripcion', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['descripcion'],
			callback: function(res){
				$('#aten_licenciante').val(res['descripcion']).change();
			}
		});
		
		$('#aten_conclusion').ecmzoom({
			datasetId: 'raf-conclusiones-sorted',
			dataFields: [
				{id: 'descripcion', value: 'Descripci%F3n'}
			],  
			filterValues: [{ id: 'active', value: true}], 
			resultFields: ['descripcion'],
			callback: function(res){
				$('#aten_conclusion').val(res['descripcion']).change();
			}
		});
		
		if($('#cantidadConsultas').val() == "" ){
			$('#cantidadConsultas').val(parseInt(0));
		}
		
		// inicializo framework
		$('#form').ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha) NO USAR ESTE LUGAR!!!
				}, 
				workflow: {
					'Corregir Datos': {
						task: [2],  
						custom: function() {
							
							$('.corregirDatos').show();
							$('.todo :input').attr('disabled', 'disabled');
							$('#aten_derivacion').attr('disabled', false);
							
						
						},
						'otherwise': function() {

						}
					},
					'Revisar Consulta': {
						task: [3],  
						custom: function() {
							
							$.each($('form').serializeArray(), function(index, value){
								$('[name="' + value.name + '"]').attr('disabled', 'disabled');
							});
						
							$('#aten_licenciante').attr('disabled',false);
							$('#aten_contieneEventoAdverso').attr('disabled',false);
							$('#aten_contieneEventoAdversoMotivo').attr('disabled',false);
							$('#aten_revobservacion').attr('disabled',false);
							$('#aten_conclusion').attr('disabled',false);
							$('#aten_confirma').attr('disabled', false);							
							$('#aten_confirma').attr('checked', false);							
							
							$('.corregirDatos').hide();
							
							$('.divEncabezado').css('background-color', '#FAFAFA');
							$('.divDatosDelContacto').css('background-color', '#FAFAFA');
							$('.divConsultaObservacion').css('background-color', '#FAFAFA');
							$('.divResolucion').css('background-color', '#FAFAFA');
							$('.divRevisionCierre').css('background-color', 'white');
							$('.divOtrasconsulta').css('background-color', '#FAFAFA');
							$('body').css('background-color', '#fafafa');
						
						},
						'otherwise': function() {
							$('#aten_confirma').attr('disabled', 'disabled');
						}
					},
					'Completar Consulta': {
						task: [5],  
						custom: function() {
							
							$.each($('form').serializeArray(), function(index, value){
								$('[name="' + value.name + '"]').attr('disabled', 'disabled');
							});
						
							$('#aten_resolucion').attr('disabled',false);
							$('#aten_motivoAtraso').attr('disabled',false);
							//$('#aten_derivacion').attr('disabled',false);
							
							$('.corregirDatos').hide();

							$('.divEncabezado').css('background-color', '#FAFAFA');
							$('.divDatosDelContacto').css('background-color', '#FAFAFA');
							$('.divConsultaObservacion').css('background-color', '#FAFAFA');
							$('.divResolucion').css('background-color', 'white');
							$('.divRevisionCierre').css('background-color', '#FAFAFA');
							$('.divOtrasconsulta').css('background-color', '#FAFAFA');
							$('body').css('background-color', '#fafafa');
						
						},
						'otherwise': function() {

						}
					},
					'Atender Consulta': {
						task: [6],  
						custom: function() {
							
							$.each($('form').serializeArray(), function(index, value){
								$('[name="' + value.name + '"]').attr('disabled', 'disabled');
							});
						
							$('#aten_resolucion').attr('disabled',false);
							$('#aten_motivoAtraso').attr('disabled',false);
							$('#aten_derivacion').attr('disabled',false);
							
							$('.corregirDatos').hide();

							$('.divEncabezado').css('background-color', '#FAFAFA');
							$('.divDatosDelContacto').css('background-color', '#FAFAFA');
							$('.divConsultaObservacion').css('background-color', '#FAFAFA');
							$('.divResolucion').css('background-color', 'white');
							$('.divRevisionCierre').css('background-color', '#FAFAFA');
							$('.divOtrasconsulta').css('background-color', '#FAFAFA');
							$('body').css('background-color', '#fafafa');
						
						},
						'otherwise': function() {

						}
					},
					'otherwise': { 
						custom: function() {
							// Si no aplica ninguna de las tareas. Debe ir ultimo.
						}
					}				
				}
			},
			parsley: {
				// Parametros configuracion enviados a parseley
			}			
		});	
		
		
	}, //Fin del Edit
	
	afterWKRC_ModificarDatos: function(datos) {
		
		$('#msjAntesModificarDatos').addClass("hidden");
		$('#msjLuegoModificarDatos').removeClass("hidden");
		
		for(idCampo in datos.padre){
			$('#' + idCampo).val(datos.padre[idCampo]);
		}
		
		for(idCampo in datos.hijos[$('#aten_nroSolicitud').val()]){
			$('#' + idCampo).val(datos.hijos[$('#aten_nroSolicitud').val()][idCampo]);
		}
		
		$('#tablaOtraConsulta tbody tr:visible').remove();
		
		for(hijo in datos.hijos){
			if(hijo != $('#aten_nroSolicitud').val()){
				var row = datos.hijos[hijo];
				agregarOtrasConsultas([row.aten_nroSolicitud, row.aten_nroConsulta, row.aten_producto, 
									   row.aten_activo, row.aten_nroLote, row.aten_vencimiento, 
									   row.aten_tipo, row.aten_observacion, row.aten_derivacion, row.aten_rellamada, 'val']);
			}
		}
	
	},
	
	agregarAdjunto: function(link) {
		$('#adjuntos').append('<a href="' + link.documentLink + '" target="blank">' + link.documentDescription + '</a><br>');	
	}	
	
};

function agregarOtrasConsultas(otraConsulta){

	var $row = $('#tablaOtraConsulta').ecmmasterdetail('addNewRow');
	$('.otracons_nroSolicitud', $row)[otraConsulta[10]](otraConsulta[0]);
	$('.otracons_nroConsulta', $row)[otraConsulta[10]](otraConsulta[1]);
	$('.otracons_producto', $row)[otraConsulta[10]](otraConsulta[2]);
	$('.otracons_activo', $row)[otraConsulta[10]](otraConsulta[3]);
	$('.otracons_nroLote', $row)[otraConsulta[10]](otraConsulta[4]);
	$('.otracons_vencimiento', $row)[otraConsulta[10]](otraConsulta[5]);
	$('.otracons_tipo', $row)[otraConsulta[10]](otraConsulta[6]);
	$('.otracons_observacion', $row)[otraConsulta[10]](otraConsulta[7]);
	$('.otracons_derivacion', $row)[otraConsulta[10]](otraConsulta[8]);
	$('.otracons_rellamada', $row)[otraConsulta[10]](otraConsulta[9]);
	
}

function getLinkSolicitudPadre(){
	window.open('/webdesk/workflowdetail.jsp?processInstanceId=' + $('#padre_nroSolicitud').val() + '&processId=RAF03');
}

function trim(valor){
	
	if(valor != null){
		return valor.replace(/^\s+|\s+$/g,"");
	}
	
}