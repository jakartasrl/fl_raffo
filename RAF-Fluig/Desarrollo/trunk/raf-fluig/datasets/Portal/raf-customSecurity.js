/**
 * Dataset: raf-customSecurity.
 * Descripción: Implementa seguridad custom para formularios con el selector de grupos.
 * Requerimientos: 
 * 		# Dataset fluigSecurityBypass.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var user = getValue("WKUser");
	
	var c1 = DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", user, user, ConstraintType.MUST);
	var dtsGrupos = DatasetFactory.getDataset("colleagueGroup", ["colleagueGroupPK.groupId"], [c1], null);
	
	var consSecurity = [];
	for(var i=0; i<dtsGrupos.rowsCount; i++) {
		var groupId = dtsGrupos.getValue(i, "colleagueGroupPK.groupId");
		consSecurity.push(DatasetFactory.createConstraint("grupoCod", groupId, groupId, ConstraintType.SHOULD));
	}
	consSecurity.push(getConstraint(constraints, "datasetName"));
	consSecurity.push(DatasetFactory.createConstraint("tablename", "tablaSeguridad", "tablaSeguridad", ConstraintType.MUST));
	
	var dtsDocumentIds = DatasetFactory.getDataset("fluigSecurityBypass", ["documentid"], consSecurity, null);
	
	var cons = [];
	for(var i=0; i<(constraints ? constraints.length : 0); i++) {
		cons.push(constraints[i]);
	}
	for(var i=0; i<dtsDocumentIds.rowsCount; i++) {
		var documentid = dtsDocumentIds.getValue(i, "documentid");
		cons.push(DatasetFactory.createConstraint("documentid", documentid, documentid, ConstraintType.SHOULD));
	}
	// Consultar a SF el porque de la linea abajo
	cons.push(DatasetFactory.createConstraint("documentid", "1", "1", ConstraintType.SHOULD));
	
	return DatasetFactory.getDataset("fluigSecurityBypass", fields, cons, sortFields);
}

function getConstraint(constraints, fieldName) {
	if(constraints != null){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i];
			}
		}
	}
	return "";
}