function presupuestoDelegado(){
	
	var selAlojamientoPresupuesto = hAPI.getCardValue("selAlojamientoPresupuesto");
	var selTrasladoPresupuesto = hAPI.getCardValue("selTrasladoPresupuesto");
	var selInscripcionPresupuesto = hAPI.getCardValue("selInscripcionPresupuesto");
	var tipoInversion = hAPI.getCardValue("tipoInversion");
	
	return selAlojamientoPresupuesto == "DELEGADO" || selTrasladoPresupuesto  == "DELEGADO" || selInscripcionPresupuesto  == "DELEGADO" || tipoInversion == "patrocinio";
 
}