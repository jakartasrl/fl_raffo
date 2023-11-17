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
