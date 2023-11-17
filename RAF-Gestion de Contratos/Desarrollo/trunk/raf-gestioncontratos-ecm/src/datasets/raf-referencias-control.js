/**
 * Codigo: raf-referencias-control
 * Descripcion: Listado de referencias de control de contratos.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("referenciaControl"); 

	newDataset.addRow(new Array("Por Cantidad")); 	
	newDataset.addRow(new Array("Por Monto Total de la Compra")); 
	newDataset.addRow(new Array("Por Precio Unitario de Cada Ítem")); 
	
	return newDataset;
	
}