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
		$('#form').ecmlib({
			custom: {
				init: function() {
					// inicializa siempre el formulario (sea workflow o ficha) NO USAR ESTE LUGAR!!!
				}, 
				workflow: {
					'Iniciar': {
						task: [0,1],  
						custom: function() {
						
						},
						"otherwise": function() {

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
		
	} //Fin del Edit
};