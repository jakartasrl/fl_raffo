/*
 * Dataset: raf-derivaciones-sorted
 * Descripcion: Derivaciones Ordenadas.
 */
function createDataset(fields, constraints, sortFields) { 
	
	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();
	newDataset.addColumn("codigo");
	newDataset.addColumn("descripcion");
	newDataset.addColumn("codigoGrupo");
	newDataset.addColumn("descripcionGrupo");

	// Define los campos para ordenacion 
	var sortingFields = new Array("descripcion");
	
	var c01 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST); 
	var constraints = new Array(c01);

	var dataset = DatasetFactory.getDataset("raf-derivaciones", null, constraints, sortingFields);
	
	//Cargo en el dataset
	for(j = 0; j < dataset.rowsCount; j++) {
	  
		var codigo = dataset.getValue(j, "codigo");
		var descripcion = dataset.getValue(j, "descripcion");
		var codigoGrupo = dataset.getValue(j, "codigoGrupo");
		var descripcionGrupo = dataset.getValue(j, "descripcionGrupo");

		newDataset.addRow(new Array(codigo, descripcion, codigoGrupo, descripcionGrupo));
	}

	return newDataset;  

}
