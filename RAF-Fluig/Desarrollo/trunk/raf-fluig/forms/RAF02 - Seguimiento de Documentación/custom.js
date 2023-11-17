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
		$("#requiereConfirmacion").attr('disabled','disabled');
	},
	
	onEdit: function() {
		$("#requiereConfirmacion").attr('disabled','disabled');
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
							$('#asunto').attr('readonly',false);
							
							$("#tipologia").ecmzoom({
								datasetId: 'raf-sd-tipologias',
								dataFields: [
									{id: 'codigo', value: 'Código'},
									{id: 'nombre', value: 'Nombre'},
									{id: 'codigoGrupo', value: 'Grupo de Usuarios'}
								],  
								filterValues: [{ id: 'metadata_active', value: true}, {id: 'matricula', value: $('#matricula').val()}], 
								resultFields: ['codigo','nombre','soloConfirmacionLectura','plazoAvanceAutomatico','codigoGrupo'],
								callback: function(res){
									$('#codigo').val(res['codigo']).change();
									$('#tipologia').val(res['nombre']).change();
									$('#soloConfirmacionLectura').val(res['soloConfirmacionLectura']).change();
									$('#plazoAvanceAutomatico').val(res['plazoAvanceAutomatico']).change();
									$('#codigoGrupo').val(res['codigoGrupo']).change();
									$('#pool').val("Pool:Group:" + res['codigoGrupo']).change();
									
									$('#requiereConfirmacion').prop('checked', res['soloConfirmacionLectura']);
									if(res['soloConfirmacionLectura'] != "true"){
										//$('.estado:visible').ecmzoom("enable");
										//$('#estado').ecmzoom("option", "filterValues", [{ id: 'metadata%23active', value: true}, {id: 'codigoTipologia', value: res['codigo']}]); 
										$('#estado').attr("data-parsley-required","true");
										$('#estado').val("").change();
										
										$("#estado").ecmzoom({
											datasetId: 'raf-sd-estados',
											dataFields: [
												{id: 'nombreEstado', value: 'Estado'}
											],  
											filterValues: [{ id: 'metadata_active', value: true}, {id: 'codigoTipologia', value: $('#codigo').val()}], 
											resultFields: ['nombreEstado'],
											callback: function(res){
												$('#estado').val(res['nombreEstado']).change();
											},
											clean: function(field) {
												$('#estado').val("").change();
											}
										});	
										
									}else{		
										$('#estado').attr("data-parsley-required","false");
										$('#estado').val("N/A").change();
										//$('.estado:visible').ecmzoom("disable");
										if ($('#estado').ecmzoom('instance')){											
											$('#estado').ecmzoom("destroy");
										}
										$('#estado').attr('readonly','readonly');
									}
								},
								clean: function(field) {
									$('#codigo').val("").change();
									$('#tipologia').val("").change();
									$('#soloConfirmacionLectura').val("").change();
									$('#plazoAvanceAutomatico').val("").change();
									$('#codigoGrupo').val("").change();
									$('#pool').val("").change();
									$('#estado').val("").change();
									$('#requiereConfirmacion').prop('checked', false);
									$('#estado').ecmzoom("option", "filterValues", [{ id: 'metadata_active', value: true}, {id: 'codigoTipologia', value: $('#codigo').val()?$('#codigo').val():'-1'}]); 
								}
							});	
						},
						"otherwise": function() {
							// Si no aplica esta tarea.
							$('#asunto').attr('readonly','readonly');
							if($('#estado').val() == "N/A"){
								$('.estado:visible').ecmzoom("destroy");
							}
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
	
		$("#estado").ecmzoom({
			datasetId: 'raf-sd-estados',
			dataFields: [
				{id: 'nombreEstado', value: 'Estado'}
			],  
			filterValues: [{ id: 'metadata_active', value: true}, {id: 'codigoTipologia', value: $('#codigo').val()?$('#codigo').val():'-1'}], 
			resultFields: ['nombreEstado'],
			callback: function(res){
				$('#estado').val(res['nombreEstado']).change();
			},
			clean: function(field) {
				$('#estado').val("").change();
			}
		});	
	
	}
};