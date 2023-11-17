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
							{id:'description', value:'Descripción'}
						],
						filterValues: [{ id: 'metadata%23active', value: true}], 
						resultFields: ['code', 'description'],
						callback: function(res){
							$("#codigoGrupo").val(res['code']).change();	
							$("#descripcion").val(res['description']).change();
							
						},
						clean: function(field) {
							$('#codigoGrupo').val("").change();
							$("#descripcion").val("").change();
							
						}
					});
				}
			},
			parsley: {
			}			
		});	
		
	}
};

$(function(){

	$("#plazoAvanceAutomatico").number(true, 0, '', '' );
	
});