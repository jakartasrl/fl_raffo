/**
 * Codigo: raf-sectores
 * Descripcion: Consulta de Sectores al ERP.
 */
function createDataset(fields, constraints, sortFields) { 
	
	var provider = ServiceManager.getServiceInstance("RAF-WS-ERP");
	var locator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var service = locator.getws_bpmObj();
	
	var newDataset = DatasetBuilder.newDataset(); 
	newDataset.addColumn("codigo"); 
	newDataset.addColumn("nombre"); 
	
	var result = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfbuscarSectores_opttRowHolder");	      	                       
	
	service.buscarSectores("mverde",result);
	
	for (var i=0; i<result.value.length; i++) {
		var sector = result.value[i];
		newDataset.addRow(new Array(sector.getCodigo(), sector.getNombre())); 	
	}
	
	return newDataset;
	
}