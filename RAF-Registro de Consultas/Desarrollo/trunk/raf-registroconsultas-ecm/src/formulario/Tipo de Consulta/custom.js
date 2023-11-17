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
				$("#form").ecmlib();	
		
	} //Fin del Edit
};