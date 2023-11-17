/*
 * Consulta el dataset RAF07-Motivo y devuelve los motivos según el grupo del usuario.
 */
function createDataset(fields, constraints, sortFields) {
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn('reasonGroup');
	newDataset.addColumn('reasonName');
	newDataset.addColumn('avisoAceptacion');
	newDataset.addColumn('avisoGeneracion');
	newDataset.addColumn('avisoRevision');
	newDataset.addColumn('visualizaReporte');
	newDataset.addColumn('groupType');
	newDataset.addColumn('breakDateRequired');
	
	var userGroup = getConstraint(constraints,"userGroup");
	var validConstraints = removeConstraints(constraints, ["userGroup"]);
	var datasetReasons = DatasetFactory.getDataset("RAF07-Motivos", null, validConstraints, null);

	for(var i = 0; i < datasetReasons.rowsCount; i++) {         
		var documentid = datasetReasons.getValue(i, "documentid");
		var c1 = DatasetFactory.createConstraint("tablename", "tblUserGroups", "tblUserGroups", ConstraintType.MUST); 
		var c2 = DatasetFactory.createConstraint("documentid", documentid, documentid, ConstraintType.MUST); 
		var datasetUserGroup = DatasetFactory.getDataset("RAF07-Motivos", null, [c1,c2], null);
		
		var any = false;
		for(var j = 0; j < datasetUserGroup.rowsCount; j++) {
			if (datasetUserGroup.getValue(j, "userGroupId").equals(userGroup)) {
				any = true;
				break;
			}
		}
		
		if (any) {
			var reasonGroup = datasetReasons.getValue(i, "reasonGroup");
			var c3 = DatasetFactory.createConstraint("groupName", reasonGroup, reasonGroup, ConstraintType.MUST); 
			var datasetReasonGroups = DatasetFactory.getDataset("RAF07-GruposDeMotivos", null, [c3], null);

			log.error("***  datasetReasonGroups.rowsCount: "  + datasetReasonGroups.rowsCount);
		    
			if(datasetReasonGroups.rowsCount != 0)
			{
				newDataset.addRow([
				    datasetReasons.getValue(i, "reasonGroup"),
				    datasetReasons.getValue(i, "reasonName"),
				    datasetReasons.getValue(i, "avisoAceptacion"),
				    datasetReasons.getValue(i, "avisoGeneracion"),
				    datasetReasons.getValue(i, "avisoRevision"),
				    datasetReasons.getValue(i, "visualizaReporte"),
				    datasetReasonGroups.getValue(0, "groupType"),
				    datasetReasonGroups.getValue(0, "breakDateRequired"),
				]);
			}
		}

	}
	
	return newDataset;
	
}



function getConstraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}

function removeConstraints(constraints, constraintsToRemove) {
	if (!constraintsToRemove) constraintsToRemove = [];
	var cts = [];
	for (var i=0; i<constraints.length; i++) {
		var isValid = true;
		for (var j=0; j<constraintsToRemove.length; j++) {
			if (constraints[i].fieldName == constraintsToRemove[j]){
				isValid = false;
			}
		}
		if (isValid) cts.push(constraints[i]);
	}
	return cts;
}