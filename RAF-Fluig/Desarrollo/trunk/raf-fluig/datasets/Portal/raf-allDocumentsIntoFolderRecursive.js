/**
 * Dataset: raf-allDocumentsIntoFolderRecursive
 * Descripción: Devuelve todos los documentos dentro de una carpea y sus subcarpetas cumpliendo las constraints.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var rootFolder = getContraint(constraints, "folderId");
	var cts = getValidConstraints(constraints, ["folderId"]);
	setFoldersConstraintsRecursiveFrom((rootFolder ? rootFolder : 0), cts);
	cts.push(DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST));	
	
	return DatasetFactory.getDataset("document", fields, cts, sortFields);
	
}

function setFoldersConstraintsRecursiveFrom(folderId, constraints) {
	constraints.push(DatasetFactory.createConstraint("parentDocumentId", folderId, folderId, ConstraintType.SHOULD));
	var c1 = DatasetFactory.createConstraint("parentDocumentId", folderId, folderId, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentType", 1, 1, ConstraintType.MUST);	
	var c3 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST);
	var dts = DatasetFactory.getDataset("document", ["documentPK.documentId"], [c1,c2,c3], null);
	for(var i=0; i<dts.rowsCount; i++){
		setFoldersConstraintsRecursiveFrom(dts.getValue(i, "documentPK.documentId"), constraints);
	}
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function getValidConstraints(constraints, invalidConstraints) {
	if (!invalidConstraints) invalidConstraints = [];
	var cts = [];
	for (var i=0; i<constraints.length; i++) {
		var isValid = true;
		for (var j=0; j<invalidConstraints.length; j++) {
			if (constraints[i].fieldName == invalidConstraints[j]){
				isValid = false;
			}
		}
		if (isValid) cts.push(constraints[i]);
	}
	return cts;
}