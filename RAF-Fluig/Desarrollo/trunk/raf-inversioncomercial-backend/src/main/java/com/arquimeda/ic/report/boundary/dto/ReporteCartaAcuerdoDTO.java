package com.arquimeda.ic.report.boundary.dto;

import java.util.Date;

import com.arquimeda.ic.report.entity.CartaAcuerdo;
import com.arquimeda.ic.report.entity.CartaAcuerdo.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;


public class ReporteCartaAcuerdoDTO {
	
	private Integer id;
	private Integer numeroSolicitud;
	private Date fechaSolicitud;
	private String solicitante;
	private String matriculaSolicitante;
	private Integer nroInversionComercial;
	private String areaCodigo;
	private String areaDescripcion;
	private String distritoCodigo;
	private String distritoDescripcion;
	private String codGrupoGteDistrito;
	private String grupoGteDistrito;
	private String gteDistrito;
	private String nombreAPM;
	private String matriculaAPM;
	private String emailAPM;
	private Date fecha;
	private String apellido;
	private String nombre;
	private TipoInversion tipoInversion;
	private Date mesInversion;
	private String formaPago;
	private String codFormaPago;
	private String motivoRechazo;
	private String tarea;
	private Estado estado;
	private String nombreCongreso;
	private String comentariosCongreso;
	private String cartaPetitorioDescripcion;
	private String cartaPetitorioDocumentId;
	private String cartaAcuerdoDescripcion;
	private String cartaAcuerdoDocumentId;
	private String flyerDescripcion;
	private String flyerDocumentId;
	private String web;
	private Date fechaFinSolicitud;
	
	public ReporteCartaAcuerdoDTO () {
		
	}
	
