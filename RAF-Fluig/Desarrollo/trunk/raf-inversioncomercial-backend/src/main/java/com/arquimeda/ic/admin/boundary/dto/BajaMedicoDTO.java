package com.arquimeda.ic.admin.boundary.dto;

import java.util.Date;

public class BajaMedicoDTO {
	
	private Integer id;
	private Integer numeroSolicitud;
	private Date fechaSolicitud;
	private String matriculaSolicitante;
	private String areaCodigo;
	private String areaDescripcion;
	private String codGrupoGteArea;
	private String distritoCodigo;
	private String distritoDescripcion;
	private String codGrupoGteDistrito;
	private String codGrupoAsistenteDistrito;
	private String codGrupoGtePromocion;
	private String solicitante;
	private String nombreAPM;
	private String matriculaAPM;
	private String emailAPM;
	private String apellido;
	private String nombre;
	private String cuit;
	private String nombreCongreso;
	private String lugarCongreso;
	private Date fechaDesdeCongreso;
	private Date fechaHastaCongreso;
	private String motivoBaja;
	private String tarea;
	private String estado;
	private String matriculaGteDistrito;
	private String presupuestoHabilitado;
	private String incluyeAlojamiento;
	private String incluyeTraslado;
	private String incluyeInscripcion;
	private String seleccionAlojamientoPresupuesto;
	private String seleccionTrasladoPresupuesto;
	private String seleccionInscripcionoPresupuesto;
	private Date mesInversion;
	private String tipoInversion;
	private Boolean delegado;
	
