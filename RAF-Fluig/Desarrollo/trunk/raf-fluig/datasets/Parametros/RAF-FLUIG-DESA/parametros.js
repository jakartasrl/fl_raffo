/**
 * Codigo: parametros
 * Descripcion: Parametros del Sistema.
 */
function createDataset(fields, constraints, sortFields) {

	 var dataset = DatasetBuilder.newDataset();
	 dataset.addColumn("clave");
	 dataset.addColumn("valor");
	 
	 // Parametros Generales
	 dataset.addRow(['RAF03.usuarioSistema.id', 'SYS02']);
	 dataset.addRow(['RAF03.usuarioSistema.login', 'SYS02']);
	 dataset.addRow(['RAF03.usuarioSistema.pass', '20SYS']);
	 dataset.addRow(['RAF06.carpetaLegajos.docId', '4061']);
	 dataset.addRow(['RAF06.usuarioSistema.id', 'SYS06']);
	 dataset.addRow(['RAF06.usuarioSistema.login', 'SYS06']);
	 dataset.addRow(['RAF06.usuarioSistema.pass', '60SYS']);
	 dataset.addRow(['PORTAL.encuestasFolder', '9711']);
	 dataset.addRow(['securityProxy.user', 'procesobpm']);
	 dataset.addRow(['securityProxy.pass', 'Fl4r921$']);
	 dataset.addRow(['RAF07.carpetaSolicitudes.docId', '12542']);
	 dataset.addRow(['RAF07.QAD.fileURL', 'http://192.168.0.138:9080/portal/p/1/ecmnavigation?app_ecm_navigation_doc=']);
	 dataset.addRow(['RAF07.QAD.domain', 'RAFFO']);
	 dataset.addRow(['RAF07.QAD.formasFarmaceutica', 'FORM_FARM']);
	 dataset.addRow(['RAF07.QAD.drogas', 'DrogaP']);
	 dataset.addRow(['RAF08.usuarioSistema.id', 'SYS08']);
	 dataset.addRow(['RAF08.usuarioSistema.login', 'SYS08']);
	 dataset.addRow(['RAF08.usuarioSistema.pass', '80SYS']);
	 dataset.addRow(['RAF08.carpetaAdjuntos.docId', '13440']);
	 dataset.addRow(['RAF09.usuarioSistema.id', 'SYS08']);
	 dataset.addRow(['RAF09.usuarioSistema.login', 'SYS08']);
	 dataset.addRow(['RAF09.usuarioSistema.pass', '80SYS']);
	 dataset.addRow(['RAF09.carpetaAdjuntos.docId', '13443']);
	 dataset.addRow(['RAF10.usuarioSistema.id', 'SYS08']);
	 dataset.addRow(['RAF10.usuarioSistema.login', 'SYS08']);
	 dataset.addRow(['RAF10.usuarioSistema.pass', '80SYS']);
	 dataset.addRow(['RAF10.carpetaAdjuntos.docId', '14694']);
	 return dataset;
	 
}