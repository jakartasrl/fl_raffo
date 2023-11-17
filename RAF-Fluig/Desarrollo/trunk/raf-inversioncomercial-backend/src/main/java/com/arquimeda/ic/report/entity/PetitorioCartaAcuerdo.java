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

@Entity
@Table(name="Z_RAF_PETITORIO_CARTA_ACUERDO")
public class PetitorioCartaAcuerdo extends BaseEntity {
	
	public enum Estado {
		PENDIENTE,
		APROBADA,
		RECHAZADA,
		CANCELADA;
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="NUMERO_SOLICITUD")
	private Integer numeroSolicitud;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_SOLICITUD")
	private Date fechaSolicitud;
	
	@Column(name="SOLICITANTE")
	private String solicitante;
	
	@Column(name="MATRICULA_SOLICITANTE")
	private String matriculaSolicitante;
	
	@Column(name="MAIL_SOLICITANTE")
	private String mailSolicitante;
	
	@Column(name="NOMBRE_APM")
	private String nombreAPM;
	
	@Column(name="MATRICULA_APM")
	private String matriculaAPM;
	
	@Column(name="LINEA_REGION")
	private String lineaRegion;	
	
	@Column(name="LINEA_REGION_CODIGO")
	private String lineaRegionCodigo;
	
	@Column(name="COD_GRUPO_SOLICITANTE")
	private String codGrupoSolicitante;
	
	@Column(name="COD_GRUPO_ASISTENTE_DISTRITO")
	private String codGrupoAsistDistrito;
	
	@Column(name="AREA_DESCRIPCION")
	private String area;
	
	@Column(name="AREA_CODIGO")
	private String areaCodigo;
	
	@Column(name="COD_GRUPO_GTE_AREA")
	private String codGrupoGteArea;
	
	@Column(name="COD_GRUPO_GTE_PROMOCION")
	private String codGrupoGtePromocion;
	
	@Column(name="GRUPO_GTE_MKT")
	private String grupoGteMKT;
	
	@Column(name="COD_GRUPO_GTE_MKT")
	private String codGrupoGteMKT;
		
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA")
	private Date fecha;
	
	@Column(name="APELLIDO")
	private String apellido;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="TIPO_INVERSION")
	private String tipoInversion;
	
	@Column(name="TIPO_INVERSION_CODIGO")
	private String tipoInversionCodigo;

	@Size(max=4000)
	@Column(name="DETALLE_INVERSION", length=4000)
	private String detalleInversion;

	@Temporal(TemporalType.DATE)
	@Column(name="MES_INVERSION")
	private Date mesInversion;

	@Column(name="TIPO_PRODUCTO")
	private String tipoProducto;
	
	@Column(name="TIPO_PRODUCTO_CODIGO")
	private String tipoProductoCodigo;
	
	@Column(name="GRUPO_DERIVACION")
	private String grupoDerivacion;
	
	@Column(name="CODIGO_GRUPO_DERIVACION")
	private String codGrupoDerivacion;
	
	@Size(max=4000)
	@Column(name="MOTIVO_RECHAZO", length=4000)
	private String motivoRechazo;
	
	@Enumerated(EnumType.STRING)
	@Column(name="ESTADO")
	private Estado estado;

	@Column(name="TAREA")
	private String tarea;
	
	@Column(name="ES_GTE_DISTRITO")
	private Boolean esGteDistrito;
	
	@Column(name="CARPETA_ADJUNTOS_ID")
	private String carpetaAdjuntosId;
	
	
	public PetitorioCartaAcuerdo() {
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

	public Boolean getEsGteDistrito() {
		return esGteDistrito;
	}

	public void setEsGteDistrito(Boolean esGteDistrito) {
		this.esGteDistrito = esGteDistrito;
	}

	public String getCarpetaAdjuntosId() {
		return carpetaAdjuntosId;
	}

	public void setCarpetaAdjuntosId(String carpetaAdjuntosId) {
		this.carpetaAdjuntosId = carpetaAdjuntosId;
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
		PetitorioCartaAcuerdo other = (PetitorioCartaAcuerdo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}	
}
