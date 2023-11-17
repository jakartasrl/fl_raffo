/**
 * Codigo: raf-sslTrustAll
 * Descripcion: Dataset para que Java confie en todos los certificados
 * 
 */
function createDataset(fields, constraints, sortFields) {
	
	var ds = DatasetBuilder.newDataset();
	ds.addColumn("mensaje");	

	ds.addRow(["Aplicando trust all...."]);
	
	try {
		
		var verifier = new javax.net.ssl.HostnameVerifier({
			verify: function(hostname, session){ 
                return true;
			}
		});
		
		javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier(verifier);
		
        var context = javax.net.ssl.SSLContext.getInstance("TLS");
        
        var trustManager = [new javax.net.ssl.X509TrustManager({
    		checkClientTrusted: function(chain,authType){},
    		checkServerTrusted: function(chain,authType){},
    		getAcceptedIssuers: function() { 
                //return new java.security.cert.X509Certificate[0];
    			return null;
    		}
        })];
        
        context.init(null, trustManager, new java.security.SecureRandom()); 
        
        javax.net.ssl.HttpsURLConnection.setDefaultSSLSocketFactory( 
                        context.getSocketFactory()); 
		
	} catch (ex){
		ds.addRow(["Error:" + ex]);
	}

	ds.addRow(["Aplicado."]);
	
	return ds;
}