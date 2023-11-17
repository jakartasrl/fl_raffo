/*
 * Dataset: raf-atencion-consultas-derivacion
 * Descripcion: Atencion de Consultas para Grupo de Derivaci?n.
 */
function createDataset(fields, constraints, sortFields) { 

	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("fechaInicioSolicitud");
	newDataset.addColumn("tarea");
	newDataset.addColumn("padre_nroSolicitud");
	newDataset.addColumn("padre_fecha");
	newDataset.addColumn("padre_hora");
	newDataset.addColumn("padre_origen");
	newDataset.addColumn("padre_nombre");
	newDataset.addColumn("padre_telefono");
	newDataset.addColumn("padre_mail");
	newDataset.addColumn("padre_direccion");
	newDataset.addColumn("padre_otro");
	newDataset.addColumn("aten_nroSolicitud");
	newDataset.addColumn("aten_nroConsulta");
	newDataset.addColumn("aten_producto");
	newDataset.addColumn("aten_activo");
	newDataset.addColumn("aten_nroLote");
	newDataset.addColumn("aten_vencimiento");
	newDataset.addColumn("aten_tipo");
	newDataset.addColumn("aten_derivacion");
	newDataset.addColumn("aten_motivoAtraso");
	newDataset.addColumn("aten_licenciante");
	newDataset.addColumn("aten_contieneEventoAdverso");
	newDataset.addColumn("aten_contieneEventoAdversoMotivo");
	newDataset.addColumn("aten_conclusion");
	newDataset.addColumn("aten_observacion");
	newDataset.addColumn("fechaFinSolicitud");
	newDataset.addColumn("horaFinSolicitud");
	newDataset.addColumn("aten_resolucion");
	newDataset.addColumn("aten_revobservacion");
	newDataset.addColumn("padre_observaciones");
	newDataset.addColumn("aten_rellamada");
	newDataset.addColumn("metadata#version");
	newDataset.addColumn("metadata#id");
	newDataset.addColumn("tareaAtrasada");
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("derivacionCodigoGrupo", "Pool:Group:RC_DER_AMED", "Pool:Group:RC_DER_AMED", ConstraintType.MUST);
	//var c3 = DatasetFactory.createConstraint("aten_conclusion", "Satisfactoria", "Satisfactoria", ConstraintType.MUST);
	//var c4 = DatasetFactory.createConstraint("aten_producto", "%INA% OR %REG%", "%INA% OR %REG%", ConstraintType.SHOULD);
	//var c5 = DatasetFactory.createConstraint("aten_producto", "%EGULI%", "%EGULI%", ConstraintType.SHOULD);
	var c6 = DatasetFactory.createConstraint("padre_origen", "%WEB%", "%WEB%", ConstraintType.SHOULD);
	var c7 = DatasetFactory.createConstraint("padre_origen", "%Contestador%", "%Contestador%", ConstraintType.SHOULD);
	
	//c4.setLikeSearch(true);
	//c5.setLikeSearch(true);
	c6.setLikeSearch(true);
	c7.setLikeSearch(true);
	
	var datasetAtenciones = DatasetFactory.getDataset("raf-atencion-consultas-derivacion", null, [c1,c2,c6,c7], null);
	
		
	for(var j = 0; j < datasetAtenciones.rowsCount; j++) {
	  
		var nroSolicitud = datasetAtenciones.getValue(j, "aten_nroSolicitud");
		
		var atrasada = isAtrasada(nroSolicitud);
		var fechaInicioSolicitud = datasetAtenciones.getValue(j, "fechaInicioSolicitud");
		var tarea = datasetAtenciones.getValue(j, "tarea");
		var padre_nroSolicitud = datasetAtenciones.getValue(j, "padre_nroSolicitud");
		var padre_fecha = datasetAtenciones.getValue(j, "padre_fecha");
		var padre_hora = datasetAtenciones.getValue(j, "padre_hora");
		var padre_origen = datasetAtenciones.getValue(j, "padre_origen");
		var padre_nombre = datasetAtenciones.getValue(j, "padre_nombre");
		var padre_telefono = datasetAtenciones.getValue(j, "padre_telefono");
		var padre_mail = datasetAtenciones.getValue(j, "padre_mail");
		var padre_direccion = datasetAtenciones.getValue(j, "padre_direccion");
		var padre_otro = datasetAtenciones.getValue(j, "padre_otro");
		var aten_nroSolicitud = datasetAtenciones.getValue(j, "aten_nroSolicitud");
		var aten_nroConsulta = datasetAtenciones.getValue(j, "aten_nroConsulta");
		var aten_producto = datasetAtenciones.getValue(j, "aten_producto");
		var aten_activo = datasetAtenciones.getValue(j, "aten_activo");
		var aten_nroLote = datasetAtenciones.getValue(j, "aten_nroLote");
		var aten_vencimiento = datasetAtenciones.getValue(j, "aten_vencimiento");
		var aten_tipo = datasetAtenciones.getValue(j, "aten_tipo");
		var aten_derivacion = datasetAtenciones.getValue(j, "aten_derivacion");
		var aten_motivoAtraso = datasetAtenciones.getValue(j, "aten_motivoAtraso");
		var aten_licenciante = datasetAtenciones.getValue(j, "aten_licenciante");
		var aten_contieneEventoAdverso = datasetAtenciones.getValue(j, "aten_contieneEventoAdverso");
		var aten_contieneEventoAdversoMotivo = datasetAtenciones.getValue(j, "aten_contieneEventoAdversoMotivo");
		var aten_conclusion = datasetAtenciones.getValue(j, "aten_conclusion");
		var aten_observacion = datasetAtenciones.getValue(j, "aten_observacion");
		var fechaFinSolicitud = datasetAtenciones.getValue(j, "fechaFinSolicitud");
		var horaFinSolicitud = datasetAtenciones.getValue(j, "horaFinSolicitud");
		var aten_resolucion = datasetAtenciones.getValue(j, "aten_resolucion");
		var aten_revobservacion = datasetAtenciones.getValue(j, "aten_revobservacion");
		var padre_observaciones = datasetAtenciones.getValue(j, "padre_observaciones");
		var aten_rellamada = datasetAtenciones.getValue(j, "aten_rellamada");
		var metadataVersion = datasetAtenciones.getValue(j, "metadata#version");
		var metadataId = datasetAtenciones.getValue(j, "metadata#id");

		newDataset.addRow(new Array(fechaInicioSolicitud,reemplazarVacio(tarea),padre_nroSolicitud,
		padre_fecha,padre_hora,reemplazarVacio(padre_origen),reemplazarVacio(padre_nombre),
		reemplazarVacio(padre_telefono),reemplazarVacio(padre_mail),reemplazarVacio(padre_direccion),reemplazarVacio(padre_otro),
		reemplazarVacio(aten_nroSolicitud),aten_nroConsulta,reemplazarVacio(aten_producto),
		reemplazarVacio(aten_activo),reemplazarVacio(aten_nroLote),reemplazarVacio(aten_vencimiento),reemplazarVacio(aten_tipo), reemplazarVacio(aten_derivacion),
		reemplazarVacio(aten_motivoAtraso),reemplazarVacio(aten_licenciante),reemplazarVacio(aten_contieneEventoAdverso),reemplazarVacio(aten_contieneEventoAdversoMotivo),
		reemplazarVacio(aten_conclusion),reemplazarVacio(aten_observacion),fechaFinSolicitud,horaFinSolicitud,
		reemplazarVacio(aten_resolucion),reemplazarVacio(aten_revobservacion),reemplazarVacio(padre_observaciones),reemplazarVacio(aten_rellamada),
		reemplazarVacio(metadataVersion),reemplazarVacio(metadataId),atrasada));

	}

	return newDataset;  

}

