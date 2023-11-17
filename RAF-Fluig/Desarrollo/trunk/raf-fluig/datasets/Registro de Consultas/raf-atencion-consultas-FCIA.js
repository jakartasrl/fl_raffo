/*
 * Dataset: raf-atencion-consultas-FCIA
 * Descripcion: Atencion de Consultas para Farmacovigilancia
 */
function createDataset(fields, constraints, sortFields) { 

	// Define los campos para ordenacion 
	var sortingFields = new Array("metadata#id");

	// Creo dataset con las columnas a visualizar
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

	for (var i=0; i<constraints.length; i++){
		log.info("raf-atencion-consultas-FCIA - Constraint para busqueda de solicitudes anteriores: " + constraints[i].fieldName + " desde: " + constraints[i].initialValue + " hasta: " + constraints[i].finalValue);
	}
	
	var map = new java.util.HashMap();
	
	var datasetAtenciones = DatasetFactory.getDataset("raf-atencion-consultas", null, constraints, sortingFields);
	var constraintsObj = arqConstraintApplier.createConstraintsObj(constraints);
	
	var listaSolicitudes = new java.util.ArrayList();
	
	var cantAtencionesAnteriores = 0;
	for(var j = 0; j < datasetAtenciones.rowsCount; j++) {
		if(arqConstraintApplier.isValidRow(datasetAtenciones,j,constraintsObj)){
			cantAtencionesAnteriores++;
			listaSolicitudes.add(datasetAtenciones.getValue(j, "aten_nroSolicitud"));
			
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
	
			map.put(new java.lang.Integer(aten_nroSolicitud), new Array(fechaInicioSolicitud,reemplazarVacio(tarea),padre_nroSolicitud,
			padre_fecha,padre_hora,reemplazarVacio(padre_origen),reemplazarVacio(padre_nombre),
			reemplazarVacio(padre_telefono),reemplazarVacio(padre_mail),reemplazarVacio(padre_direccion),reemplazarVacio(padre_otro),
			reemplazarVacio(aten_nroSolicitud),aten_nroConsulta,reemplazarVacio(aten_producto),
			reemplazarVacio(aten_activo),reemplazarVacio(aten_nroLote),reemplazarVacio(aten_vencimiento),reemplazarVacio(aten_tipo), reemplazarVacio(aten_derivacion),
			reemplazarVacio(aten_motivoAtraso),reemplazarVacio(aten_licenciante),reemplazarVacio(aten_contieneEventoAdverso),reemplazarVacio(aten_contieneEventoAdversoMotivo),
			reemplazarVacio(aten_conclusion),reemplazarVacio(aten_observacion),fechaFinSolicitud,horaFinSolicitud,
			reemplazarVacio(aten_resolucion),reemplazarVacio(aten_revobservacion),reemplazarVacio(padre_observaciones),reemplazarVacio(aten_rellamada),
			reemplazarVacio(metadataVersion),reemplazarVacio(metadataId),atrasada));
		}
		
	}
	
	log.info("raf-atencion-consultas-FCIA - Cantidad de solicitudes anteriores encontradas: " + cantAtencionesAnteriores);
	
	var nuevasConstraints = new Array();
	for (var i=0; i<constraints.length; i++){
		if (constraints[i].fieldName != "fechaInicioSolicitud" && constraints[i].fieldName != "fechaFinSolicitud"){
			nuevasConstraints.push(constraints[i]);			
		}
	}
	
	var c01 = DatasetFactory.createConstraint("tarea", 'CONSULTA CANCELADA', 'CONSULTA CANCELADA', ConstraintType.MUST_NOT); 
	var c02 = DatasetFactory.createConstraint("tarea", 'CONSULTA CERRADA', 'CONSULTA CERRADA', ConstraintType.MUST_NOT); 
	nuevasConstraints.push(c01);
	nuevasConstraints.push(c02);
	
	for (var i=0; i<nuevasConstraints.length; i++){
		log.info("raf-atencion-consultas-FCIA - Constraint para busqueda de solicitudes abiertas: " + nuevasConstraints[i].fieldName + " desde: " + nuevasConstraints[i].initialValue + " hasta: " + nuevasConstraints[i].finalValue);
	}
	
	var datasetAbiertas = DatasetFactory.getDataset("raf-atencion-consultas", null, nuevasConstraints, sortingFields);
	var nuevasConstraintsObj = arqConstraintApplier.createConstraintsObj(nuevasConstraints);
	
	//Cargo en el dataset
	var cantAtencionesAbiertas = 0
	for(var j = 0; j < datasetAbiertas.rowsCount; j++) {
		
		if(arqConstraintApplier.isValidRow(datasetAbiertas,j,nuevasConstraintsObj)){
			cantAtencionesAbiertas++;
			var nroSolicitud = datasetAbiertas.getValue(j, "aten_nroSolicitud");
			if(!listaSolicitudes.contains(nroSolicitud)){
			
				var atrasada = isAtrasada(nroSolicitud);
				var fechaInicioSolicitud = datasetAbiertas.getValue(j, "fechaInicioSolicitud");
				var tarea = datasetAbiertas.getValue(j, "tarea");
				var padre_nroSolicitud = datasetAbiertas.getValue(j, "padre_nroSolicitud");
				var padre_fecha = datasetAbiertas.getValue(j, "padre_fecha");
				var padre_hora = datasetAbiertas.getValue(j, "padre_hora");
				var padre_origen = datasetAbiertas.getValue(j, "padre_origen");
				var padre_nombre = datasetAbiertas.getValue(j, "padre_nombre");
				var padre_telefono = datasetAbiertas.getValue(j, "padre_telefono");
				var padre_mail = datasetAbiertas.getValue(j, "padre_mail");
				var padre_direccion = datasetAbiertas.getValue(j, "padre_direccion");
				var padre_otro = datasetAbiertas.getValue(j, "padre_otro");
				var aten_nroSolicitud = datasetAbiertas.getValue(j, "aten_nroSolicitud");
				var aten_nroConsulta = datasetAbiertas.getValue(j, "aten_nroConsulta");
				var aten_producto = datasetAbiertas.getValue(j, "aten_producto");
				var aten_activo = datasetAbiertas.getValue(j, "aten_activo");
				var aten_nroLote = datasetAbiertas.getValue(j, "aten_nroLote");
				var aten_vencimiento = datasetAbiertas.getValue(j, "aten_vencimiento");
				var aten_tipo = datasetAbiertas.getValue(j, "aten_tipo");
				var aten_derivacion = datasetAbiertas.getValue(j, "aten_derivacion");
				var aten_motivoAtraso = datasetAbiertas.getValue(j, "aten_motivoAtraso");
				var aten_licenciante = datasetAbiertas.getValue(j, "aten_licenciante");
				var aten_contieneEventoAdverso = datasetAbiertas.getValue(j, "aten_contieneEventoAdverso");
				var aten_contieneEventoAdversoMotivo = datasetAbiertas.getValue(j, "aten_contieneEventoAdversoMotivo");
				var aten_conclusion = datasetAbiertas.getValue(j, "aten_conclusion");
				var aten_observacion = datasetAbiertas.getValue(j, "aten_observacion");
				var fechaFinSolicitud = datasetAbiertas.getValue(j, "fechaFinSolicitud");
				var horaFinSolicitud = datasetAbiertas.getValue(j, "horaFinSolicitud");
				var aten_resolucion = datasetAbiertas.getValue(j, "aten_resolucion");
				var aten_revobservacion = datasetAbiertas.getValue(j, "aten_revobservacion");
				var padre_observaciones = datasetAbiertas.getValue(j, "padre_observaciones");
				var aten_rellamada = datasetAbiertas.getValue(j, "aten_rellamada");
				var metadataVersion = datasetAbiertas.getValue(j, "metadata#version");
				var metadataId = datasetAbiertas.getValue(j, "metadata#id");
	
				map.put(new java.lang.Integer(aten_nroSolicitud),  Array(fechaInicioSolicitud,reemplazarVacio(tarea),padre_nroSolicitud,
				padre_fecha,padre_hora,reemplazarVacio(padre_origen),reemplazarVacio(padre_nombre),
				reemplazarVacio(padre_telefono),reemplazarVacio(padre_mail),reemplazarVacio(padre_direccion),reemplazarVacio(padre_otro),
				reemplazarVacio(aten_nroSolicitud),aten_nroConsulta,reemplazarVacio(aten_producto),
				reemplazarVacio(aten_activo),reemplazarVacio(aten_nroLote),reemplazarVacio(aten_vencimiento),reemplazarVacio(aten_tipo), reemplazarVacio(aten_derivacion),
				reemplazarVacio(aten_motivoAtraso),reemplazarVacio(aten_licenciante),reemplazarVacio(aten_contieneEventoAdverso),reemplazarVacio(aten_contieneEventoAdversoMotivo),
				reemplazarVacio(aten_conclusion),reemplazarVacio(aten_observacion),fechaFinSolicitud,horaFinSolicitud,
				reemplazarVacio(aten_resolucion),reemplazarVacio(aten_revobservacion),reemplazarVacio(padre_observaciones),reemplazarVacio(aten_rellamada),
				reemplazarVacio(metadataVersion),reemplazarVacio(metadataId),atrasada));
			
			}
		}
	}
	
	log.info("raf-atencion-consultas-FCIA - Cantidad de solicitudes abiertas encontradas: " + cantAtencionesAbiertas);
	
	log.info("raf-atencion-consultas-FCIA - Ordenando resultado.");
	var keys = map.keySet().toArray();
	java.util.Arrays.sort(keys);
		
	for(var i=0; i < keys.length; i++){
		newDataset.addRow(map.get(keys[i]));
	}
	
	log.info("raf-atencion-consultas-FCIA - Resultado ordenado.");

	return newDataset;  

}

