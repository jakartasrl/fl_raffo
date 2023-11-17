/*
* C�digo: raf-historico-src-test
* Descripci�n: Prueba el hist�rico de una solicitud de Atenci�n de Consultas.
*/
function createDataset(fields, constraints, sortFields) {

	var c1 = DatasetFactory.createConstraint("nroSolicitud", "195", "195", ConstraintType.MUST); 
	var historico = DatasetFactory.getDataset("raf-historico-src", null, [c1], null); 
		
    return historico;
	
}