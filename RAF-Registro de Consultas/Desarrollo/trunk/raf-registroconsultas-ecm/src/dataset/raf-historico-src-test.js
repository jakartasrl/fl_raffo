/*
* Código: raf-historico-src-test
* Descripción: Prueba el histórico de una solicitud de Atención de Consultas.
*/
function createDataset(fields, constraints, sortFields) {

	var c1 = DatasetFactory.createConstraint("nroSolicitud", "195", "195", ConstraintType.MUST); 
	var historico = DatasetFactory.getDataset("raf-historico-src", null, [c1], null); 
		
    return historico;
	
}