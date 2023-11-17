function displayFields(form,customHTML){
	var matricula = getValue("WKUser");
	form.setValue("matricula", matricula);
	arqForms(form, customHTML); 
}

function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}