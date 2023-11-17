package com.arquimeda.raf.esb.custom.util;

import java.io.ByteArrayOutputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;


public class JAXBUtils {

	private static final String CHARACTER_ENCODING = "UTF-8";
	
	/**
	 * Convierte un objeto a XML.
	 **/
	public static <T> String marshal(T dto, Class<T> clazz) throws JAXBException, UnsupportedEncodingException{
		JAXBContext jaxbContext = JAXBContext.newInstance(clazz);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		Marshaller marshaller = jaxbContext.createMarshaller();
		marshaller.setProperty(Marshaller.JAXB_FRAGMENT, Boolean.TRUE);
		marshaller.marshal(dto, outputStream);
		return outputStream.toString("UTF-8");	
	}

	/**
	 * Convierte un XML a objeto.
	 **/
	public static <T> T unmarshal(String xml, Class<T> clazz) throws JAXBException{
		JAXBContext jaxbContext = JAXBContext.newInstance(clazz);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		StreamSource streamSource = new StreamSource(new StringReader(xml));
		JAXBElement<T> jaxbRta = unmarshaller.unmarshal(streamSource, clazz);
		return jaxbRta.getValue();
	}
	
	public static <T> byte[][] serialize(List<T> list, Class<T> clazz) throws UnsupportedEncodingException, JAXBException {
		
		byte[][] ret = new byte[list.size()][];
		
		int i = 0;
		
		for(T item : list) {
			ret[i] = JAXBUtils.marshal(item, clazz).getBytes(CHARACTER_ENCODING);
			i++;
		}
		
		return ret;
		
	}
	   
}
