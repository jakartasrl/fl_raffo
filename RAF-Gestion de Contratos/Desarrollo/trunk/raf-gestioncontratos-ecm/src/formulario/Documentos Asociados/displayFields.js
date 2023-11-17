function displayFields(form,customHTML){
	arqForms(form, customHTML); 
}
function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}

