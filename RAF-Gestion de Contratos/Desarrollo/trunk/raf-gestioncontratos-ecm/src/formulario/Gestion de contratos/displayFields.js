function displayFields(form,customHTML){
	arqForms(form, customHTML); 
	agregarDocumentosAsociados(form, customHTML);
}
function arqForms(form,customHTML) { 
		customHTML.append("<script type='text/javascript'>");
		customHTML.append("if (arqForms && arqForms.initForm) {");
		customHTML.append("arqForms.initForm('" +form.getFormMode() + "')"); 
		customHTML.append("}</script>"); 		
}

function agregarDocumentosAsociados(form,customHTML) { 

	if (form.getValue("documentoAsociadoNombre1___1") == null){

		//Busco fichas activas 
		var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
		var constraints = new Array(c1); 
		var sortingFields = new Array("doc_codigo");
		
		var dsDoc = DatasetFactory.getDataset("raf-documentos-asociados", null, constraints, sortingFields); 
	
		if (form.getFormMode() == "ADD" || form.getFormMode() == "MOD") { 
			customHTML.append("<script type='text/javascript'>"); 			
			customHTML.append("agregarDocumentosAsociados(["); 
			for(i = 0; i < dsDoc.rowsCount; i++) { 
				customHTML.append("'");			
				customHTML.append(dsDoc.getValue(i,"doc_descripcion"));			
				if(dsDoc.rowsCount != i){
					customHTML.append("',");			
				}
			}
			customHTML.append("]);"); 			
			customHTML.append("</script>"); 
		}		
	}
}