package com.arquimeda.raf.esb.custom.util;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Properties;

import com.totvs.esb.components.custom.CustomSender;

/**
 * Envuelve un archivo de cualquier tipo en un XML con la estructura de {@link FileWrapper}
 * @author javier.barletta
 *
 */
public class FileWrapperCustomSender implements CustomSender {

	private static final String CHARACTER_ENCODING = "UTF-8";

	@Override
	public byte[] sendMessage(byte[] message, Properties properties, Map<String, Object> arg2) throws Exception {
	
		FileWrapper fileWrapper = new FileWrapper();
		fileWrapper.setContent(message);		
		
		setProperties(arg2, fileWrapper);
		
		String xml = FileWrapper.marshal(fileWrapper);
		
		return xml.getBytes(CHARACTER_ENCODING);
				
	}

	private void setProperties(Map<String, Object> arg2, FileWrapper fileWrapper) throws NoSuchFieldException, IllegalAccessException {
		
		if(arg2.get("message.reprocess") != null && arg2.get("message.reprocess").equals("true")){
			
			Field atributo = arg2.getClass().getDeclaredField("originalKeys");
			atributo.setAccessible(true);
			
			@SuppressWarnings("unchecked")
			Map<String, Object> originalKeys = (Map<String, Object>)atributo.get(arg2);
			
			setProperties(originalKeys, fileWrapper);
			
		}else{
			
			fileWrapper.setName(arg2.get("CamelFileName") != null ? (String)arg2.get("CamelFileName") : "Desconocido");
			fileWrapper.setAbsolutePath(arg2.get("CamelFileAbsolutePath") != null ? (String)arg2.get("CamelFileAbsolutePath") : "Desconocido");
			fileWrapper.setLastModified(arg2.get("CamelFileLastModified") != null ? String.valueOf(arg2.get("CamelFileLastModified")) : "Desconocido");
			fileWrapper.setLength(arg2.get("CamelFileLength") != null ? (Long)arg2.get("CamelFileLength") : -1l);
		
		}
		
	}

}
