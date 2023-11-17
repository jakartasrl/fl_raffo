/**
 * Codigo: RAF07-Productos.async
 * Descripcion: Consulta los productos a QAD.
 */
function defineStructure() {
	addColumn("cod"); 
	addColumn("descr"); 
	addColumn("marca"); 
	addColumn("prActivos"); 
	addColumn("tipoProd"); 
	addColumn("grupoProd"); 
	addColumn("pais");
	addColumn("presentacion");
	setKey(["cod"]);
	addIndex(["cod"]);
}

function onSync(lastSyncDate) {
	var newDataset = DatasetBuilder.newDataset(); 
	
	newDataset.addColumn("cod"); 
	newDataset.addColumn("descr"); 
	newDataset.addColumn("marca"); 
	newDataset.addColumn("prActivos"); 
	newDataset.addColumn("tipoProd"); 
	newDataset.addColumn("grupoProd"); 
	newDataset.addColumn("pais"); 
	newDataset.addColumn("presentacion"); 
	
	var arq = arqMarvinLoad("v1", {
		prop: "com.arquimeda.marvin.server.js.Properties-v1"
	});
	arq.prop.load({
		datasetName: "parametros"
	});
		
	var dominio = arq.prop.get("RAF07.QAD.domain");
	var provider = ServiceManager.getServiceInstance("RAF-QAD-PAR");
	var serviceLocator = provider.instantiate("ws_bpm.qad.Ws_bpmServiceLocator");
	var arrayProductosAdicionales = provider.instantiate("ws_bpm.ws_bpm.qad.holders.ArrayOfproductos_adicionales_opttpRowHolder");	
	var servicioQAD = serviceLocator.getws_bpmObj();
	servicioQAD.productos_adicionales(dominio,arrayProductosAdicionales);
	log.error("size:  " + arrayProductosAdicionales.value.length);
	for (i = 0 ; i < arrayProductosAdicionales.value.length; i++){
		newDataset.addOrUpdateRow([
		        arrayProductosAdicionales.value[i].getCodigo(),
		        arrayProductosAdicionales.value[i].getDescripcion(),
		        arrayProductosAdicionales.value[i].getMarca(),
		        arrayProductosAdicionales.value[i].getDroga(),
		        arrayProductosAdicionales.value[i].getTipoP(),
		        arrayProductosAdicionales.value[i].getGrupo(),
		        arrayProductosAdicionales.value[i].getPais(),
		        arrayProductosAdicionales.value[i].getPresentacion()
		   ]);
	}
	
	return newDataset;
}


/*! arqMarvinLoad - v1 - All rights reserverd */
function arqMarvinLoad(a,h){var b={};if(h==null){return b}var d=new javax.naming.InitialContext().lookup("java:global/arq-marvin-"+a+"/MarvinLibLoaderEJB");for(var c in h){try{var g=new Function("lib","return "+d.getLib(h[c]));b[c]=g(b)}catch(i){log.error("*** Error compilando libreria "+lib+":"+i)}}return b};
