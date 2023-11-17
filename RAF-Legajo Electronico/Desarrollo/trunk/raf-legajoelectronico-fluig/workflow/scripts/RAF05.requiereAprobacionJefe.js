function requiereAprobacionJefe(){
	
	var matricula = hAPI.getCardValue("jefeMatricula");
	
	return matricula != "";
 
}