package com.arquimeda.raf.esb.custom.diagrama01;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="cambioEstado")
@XmlAccessorType(XmlAccessType.FIELD)
public class QAD_FLU_CambioEstadoMessage {

	@XmlElement(name = "solicitud")
	private String solicitud;
	
	@XmlElement(name = "linea")
	private String linea;
	
	@XmlElement(name = "producto")
	private String producto;

	@XmlElement(name = "estadoSolicitud")
	private String estadoSolicitud;

	@XmlElement(name = "observacion")
	private String observacion;
	
	@XmlElement(name = "fechaImplementacion")
	private String fechaImplementacion;
	
	@XmlElement(name = "estadoPCO")
	private String estadoPCO;

	@XmlElement(name = "sistema")
	private String sistema;
	
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
	
	@XmlElement(name = "informado")
	private String informado;
	
	@XmlElement(name = "fechaInforme")
	private String fechaInforme;
	
	@XmlElement(name = "horaInforme")
	private String horaInforme;

	public String getSolicitud() {
		return solicitud;
	}

	public void setSolicitud(String solicitud) {
		this.solicitud = solicitud;
	}

	public String getLinea() {
		return linea;
	}

	public void setLinea(String linea) {
		this.linea = linea;
	}

	public String getProducto() {
		return producto;
	}

	public void setProducto(String producto) {
		this.producto = producto;
	}

	public String getEstadoSolicitud() {
		return estadoSolicitud;
	}

	public void setEstadoSolicitud(String estadoSolicitud) {
		this.estadoSolicitud = estadoSolicitud;
	}

	public String getObservacion() {
		return observacion;
	}

	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}

	public String getFechaImplementacion() {
		return fechaImplementacion;
	}

	public void setFechaImplementacion(String fechaImplementacion) {
		this.fechaImplementacion = fechaImplementacion;
	}

	public String getEstadoPCO() {
		return estadoPCO;
	}

	public void setEstadoPCO(String estadoPCO) {
		this.estadoPCO = estadoPCO;
	}

	public String getSistema() {
		return sistema;
	}

	public void setSistema(String sistema) {
		this.sistema = sistema;
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

	public String getInformado() {
		return informado;
	}

	public void setInformado(String informado) {
		this.informado = informado;
	}

	public String getFechaInforme() {
		return fechaInforme;
	}

	public void setFechaInforme(String fechaInforme) {
		this.fechaInforme = fechaInforme;
	}

	public String getHoraInforme() {
		return horaInforme;
	}

	public void setHoraInforme(String horaInforme) {
		this.horaInforme = horaInforme;
	}

	@Override
	public String toString() {
		return "QAD_FLU_CambioEstadoMessage [solicitud=" + solicitud + ", linea=" + linea + ", producto=" + producto
				+ ", estadoSolicitud=" + estadoSolicitud + ", observacion=" + observacion + ", fechaImplementacion="
				+ fechaImplementacion + ", estadoPCO=" + estadoPCO + ", sistema=" + sistema + ", numero=" + numero
				+ ", pdfArte=" + pdfArte + ", eame=" + eame + ", carpeta=" + carpeta + ", reemplazos=" + reemplazos
				+ ", tipo=" + tipo + ", informado=" + informado + ", fechaInforme=" + fechaInforme + ", horaInforme="
				+ horaInforme + "]";
	}
	
}