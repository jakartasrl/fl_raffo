function requiereAprobacionSegundoAutorizante(){
	
	var matricula = hAPI.getCardValue("segundoAutorizanteMatricula");
	
	return matricula != "";
 
}