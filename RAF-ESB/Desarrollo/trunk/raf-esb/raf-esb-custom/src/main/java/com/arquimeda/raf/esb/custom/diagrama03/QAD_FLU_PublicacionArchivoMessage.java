package com.arquimeda.raf.esb.custom.diagrama03;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="publicarArchivo")
@XmlAccessorType(XmlAccessType.FIELD)
public class QAD_FLU_PublicacionArchivoMessage {
	
	@XmlElement(name = "solicitud")
	private String solicitud;
	
	@XmlElement(name = "estadoSolicitud")
	private String estadoSolicitud;
	
	@XmlElement(name = "linea")
	private String linea;
	
	@XmlElement(name = "numero")
	private String numero;
	
	@XmlElement(name = "archivo")
	private String archivo;

	@XmlElement(name = "carpeta")
	private String carpeta;	
	
	@XmlElement(name = "reemplazos")
	private String reemplazos;

	@XmlElement(name = "tipo")
	private String tipo;

	public String getSolicitud() {
		return solicitud;
	}

	public void setSolicitud(String solicitud) {
		this.solicitud = solicitud;
	}

	public String getEstadoSolicitud() {
		return estadoSolicitud;
	}

	public void setEstadoSolicitud(String estadoSolicitud) {
		this.estadoSolicitud = estadoSolicitud;
	}

	public String getLinea() {
		return linea;
	}

	public void setLinea(String linea) {
		this.linea = linea;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getArchivo() {
		return archivo;
	}

	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}

	public String getCarpeta() {
		return carpeta;
	}

	public void setCarpeta(String carpeta) {
		this.carpeta = carpeta;
	}

	public String getReemplazos() {
		return reemplazos;
	}

	public void setReemplazos(String reemplazos) {
		this.reemplazos = reemplazos;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	@Override
	public String toString() {
		return "QAD_FLU_PublicacionArchivoMessage [solicitud=" + solicitud + ", estadoSolicitud=" + estadoSolicitud
				+ ", linea=" + linea + ", numero=" + numero + ", archivo=" + archivo + ", carpeta=" + carpeta
				+ ", reemplazos=" + reemplazos + ", tipo=" + tipo + "]";
	}

}
