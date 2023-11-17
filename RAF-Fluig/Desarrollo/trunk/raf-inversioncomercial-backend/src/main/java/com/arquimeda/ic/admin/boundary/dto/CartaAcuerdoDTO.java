package com.arquimeda.ic.admin.boundary.dto;

import java.util.Date;

import com.arquimeda.ic.report.entity.CartaAcuerdo.Estado;

public class CartaAcuerdoDTO {
	
	private Integer id;
	private Integer numeroSolicitud;
	private Date fechaSolicitud;
	private String solicitante;
	private String matriculaSolicitante;
	private String mailGteDistrito;
	private String nroInversionComercial;
	private String areaCodigo;
	private String areaDescripcion;
	private String distritoCodigo;
	private String distritoDescripcion;
	private String codGrupoGteDistrito;
	private String grupoGteDistrito;
	private String nombreAPM;
	private String matriculaAPM;
	private String emailAPM;
	private Date fecha;
	private String apellido;
	private String nombre;
	private String tipoInversion;
	private Date mesInversion;
	private String formaPago;
	private String codFormaPago;
	private String motivoRechazo;
	private Estado estado;
	private String tarea;
	private String gteDistrito;
	private String nombreCongreso;
	private String comentariosCongreso;
	private String cartaPetitorioDescripcion;
	private String cartaPetitorioDocumentId;
	private Date cartaPetitorioFecha;	
	private String cartaAcuerdoDescripcion;
	private String cartaAcuerdoDocumentId;
	private Date cartaAcuerdoFecha;	
	private String flyerDescripcion;
	private String flyerDocumentId;
	private String web;
	private Date fechaFinSolicitud;
	private Boolean delegado;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getNumeroSolicitud() {
		return numeroSolicitud;
	}
	public void setNumeroSolicitud(Integer numeroSolicitud) {
		this.numeroSolicitud = numeroSolicitud;
	}
	public Date getFechaSolicitud() {
		return fechaSolicitud;
	}
	public void setFechaSolicitud(Date fechaSolicitud) {
		this.fechaSolicitud = fechaSolicitud;
	}
	public String getSolicitante() {
		return solicitante;
	}
	public void setSolicitante(String solicitante) {
		this.solicitante = solicitante;
	}
	public String getMatriculaSolicitante() {
		return matriculaSolicitante;
	}
	public void setMatriculaSolicitante(String matriculaSolicitante) {
		this.matriculaSolicitante = matriculaSolicitante;
	}
	public String getMailGteDistrito() {
		return mailGteDistrito;
	}
	public void setMailGteDistrito(String mailGteDistrito) {
		this.mailGteDistrito = mailGteDistrito;
	}
	public String getNroInversionComercial() {
		return nroInversionComercial;
	}
	public void setNroInversionComercial(String nroInversionComercial) {
		this.nroInversionComercial = nroInversionComercial;
	}
	public String getAreaCodigo() {
		return areaCodigo;
	}
	public void setAreaCodigo(String areaCodigo) {
		this.areaCodigo = areaCodigo;
	}
	public String getAreaDescripcion() {
		return areaDescripcion;
	}
	public void setAreaDescripcion(String areaDescripcion) {
		this.areaDescripcion = areaDescripcion;
	}
	public String getDistritoCodigo() {
		return distritoCodigo;
	}
	public void setDistritoCodigo(String distritoCodigo) {
		this.distritoCodigo = distritoCodigo;
	}
	public String getDistritoDescripcion() {
		return distritoDescripcion;
	}
	public void setDistritoDescripcion(String distritoDescripcion) {
		this.distritoDescripcion = distritoDescripcion;
	}
	public String getCodGrupoGteDistrito() {
		return codGrupoGteDistrito;
	}
	public void setCodGrupoGteDistrito(String codGrupoGteDistrito) {
		this.codGrupoGteDistrito = codGrupoGteDistrito;
	}
	public String getGrupoGteDistrito() {
		return grupoGteDistrito;
	}
	public void setGrupoGteDistrito(String grupoGteDistrito) {
		this.grupoGteDistrito = grupoGteDistrito;
	}
	public String getNombreAPM() {
		return nombreAPM;
	}
	public void setNombreAPM(String nombreAPM) {
		this.nombreAPM = nombreAPM;
	}
	public String getMatriculaAPM() {
		return matriculaAPM;
	}
	public void setMatriculaAPM(String matriculaAPM) {
		this.matriculaAPM = matriculaAPM;
	}
	public String getEmailAPM() {
		return emailAPM;
	}
	public void setEmailAPM(String emailAPM) {
		this.emailAPM = emailAPM;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getTipoInversion() {
		return tipoInversion;
	}
	public void setTipoInversion(String tipoInversion) {
		this.tipoInversion = tipoInversion;
	}
	public Date getMesInversion() {
		return mesInversion;
	}
	public void setMesInversion(Date mesInversion) {
		this.mesInversion = mesInversion;
	}
	public String getFormaPago() {
		return formaPago;
	}
	public void setFormaPago(String formaPago) {
		this.formaPago = formaPago;
	}
	public String getCodFormaPago() {
		return codFormaPago;
	}
	public void setCodFormaPago(String codFormaPago) {
		this.codFormaPago = codFormaPago;
	}
	public String getMotivoRechazo() {
		return motivoRechazo;
	}
	public void setMotivoRechazo(String motivoRechazo) {
		this.motivoRechazo = motivoRechazo;
	}
	public Estado getEstado() {
		return estado;
	}
	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	public String getTarea() {
		return tarea;
	}
	public void setTarea(String tarea) {
		this.tarea = tarea;
	}
	public String getGteDistrito() {
		return gteDistrito;
	}
	public void setGteDistrito(String gteDistrito) {
		this.gteDistrito = gteDistrito;
	}
	public String getNombreCongreso() {
		return nombreCongreso;
	}
	public void setNombreCongreso(String nombreCongreso) {
		this.nombreCongreso = nombreCongreso;
	}
	public String getComentariosCongreso() {
		return comentariosCongreso;
	}
	public void setComentariosCongreso(String comentariosCongreso) {
		this.comentariosCongreso = comentariosCongreso;
	}
	public String getCartaPetitorioDescripcion() {
		return cartaPetitorioDescripcion;
	}
	public void setCartaPetitorioDescripcion(String cartaPetitorioDescripcion) {
		this.cartaPetitorioDescripcion = cartaPetitorioDescripcion;
	}
	public String getCartaPetitorioDocumentId() {
		return cartaPetitorioDocumentId;
	}
	public void setCartaPetitorioDocumentId(String cartaPetitorioDocumentId) {
		this.cartaPetitorioDocumentId = cartaPetitorioDocumentId;
	}
	public Date getCartaPetitorioFecha() {
		return cartaPetitorioFecha;
	}
	public void setCartaPetitorioFecha(Date cartaPetitorioFecha) {
		this.cartaPetitorioFecha = cartaPetitorioFecha;
	}
	public String getCartaAcuerdoDescripcion() {
		return cartaAcuerdoDescripcion;
	}
	public void setCartaAcuerdoDescripcion(String cartaAcuerdoDescripcion) {
		this.cartaAcuerdoDescripcion = cartaAcuerdoDescripcion;
	}
	public String getCartaAcuerdoDocumentId() {
		return cartaAcuerdoDocumentId;
	}
	public void setCartaAcuerdoDocumentId(String cartaAcuerdoDocumentId) {
		this.cartaAcuerdoDocumentId = cartaAcuerdoDocumentId;
	}
	public Date getCartaAcuerdoFecha() {
		return cartaAcuerdoFecha;
	}
	public void setCartaAcuerdoFecha(Date cartaAcuerdoFecha) {
		this.cartaAcuerdoFecha = cartaAcuerdoFecha;
	}
	public String getFlyerDescripcion() {
		return flyerDescripcion;
	}
	public void setFlyerDescripcion(String flyerDescripcion) {
		this.flyerDescripcion = flyerDescripcion;
	}
	public String getFlyerDocumentId() {
		return flyerDocumentId;
	}
	public void setFlyerDocumentId(String flyerDescripcion) {
		this.flyerDocumentId = flyerDescripcion;
	}
	public String getWeb() {
		return web;
	}
	public void setWeb(String web) {
		this.web = web;
	}
	public Date getFechaFinSolicitud() {
		return fechaFinSolicitud;
	}
	public void setFechaFinSolicitud(Date fechaFinSolicitud) {
		this.fechaFinSolicitud = fechaFinSolicitud;
	}
	public Boolean getDelegado() {
		return delegado;
	}
	public void setDelegado(Boolean delegado) {
		this.delegado = delegado;
	}
}