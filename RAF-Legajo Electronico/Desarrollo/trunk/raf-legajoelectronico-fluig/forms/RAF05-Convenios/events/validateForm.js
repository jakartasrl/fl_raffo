// ValidateForm
function validateForm(form){
	checkErrorJs(form);
}
function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "Hay errores en el formulario, revise los datos.";
	}
}