	public ReporteCartaAcuerdoDTO (CartaAcuerdo entity) {
		
		setId(entity.getId());
		setNumeroSolicitud(entity.getNumeroSolicitud() != null? entity.getNumeroSolicitud() : null);
		setFechaSolicitud(entity.getFechaSolicitud() != null? entity.getFechaSolicitud() : null);
		setSolicitante(entity.getSolicitante() != null? entity.getSolicitante()  : "");
		setMatriculaSolicitante(entity.getMatriculaSolicitante() != null? entity.getMatriculaSolicitante() : "");
		setNroInversionComercial(entity.getNroInversionComercial() != null? entity.getNroInversionComercial() : null);
		setAreaCodigo(entity.getAreaCodigo() != null? entity.getAreaCodigo() : "");
		setAreaDescripcion(entity.getAreaDescripcion() != null? entity.getAreaDescripcion() : "");
		setDistritoCodigo(entity.getDistritoCodigo() != null? entity.getDistritoCodigo() : "");
		setDistritoDescripcion(entity.getDistritoDescripcion() != null? entity.getDistritoDescripcion() : "");
		setCodGrupoGteDistrito(entity.getCodGrupoGteDistrito() != null? entity.getCodGrupoGteDistrito() : "");
		setGrupoGteDistrito(entity.getGrupoGteDistrito() != null? entity.getGrupoGteDistrito() : "");
		setGteDistrito(entity.getGteDistrito());
		setNombreAPM(entity.getNombreAPM());
		setMatriculaAPM(entity.getMatriculaAPM());
		setEmailAPM(entity.getEmailAPM());
		setFecha(entity.getFecha() != null? entity.getFecha() : null);
		setApellido(entity.getApellido() != null? entity.getApellido() : "");
		setNombre(entity.getNombre() != null? entity.getNombre() : "");
		setTipoInversion(entity.getTipoInversion() != null? entity.getTipoInversion() : null);
		setMesInversion(entity.getMesInversion() != null? entity.getMesInversion() : null);
		setFormaPago(entity.getFormaPago() != null? entity.getFormaPago() : "");
		setCodFormaPago(entity.getCodFormaPago() != null? entity.getCodFormaPago() : "");
		setMotivoRechazo(entity.getMotivoRechazo() != null? entity.getMotivoRechazo() : "");
		setTarea(entity.getTarea());
		setEstado(entity.getEstado());
		setNombreCongreso(entity.getNombreCongreso() != null? entity.getNombreCongreso() : "");
		setComentariosCongreso(entity.getComentariosCongreso());
		setCartaPetitorioDescripcion(entity.getCartaPetitorioDescripcion());
		setCartaAcuerdoDescripcion(entity.getCartaAcuerdoDescripcion());
		setFlyerDescripcion(entity.getFlyerDescripcion());
		setWeb(entity.getWeb());
		setFechaFinSolicitud(entity.getFechaFinSolicitud() != null? entity.getFechaFinSolicitud() : null);

	}
	
	
	public static ReporteCartaAcuerdoDTO fromEntity(CartaAcuerdo entity) {
		
		if(entity == null) {
			return null;
		}
	
		ReporteCartaAcuerdoDTO dto = new ReporteCartaAcuerdoDTO();
		dto.setId(entity.getId());
		dto.setId(entity.getId());
		dto.setNumeroSolicitud(entity.getNumeroSolicitud() != null? entity.getNumeroSolicitud() : null);
		dto.setFechaSolicitud(entity.getFechaSolicitud() != null? entity.getFechaSolicitud() : null);
		dto.setSolicitante(entity.getSolicitante() != null? entity.getSolicitante()  : "");
		dto.setMatriculaSolicitante(entity.getMatriculaSolicitante() != null? entity.getMatriculaSolicitante() : "");
		dto.setNroInversionComercial(entity.getNroInversionComercial() != null? entity.getNroInversionComercial() : null);
		dto.setAreaCodigo(entity.getAreaCodigo() != null? entity.getAreaCodigo() : "");
		dto.setAreaDescripcion(entity.getAreaDescripcion() != null? entity.getAreaDescripcion() : "");
		dto.setDistritoCodigo(entity.getDistritoCodigo() != null? entity.getDistritoCodigo() : "");
		dto.setDistritoDescripcion(entity.getDistritoDescripcion() != null? entity.getDistritoDescripcion() : "");
		dto.setCodGrupoGteDistrito(entity.getCodGrupoGteDistrito() != null? entity.getCodGrupoGteDistrito() : "");
		dto.setGrupoGteDistrito(entity.getGrupoGteDistrito() != null? entity.getGrupoGteDistrito() : "");
		dto.setGteDistrito(entity.getGteDistrito());
		dto.setNombreAPM(entity.getNombreAPM());
		dto.setMatriculaAPM(entity.getMatriculaAPM());
		dto.setEmailAPM(entity.getEmailAPM());
		dto.setFecha(entity.getFecha() != null? entity.getFecha() : null);
		dto.setApellido(entity.getApellido() != null? entity.getApellido() : "");
		dto.setNombre(entity.getNombre() != null? entity.getNombre() : "");
		dto.setTipoInversion(entity.getTipoInversion() != null? entity.getTipoInversion() : null);
		dto.setMesInversion(entity.getMesInversion() != null? entity.getMesInversion() : null);
		dto.setFormaPago(entity.getFormaPago() != null? entity.getFormaPago() : "");
		dto.setCodFormaPago(entity.getCodFormaPago() != null? entity.getCodFormaPago() : "");
		dto.setMotivoRechazo(entity.getMotivoRechazo() != null? entity.getMotivoRechazo() : "");
		dto.setTarea(entity.getTarea());
		dto.setEstado(entity.getEstado());
		dto.setNombreCongreso(entity.getNombreCongreso() != null? entity.getNombreCongreso() : "");
		dto.setComentariosCongreso(entity.getComentariosCongreso());
		dto.setCartaPetitorioDescripcion(entity.getCartaPetitorioDescripcion());
		dto.setCartaAcuerdoDescripcion(entity.getCartaAcuerdoDescripcion());
		dto.setFlyerDescripcion(entity.getFlyerDescripcion());
		dto.setWeb(entity.getWeb());
		dto.setFechaFinSolicitud(entity.getFechaFinSolicitud() != null? entity.getFechaFinSolicitud() : null);
		
		return dto;
	}

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

	public Integer getNroInversionComercial() {
		return nroInversionComercial;
	}

	public void setNroInversionComercial(Integer nroInversionComercial) {
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

	public String getGteDistrito() {
		return gteDistrito;
	}

	public void setGteDistrito(String gteDistrito) {
		this.gteDistrito = gteDistrito;
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

	public TipoInversion getTipoInversion() {
		return tipoInversion;
	}

	public void setTipoInversion(TipoInversion tipoInversion) {
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

	public String getTarea() {
		return tarea;
	}

	public void setTarea(String tarea) {
		this.tarea = tarea;
	}

	public Estado getEstado() {
		return estado;
	}

	public void setEstado(Estado estado) {
		this.estado = estado;
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

	public String getFlyerDescripcion() {
		return flyerDescripcion;
	}

	public void setFlyerDescripcion(String flyerDescripcion) {
		this.flyerDescripcion = flyerDescripcion;
	}

	public String getFlyerDocumentId() {
		return flyerDocumentId;
	}

	public void setFlyerDocumentId(String flyerDocumentId) {
		this.flyerDocumentId = flyerDocumentId;
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
	
}