	public BajaMedicoDTO(){
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
	public String getMatriculaSolicitante() {
		return matriculaSolicitante;
	}
	public void setMatriculaSolicitante(String matriculaSolicitante) {
		this.matriculaSolicitante = matriculaSolicitante;
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
	public String getCodGrupoGteArea() {
		return codGrupoGteArea;
	}
	public void setCodGrupoGteArea(String codGrupoGteArea) {
		this.codGrupoGteArea = codGrupoGteArea;
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
	public String getCodGrupoAsistenteDistrito() {
		return codGrupoAsistenteDistrito;
	}
	public void setCodGrupoAsistenteDistrito(String codGrupoAsistenteDistrito) {
		this.codGrupoAsistenteDistrito = codGrupoAsistenteDistrito;
	}
	public String getCodGrupoGtePromocion() {
		return codGrupoGtePromocion;
	}
	public void setCodGrupoGtePromocion(String codGrupoGtePromocion) {
		this.codGrupoGtePromocion = codGrupoGtePromocion;
	}
	public String getSolicitante() {
		return solicitante;
	}
	public void setSolicitante(String solicitante) {
		this.solicitante = solicitante;
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
	
	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public String getNombreCongreso() {
		return nombreCongreso;
	}
	public void setNombreCongreso(String nombreCongreso) {
		this.nombreCongreso = nombreCongreso;
	}
	
	public String getLugarCongreso() {
		return lugarCongreso;
	}

	public void setLugarCongreso(String lugarCongreso) {
		this.lugarCongreso = lugarCongreso;
	}

	public Date getFechaDesdeCongreso() {
		return fechaDesdeCongreso;
	}

	public void setFechaDesdeCongreso(Date fechaDesdeCongreso) {
		this.fechaDesdeCongreso = fechaDesdeCongreso;
	}

	public Date getFechaHastaCongreso() {
		return fechaHastaCongreso;
	}

	public void setFechaHastaCongreso(Date fechaHastaCongreso) {
		this.fechaHastaCongreso = fechaHastaCongreso;
	}

	public String getMotivoBaja() {
		return motivoBaja;
	}
	public void setMotivoBaja(String motivoBaja) {
		this.motivoBaja = motivoBaja;
	}
	public String getTarea() {
		return tarea;
	}
	public void setTarea(String tarea) {
		this.tarea = tarea;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getMatriculaGteDistrito() {
		return matriculaGteDistrito;
	}
	public void setMatriculaGteDistrito(String matriculaGteDistrito) {
		this.matriculaGteDistrito = matriculaGteDistrito;
	}
	public String getPresupuestoHabilitado() {
		return presupuestoHabilitado;
	}
	public void setPresupuestoHabilitado(String presupuestoHabilitado) {
		this.presupuestoHabilitado = presupuestoHabilitado;
	}
	public String getIncluyeAlojamiento() {
		return incluyeAlojamiento;
	}
	public void setIncluyeAlojamiento(String incluyeAlojamiento) {
		this.incluyeAlojamiento = incluyeAlojamiento;
	}
	public String getIncluyeTraslado() {
		return incluyeTraslado;
	}
	public void setIncluyeTraslado(String incluyeTraslado) {
		this.incluyeTraslado = incluyeTraslado;
	}
	public String getIncluyeInscripcion() {
		return incluyeInscripcion;
	}
	public void setIncluyeInscripcion(String incluyeInscripcion) {
		this.incluyeInscripcion = incluyeInscripcion;
	}
	public String getSeleccionAlojamientoPresupuesto() {
		return seleccionAlojamientoPresupuesto;
	}
	public void setSeleccionAlojamientoPresupuesto(String seleccionAlojamientoPresupuesto) {
		this.seleccionAlojamientoPresupuesto = seleccionAlojamientoPresupuesto;
	}
	public String getSeleccionTrasladoPresupuesto() {
		return seleccionTrasladoPresupuesto;
	}
	public void setSeleccionTrasladoPresupuesto(String seleccionTrasladoPresupuesto) {
		this.seleccionTrasladoPresupuesto = seleccionTrasladoPresupuesto;
	}
	public String getSeleccionInscripcionoPresupuesto() {
		return seleccionInscripcionoPresupuesto;
	}
	public void setSeleccionInscripcionoPresupuesto(String seleccionInscripcionoPresupuesto) {
		this.seleccionInscripcionoPresupuesto = seleccionInscripcionoPresupuesto;
	}
	public Date getMesInversion() {
		return mesInversion;
	}
	public void setMesInversion(Date mesInversion) {
		this.mesInversion = mesInversion;
	}
	public Boolean getDelegado() {
		return delegado;
	}
	public void setDelegado(Boolean delegado) {
		this.delegado = delegado;
	}
	
	public String getTipoInversion() {
		return tipoInversion;
	}

	public void setTipoInversion(String tipoInversion) {
		this.tipoInversion = tipoInversion;
	}

	@Override
	public String toString() {
		return "BajaMedicoDTO [id=" + id + ", numeroSolicitud=" + numeroSolicitud + ", fechaSolicitud=" + fechaSolicitud
				+ ", matriculaSolicitante=" + matriculaSolicitante + ", areaCodigo=" + areaCodigo + ", areaDescripcion="
				+ areaDescripcion + ", codGrupoGteArea=" + codGrupoGteArea + ", distritoCodigo=" + distritoCodigo
				+ ", distritoDescripcion=" + distritoDescripcion + ", codGrupoGteDistrito=" + codGrupoGteDistrito
				+ ", codGrupoAsistenteDistrito=" + codGrupoAsistenteDistrito + ", codGrupoGtePromocion="
				+ codGrupoGtePromocion + ", solicitante=" + solicitante + ", nombreAPM=" + nombreAPM + ", matriculaAPM="
				+ matriculaAPM + ", emailAPM=" + emailAPM + ", apellido=" + apellido + ", nombre=" + nombre + ", cuit="
				+ cuit + ", nombreCongreso=" + nombreCongreso + ", lugarCongreso=" + lugarCongreso
				+ ", fechaDesdeCongreso=" + fechaDesdeCongreso + ", fechaHastaCongreso=" + fechaHastaCongreso
				+ ", motivoBaja=" + motivoBaja + ", tarea=" + tarea + ", estado=" + estado + ", matriculaGteDistrito="
				+ matriculaGteDistrito + ", presupuestoHabilitado=" + presupuestoHabilitado + ", incluyeAlojamiento="
				+ incluyeAlojamiento + ", incluyeTraslado=" + incluyeTraslado + ", incluyeInscripcion="
				+ incluyeInscripcion + ", seleccionAlojamientoPresupuesto=" + seleccionAlojamientoPresupuesto
				+ ", seleccionTrasladoPresupuesto=" + seleccionTrasladoPresupuesto
				+ ", seleccionInscripcionoPresupuesto=" + seleccionInscripcionoPresupuesto + ", mesInversion="
				+ mesInversion + ", tipoInversion=" + tipoInversion + ", delegado=" + delegado + ", getId()=" + getId()
				+ ", getNumeroSolicitud()=" + getNumeroSolicitud() + ", getFechaSolicitud()=" + getFechaSolicitud()
				+ ", getMatriculaSolicitante()=" + getMatriculaSolicitante() + ", getAreaCodigo()=" + getAreaCodigo()
				+ ", getAreaDescripcion()=" + getAreaDescripcion() + ", getCodGrupoGteArea()=" + getCodGrupoGteArea()
				+ ", getDistritoCodigo()=" + getDistritoCodigo() + ", getDistritoDescripcion()="
				+ getDistritoDescripcion() + ", getCodGrupoGteDistrito()=" + getCodGrupoGteDistrito()
				+ ", getCodGrupoAsistenteDistrito()=" + getCodGrupoAsistenteDistrito() + ", getCodGrupoGtePromocion()="
				+ getCodGrupoGtePromocion() + ", getSolicitante()=" + getSolicitante() + ", getNombreAPM()="
				+ getNombreAPM() + ", getMatriculaAPM()=" + getMatriculaAPM() + ", getEmailAPM()=" + getEmailAPM()
				+ ", getApellido()=" + getApellido() + ", getNombre()=" + getNombre() + ", getCuit()=" + getCuit()
				+ ", getNombreCongreso()=" + getNombreCongreso() + ", getLugarCongreso()=" + getLugarCongreso()
				+ ", getFechaDesdeCongreso()=" + getFechaDesdeCongreso() + ", getFechaHastaCongreso()="
				+ getFechaHastaCongreso() + ", getMotivoBaja()=" + getMotivoBaja() + ", getTarea()=" + getTarea()
				+ ", getEstado()=" + getEstado() + ", getMatriculaGteDistrito()=" + getMatriculaGteDistrito()
				+ ", getPresupuestoHabilitado()=" + getPresupuestoHabilitado() + ", getIncluyeAlojamiento()="
				+ getIncluyeAlojamiento() + ", getIncluyeTraslado()=" + getIncluyeTraslado()
				+ ", getIncluyeInscripcion()=" + getIncluyeInscripcion() + ", getSeleccionAlojamientoPresupuesto()="
				+ getSeleccionAlojamientoPresupuesto() + ", getSeleccionTrasladoPresupuesto()="
				+ getSeleccionTrasladoPresupuesto() + ", getSeleccionInscripcionoPresupuesto()="
				+ getSeleccionInscripcionoPresupuesto() + ", getMesInversion()=" + getMesInversion()
				+ ", getDelegado()=" + getDelegado() + ", getTipoInversion()=" + getTipoInversion() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
}
