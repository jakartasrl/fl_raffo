var	arqFormOpts = {
		parsley: {
			// Parametros configuracion enviados a parseley
		},
		
		onView: function() {
		},
		
		onEdit: {
			custom: function() {
				//Convierte todo a mayusculas
//				$(':input').blur(function() {
//		          	this.value = this.value.toUpperCase(); 
//		    	 });
				
				$('#tablaCompetenciasNivel').arqmasterdetail({
					buttonNewRow: "#btnNuevo",
					buttonsDeleteRow: ".deleteRow",		
					onDeleteRow: function($tr) {
						return confirm("Confirma eliminación?");		
					},
					afterDeleteRow: function($tr, index){
					},
					onCustomizeRow: function($tr, index){
					}
				});
			},
			
			bpm: {
				'Inicio': {
					task: [0],  
					custom: function() {
					},
					'otherwise': function() {
					}
				},
				"otherwise": { 
					custom: function() {
						// Si no aplica ninguna de las tareas. Debe ir ultimo.
					}
				}	
			},
			
			ged: function() {
			}
		}
	};