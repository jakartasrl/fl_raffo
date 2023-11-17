/**
 * Codigo: raf-proyectos
 * Descripcion: Consulta de Proyectos al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("descripcion"); 
	newDataset.addColumn("activo"); 
		
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarProyectos_opttRowHolder");	      	                       
	
	service.buscarProyectos("RAFFO",result);
	
	for (var i=0; i<result.value.length; i++) {
		var proyecto = result.value[i];
		newDataset.addRow(new Array(proyecto.getCodigo(), proyecto.getDescripcion(), proyecto.getActivo())); 	
	}
	
	return newDataset;
	
}