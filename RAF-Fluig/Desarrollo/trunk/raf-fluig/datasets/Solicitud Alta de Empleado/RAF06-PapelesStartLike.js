/*
	Código: RAF06-PapelesStartLike
	Descripción: Devuelve todos los papales cuyos código comiencen con lo que se pasa por parámetro.
*/

function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo");	
	newDataset.addColumn("descripcion");
	
	var roleLike = getConstraint(constraints, "roleLike").initialValue;	
	var datasetPapeles = DatasetFactory.getDataset("workflowRole", null, [], null);
			
	for(var i = 0; i < datasetPapeles.rowsCount; i++) {
		var codigo = datasetPapeles.getValue(i, "workflowRolePK.roleId");
		
		if(new java.lang.String(codigo).startsWith(roleLike)){
			
			var descripcion = datasetPapeles.getValue(i, "roleDescription");
			newDataset.addRow([codigo, descripcion]);
		}
	}
	return newDataset;

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