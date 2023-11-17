/**
 * Dataset: RAF05-FormularioPrincipal-filtered
 * Descripción: Muestra las solicitudes iniciadas por el usuario según los grupos en que esté.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var matriculaSolicitante = getContraint(constraints, "matriculaSolicitante");
	var ingresoPersonalOpts = getContraint(constraints, "ingresoPersonalOpts").split(",");
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("matriculaSolicitante", matriculaSolicitante, matriculaSolicitante, ConstraintType.MUST);
	c2.setLikeSearch(true);
	var cts = [c1,c2];
	
	for (i=0; i<ingresoPersonalOpts.length; i++){
	
		cts.push(DatasetFactory.createConstraint("ingresoPersonal", ingresoPersonalOpts[i], ingresoPersonalOpts[i], ConstraintType.SHOULD));
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