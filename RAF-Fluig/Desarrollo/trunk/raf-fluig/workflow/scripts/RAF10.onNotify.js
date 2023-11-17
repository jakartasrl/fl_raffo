function onNotify(subject, receivers, template, params){

	log.info("*****Ejecutando RAF10.onNotify(" + subject + ", " + receivers + ",  " + template + " , " + params + ");");
	
	if(template == "TPLCOMPLEMENT_AUTHORITY_TO_SUBSTITUTE" ||
			template == "TPLCOMPLEMENT_MANAGER_TO_SUBSTITUTE" ||
			template == "TPLCOMPLEMENT_REQUISITIONER_TO_SUBSTITUTE" ||
			template == "TPLCOMPLEMENT_AUTHORITY" ||
			template == "TPLCOMPLEMENT_MANAGER" ||
			template == "TPLCOMPLEMENT_REQUISITIONER" ||
			template == "TPLDOCUMENT_WATCH_MODIFY_CONTENT" ||
			template == "TPLDOCUMENT_MEETING_ENDED" ||
			template == "TPLDOCUMENT_MEETING_CREATED" ||
			template == "TPLDOCUMENT_VERSION_REMOVED_YOU_APPROVED" ||
			template == "TPLDOCUMENT_YOU_APPROVED_BEFORE_NEW_VERSION" ||
			template == "TPLDOCUMENT_ALL_VERSION_REMOVED" ||
			template == "TPLDOCUMENT_YOUR_RESPONSABILITY_WILL_EXPIRE" ||
			template == "TPLDOCUMENT_UPDATED_SUBJECT_INTEREST" ||
			template == "TPLDOCUMENT_REMOVED_SUBJECT_INTEREST" ||
			template == "TPLDOCUMENT_GROUPED_REPROVED" ||
			template == "TPLDOCUMENT_REPROVED" ||
			template == "TPLDOCUMENT_GROUPED_APPROVED" ||
			template == "TPLDOCUMENT_APPROVED" ||
			template == "TPLDOCUMENT_APPROVAL_PENDING" ||
			template == "TPLATTACHMENT_AUTHORITY_TO_SUBSTITUTE" ||
			template == "TPLATTACHMENT_MANAGER_TO_SUBSTITUTE" ||
			template == "TPLATTACHMENT_REQUISITIONER_TO_SUBSTITUTE" ||
			template == "TPLATTACHMENT_AUTHORITY" ||
			template == "TPLATTACHMENT_MANAGER" ||
			template == "TPLATTACHMENT_REQUISITIONER" ||
			template == "TPLUPDATE_ATTACHMENT_REQUISITIONER" ||
			template == "TPLUPDATE_ATTACHMENT_AUTHORITY_TO_SUBSTITUTE" ||
			template == "TPLUPDATE_ATTACHMENT_MANAGER_TO_SUBSTITUTE" ||
			template == "TPLUPDATE_ATTACHMENT_REQUISITIONER_TO_SUBSTITUTE" ||
			template == "TPLUPDATE_ATTACHMENT_AUTHORITY" ||
			template == "TPLNEW_DOCUMENT_SUBJECT_INTEREST" ||
			template == "TPLNEW_DOCUMENT_VERSION_SUBJECT_INTEREST" ||
			template == "TPLTPLDOCUMENT_VERSION_REMOVED" ||
			template == "TPLBOARDSDOCUMENTAPPROVED" ||
			template == "TPLBOARDSDOCUMENTREPROVED" ||
			template == "TPLOVERDUE_TASK_TO_MANAGER" ||
			template == "TPLPROCESS_COMPLETED_TO_REQUESTER"){ 
		
		log.info("***** RAF10.onNotify:" + template + " eliminando receivers.." + receivers);
		receivers.clear();
		log.info("***** RAF10.onNotify: " + template + " receivers eliminados..");
	}
	
	log.info("*****Fin Ejecucion RAF10.onNotify con receivers: " + receivers);
}

