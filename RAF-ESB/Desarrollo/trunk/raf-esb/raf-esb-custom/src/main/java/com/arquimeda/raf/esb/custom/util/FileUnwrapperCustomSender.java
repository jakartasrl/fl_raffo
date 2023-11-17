package com.arquimeda.raf.esb.custom.util;

import java.util.Map;
import java.util.Properties;

import com.totvs.esb.components.custom.CustomSender;

/**
 * Desenvuelve un archivo con la estructura de {@link FileWrapper} en un XML 
 * @author javier.barletta
 *
 */
public class FileUnwrapperCustomSender implements CustomSender {

	@Override
	public byte[] sendMessage(byte[] message, Properties properties, Map<String, Object> arg2) throws Exception {
	
		String xml = new String(message);
		FileWrapper fileWrapper = FileWrapper.unmarshal(xml);
		return fileWrapper.getContent();
				
	}

}
