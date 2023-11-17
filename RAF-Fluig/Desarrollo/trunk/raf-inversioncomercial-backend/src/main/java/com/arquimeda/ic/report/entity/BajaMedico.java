package com.arquimeda.ic.report.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import com.arquimeda.ic.fdn.entity.BaseEntity;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;

@Entity
@Table(name="Z_RAF_BAJA_MEDICO")
public class BajaMedico extends BaseEntity {
	
	public enum Estado {
		PENDIENTE,
		FINALIZADA;
	}
	
	@Id
	@Column(nullable=false, name="ID")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="NUMERO_SOLICITUD")
	private Integer numeroSolicitud;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_SOLICITUD")
	private Date fechaSolicitud;
	
	@Column(name="MATRICULA_SOLICITANTE")
	private String matriculaSolicitante;
	
	@Column(name="AREA_CODIGO")
	private String areaCodigo;
	
	@Column(name="AREA_DESCRIPCION")
	private String areaDescripcion;

	@Column(name="COD_GRUPO_GTE_AREA")
	private String codGrupoGteArea;
		
	@Column(name="DISTRITO_CODIGO")
	private String distritoCodigo;
	
	@Column(name="DITRITO_DESCRIPCION")
	private String distritoDescripcion;
	
	@Column(name="COD_GRUPO_GTE_DISTRITO")
	private String codGrupoGteDistrito;
	
	@Column(name="COD_GRUPO_ASISTENTE_DISTRITO")
	private String codGrupoAsistenteDistrito;
	
	@Column(name="COD_GRUPO_GTE_PROMOCION")
	private String codGrupoGtePromocion;
	
	@Column(name="SOLICITANTE")
	private String solicitante;
	
	@Column(name="NOMBRE_APM")
	private String nombreAPM;
	
	@Column(name="MATRICULA_APM")
	private String matriculaAPM;
	
	@Column(name="EMAIL_APM")
	private String emailAPM;
	
	@Enumerated(EnumType.STRING)
	@Column(name="TIPO_INVERSION")
	private TipoInversion tipoInversion;
	
	@Column(name="APELLIDO")
	private String apellido;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="CUIT")
	private String cuit;
	
	@Column(name="NOMBRE_CONGRESO")
	private String nombreCongreso;
	
	@Column(name="LUGAR_CONGRESO")
	private String lugarCongreso;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_DESDE_CONGRESO")
	private Date fechaDesdeCongreso;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_HASTA_CONGRESO")
	private Date fechaHastaCongreso;
	
	@Size(max=1000)
	@Column(name="MOTIVO_BAJA", length=1000)
	private String motivoBaja;
	
	@Enumerated(EnumType.STRING)
	@Column(name="ESTADO")
	private Estado estado;

	@Column(name="TAREA")
	private String tarea;
	
	@Column(name="MATRICULA_GTE_DISTRITO")
	private String matriculaGteDistrito;
	
	@Column(name="INCLUYE_ALOJAMIENTO")
	private String incluyeAlojamiento;
	
	@Column(name="INCLUYE_TRASLADO")
	private String incluyeTraslado;
	
	@Column(name="INCLUYE_INSCRIPCION")
	private String incluyeInscripcion;
	
	@Enumerated(EnumType.STRING)
	@Column(name="SELECCION_ALOJAMIENTO_PRESUPUESTO")
	private PresupuestoHabilitado seleccionAlojamientoPresupuesto;
	
	@Enumerated(EnumType.STRING)
	@Column(name="SELECCION_TRASLADO_PRESUPUESTO")
	private PresupuestoHabilitado seleccionTrasladoPresupuesto;
	
	@Enumerated(EnumType.STRING)
	@Column(name="SELECCION_INSCRIPCION_PRESUPUESTO")
	private PresupuestoHabilitado seleccionInscripcionoPresupuesto;

	@Temporal(TemporalType.DATE)
	@Column(name="MES_INVERSION")
	private Date mesInversion;
	
	@Column(name="DELEGADO")
	private Boolean delegado;

	public BajaMedico() {
		setEstado(Estado.PENDIENTE);
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

	public TipoInversion getTipoInversion() {
		return tipoInversion;
	}

	public void setTipoInversion(TipoInversion tipoInversion) {
		this.tipoInversion = tipoInversion;
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

	public String getMatriculaGteDistrito() {
		return matriculaGteDistrito;
	}

	public void setMatriculaGteDistrito(String matriculaGteDistrito) {
		this.matriculaGteDistrito = matriculaGteDistrito;
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

	public PresupuestoHabilitado getSeleccionAlojamientoPresupuesto() {
		return seleccionAlojamientoPresupuesto;
	}

	public void setSeleccionAlojamientoPresupuesto(PresupuestoHabilitado seleccionAlojamientoPresupuesto) {
		this.seleccionAlojamientoPresupuesto = seleccionAlojamientoPresupuesto;
	}

	public PresupuestoHabilitado getSeleccionTrasladoPresupuesto() {
		return seleccionTrasladoPresupuesto;
	}

	public void setSeleccionTrasladoPresupuesto(PresupuestoHabilitado seleccionTrasladoPresupuesto) {
		this.seleccionTrasladoPresupuesto = seleccionTrasladoPresupuesto;
	}

	public PresupuestoHabilitado getSeleccionInscripcionoPresupuesto() {
		return seleccionInscripcionoPresupuesto;
	}

	public void setSeleccionInscripcionoPresupuesto(PresupuestoHabilitado seleccionInscripcionoPresupuesto) {
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BajaMedico other = (BajaMedico) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