function pad(num) {
    num = num + '';
    return num.length < 2 ? '0' + num : num;
}

function formatDateMinutes(d,time){

	var dataArr = d.toString().split("-");
	var yyyy = dataArr[0];
	var mm = dataArr[1];
	var dd  = dataArr[2]; 
	var hh = Math.floor( time / 3600 );  
	var mi = Math.floor( (time % 3600) / 60 );
	var ss = time % 60;
	return yyyy + pad(mm) + pad(dd) + pad(hh) + pad(mi) + pad(ss);

}

function formatDate(d){

   var yyyy = d.getFullYear().toString();
   var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = d.getDate().toString();
   var hh = d.getHours();
   var mi = d.getMinutes();
   var ss = d.getSeconds();
   return yyyy + pad(mm) + pad(dd) + pad(hh) + pad(mi) + pad(ss);

}

function isAtrasada(nroSolicitud){
	
	var currentDate = formatDate(new Date());
	
	var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", nroSolicitud, nroSolicitud, ConstraintType.MUST); 
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST); 
	var processTaskDataset = DatasetFactory.getDataset("processTask", null, [c1,c2], null); 
	
	if(processTaskDataset.rowsCount != 0){
	
		var deadlineDate = processTaskDataset.getValue(0, "deadlineDate");  
		var deadlineHour = processTaskDataset.getValue(0, "deadlineHour"); 

		if(deadlineDate != null && deadlineHour != null){
		
			var vencimiento = formatDateMinutes(deadlineDate, deadlineHour);

			if(currentDate > vencimiento){
				return 'SI';
			}else{
				return 'NO';
			}
		
		}else{ // Si la tarea activa no tiene plazo.
			return 'NO';
		}
		
	} // Si esta cerrada no hay ninguna tarea activa.
	
	return 'NO';
	
}

function reemplazarVacio(value){

	if(value == ''){
		return '';
	}

	return value;
	
}