package com.arquimeda.raf.esb.custom.diagrama02;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="pasajeHistorico")
@XmlAccessorType(XmlAccessType.FIELD)
public class FLU_FLU_PasajeHistoricoArchivoMessage {
	
	@XmlElement(name = "solicitud")
	private String solicitud;
	
	@XmlElement(name = "estadoSolicitud")
	private String estadoSolicitud;
	
	@XmlElement(name = "linea")
	private String linea;
	
	@XmlElement(name = "numero")
	private String numero;
	
	@XmlElement(name = "pdfArte")
	private String pdfArte;
	
	@XmlElement(name = "eame")
	private String eame;

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

	public String getPdfArte() {
		return pdfArte;
	}

	public void setPdfArte(String pdfArte) {
		this.pdfArte = pdfArte;
	}

	public String getEame() {
		return eame;
	}

	public void setEame(String eame) {
		this.eame = eame;
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
		return "FLU_FLU_PasajeHistoricoArchivoMessage [solicitud=" + solicitud + ", estadoSolicitud=" + estadoSolicitud
				+ ", linea=" + linea + ", numero=" + numero + ", pdfArte=" + pdfArte + ", eame=" + eame + ", carpeta="
				+ carpeta + ", reemplazos=" + reemplazos + ", tipo=" + tipo + "]";
	}

}
