/**
 * Codigo: RAF07-PrincipiosActivos.async
 * Descripcion: Consulta los principios Activos a QAD.
 */
function defineStructure() {
	addColumn("cod"); 
	addColumn("descr"); 
	setKey(["cod"]);
	addIndex(["cod"]);
}

function onSync(lastSyncDate) {
	var newDataset = DatasetBuilder.newDataset(); 
	
	newDataset.addColumn("cod"); 
	newDataset.addColumn("descr"); 

	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
		
	var dominio = arq.prop.get("RAF07.QAD.domain");
	var drogas = arq.prop.get("RAF07.QAD.drogas");
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var serviceLocator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var arrayProductosAdicionales = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfproductos_adicionales_opttpRowHolder");	
	var servicioQAD = serviceLocator.getws_bpmObj();
	
	var arrayCodeFind = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfcode_find_opttRowHolder");	
	servicioQAD.code_find(dominio,drogas,arrayCodeFind);
	log.error("size:  " + arrayCodeFind.value.length);
	for (i = 0 ; i < arrayCodeFind.value.length; i++){
		newDataset.addOrUpdateRow([
		        arrayCodeFind.value[i].getCodigo(),
		        arrayCodeFind.value[i].getDescripcion()			                      		                
		   ]);
	}
	
	return newDataset;
}

/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};

