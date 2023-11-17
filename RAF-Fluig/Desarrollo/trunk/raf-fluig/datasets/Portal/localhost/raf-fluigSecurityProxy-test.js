/**
 * Dataset: raf-fluigSecurityProxy
 * Descripción: Se comporta como un proxy para manejar seguridad de documentos.
 * Requerimientos: 
 * 		# Debe tener seteado "securityProxy.user" y "securityProxy.pass" en el dataset "parametros".
 * 		# Crear el servcio soap: ECMDatasetService.
*/
function createDataset(fields, constraints, sortFields) { 
	
	var c1 = DatasetFactory.createConstraint("datasetName", "Carousel", "Carousel", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("target", "sameTab", "sameTab", ConstraintType.MUST);
	return DatasetFactory.getDataset("fluigSecurityBypass", [], [c1,c2], null);
	
}