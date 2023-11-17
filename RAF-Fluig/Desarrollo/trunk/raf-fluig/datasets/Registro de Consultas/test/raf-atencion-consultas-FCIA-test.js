/*
* Código: raf-atencion-consultas-FCIA-test
*/
function createDataset(fields, constraints, sortFields) {

	var cts = [
	    DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST),
		DatasetFactory.createConstraint("fechaInicioSolicitud", "2018-08-01", "2018-12-31", ConstraintType.MUST),
		//DatasetFactory.createConstraint("padre_origen", "%WEB%", "%WEB%", ConstraintType.SHOULD),
		//DatasetFactory.createConstraint("aten_derivacion", "%Farmacovigilancia%", "%Farmacovigilancia%", ConstraintType.SHOULD),
	];
//	cts[2].setLikeSearch(true);
//	cts[3].setLikeSearch(true);
	var dts = DatasetFactory.getDataset("raf-atencion-consultas-FCIA", null, cts, null); 
    return dts;

}