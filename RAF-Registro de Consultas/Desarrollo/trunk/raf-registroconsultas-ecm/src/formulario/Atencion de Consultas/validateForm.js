// ValidateForm
function validateForm(form){
	checkErrorJs(form);
	
	var WKNextState = getValue("WKNextState"),
		wkfAtencionCon = {
			RevisarConsulta: 3,
			ConsultaCancelada: 8,
			ConsultaCerrada: 4
		};	
	
	if (WKNextState == wkfAtencionCon.ConsultaCancelada || 
		WKNextState == wkfAtencionCon.ConsultaCerrada) {
		if (form.getValue("aten_confirma") == null) {
			throw "Para cerrar la consulta debe tildar el checkbox Confirma Cierre.";
		}		
	}
	
}
function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "Hay errores en el formulario, revise los datos.";
	}
}
