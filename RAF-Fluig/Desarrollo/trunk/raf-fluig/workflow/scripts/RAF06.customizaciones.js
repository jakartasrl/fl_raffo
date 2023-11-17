function sendCustomEmail(params) {
 
	var mimeType = "text/html", 
	    data = new java.util.HashMap(), 
	    separador = java.io.File.separator,
	    globalParam = new javax.naming.InitialContext().lookup("java:global/fluig/ecm-ejb/wdk/GlobalParam"),
	    templatesFolder = globalParam.read(params.companyId).getTemplatesFolder() + separador + "tplmail" + separador + params.templateId + separador + params.templateDialect,
	    sdk = new javax.naming.InitialContext().lookup("java:global/fluig/wcm-core/service/SDK");
	  
	 // Valores default
	data.put("SERVER_URL", sdk.getServerURL());
	data.put("SERVER_EXTERNAL_URL", sdk.getServerContextURL());
	data.put("SERVER_PROTECTED_URL", sdk.getProtectedTenantContextPath());
	data.put("COMPANY_ID", params.companyId);
	data.put("TENANT_ID",sdk.getCurrentTenantID());
	 
	// Copio datos propios del template
	if (params.datos) {
		for(param in params.datos) {
			data.put(param, params.datos[param]);
		}
	}
	 
	com.fluig.foundation.mail.EMailSenderFactory.getEMailSender().customEmail(new java.lang.Long(params.companyId), params.subject, params.from, params.to, templatesFolder, params.templateHtml, mimeType, data);
	log.info("**** Mail enviado a: "+ params.to);
	
}

function existeColleague(constraintrKey, constraintValue){
	 
	var c1 = DatasetFactory.createConstraint(constraintrKey, constraintValue, constraintValue, ConstraintType.MUST);
	 var dts = DatasetFactory.getDataset("colleague", null, [c1], null);
	 
	 return dts.rowsCount > 0;
}

function existeCarpetaLegajo(legajo){
	 
	var arq = arqMarvinLoad("v1", {
	  prop: "com.arquimeda.marvin.server.js.Properties-v1"
	 });
	 arq.prop.load({
	  datasetName: "parametros"
	 });
	 
	 var carpetaLegajosId = arq.prop.get("RAF06.carpetaLegajos.docId");
	 
	 var c1 = DatasetFactory.createConstraint("parentDocumentId", carpetaLegajosId, carpetaLegajosId, ConstraintType.MUST);
	 var c2 = DatasetFactory.createConstraint("documentDescription", "%"+legajo+" ", "%"+legajo+" ", ConstraintType.MUST);
	 
	 c2.setLikeSearch(true);
	 
	 var dts = DatasetFactory.getDataset("document", null, [c1,c2], null);
	 
	 return (dts.rowsCount > 0 ? dts.getValue(0, "documentPK.documentId") : false);
}

function corregirCamposFecha(nombreCampo){
	 
	 if (hAPI.getCardValue(nombreCampo) != null && hAPI.getCardValue(nombreCampo) != ""){
	  var fechaArray = hAPI.getCardValue(nombreCampo).split("/");
	  if (fechaArray.length > 1) {
	   hAPI.setCardValue(nombreCampo, fechaArray[2]+"-"+fechaArray[1]+"-"+fechaArray[0]);
	   log.error("*** Fue modificado el campo " + nombreCampo + " valor: " + hAPI.getCardValue(nombreCampo) + " solicitud: " + hAPI.getCardValue("nroSolicitud"));
	  }  
	 }
	 
	}

function getCodigoDeCarpetaLugarPagoODeGrupoAdmin(userId,flag){

	var sitioEmpleado = hAPI.getCardValue("lugarPago");
	 var c1 = DatasetFactory.createConstraint("descripcion",sitioEmpleado,sitioEmpleado, ConstraintType.MUST);
	 var dataset = DatasetFactory.getDataset("RAF05-Sedes", ["codigoCarpeta","codigoGrupoAdministrador"] , [c1], null);
	 /*
	  * Aparentemente si el flag es uno se devuelve el valor de la carpeta donde se guardan cosas de una sede
	  * Si es distinto de uno entonces devuelve el codigoGrupoAdministrador q esun grupo que tiene permiso especial en la carpeta de una sede
	  * No lo toco porque el proceso es lo suficientemente complejo, pero espero que este comentario te haya ayudado
	  * */
	 if(flag == 1){
	  log.error("*** Codigo carpeta:  " + dataset.getValue(0, "codigoCarpeta"));
	  return dataset.getValue(0, "codigoCarpeta");  
	 }
	 else{
	  if(dataset.rowsCount > 0) {
	   log.error("*** Codigo grupo admin:  " + dataset.getValue(0, "codigoGrupoAdministrador"));
	   if ((dataset.getValue(0, "codigoGrupoAdministrador") == null) || (dataset.getValue(0, "codigoGrupoAdministrador") == "")){
	    log.error("*** Codigo grupo admin esta vacio");
	    return null;
	   }
	   return dataset.getValue(0, "codigoGrupoAdministrador");   
	  }
	  else{
	   return null;
	  }
	 }

}

function actualizarAprobador(codigoGrupo,codigoCarpeta,approverType){
	 var jndiName = "java:/jdbc/FluigDS";
	 var conn = null;
	 var pstmt;
	 try {  
	  
	  conn = new javax.naming.InitialContext().lookup(jndiName).getConnection();
	  
	 // var sql = "UPDATE [dbo].[APROVADOR] SET [CD_MATRICULA] = \"" + codigoGrupo + "\" WHERE [NR_DOCUMENTO] = " + codigoCarpeta + ";" ;
	 // var sql2 = "UPDATE [dbo].[NIVEL_APROVACAO] SET [IDI_TIP_APROVAC] = " + approverType + " WHERE [NR_DOCUMENTO] = " + codigoCarpeta + ";";
	  
	  var sql = "UPDATE [dbo].[APROVADOR] SET [CD_MATRICULA] = ? WHERE [NR_DOCUMENTO] = ?" ;
	  
	  pstmt = conn.prepareStatement(sql);     
	  pstmt.setString(1,codigoGrupo);
	  pstmt.setInt(2,codigoCarpeta);
	  
	  pstmt.executeUpdate();     
	  
	 } catch (ex) {
	  
		 log.error("actualizarAprobador: " + ex);
		 
	    } finally {
	        if (pstmt != null) { pstmt.close(); }
	        if (conn != null) { conn.close(); }
	    }


}

function getUserList(codigoGrupo){

    var userList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', codigoGrupo, codigoGrupo, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset('colleagueGroup', null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var colleagueId = dataset.getValue(i, 'colleagueGroupPK.colleagueId');            
      userList.add(colleagueId);
    }
	
	return new java.util.ArrayList(userList);
	
}

function getMailList(colleagueId){

    var mailList = new java.util.HashSet(); 
    var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST);          
    var dataset = DatasetFactory.getDataset('colleague', null, [c1], null);

	for(var i = 0; i < dataset.rowsCount; i++) {         
      var mail = dataset.getValue(i, 'mail');            
      mailList.add(mail);
    }
	
	return new java.util.ArrayList(mailList);
	
}