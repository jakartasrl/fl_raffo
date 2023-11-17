/*
 * Dataset para registrar arquimeda.marvin.key en ambientes cloud
 * 
 */
function createDataset(fields, constraints, sortFields) {
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("id");	
	ds.addColumn("code");
	ds.addColumn("federalId");
	ds.addColumn("description");
	ds.addColumn("marvinkey");

	var marvinKey = "100156494";	
	
	// +v1.5.12
	var api = new com.fluig.sdk.api.FluigAPI();
	var ss = api.getSecurityService();
	var tenant = ss.getCurrentTenant();
//	ret = ss.createOrUpdateTenantData("arquimeda.marvin.key", marvinKey);

	
	log.info("*** teste dataset")
	
	// -v1.5.12
	// var ss = new javax.naming.InitialContext().lookup("java:global/fluig/foundation/service/Security");
	// var tenantId = ss.getCurrentTenantId();
	// var tenant = ss.findTenantById(tenantId);
	
	//
	// Descomentar abajo para actualizar key
	// 
	//var data = ss.findTenantDataByKey(tenantId, "arquimeda.marvin.key");
	//var vo = new com.totvs.technology.foundation.security.vo.FDNTenantDataVO(tenantId, "arquimeda.marvin.key");
	//if (data == null){		
	//	vo = ss.createTenantData(vo);
	//} 
			
	//vo.setDataValue(marvinKey);
	//ss.updateTenantData(vo);
	
	
	//var mvo = ss.findTenantDataByKey(tenantId, "arquimeda.marvin.key");
	
	ds.addRow([
	           tenant.getId(), 
	           tenant.getCode(),
	           tenant.getFederalID(),
	           tenant.getDescription(),
	           marvinKey
	           ]);

	return ds;
	
}


