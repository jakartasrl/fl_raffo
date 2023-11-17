package com.arquimeda.ic.admin.boundary.dto;

import java.util.Date;

import com.arquimeda.ic.report.entity.PetitorioCartaAcuerdo.Estado;

public class PetitorioCartaAcuerdoDTO {
	
	private Integer id;
	private Integer numeroSolicitud;
	private Date fechaSolicitud;
	private String solicitante;
	private String matriculaSolicitante;
	private String mailSolicitante;
	private String nombreAPM;
	private String matriculaAPM;
	private String lineaRegion;	
	private String lineaRegionCodigo;
	private String codGrupoSolicitante;
	private String codGrupoAsistDistrito;
	private String area;
	private String areaCodigo;
	private String codGrupoGteArea;
	private String codGrupoGtePromocion;
	private String grupoGteMKT;
	private String codGrupoGteMKT;
	private Date fecha;
	private String apellido;
	private String nombre;
	private String tipoInversion;
	private String tipoInversionCodigo;
	private String detalleInversion;
	private Date mesInversion;
	private String tipoProducto;
	private String tipoProductoCodigo;
	private String grupoDerivacion;
	private String codGrupoDerivacion;
	private String motivoRechazo;
	private String tarea;
	private Estado estado;
	private Boolean esGteDistrito;
	
	public PetitorioCartaAcuerdoDTO () {
		
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

	public String getMailSolicitante() {
		return mailSolicitante;
	}

	public void setMailSolicitante(String mailSolicitante) {
		this.mailSolicitante = mailSolicitante;
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

	public String getLineaRegion() {
		return lineaRegion;
	}

	public void setLineaRegion(String lineaRegion) {
		this.lineaRegion = lineaRegion;
	}

	public String getLineaRegionCodigo() {
		return lineaRegionCodigo;
	}

	public void setLineaRegionCodigo(String lineaRegionCodigo) {
		this.lineaRegionCodigo = lineaRegionCodigo;
	}

	public String getCodGrupoSolicitante() {
		return codGrupoSolicitante;
	}

	public void setCodGrupoSolicitante(String codGrupoSolicitante) {
		this.codGrupoSolicitante = codGrupoSolicitante;
	}

	public String getCodGrupoAsistDistrito() {
		return codGrupoAsistDistrito;
	}

	public void setCodGrupoAsistDistrito(String codGrupoAsistDistrito) {
		this.codGrupoAsistDistrito = codGrupoAsistDistrito;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getAreaCodigo() {
		return areaCodigo;
	}

	public void setAreaCodigo(String areaCodigo) {
		this.areaCodigo = areaCodigo;
	}

	public String getCodGrupoGteArea() {
		return codGrupoGteArea;
	}

	public void setCodGrupoGteArea(String codGrupoGteArea) {
		this.codGrupoGteArea = codGrupoGteArea;
	}

	public String getCodGrupoGtePromocion() {
		return codGrupoGtePromocion;
	}

	public void setCodGrupoGtePromocion(String codGrupoGtePromocion) {
		this.codGrupoGtePromocion = codGrupoGtePromocion;
	}
	
	public String getGrupoGteMKT() {
		return grupoGteMKT;
	}

	public void setGrupoGteMKT(String grupoGteMKT) {
		this.grupoGteMKT = grupoGteMKT;
	}

	public String getCodGrupoGteMKT() {
		return codGrupoGteMKT;
	}

	public void setCodGrupoGteMKT(String codGrupoGteMKT) {
		this.codGrupoGteMKT = codGrupoGteMKT;
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

	public String getTipoInversionCodigo() {
		return tipoInversionCodigo;
	}

	public void setTipoInversionCodigo(String tipoInversionCodigo) {
		this.tipoInversionCodigo = tipoInversionCodigo;
	}

	public String getDetalleInversion() {
		return detalleInversion;
	}

	public void setDetalleInversion(String detalleInversion) {
		this.detalleInversion = detalleInversion;
	}

	public Date getMesInversion() {
		return mesInversion;
	}

	public void setMesInversion(Date mesInversion) {
		this.mesInversion = mesInversion;
	}

	public String getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(String tipoProducto) {
		this.tipoProducto = tipoProducto;
	}

	public String getTipoProductoCodigo() {
		return tipoProductoCodigo;
	}

	public void setTipoProductoCodigo(String tipoProductoCodigo) {
		this.tipoProductoCodigo = tipoProductoCodigo;
	}

	public String getGrupoDerivacion() {
		return grupoDerivacion;
	}

	public void setGrupoDerivacion(String grupoDerivacion) {
		this.grupoDerivacion = grupoDerivacion;
	}

	public String getCodGrupoDerivacion() {
		return codGrupoDerivacion;
	}

	public void setCodGrupoDerivacion(String codGrupoDerivacion) {
		this.codGrupoDerivacion = codGrupoDerivacion;
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

	public Boolean getEsGteDistrito() {
		return esGteDistrito;
	}

	public void setEsGteDistrito(Boolean esGteDistrito) {
		this.esGteDistrito = esGteDistrito;
	}

	@Override
	public String toString() {
		return "PetitorioCartaAcuerdoDTO [id=" + id + ", numeroSolicitud=" + numeroSolicitud + ", fechaSolicitud="
				+ fechaSolicitud + ", solicitante=" + solicitante + ", matriculaSolicitante=" + matriculaSolicitante
				+ ", mailSolicitante=" + mailSolicitante + ", nombreAPM=" + nombreAPM + ", matriculaAPM=" + matriculaAPM
				+ ", lineaRegion=" + lineaRegion + ", lineaRegionCodigo=" + lineaRegionCodigo + ", codGrupoSolicitante="
				+ codGrupoSolicitante + ", codGrupoAsistDistrito=" + codGrupoAsistDistrito + ", area=" + area
				+ ", areaCodigo=" + areaCodigo + ", codGrupoGteArea=" + codGrupoGteArea + ", codGrupoGtePromocion="
				+ codGrupoGtePromocion + ", grupoGteMKT=" + grupoGteMKT + ", codGrupoGteMKT=" + codGrupoGteMKT
				+ ", fecha=" + fecha + ", apellido=" + apellido + ", nombre=" + nombre + ", tipoInversion="
				+ tipoInversion + ", tipoInversionCodigo=" + tipoInversionCodigo + ", detalleInversion="
				+ detalleInversion + ", mesInversion=" + mesInversion + ", tipoProducto=" + tipoProducto
				+ ", tipoProductoCodigo=" + tipoProductoCodigo + ", grupoDerivacion=" + grupoDerivacion
				+ ", codGrupoDerivacion=" + codGrupoDerivacion + ", motivoRechazo=" + motivoRechazo + ", tarea=" + tarea
				+ ", estado=" + estado + ", esGteDistrito=" + esGteDistrito + "]";
	}

	
}
