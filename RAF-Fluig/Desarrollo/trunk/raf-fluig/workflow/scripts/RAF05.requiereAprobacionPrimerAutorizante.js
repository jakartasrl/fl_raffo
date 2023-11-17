function requiereAprobacionPrimerAutorizante(){
	
	var matricula = hAPI.getCardValue("primerAutorizanteMatricula");
	
	return matricula != "";
 
}