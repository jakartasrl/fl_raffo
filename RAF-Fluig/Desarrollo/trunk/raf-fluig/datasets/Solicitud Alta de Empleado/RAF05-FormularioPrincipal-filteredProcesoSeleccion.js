/**
 * Dataset: RAF05-FormularioPrincipal-filteredProcesoSeleccion
 * Descripción: Muestra las solicitudes iniciadas por el usuario según los grupos en que esté
*/
function createDataset(fields, constraints, sortFields) { 
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("tarea", "REALIZAR PROCESO DE SELECCION", "REALIZAR PROCESO DE SELECCION", ConstraintType.MUST);
	var cts = [c1,c2];
	
	for (var i=0; i<constraints.length; i++){
		cts.push(constraints[i]);
	}
	
	var dts = DatasetFactory.getDataset("RAF05-FormularioPrincipal", fields, cts, sortFields);
	return dts;
}

function getContraint(constraints, fieldName) {
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName == fieldName){
			return constraints[i].initialValue;
		}
	}
	return "";
}