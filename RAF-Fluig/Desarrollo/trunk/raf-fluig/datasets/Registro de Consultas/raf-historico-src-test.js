/*
* C�digo: raf-historico-src-test
* Descripci�n: Prueba el hist�rico de una solicitud de Atenci�n de Consultas.
*/
function createDataset(fields, constraints, sortFields) {

	var c1 = DatasetFactory.createConstraint("nroSolicitud", "4902", "4902", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("documentId", "18301", "18301", ConstraintType.MUST); 
	var historico = DatasetFactory.getDataset("raf-historico-src", null, [c1,c2], null); 
		
    return historico;
	
}