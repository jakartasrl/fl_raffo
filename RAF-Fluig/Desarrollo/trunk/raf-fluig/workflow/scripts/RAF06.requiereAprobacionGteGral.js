function requiereAprobacionGteGral(){
	
	var gteGral = hAPI.getCardValue("gerenteGeneral");
	
	return gteGral == "SI";
 
}