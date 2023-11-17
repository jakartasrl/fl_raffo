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
	},
	
	onEdit: function() {
		
		// inicializo framework
		$("#form").ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha)
					$('#codigoTipologia').ecmzoom({            //Aca te dice en que campo esta el lookup (la lupita)
						datasetId: 'raf-sd-tipologias-form',   //Aca se llama al dataset
						dataFields: [                    //Estos son los campos del dataset, los que le pusiste al formulario tasa de conexion y reconexion
							{id:'codigo', value: 'Código'},
							{id:'nombre', value: 'Nombre'},
							{id:'codigoGrupo', value: 'Código Grupo'}
						],  
						filterValues: [{ id: 'metadata_active', value: true}], 
						resultFields: ['codigo','nombre','soloConfirmacionLectura', 'plazoAvanceAutomatico', 'codigoGrupo'],
						callback: function(res){   
							$("#codigoTipologia").val(res['codigo']).change();
							$("#nombreTipologia").val(res['nombre']).change();
							$("#soloConfirmacionLectura").val(res['soloConfirmacionLectura']).change();
							$("#plazoAvanceAutomatico").val(res['plazoAvanceAutomatico']).change();
							$("#codigoGrupo").val(res['codigoGrupo']).change();
							
						},
						clean: function(field) {
							$('#codigoTipologia').val("").change();
							$("#nombreTipologia").val("").change();
							$("#soloConfirmacionLectura").val("").change();
							$("#plazoAvanceAutomatico").val("").change();
							$("#codigoGrupo").val("").change();
						}
					});
					
				}
			},
			parsley: {
				// Parametros configuracion enviados a parseley
			}			
		});		
		
	}
};