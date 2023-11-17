/**
 * Codigo: raf-layout-params
 * Descripcion: Parametros del Layout.
 */
function createDataset(fields, constraints, sortFields) {

	 var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("button");
	 dataset.addColumn("link");
	 
	 // Parametros Generales
	 dataset.addRow(['home', '/portalweb']);
	 dataset.addRow(['telefonos', '/portalweb/telefonos']);
	 dataset.addRow(['correspondencia', '/portalweb/correspondencia']);
	 dataset.addRow(['solicitudRemises', '/portalweb/solicitudremises']);
	 dataset.addRow(['quienesSomos', '/portalweb/quienessomos']);
	 dataset.addRow(['nuestroNegocio', '/portalweb/nuestronegocio']);
	 dataset.addRow(['sedes', '/portalweb/sedes']);
	 dataset.addRow(['rse', '/portalweb/novedades#rafNovedades1-type=RSE']);
	 dataset.addRow(['organigrama', '/portalweb/organigrama']);
	 dataset.addRow(['politicas', '/portalweb/politicas']);
	 dataset.addRow(['procedimientos', '/portalweb/procedimientos']);
	 dataset.addRow(['aplicaciones', '/portalweb/aplicaciones']);
	 dataset.addRow(['tableros', '/portalweb/tableros']);
	 dataset.addRow(['descargaFormularios', '/portalweb/descargaformularios']);
	 dataset.addRow(['fotosYVideos', '/portalweb/fotosyvideos']);
	 dataset.addRow(['busquedasInternas', '/portalweb/novedades#rafNovedades1-type=BusquedasInternas']);
	 dataset.addRow(['ingresos', '/portalweb/novedades#rafNovedades1-type=Ingresos']);
	 dataset.addRow(['felicitaciones', '/portalweb/novedades#rafNovedades1-type=Felicitaciones']);
	 dataset.addRow(['eventos', '/portalweb/novedades#rafNovedades1-type=Eventos']);
	 dataset.addRow(['beneficios', '/portalweb/novedades#rafNovedades1-type=Beneficios']);
	 dataset.addRow(['interesGeneral', '/portalweb/novedades#rafNovedades1-type=InteresGeneral']);
	 dataset.addRow(['encuestas', '/portalweb/encuestas']);
	 
	 return dataset
}