var arqConstraintApplier = {
	createConstraintsObj: function(constraints){
		var constraintsObj = {};
		if (constraints != null) {
			for (var i=0; i<constraints.length; i++) {
				if (constraints[i].constraintType == ConstraintType.MUST ||
						constraints[i].constraintType == ConstraintType.MUST_NOT) {
					constraintsObj[constraints[i].fieldName] = {
							initialValue: constraints[i].initialValue, 
							finalValue: constraints[i].finalValue,
							likeSearch: constraints[i].likeSearch,
							type: constraints[i].constraintType
					};
				} else if (constraints[i].constraintType == ConstraintType.SHOULD) {
					if (constraintsObj[constraints[i].fieldName]){
						constraintsObj[constraints[i].fieldName].values.push({
							initialValue: constraints[i].initialValue, 
							finalValue: constraints[i].finalValue,
							likeSearch: constraints[i].likeSearch
						});
					} else {
						constraintsObj[constraints[i].fieldName] = {
							values: [{
								initialValue: constraints[i].initialValue, 
								finalValue: constraints[i].finalValue,
								likeSearch: constraints[i].likeSearch
							}],
							type: constraints[i].constraintType
						};
					}
				}
			}
		}
		return constraintsObj;
	},
	
	isValidRow: function(dataset, rowNum, constraintsObj){
		for (fieldName in constraintsObj) {
			if (constraintsObj[fieldName].type == ConstraintType.MUST) {
				if(!this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName].initialValue, constraintsObj[fieldName].finalValue, constraintsObj[fieldName].likeSearch)){
					return false;
				}
			} else if (constraintsObj[fieldName].type == ConstraintType.MUST_NOT) {
				if(this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName].initialValue, constraintsObj[fieldName].finalValue, constraintsObj[fieldName].likeSearch)){
					return false;
				}
			} else if (constraintsObj[fieldName].type == ConstraintType.SHOULD) {
				var valid = false;
				for (var j=0; j<constraintsObj[fieldName].values.length; j++){
					if(this.isValidValue(dataset.getValue(rowNum, fieldName), constraintsObj[fieldName].values[j].initialValue,
							constraintsObj[fieldName].values[j].finalValue, constraintsObj[fieldName].values[j].likeSearch)){
						valid = true;
						break;
					}
				}
				if (!valid) {
					return false;
				}
			}
		}
		return true;
	},
	
	isValidValue: function(datasetValue, initialValue, finalValue, likeSearch){
		var value;
		if (!(datasetValue instanceof java.lang.String)) {
			value = java.lang.String.valueOf(datasetValue);
		} else {
			value = datasetValue;
		}
		
		if(initialValue == finalValue){
			return (!likeSearch && value.equalsIgnoreCase(initialValue)) || 
			( likeSearch && value.toLowerCase().matches(initialValue.toLowerCase().replace("%", ".*")));
		} else {
			return (value.toUpperCase().compareTo(initialValue.toUpperCase()) >= 0) &&
			(value.toUpperCase().compareTo(finalValue.toUpperCase()) <= 0);
		}
	}	
}


function pad(num) {
    num = num + '';
    return num.length < 2 ? '0' + num : num;
}

function formatDateMinutes(d,time){

	var formatter = new java.text.SimpleDateFormat("yyyyMMdd");
	
	var hh = Math.floor( time / 3600 );  
	var mi = Math.floor( (time % 3600) / 60 );
	var ss = time % 60;

	return formatter.format(d) + pad(hh) + pad(mi) + pad(ss);

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
		return '-';
	}

	return value;
	
}