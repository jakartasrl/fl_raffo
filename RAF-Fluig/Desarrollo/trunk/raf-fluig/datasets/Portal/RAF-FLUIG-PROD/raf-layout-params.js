/**
 * Codigo: raf-layout-params
 * Descripcion: Parametros del Layout Intranet.
 */
function createDataset(fields, constraints, sortFields) {

	 var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("button");
	 dataset.addColumn("link");
	 
	 // Parametros Generales
	 dataset.addRow(['home', '/intranet']);
	 dataset.addRow(['telefonos', '/intranet/telefonos']);
	 dataset.addRow(['correspondencia', 'javascript:window.open("http://192.168.0.105/Login/Correspondencia");']);
	 dataset.addRow(['solicitudRemises', '/intranet/remises']);
	 dataset.addRow(['quienesSomos', '/intranet/quienessomos']);
	 dataset.addRow(['nuestroNegocio', '/intranet/novedades#rafNovedades1-type=NuestrosProductos']);
	 dataset.addRow(['sedes', '/intranet/sedes']);
	 dataset.addRow(['rse', '/intranet/novedades#rafNovedades1-type=RSE']);
	 dataset.addRow(['organigrama', '/intranet/organigrama']);
	 dataset.addRow(['politicas', '/intranet/politicas']);
	 dataset.addRow(['procedimientos', '/intranet/procedimientos']);
	 dataset.addRow(['aplicaciones', '/intranet/aplicaciones']);
	 dataset.addRow(['tableros', '/intranet/tableros']);
	 dataset.addRow(['descargaFormularios', '/intranet/descargaformularios']);
	 dataset.addRow(['fotosYVideos', '/intranet/fotosyvideos']);
	 dataset.addRow(['busquedasInternas', '/intranet/novedades#rafNovedades1-type=BusquedasInternas']);
	 dataset.addRow(['ingresos', '/intranet/novedades#rafNovedades1-type=Ingresos']);
	 dataset.addRow(['felicitaciones', '/intranet/novedades#rafNovedades1-type=Felicitaciones']);
	 dataset.addRow(['eventos', '/intranet/novedades#rafNovedades1-type=Eventos']);
	 dataset.addRow(['beneficios', '/intranet/novedades#rafNovedades1-type=Beneficios']);
	 dataset.addRow(['interesGeneral', '/intranet/novedades#rafNovedades1-type=Interesgeneral']);
	 dataset.addRow(['encuestas', '/intranet/encuestas']);
	 
	 return dataset
}