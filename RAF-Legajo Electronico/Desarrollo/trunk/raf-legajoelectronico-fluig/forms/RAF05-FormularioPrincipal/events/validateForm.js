// ValidateForm
function validateForm(form){
	if (cantidadTareas(form) < 4){
		throw "Debe cargar por lo menos 4 tareas en el campo: Tareas en Orden de Prioridad";
	}
	checkErrorJs(form);
}
function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "Hay errores en el formulario, revise los datos.";
	}
}


function cantidadTareas(form){
	var indexes = form.getChildrenIndexes("tablaTareasOrdenPrio");
    var total = 0;
    for (var i = 0; i < indexes.length; i++) {
    	if((form.getValue("detalleAccion___"+indexes[i]) != "") && (form.getValue("detalleAccion___"+indexes[i]) != null)){
			total++;
		}
	       
    }
	return total;
}