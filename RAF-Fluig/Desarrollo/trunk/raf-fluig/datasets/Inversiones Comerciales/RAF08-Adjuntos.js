function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("documentid");
	newDataset.addColumn("version");
	newDataset.addColumn("description");
	newDataset.addColumn("fileName");

	log.info("RAF08-Adjuntos constraints nroSolicitud: " + getContraint(constraints, "nroSolicitud"));
	
	var nroSolicitud = getContraint(constraints, "nroSolicitud") != ""? getContraint(constraints, "nroSolicitud").initialValue : "0";
	
	log.info("RAF08-Adjuntos nroSolicitud: " + nroSolicitud);
	
	if(nroSolicitud != "0" && nroSolicitud != ""){
		
		var c01 = DatasetFactory.createConstraint("workflowProcessPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
		var workflowProcessDataset = DatasetFactory.getDataset("workflowProcess", null, [c01], null);
	
		var attachmentSeqId = workflowProcessDataset.getValue(0, "attachmentSeqId");
		
		log.info("RAF08-Adjuntos workflowProcess: " + attachmentSeqId);
	
		var c02 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
		var c03 = DatasetFactory.createConstraint("processAttachmentPK.attachmentSequence", attachmentSeqId, attachmentSeqId, ConstraintType.MUST); 
		var processAttachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c02,c03], null);
		var fichaDocumentId = processAttachmentDataset.getValue(0, "documentId");
		
		var sortingFields = ["documentId", "version"];
		var c04 = DatasetFactory.createConstraint("documentId", fichaDocumentId, fichaDocumentId, ConstraintType.MUST_NOT);
		var c05 = DatasetFactory.createConstraint("processAttachmentPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
		var attachmentDataset = DatasetFactory.getDataset("processAttachment", null, [c04,c05], sortingFields);
		
		for(var i=0; i<attachmentDataset.rowsCount; i++){
			
			var documentId = attachmentDataset.getValue(i,"documentId");
		
			var c06 = DatasetFactory.createConstraint("documentPK.documentId", documentId, documentId, ConstraintType.MUST);
			var c07 = DatasetFactory.createConstraint("activeVersion", 'true', 'true', ConstraintType.MUST); 	
		
			var documentDataset = DatasetFactory.getDataset("document", ["documentPK.version","documentDescription","phisicalFile"], [c06,c07], null);
			
			var version = documentDataset.getValue(0, "documentPK.version");
			var description = documentDataset.getValue(0, "documentDescription");
			var fileName = documentDataset.getValue(0, "phisicalFile");
				
			newDataset.addRow(new Array(documentId, version, description, fileName));
	
		}
	}

	return newDataset;
	
}		
	
function getContraint(constraints, fieldName) {
	if(constraints != null){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i];
			}
		}
	}
	return "";
}