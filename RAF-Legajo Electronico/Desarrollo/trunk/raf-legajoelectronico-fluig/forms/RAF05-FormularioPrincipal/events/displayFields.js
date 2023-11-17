function displayFields(form,customHTML){
	
	var matricula = getValue("WKUser");
	
	//seteo los datos en el formulario
    if(form.getValue("matriculaSolicitante") == ""){
        form.setValue("matriculaSolicitante", matricula);
    }  
	
	if (form.getValue('fechaRelevamientoPerfil') == '') {
		var sdf = new java.text.SimpleDateFormat('dd/MM/yyyy');
		form.setValue('fechaRelevamientoPerfil', sdf.format(new java.util.Date()));
	}
	
	
	
	
	arqForms(form, customHTML); 
}
function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}