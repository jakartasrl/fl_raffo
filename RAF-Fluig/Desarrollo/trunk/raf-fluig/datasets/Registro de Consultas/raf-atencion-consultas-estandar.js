/*
 * Dataset: raf-atencion-consultas-estandar
 * Descripcion: Atencion de Consultas Estandar
 */
function createDataset(fields, constraints, sortFields) { 

	// Define los campos para ordenacion 
	var sortingFields = new Array("metadata#id");

	// Creo dataset con las columnas a visualizar
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("aten_nroConsulta");
	newDataset.addColumn("tarea");
	newDataset.addColumn("padre_fecha");
	newDataset.addColumn("padre_hora");
	newDataset.addColumn("fechaFinSolicitud");
	newDataset.addColumn("horaFinSolicitud");
	newDataset.addColumn("padre_origen");
	newDataset.addColumn("padre_nombre");
	newDataset.addColumn("padre_telefono");
	newDataset.addColumn("padre_mail");
	newDataset.addColumn("padre_direccion");
	newDataset.addColumn("padre_otro");
	newDataset.addColumn("padre_observaciones");
	newDataset.addColumn("aten_producto");
	newDataset.addColumn("aten_activo");
	newDataset.addColumn("aten_nroLote");
	newDataset.addColumn("aten_vencimiento");
	newDataset.addColumn("aten_tipo");
	newDataset.addColumn("aten_observacion");
	newDataset.addColumn("aten_derivacion");
	newDataset.addColumn("aten_resolucion");
	newDataset.addColumn("aten_motivoAtraso");
	newDataset.addColumn("aten_licenciante");
	newDataset.addColumn("aten_contieneEventoAdverso");
	newDataset.addColumn("aten_contieneEventoAdversoMotivo");
	newDataset.addColumn("aten_revobservacion");
	newDataset.addColumn("aten_conclusion");
	newDataset.addColumn("padre_nroSolicitud");
	newDataset.addColumn("aten_nroSolicitud");

	var datasetAtenciones = DatasetFactory.getDataset("raf-atencion-consultas", null, constraints, sortingFields);
	var constraintsObj = arqConstraintApplier.createConstraintsObj(constraints);	
	
	for(var j = 0; j < datasetAtenciones.rowsCount; j++) {
		
		if(arqConstraintApplier.isValidRow(datasetAtenciones,j,constraintsObj)){
			
			var aten_nroConsulta = datasetAtenciones.getValue(j, "aten_nroConsulta");
			var tarea = datasetAtenciones.getValue(j, "tarea");
			var padre_fecha = datasetAtenciones.getValue(j, "padre_fecha");
			var padre_hora = datasetAtenciones.getValue(j, "padre_hora");
			var fechaFinSolicitud = datasetAtenciones.getValue(j, "fechaFinSolicitud");
			var horaFinSolicitud = datasetAtenciones.getValue(j, "horaFinSolicitud");
			var padre_origen = datasetAtenciones.getValue(j, "padre_origen");
			var padre_nombre = datasetAtenciones.getValue(j, "padre_nombre");
			var padre_telefono = datasetAtenciones.getValue(j, "padre_telefono");
			var padre_mail = datasetAtenciones.getValue(j, "padre_mail");
			var padre_direccion = datasetAtenciones.getValue(j, "padre_direccion");
			var padre_otro = datasetAtenciones.getValue(j, "padre_otro");
			var padre_observaciones = datasetAtenciones.getValue(j, "padre_observaciones");
			var aten_producto = datasetAtenciones.getValue(j, "aten_producto");
			var aten_activo = datasetAtenciones.getValue(j, "aten_activo");
			var aten_nroLote = datasetAtenciones.getValue(j, "aten_nroLote");
			var aten_vencimiento = datasetAtenciones.getValue(j, "aten_vencimiento");
			var aten_tipo = datasetAtenciones.getValue(j, "aten_tipo");
			var aten_observacion = datasetAtenciones.getValue(j, "aten_observacion");
			var aten_derivacion = datasetAtenciones.getValue(j, "aten_derivacion");
			var aten_resolucion = datasetAtenciones.getValue(j, "aten_resolucion");
			var aten_motivoAtraso = datasetAtenciones.getValue(j, "aten_motivoAtraso");
			var aten_licenciante = datasetAtenciones.getValue(j, "aten_licenciante");
			var aten_contieneEventoAdverso = datasetAtenciones.getValue(j, "aten_contieneEventoAdverso");
			var aten_contieneEventoAdversoMotivo = datasetAtenciones.getValue(j, "aten_contieneEventoAdversoMotivo");
			var aten_revobservacion = datasetAtenciones.getValue(j, "aten_revobservacion");
			var aten_conclusion = datasetAtenciones.getValue(j, "aten_conclusion");
			var padre_nroSolicitud = datasetAtenciones.getValue(j, "padre_nroSolicitud");
			var aten_nroSolicitud = datasetAtenciones.getValue(j, "aten_nroSolicitud");
			
	
			newDataset.addRow(new Array(aten_nroConsulta,reemplazarVacio(tarea),padre_fecha,padre_hora,reemplazarVacio(fechaFinSolicitud),reemplazarVacio(horaFinSolicitud),
			reemplazarVacio(padre_origen),reemplazarVacio(padre_nombre),reemplazarVacio(padre_telefono),reemplazarVacio(padre_mail),
			reemplazarVacio(padre_direccion),reemplazarVacio(padre_otro),reemplazarVacio(padre_observaciones),reemplazarVacio(aten_producto),
			reemplazarVacio(aten_activo),reemplazarVacio(aten_nroLote),reemplazarVacio(aten_vencimiento),reemplazarVacio(aten_tipo),reemplazarVacio(aten_observacion),
			reemplazarVacio(aten_derivacion),reemplazarVacio(aten_resolucion),reemplazarVacio(aten_motivoAtraso),
			reemplazarVacio(aten_licenciante),reemplazarVacio(aten_contieneEventoAdverso),reemplazarVacio(aten_contieneEventoAdversoMotivo),
			reemplazarVacio(aten_revobservacion),reemplazarVacio(aten_conclusion),padre_nroSolicitud,reemplazarVacio(aten_nroSolicitud)));
			
		}
		
	}
	

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

function reemplazarVacio(value){

	if(value == ''){
		return '-';
	}

	return value;
	
}