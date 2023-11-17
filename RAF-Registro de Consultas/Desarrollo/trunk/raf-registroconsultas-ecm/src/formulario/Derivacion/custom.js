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
					$("#codigoGrupo").ecmzoom({
						datasetId:'raf-groups',
						dataFields:[
							{id:'code', value:'ID Grupo'},
							{id:'description', value:'Descripci%F3n'}
						],
						filterValues: [{ id: 'active', value: true}], 
						resultFields: ['code', 'description'],
						callback: function(res){
							$("#codigoGrupo").val(res['code']).change();	
							$("#descripcionGrupo").val(res['description']).change();
							
						},
						clean: function(field) {
							$('#codigoGrupo').val("").change();
							$("#descripcionGrupo").val("").change();							
						}
					});
				}
			},
			parsley: {
			}			
		});	
		
	} //Fin del Edit
};