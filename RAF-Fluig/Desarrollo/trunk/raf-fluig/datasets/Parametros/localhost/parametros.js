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
	 dataset.addRow(['RAF06.carpetaLegajos.docId', '1650']);
	 dataset.addRow(['RAF06.usuarioSistema.id', 'adm']);
	 dataset.addRow(['RAF06.usuarioSistema.login', 'adm']);
	 dataset.addRow(['RAF06.usuarioSistema.pass', 'adm']);
	 dataset.addRow(['PORTAL.encuestasFolder', '1253']);
	 dataset.addRow(['securityProxy.user', 'adm']);
	 dataset.addRow(['securityProxy.pass', 'adm']);
	 dataset.addRow(['RAF07.carpetaSolicitudes.docId', '37']);
	 dataset.addRow(['RAF08.usuarioSistema.id', 'adm']);
	 dataset.addRow(['RAF08.usuarioSistema.login', 'adm']);
	 dataset.addRow(['RAF08.usuarioSistema.pass', 'adm']);
	 dataset.addRow(['RAF08.carpetaAdjuntos.docId', '49']);
	 dataset.addRow(['RAF09.usuarioSistema.id', 'adm']);
	 dataset.addRow(['RAF09.usuarioSistema.login', 'adm']);
	 dataset.addRow(['RAF09.usuarioSistema.pass', 'adm']);
	 dataset.addRow(['RAF09.carpetaAdjuntos.docId', '49']);
	 dataset.addRow(['RAF07.carpetaSolicitudes.docId', '418']);
	 dataset.addRow(['RAF07.QAD.fileURL', 'http://192.168.0.59:8080/portal/p/1/ecmnavigation?app_ecm_navigation_doc=']);
	 dataset.addRow(['RAF07.QAD.domain', 'RAFFO']);
	 dataset.addRow(['RAF07.QAD.formasFarmaceutica', 'FORM_FARM']);
	 dataset.addRow(['RAF07.QAD.drogas', 'DrogaP']);
	 
	 return dataset;
}