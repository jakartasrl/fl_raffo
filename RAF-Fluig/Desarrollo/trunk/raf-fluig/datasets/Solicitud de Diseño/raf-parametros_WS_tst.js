/**
* Código: raf-observaciones-test
* Descripción: Prueba la integracion con QAD
*/
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("rta1");
	dataset.addColumn("rta2");
	
	try{
		var nroSolicitud = "123";
		var codigoUsuario = "JSIFUENTES";
		var title = "prueba";
		var motivo = "prueba"; 
	//	hAPI.getCardValue("comments")  ;
//		var fechaCorte = "2019-04-01";   
//		var fechaCorte = new java.text.SimpleDateFormat("yyyy-MM-dd").parse("31/12/2009");
	//	var fechaCorte = format.parse ( "2009-12-31" );   
		var fechaCorte = new java.util.Date("2019-04-03");
		var estado = "APROBADA";
		var desc = "Prueba";
		var file = "Prueba";
		var desc = "Prueba";
		var ipiLine = "1";
		var rta1 = new javax.xml.rpc.holders.StringHolder;
		var rta2 = new javax.xml.rpc.holders.StringHolder;
		var date = fechaCorte ;
		var dateAc = fechaCorte;
		var implementationType = "Test";
		var provider = ServiceManager.getServiceInstance("RAF-QAD");
		var serviceLocator = provider.instantiate("ws_vyf.qad.Ws_vyfServiceLocator");
		var servicioQAD = serviceLocator.getws_vyfObj();
		
		servicioQAD.vyfsolicitud("RFMV",nroSolicitud,ipiLine,codigoUsuario,date,title,motivo,estado,dateAc,fechaCorte,desc,file,implementationType,rta1,rta2);
	
		dataset.addRow([rta1.value,rta2.value]);
	}catch(ex){		
		dataset.addRow(["ERROR",ex]);
	}
	return dataset; 
}