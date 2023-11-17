function requiereAprobacionGteN2(){
	
	var matricula = hAPI.getCardValue("gerenteN2Matricula");
	
	return matricula != "";
 
}