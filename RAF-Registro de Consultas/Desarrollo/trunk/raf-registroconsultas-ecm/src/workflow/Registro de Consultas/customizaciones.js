function proximoNumero(codigoNumerador) {
	
	var currentDate = new Date();
	var year = currentDate.getFullYear();

	codigoNumerador = codigoNumerador + "_" + year;
	
	
    var connection, preparedStatement, resultSet;
    var proximoNumero = 0;

    try {

		connection = new javax.naming.InitialContext().lookup("jdbc/webdeskDS").getConnection();   
		
		preparedStatement = connection.prepareStatement("SELECT CODIGO, PROXIMONUMERO FROM CUSTOM_NUMERADOR WITH (UPDLOCK) WHERE CODIGO = ? ", java.sql.ResultSet.TYPE_SCROLL_SENSITIVE, java.sql.ResultSet.CONCUR_UPDATABLE);
		preparedStatement.setString(1, codigoNumerador);
		resultSet = preparedStatement.executeQuery();
	 
		if (resultSet.next()) {
	
			proximoNumero = resultSet.getLong("PROXIMONUMERO");
			resultSet.updateLong("PROXIMONUMERO", proximoNumero + 1);
			resultSet.updateRow();
				
		}               
		
	  } finally {
	    if (preparedStatement != null) { preparedStatement.close(); }
        if (connection != null) { connection.close(); }
    }

    return proximoNumero + "/" + year;

}

/*
 * Envia un correo "custom" en base a un layout registrado a una lista de mails destino.
 * 
 * El parametro mailsDestino tiene que se un array de correos electronicos.
 * El parametro data tiene que se un Map con los parametros pasados al layout
 *
 */
function enviarCorreoCustom(companyId, mailsDestino, subject, idTemplate, archivoTemplate, mimeType, data) {

	var globalParamBIClazz = java.lang.Class.forName("com.datasul.technology.webdesk.foundation.business.GlobalParamBI");
	var globalParamPK = new com.datasul.technology.webdesk.foundation.model.GlobalParamPK(companyId);
	var globalParamBI = com.datasul.technology.webdesk.util.ServiceLocator.getInstance().locate(globalParamBIClazz);
	var globalParam = globalParamBI.read(globalParamPK);

	// Agrego Parametros necesarios para el layout	
	data.put("WDK_VirtualDir", globalParamBI.getWebdeskURL(companyId) + "/" + globalParam.getVirtualFolder());
	data.put("WDK_CompanyId", companyId);	
	
	var from = "procesobpm@raffo.com.ar";
	var templateDir = globalParam.getTemplatesFolder() + "/tplmail/" + idTemplate + "/es";
	var mailSender = com.datasul.technology.webdesk.util.EMailSenderFactory.getEMailSender();

	var huboError = false;
	var msgError = "";
	
	for(var i = 0; i < mailsDestino.length; i++) { 
		var to = mailsDestino[i];
		try {
			mailSender.customEmail(subject, from, to, templateDir, archivoTemplate,mimeType,data);
		} catch (ex) {
			msgError = "Error enviando mail a '" + to + "' :" + ex.message; 
			log.error(msgError);
			// Guardo el ultimo error
			huboError = true;			
		}
		
	}
	
	if (huboError) {
		throw msgError;
	}
		
}
