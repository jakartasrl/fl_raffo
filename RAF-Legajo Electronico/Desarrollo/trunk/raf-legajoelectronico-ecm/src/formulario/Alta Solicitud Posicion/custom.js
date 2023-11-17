//Custom.js para el formulario de Raffo - Alta Solicitud Posicion

var	arqForms = {
	initForm: function(formType) {
		var $this = this;
		$(function () {	
			if (formType == "ADD" || formType == "MOD") { 
				$this.onEdit();
			} else {
				$this.onView();
			}
		});
	},

	onView: function() {
		//$("#requiereConfirmacion").attr('disabled','disabled');
	},
	
	onEdit: function() {
		//$("#requiereConfirmacion").attr('disabled','disabled');
		
		
		$('#fechaAlta').ecmdatetimepicker({
			pickTime: false, 
			language:'es', 
			format:'dd/mm/yyyy', 
			autoclose: true, 
			todayHighlight: true
		});	
		
		$("#sectorPosicion").ecmzoom({
			datasetId: 'raf-sectores',
			dataFields: [
				 {id: 'codigo', value: 'Código'},
				 {id: 'nombre', value: 'Nombre'},
				// {id: 'codigoGrupo', value: 'Grupo de Usuarios'}
			],  
			//filterValues: [{ id: 'metadata%23active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
			resultFields: ['codigo','nombre'],
			callback: function(res){
				// $('#codigo').val(res['codigo']).change();
				 $('#sectorPosicion').val(res['nombre']).change();
				// $('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
				// $('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
				// $('#codigoGrupo').val(res['codigoGrupo']).change();
				// $('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
				// $('#estado').val("").change();
				
				//$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
				
			},
			clean: function(field) {
				// $('#codigo').val("").change();
				// $('#tipologia').val("").change();
				
			}

		});	
	
		$("#area").ecmzoom({
			datasetId: 'raf-sd-tipologias',
			dataFields: [
				// {id: 'codigo', value: 'Código'},
				// {id: 'nombre', value: 'Nombre'},
				// {id: 'codigoGrupo', value: 'Grupo de Usuarios'}
			],  
			//filterValues: [{ id: 'metadata%23active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
			resultFields: ['codigo','nombre','soloConfirmacionLectura','plazoAvanceAutomatico','codigoGrupo'],
			callback: function(res){
				// $('#codigo').val(res['codigo']).change();
				// $('#tipologia').val(res['nombre']).change();
				// $('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
				// $('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
				// $('#codigoGrupo').val(res['codigoGrupo']).change();
				// $('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
				// $('#estado').val("").change();
				
				//$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
				
			},
			clean: function(field) {
				// $('#codigo').val("").change();
				// $('#tipologia').val("").change();
				
			}
		});	
		
		$("#posicion").ecmzoom({
					datasetId: 'raf-posiciones-trabajo',
					dataFields: [
						// {id: 'codigo', value: 'Código'},
						 {id: 'descripcion', value: 'Posicion'},
						// {id: 'codigoGrupo', value: 'Grupo de Usuarios'}
					],  
					//filterValues: [{ id: 'metadata%23active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
					resultFields: ['descripcion'],
					callback: function(res){
						 $('#posicion').val(res['descripcion']).change();
						// $('#tipologia').val(res['nombre']).change();
						// $('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
						// $('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
						// $('#codigoGrupo').val(res['codigoGrupo']).change();
						// $('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
						// $('#estado').val("").change();
						
						//$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
						
					},
					clean: function(field) {
						// $('#codigo').val("").change();
						// $('#tipologia').val("").change();
						
					}
		});		
		
		$("#obraSocial").ecmzoom({
				datasetId: 'raf-obra_social',
				dataFields: [
					 {id: 'codigo', value: 'Código'},
					 {id: 'nombre', value: 'Nombre'},
					// {id: 'codigoGrupo', value: 'Grupo de Usuarios'}
				],  
				//filterValues: [{ id: 'metadata%23active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
				resultFields: ['codigo','nombre'],
				callback: function(res){
					 $('#obraSocial').val(res['nombre']).change();
					// $('#tipologia').val(res['nombre']).change();
					// $('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
					// $('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
					// $('#codigoGrupo').val(res['codigoGrupo']).change();
					// $('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
					// $('#estado').val("").change();
					
					//$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
					
				},
				clean: function(field) {
					// $('#codigo').val("").change();
					// $('#tipologia').val("").change();
					
				}
		});	
		
		
		$("#beneficios").ecmzoom({
			datasetId: 'raf-sd-tipologias',
			dataFields: [
				// {id: 'codigo', value: 'Código'},
				// {id: 'nombre', value: 'Nombre'},
				// {id: 'codigoGrupo', value: 'Grupo de Usuarios'}
			],  
			//filterValues: [{ id: 'metadata%23active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
			resultFields: ['codigo','nombre','soloConfirmacionLectura','plazoAvanceAutomatico','codigoGrupo'],
			callback: function(res){
				// $('#codigo').val(res['codigo']).change();
				// $('#tipologia').val(res['nombre']).change();
				// $('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
				// $('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
				// $('#codigoGrupo').val(res['codigoGrupo']).change();
				// $('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
				// $('#estado').val("").change();
				
				//$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
				
			},
			clean: function(field) {
				// $('#codigo').val("").change();
				// $('#tipologia').val("").change();
				
			}
		});	
		
		
		// inicializo framework
		$("#form").ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha)
				}, 
				workflow: {
					"Inicio": {
						task: [0,1],  // puede ser nro tarea o [nrotarea1,nrotarea2,...] 
						custom: function() {
							// Ejecutado en esta tarea/s
							//$('#asunto').attr('readonly',false);
							

							
							
						},
						"otherwise": function() {
							// Si no aplica esta tarea.
							//$('#asunto').attr('readonly','readonly');
							//if($('#estado').val() == "N/A"){
							//	$('.estado:visible').ecmzoom("destroy");
							//}
						}
					},
					"nombre_tarea2": {
						task: 2,  // puede ser nro tarea o [nrotarea1,nrotarea2,...] 
						custom: function() {
							// Ejecutado en esta tarea/s
						},
						"otherwise": function() {
							// Si no aplica esta tarea.
						}
					},					
					"otherwise": { 
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
	
/* 		$("#estado").ecmzoom({
			datasetId: 'raf-sd-estados',
			dataFields: [
				{id: 'nombreEstado', value: 'Estado'}
			],  
			filterValues: [{ id: 'metadata%23active', value: true}, {id: 'codigoTipologia', value: $('#codigo').val()?$('#codigo').val():'-1'}], 
			resultFields: ['nombreEstado'],
			callback: function(res){
				$('#estado').val(res['nombreEstado']).change();
			},
			clean: function(field) {
				$('#estado').val("").change();
			}
		});	 */
	
		$("#tablaBeneficios").ecmmasterdetail({
				buttonNewRow: "#btnNuevoItem",
				buttonsDeleteRow: ".deleteRow",			
				onDeleteRow: function($tr) {
					var ret;
					if ($(".checkbox", $tr).prop('checked')) {
						ret = confirm("Confirma eliminación?");
					} else {
						alert("No permitido");
						ret = false;
					}
					return ret;
				},
				afterDeleteRow: function() {
					this.sumarCantidades();
				},
				onCustomizeRow: function($tr) {				
					$('.item-cod', $tr).ecmzoom({
						datasetId: 'colleague',
						dataFields: [
							{id: 'colleagueName', value: 'Codigo'},
							{id: 'login', value: 'Descripcion'}
						],  
						resultFields: ['colleagueName','login'],
						callback: function(res){
							$(".item-cod", $tr).val(res['login']).change();
							$(".item-des",$tr).val(res['colleagueName']).change();
						},
						clean: function(field) {
							$(".item-cod", $tr).val("").change();
							$(".item-des",$tr).val("").change();
						}
					});
					
					$(".checkbox", $tr).change(function() {
						$(".item-cant", $tr).attr("data-parsley-required", this.checked);
					}).change();	

					var $that = this;
					// $(".v-cant", $tr).change(function() {
						// $that.sumarCantidades();
					// });
				},
				// sumarCantidades: function() {
					// var sum = 0;
					// $(".item-cant:visible", $("#tablaDocumentos")).each(function (i, elem) {
						// var num = parseFloat($(this).val());
						// if(!isNaN(num)) {
							// sum += num;
						// }						
					// });
					// $("#item-total").val(sum);
				// }
			});

	
	
	}
};