/**
	Código: RAF06-ColleagueMailsFromRole
	Descripción: Devuelve todos los usuarios que pertenecen a un papel pasado por parámetro.
*/

function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("mail");	

	var roleId = getConstraint(constraints, "roleId").initialValue;
	var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", roleId, roleId, ConstraintType.MUST);
	var dtsUsersOfRole = DatasetFactory.getDataset("workflowColleagueRole", null, [c1], null);
			
	for(var i = 0; i < dtsUsersOfRole.rowsCount; i++) {
		var colleagueId = dtsUsersOfRole.getValue(i, "workflowColleagueRolePK.colleagueId");
		var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST);
		var datasetColleague = DatasetFactory.getDataset("colleague", null, [c2], null);
		
		var mail = datasetColleague.getValue(0, "mail");
		newDataset.addRow([mail]);
	}

	return newDataset.rowsCount!=0 ? newDataset : false;

}

function getConstraint(constraints, fieldName) {
	if(constraints != null){
		for (var i=0; i<constraints.length; i++){
			if (constraints[i].fieldName == fieldName){
				return constraints[i];
			}
		}
	}
	return {fieldName: 'noConstraint', initialValue: ''};
}