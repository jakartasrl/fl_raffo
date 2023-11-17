package com.arquimeda.raf.esb.custom.util;

import java.io.ByteArrayOutputStream;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.transform.stream.StreamSource;

@XmlRootElement(name="file")
@XmlAccessorType(XmlAccessType.FIELD)
public class FileWrapper {
	
	private static final String CHARACTER_ENCODING = "UTF-8";
	
	private String name;	
	private byte[] content;
	private long length;
	private String absolutePath;
	private String lastModified;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public long getLength() {
		return length;
	}

	public void setLength(long length) {
		this.length = length;
	}

	public String getAbsolutePath() {
		return absolutePath;
	}

	public void setAbsolutePath(String absolutePath) {
		this.absolutePath = absolutePath;
	}

	public String getLastModified() {
		return lastModified;
	}

	public void setLastModified(String lastModified) {
		this.lastModified = lastModified;
	}
	
	/**
	 * Convierte un objeto a XML.
	 * @throws UnsupportedEncodingException 
	 **/
	public static String marshal(FileWrapper fileWrapper) throws JAXBException, UnsupportedEncodingException{

		JAXBContext jaxbContext = JAXBContext.newInstance(FileWrapper.class);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		Marshaller marshaller = jaxbContext.createMarshaller();
		marshaller.marshal(fileWrapper, outputStream);
		return outputStream.toString(CHARACTER_ENCODING);	

	}

	/**
	 * Convierte un XML a objeto.
	 **/
	public static FileWrapper unmarshal(String xml) throws JAXBException{

		JAXBContext jaxbContext = JAXBContext.newInstance(FileWrapper.class);
		Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
		StreamSource streamSource = new StreamSource(new StringReader(xml));
		JAXBElement<FileWrapper> jaxbRta = unmarshaller.unmarshal(streamSource, FileWrapper.class);
		return jaxbRta.getValue();

	}	

}
