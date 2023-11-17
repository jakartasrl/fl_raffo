function requiereAprobacionGteN1(){
	
	var matricula = hAPI.getCardValue("gerenteN1Matricula");
	
	return matricula != "";
 
}