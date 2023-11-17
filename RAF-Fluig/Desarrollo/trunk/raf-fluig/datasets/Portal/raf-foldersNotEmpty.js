/**
 * Dataset: raf-foldersNotEmpty
 * Descripción: Devuelve todas las carpetas no vacías cumpliendo las constraints.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var cts = [];
	for(var i=0; i<constraints.length; i++){
		cts.push(constraints[i]);
	}
	
	var c1 = DatasetFactory.createConstraint("documentType", 1, 1, ConstraintType.MUST);	
	cts.push(c1);
	
	var datasetFolders = DatasetFactory.getDataset("raf-allDocumentsIntoFolderRecursive", fields, cts, sortFields);
	
	for(var j=0; j<datasetFolders.rowsCount; j++){
		var c1 = DatasetFactory.createConstraint("parentDocumentId", datasetFolders.getValue(j,"documentPK.documentId"), datasetFolders.getValue(j,"documentPK.documentId"), ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("approved", "true", "true", ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("documentType", 2, 2, ConstraintType.MUST);		
		var dtsChilds = DatasetFactory.getDataset("document", null, [c1,c2,c3,c4], null);
		if(dtsChilds.rowsCount==0){
			cts.push(DatasetFactory.createConstraint("documentPK.documentId", datasetFolders.getValue(j,"documentPK.documentId"), datasetFolders.getValue(j,"documentPK.documentId"), ConstraintType.MUST_NOT));
		}
	}
	
	return DatasetFactory.getDataset("raf-allDocumentsIntoFolderRecursive", fields, cts, sortFields);
	
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}
