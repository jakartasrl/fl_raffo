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
@Table(name="Z_RAF_CARTA_ACUERDO")
public class CartaAcuerdo extends BaseEntity {
	
	public enum Estado {
		PENDIENTE,
		AUDITADA,
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
	
	@Column(name="MAIL_GTE_DISTRITO")
	private String mailGteDistrito;
	
	@Column(name="NRO_INVERSION_COMERCIAL")
	private Integer nroInversionComercial;
	
	@Column(name="AREA_CODIGO")
	private String areaCodigo;
	
	@Column(name="AREA_DESCRIPCION")
	private String areaDescripcion;
	
	@Column(name="DISTRITO_CODIGO")
	private String distritoCodigo;
	
	@Column(name="DITRITO_DESCRIPCION")
	private String distritoDescripcion;
	
	@Column(name="COD_GRUPO_GTE_DISTRITO")
	private String codGrupoGteDistrito;
	
	@Column(name="GRUPO_GTE_DISTRITO")
	private String grupoGteDistrito;
	
	@Column(name="NOMBRE_APM")
	private String nombreAPM;
	
	@Column(name="MATRICULA_APM")
	private String matriculaAPM;
	
	@Column(name="EMAIL_APM")
	private String emailAPM;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA")
	private Date fecha;
	
	@Column(name="APELLIDO")
	private String apellido;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Enumerated(EnumType.STRING)
	@Column(name="TIPO_INVERSION")
	private TipoInversion tipoInversion;

	@Temporal(TemporalType.DATE)
	@Column(name="MES_INVERSION")
	private Date mesInversion;
	
	@Column(name="FORMA_PAGO")
	private String formaPago;
	
	@Column(name="COD_FORMA_PAGO")
	private String codFormaPago;

	@Size(max=1000)
	@Column(name="MOTIVO_RECHAZO", length=1000)
	private String motivoRechazo;
	
	@Enumerated(EnumType.STRING)
	@Column(name="ESTADO")
	private Estado estado;

	@Column(name="TAREA")
	private String tarea;
	
	@Column(name="GTE_DISTRITO")
	private String gteDistrito;
	
	@Column(name="COD_GRUPO_GTE_AREA")
	private String codGrupoGteArea;
	
	@Column(name="COD_GRUPO_GTE_PROMOCION")
	private String codGrupoGtePromocion;
	
	@Column(name="COD_GRUPO_ASISTENTE_DISTRITO")
	private String codGrupoAsistenteDistrito;
	
	@Column(name="NOMBRE_CONGRESO")
	private String nombreCongreso;
	
	@Size(max=4000)
	@Column(name="COMENTARIOS_CONGRESO", length = 4000)
	private String comentariosCongreso;
	
	@Size(max=1000)
	@Column(name="CARTA_PETITORIO_ARCHIVO", length = 1000)
	private String cartaPetitorioDescripcion;
	
	@Column(name="CARTA_PETITORIO_DOC_ID")
	private String cartaPetitorioDocumentId;
	
	@Size(max=1000)
	@Column(name="CARTA_ACUERDO_ARCHIVO", length = 1000)
	private String cartaAcuerdoDescripcion;
	
	@Column(name="CARTA_ACUERDO_DOC_ID")
	private String cartaAcuerdoDocumentId;
	
	@Size(max=1000)
	@Column(name="FLYER_ARCHIVO", length = 1000)
	private String flyerDescripcion;
	
	@Column(name="FLYER_DOC_ID")
	private String flyerDocumentId;

	@Size(max=4000)
	@Column(name="WEB", length=4000)
	private String web;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_FIN_SOLICITUD")
	private Date fechaFinSolicitud;
	
	@Column(name="DELEGADO")
	private Boolean delegado;
	
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
	
	public CartaAcuerdo() {
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

	public String getMailGteDistrito() {
		return mailGteDistrito;
	}

	public void setMailGteDistrito(String mailGteDistrito) {
		this.mailGteDistrito = mailGteDistrito;
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

	public String getCodGrupoAsistenteDistrito() {
		return codGrupoAsistenteDistrito;
	}

	public void setCodGrupoAsistenteDistrito(String codGrupoAsistenteDistrito) {
		this.codGrupoAsistenteDistrito = codGrupoAsistenteDistrito;
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

	public Boolean getDelegado() {
		return delegado;
	}

	public void setDelegado(Boolean delegado) {
		this.delegado = delegado;
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
	
}