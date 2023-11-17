/**
* Descripción: Prueba la integracion con QAD-Parametros
*/
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("cod"); 
	dataset.addColumn("descr"); 
//	dataset.addColumn("marca"); 
//	dataset.addColumn("prActivos"); 
//	dataset.addColumn("tipoProd"); 
//	dataset.addColumn("grupoProd"); 
//	dataset.addColumn("pais"); 
	try{
			
//		var dominio = arq.prop.get("RAF07.QAD.domain");
		
		
		var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
		var serviceLocator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
		var arrayProductosAdicionales = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfproductos_adicionales_opttpRowHolder");	
		var servicioQAD = serviceLocator.getws_bpmObj();
//		servicioQAD.productos_adicionales("RFMV",arrayProductosAdicionales);
//		log.error("Probandoooooooooo");
//		log.error("size:  " + arrayProductosAdicionales.value.length);
//		for (i = 0 ; i < arrayProductosAdicionales.value.length; i++){
//			dataset.addRow([
//			        arrayProductosAdicionales.value[i].getCodigo(),
//			        arrayProductosAdicionales.value[i].getDescripcion(),
//			        arrayProductosAdicionales.value[i].getMarca(),
//			        arrayProductosAdicionales.value[i].getDroga(),
//			        arrayProductosAdicionales.value[i].getTipoP(),
//			        arrayProductosAdicionales.value[i].getGrupo(),
//			        arrayProductosAdicionales.value[i].getPais()		               		                
//			   ]);
//		}
		var arrayCodeFind = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfcode_find_opttRowHolder");	
		servicioQAD.code_find("RFMV","FORM_FARM",arrayCodeFind);
		log.error("Probandoooooooooo");
		log.error("size:  " + arrayCodeFind.value.length);
		for (i = 0 ; i < arrayCodeFind.value.length; i++){
			dataset.addRow([
			        arrayCodeFind.value[i].getCodigo(),
			        arrayCodeFind.value[i].getDescripcion()			                      		                
			   ]);
		}
		
		
	}catch(ex){		
		dataset.addRow(["ERROR",ex]);
	}
	return dataset; 
}