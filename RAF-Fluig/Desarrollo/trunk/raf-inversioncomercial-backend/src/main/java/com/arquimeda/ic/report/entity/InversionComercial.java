package com.arquimeda.ic.report.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import com.arquimeda.ic.fdn.entity.BaseEntity;
import com.arquimeda.ic.parameters.biz.entity.Congreso;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;

@Entity
@Table(name="Z_RAF_INVERSION_COMERCIAL")
public class InversionComercial extends BaseEntity {
	
	public enum Estado {
		PENDIENTE,
		APROBADA,
		FINALIZADA,
		RECHAZADA,
		CARTA_ACUERDO_RECHAZADA,
		CANCELADA,
		BAJA_MEDICO;
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
	
	@Column(name="ES_APM")
	private Boolean esAPM;
	
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
	
	@Column(name="LIMITE_APR_GTE_PROMO")
	private BigDecimal limiteAprGtePromo;
	
	@Column(name="NOTIFICACION_GERENTE")
	private String notificacionGte;
	
	@Column(name="SOLICITANTE")
	private String solicitante;
	
	@Column(name="GRUPO_GTE_DISTRITO")
	private String grupoGteDistrito;
	
	@Column(name="NOMBRE_APM")
	private String nombreAPM;
	
	@Column(name="MATRICULA_APM")
	private String matriculaAPM;
	
	@Column(name="EMAIL_APM")
	private String emailAPM;
	
	@Enumerated(EnumType.STRING)
	@Column(name="TIPO_INVERSION")
	private TipoInversion tipoInversion;

	@Column(name="CIUDAD")
	private String ciudad;
	
	@Column(name="APELLIDO")
	private String apellido;
	
	@Column(name="NOMBRE")
	private String nombre;
	
	@Column(name="DNI")
	private String dni;
	
	@Column(name="TIPO_DOCUMENTO")
	private String tipoDocumento;
	
	@Column(name="NUMERO_DOCUMENTO")
	private String numeroDocumento;
	
	@Column(name="NUMERO_PASAPORTE")
	private String numeroPasaporte;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_VTO_PASAPORTE")
	private Date fechaVtoPasaporte;
	
	@Column(name="SEXO")
	private String sexo;
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_NACIMIENTO")
	private Date fechaNacimiento;

	@Column(name="NACIONALIDAD")
	private String nacionalidad;
	
	@Column(name="DOMICILIO")
	private String domicilio;
	
	@Column(name="LOCALIDAD")
	private String localidad;
	
	@Column(name="PROVINCIA")
	private String provincia;
	
	@Column(name="PAIS")
	private String pais;
	
	@Column(name="CODIGO_POSTAL")
	private String codigoPostal;
	
	@Column(name="TELEFONO_CONTACTO")
	private String telefonoContacto;
	
	@Column(name="CELULAR")
	private String celular;
	
	@Column(name="MAIL_CONTACTO")
	private String mailContacto;
	
	@Column(name="MOTIVO_VIAJE")
	private String motivoViaje;
	
	@Column(name="ESPECIALIDAD_PROFESIONAL")
	private String especialidadProfesional;
	
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
	
	@Column(name="NOMBRE_HOTEL")
	private String nombreHotel;
	
	@Column(name="CONTACTO_HOTEL")
	private String contactoHotel;
	
	@Column(name="TELEFONO_HOTEL")
	private String telefonoHotel;	
	
	@Column(name="CHECKIN_HOTEL")
	private String checkinHotel;	
	
	@Column(name="CHECKOUT_HOTEL")
	private String checkoutHotel;	
	
	@Column(name="TIPO_HABITACION")
	private String tipoHabitacion;	
	
	@Column(name="CANTIDAD_NOCHE")
	private Integer cantidadNoche;	
	
	@Column(name="COCHERA")
	private String cochera;
	
	@Size(max=1000)
	@Column(name="ITINERARIO_IDA")
	private String itinerarioIda;	
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_IDA")
	private Date fechaIda;	
	
	@Column(name="NRO_VUELO_IDA")
	private String nroVueloIda;	
	
	@Column(name="HORA_SALIDA_IDA")
	private String horaSalidaIda;	
	
	@Size(max=1000)
	@Column(name="ITINERARIO_REGRESO")
	private String itinerarioRegreso;	
	
	@Temporal(TemporalType.DATE)
	@Column(name="FECHA_REGRESO")
	private Date fechaRegreso;	
	
	@Column(name="NRO_VUELO_REGRESO")
	private String nroVueloRegreso;	
	
	@Column(name="HORA_SALIDA_REGRESO")
	private String horaSalidaRegreso;
	
	@Column(name="TITULO_GRADO")
	private String tituloGrado;
	
	@Column(name="INSTITUCION_DODDE_OBTUVO")
	private String institucionDondeObtuvo;
	
	@Column(name="ANIO_EGRESO")
	private String anioEgreso;
	
	@Column(name="MATRICULA")
	private String matricula;
	
	@Column(name="INSTITUCION_QUE_TRABAJA")
	private String institucionQueTrabaja;
	
	@Column(name="CARGO_POSICION")
	private String cargoPosicion;
	
	@Column(name="TIPO_INSCRIPCION")
	private String tipoInscripcion;
	
	@Column(name="NOMBRE_SOCIEDAD")
	private String nombreSociedad;
	
	@Column(name="NUMERO_SOCIO")
	private String numeroSocio;
	
	@Size(max=1000)
	@Column(name="EQUIPAMIENTO")
	private String equipamiento;
	
	@Column(name="IMPORTE", precision=18,scale=2)
	private BigDecimal importe;
	
	@Column(name="IMPORTE_ARS", precision=18,scale=2)
	private BigDecimal importeARS;
	
	@Column(name="IMPORTE_USD", precision=18,scale=2)
	private BigDecimal importeUSD;
	
	@Column(name="MONEDA")
	private String moneda;
	
	@Column(name="COD_MONEDA")
	private String codMoneda;
	
	@Column(name="TIPO_CAMBIO_ARS", precision=10,scale=4)
	private BigDecimal tipoCambioARS;
	
	@Column(name="TIPO_CAMBIO_USD", precision=10,scale=4)
	private BigDecimal tipoCambioUSD;
		
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
	
	@Column(name="MATRICULA_GTE_DISTRITO")
	private String matriculaGteDistrito;
	
	@Column(name="MEMBRESIA")
	private String membresia;
	
	@Size(max=4000)
	@Column(name="COMENTARIOS_ALOJAMIENTO", length = 4000)
	private String comentariosAlojamiento;
	
	@Column(name="NOMBRE_MEDICO_1")
	private String nombreMedico1;
	
	@Column(name="NOMBRE_MEDICO_2")
	private String nombreMedico2;
	
	@Column(name="COMPARTE_HABITACION", length = 2)
	private String comparteHabitacion;
	
	@Size(max=4000)
	@Column(name="COMENTARIOS_IDA", length = 4000)
	private String comentariosIda;
	
	@Size(max=4000)
	@Column(name="COMENTARIOS_REGRESO", length = 4000)
	private String comentariosRegreso;
	
	@Size(max=10)
	@Column(name="TIPO_TRASLADO_IDA", length = 10)
	private String tipoTrasladoIda;
	
	@Size(max=10)
	@Column(name="TIPO_TRASLADO_REGRESO", length = 10)
	private String tipoTrasladoRegreso;
	
	@Column(name="CUIT")
	private String cuit;
	
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
	
	@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true)
	@JoinColumn(name="INVERSION_COMERCIAL_ID")
	private List<Imputacion> imputaciones;
		
	//Seleccion de evento congreso
	@ManyToOne
	@JoinColumn(name="CONGRESO_ID")
	private Congreso congreso;
	
	@Column(name="DIAS_LIMITE_CARGA")
	private Integer diasLimiteCarga;
	
	@Enumerated(EnumType.STRING)
	@Column(name="PRESUPUESTO_HABILITADO")
	private PresupuestoHabilitado presupuestoHabilitado;
	
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
	@Column(name="MES_INVERSION")
	private Date mesInversion;
	
	@Column(name="DELEGADO")
	private Boolean delegado;
	
	@Column(name="MONTO_INVERSION", precision=18,scale=2)
	private BigDecimal montoInversion;
	
	@Column(name="CONTACTO_MEDICO_1")
	private String contactoMedico1;
	
	@Column(name="CONTACTO_MEDICO_2")
	private String contactoMedico2;
	
	public InversionComercial() {
		imputaciones = new ArrayList<Imputacion>();
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



	public Boolean getEsAPM() {
		return esAPM;
	}



	public void setEsAPM(Boolean esAPM) {
		this.esAPM = esAPM;
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



	public BigDecimal getLimiteAprGtePromo() {
		return limiteAprGtePromo;
	}



	public void setLimiteAprGtePromo(BigDecimal limiteAprGtePromo) {
		this.limiteAprGtePromo = limiteAprGtePromo;
	}



	public String getNotificacionGte() {
		return notificacionGte;
	}



	public void setNotificacionGte(String notificacionGte) {
		this.notificacionGte = notificacionGte;
	}



	public String getSolicitante() {
		return solicitante;
	}



	public void setSolicitante(String solicitante) {
		this.solicitante = solicitante;
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



	public TipoInversion getTipoInversion() {
		return tipoInversion;
	}



	public void setTipoInversion(TipoInversion tipoInversion) {
		this.tipoInversion = tipoInversion;
	}



	public String getCiudad() {
		return ciudad;
	}



	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
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



	public String getDni() {
		return dni;
	}



	public void setDni(String dni) {
		this.dni = dni;
	}



	public String getTipoDocumento() {
		return tipoDocumento;
	}



	public void setTipoDocumento(String tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}



	public String getNumeroDocumento() {
		return numeroDocumento;
	}



	public void setNumeroDocumento(String numeroDocumento) {
		this.numeroDocumento = numeroDocumento;
	}



	public String getNumeroPasaporte() {
		return numeroPasaporte;
	}



	public void setNumeroPasaporte(String numeroPasaporte) {
		this.numeroPasaporte = numeroPasaporte;
	}



	public Date getFechaVtoPasaporte() {
		return fechaVtoPasaporte;
	}



	public void setFechaVtoPasaporte(Date fechaVtoPasaporte) {
		this.fechaVtoPasaporte = fechaVtoPasaporte;
	}



	public String getSexo() {
		return sexo;
	}



	public void setSexo(String sexo) {
		this.sexo = sexo;
	}



	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}



	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}



	public String getNacionalidad() {
		return nacionalidad;
	}



	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}



	public String getDomicilio() {
		return domicilio;
	}



	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}



	public String getLocalidad() {
		return localidad;
	}



	public void setLocalidad(String localidad) {
		this.localidad = localidad;
	}



	public String getProvincia() {
		return provincia;
	}



	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}



	public String getPais() {
		return pais;
	}



	public void setPais(String pais) {
		this.pais = pais;
	}



	public String getCodigoPostal() {
		return codigoPostal;
	}



	public void setCodigoPostal(String codigoPostal) {
		this.codigoPostal = codigoPostal;
	}



	public String getTelefonoContacto() {
		return telefonoContacto;
	}



	public void setTelefonoContacto(String telefonoContacto) {
		this.telefonoContacto = telefonoContacto;
	}



	public String getCelular() {
		return celular;
	}



	public void setCelular(String celular) {
		this.celular = celular;
	}



	public String getMailContacto() {
		return mailContacto;
	}



	public void setMailContacto(String mailContacto) {
		this.mailContacto = mailContacto;
	}



	public String getMotivoViaje() {
		return motivoViaje;
	}



	public void setMotivoViaje(String motivoViaje) {
		this.motivoViaje = motivoViaje;
	}



	public String getEspecialidadProfesional() {
		return especialidadProfesional;
	}



	public void setEspecialidadProfesional(String especialidadProfesional) {
		this.especialidadProfesional = especialidadProfesional;
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



	public String getNombreHotel() {
		return nombreHotel;
	}



	public void setNombreHotel(String nombreHotel) {
		this.nombreHotel = nombreHotel;
	}



	public String getContactoHotel() {
		return contactoHotel;
	}



	public void setContactoHotel(String contactoHotel) {
		this.contactoHotel = contactoHotel;
	}



	public String getTelefonoHotel() {
		return telefonoHotel;
	}



	public void setTelefonoHotel(String telefonoHotel) {
		this.telefonoHotel = telefonoHotel;
	}



	public String getCheckinHotel() {
		return checkinHotel;
	}



	public void setCheckinHotel(String checkinHotel) {
		this.checkinHotel = checkinHotel;
	}



	public String getCheckoutHotel() {
		return checkoutHotel;
	}



	public void setCheckoutHotel(String checkoutHotel) {
		this.checkoutHotel = checkoutHotel;
	}



	public String getTipoHabitacion() {
		return tipoHabitacion;
	}



	public void setTipoHabitacion(String tipoHabitacion) {
		this.tipoHabitacion = tipoHabitacion;
	}



	public Integer getCantidadNoche() {
		return cantidadNoche;
	}



	public void setCantidadNoche(Integer cantidadNoche) {
		this.cantidadNoche = cantidadNoche;
	}



	public String getCochera() {
		return cochera;
	}



	public void setCochera(String cochera) {
		this.cochera = cochera;
	}



	public String getItinerarioIda() {
		return itinerarioIda;
	}



	public void setItinerarioIda(String itinerarioIda) {
		this.itinerarioIda = itinerarioIda;
	}



	public Date getFechaIda() {
		return fechaIda;
	}



	public void setFechaIda(Date fechaIda) {
		this.fechaIda = fechaIda;
	}



	public String getNroVueloIda() {
		return nroVueloIda;
	}



	public void setNroVueloIda(String nroVueloIda) {
		this.nroVueloIda = nroVueloIda;
	}



	public String getHoraSalidaIda() {
		return horaSalidaIda;
	}



	public void setHoraSalidaIda(String horaSalidaIda) {
		this.horaSalidaIda = horaSalidaIda;
	}



	public String getItinerarioRegreso() {
		return itinerarioRegreso;
	}



	public void setItinerarioRegreso(String itinerarioRegreso) {
		this.itinerarioRegreso = itinerarioRegreso;
	}



	public Date getFechaRegreso() {
		return fechaRegreso;
	}



	public void setFechaRegreso(Date fechaRegreso) {
		this.fechaRegreso = fechaRegreso;
	}



	public String getNroVueloRegreso() {
		return nroVueloRegreso;
	}



	public void setNroVueloRegreso(String nroVueloRegreso) {
		this.nroVueloRegreso = nroVueloRegreso;
	}



	public String getHoraSalidaRegreso() {
		return horaSalidaRegreso;
	}



	public void setHoraSalidaRegreso(String horaSalidaRegreso) {
		this.horaSalidaRegreso = horaSalidaRegreso;
	}



	public String getTituloGrado() {
		return tituloGrado;
	}



	public void setTituloGrado(String tituloGrado) {
		this.tituloGrado = tituloGrado;
	}



	public String getInstitucionDondeObtuvo() {
		return institucionDondeObtuvo;
	}



	public void setInstitucionDondeObtuvo(String institucionDondeObtuvo) {
		this.institucionDondeObtuvo = institucionDondeObtuvo;
	}



	public String getAnioEgreso() {
		return anioEgreso;
	}



	public void setAnioEgreso(String anioEgreso) {
		this.anioEgreso = anioEgreso;
	}



	public String getMatricula() {
		return matricula;
	}



	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}



	public String getInstitucionQueTrabaja() {
		return institucionQueTrabaja;
	}



	public void setInstitucionQueTrabaja(String institucionQueTrabaja) {
		this.institucionQueTrabaja = institucionQueTrabaja;
	}



	public String getCargoPosicion() {
		return cargoPosicion;
	}



	public void setCargoPosicion(String cargoPosicion) {
		this.cargoPosicion = cargoPosicion;
	}



	public String getTipoInscripcion() {
		return tipoInscripcion;
	}



	public void setTipoInscripcion(String tipoInscripcion) {
		this.tipoInscripcion = tipoInscripcion;
	}



	public String getNombreSociedad() {
		return nombreSociedad;
	}



	public void setNombreSociedad(String nombreSociedad) {
		this.nombreSociedad = nombreSociedad;
	}



	public String getNumeroSocio() {
		return numeroSocio;
	}



	public void setNumeroSocio(String numeroSocio) {
		this.numeroSocio = numeroSocio;
	}



	public String getEquipamiento() {
		return equipamiento;
	}



	public void setEquipamiento(String equipamiento) {
		this.equipamiento = equipamiento;
	}



	public BigDecimal getImporte() {
		return importe;
	}



	public void setImporte(BigDecimal importe) {
		this.importe = importe;
	}



	public BigDecimal getImporteARS() {
		return importeARS;
	}



	public void setImporteARS(BigDecimal importeARS) {
		this.importeARS = importeARS;
	}



	public BigDecimal getImporteUSD() {
		return importeUSD;
	}



	public void setImporteUSD(BigDecimal importeUSD) {
		this.importeUSD = importeUSD;
	}



	public String getMoneda() {
		return moneda;
	}



	public void setMoneda(String moneda) {
		this.moneda = moneda;
	}



	public String getCodMoneda() {
		return codMoneda;
	}



	public void setCodMoneda(String codMoneda) {
		this.codMoneda = codMoneda;
	}



	public BigDecimal getTipoCambioARS() {
		return tipoCambioARS;
	}



	public void setTipoCambioARS(BigDecimal tipoCambioARS) {
		this.tipoCambioARS = tipoCambioARS;
	}



	public BigDecimal getTipoCambioUSD() {
		return tipoCambioUSD;
	}



	public void setTipoCambioUSD(BigDecimal tipoCambioUSD) {
		this.tipoCambioUSD = tipoCambioUSD;
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



	public String getMatriculaGteDistrito() {
		return matriculaGteDistrito;
	}



	public void setMatriculaGteDistrito(String matriculaGteDistrito) {
		this.matriculaGteDistrito = matriculaGteDistrito;
	}



	public String getMembresia() {
		return membresia;
	}



	public void setMembresia(String membresia) {
		this.membresia = membresia;
	}



	public String getComentariosAlojamiento() {
		return comentariosAlojamiento;
	}



	public void setComentariosAlojamiento(String comentariosAlojamiento) {
		this.comentariosAlojamiento = comentariosAlojamiento;
	}

	public String getNombreMedico1() {
		return nombreMedico1;
	}



	public void setNombreMedico1(String nombreMedico1) {
		this.nombreMedico1 = nombreMedico1;
	}



	public String getNombreMedico2() {
		return nombreMedico2;
	}



	public void setNombreMedico2(String nombreMedico2) {
		this.nombreMedico2 = nombreMedico2;
	}



	public String getComparteHabitacion() {
		return comparteHabitacion;
	}



	public void setComparteHabitacion(String comparteHabitacion) {
		this.comparteHabitacion = comparteHabitacion;
	}



	public String getComentariosIda() {
		return comentariosIda;
	}



	public void setComentariosIda(String comentariosIda) {
		this.comentariosIda = comentariosIda;
	}



	public String getComentariosRegreso() {
		return comentariosRegreso;
	}



	public void setComentariosRegreso(String comentariosRegreso) {
		this.comentariosRegreso = comentariosRegreso;
	}



	public String getTipoTrasladoIda() {
		return tipoTrasladoIda;
	}



	public void setTipoTrasladoIda(String tipoTrasladoIda) {
		this.tipoTrasladoIda = tipoTrasladoIda;
	}



	public String getTipoTrasladoRegreso() {
		return tipoTrasladoRegreso;
	}



	public void setTipoTrasladoRegreso(String tipoTrasladoRegreso) {
		this.tipoTrasladoRegreso = tipoTrasladoRegreso;
	}



	public String getCuit() {
		return cuit;
	}



	public void setCuit(String cuit) {
		this.cuit = cuit;
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



	public List<Imputacion> getImputaciones() {
		return imputaciones;
	}



	public void setImputaciones(List<Imputacion> imputaciones) {
		this.imputaciones = imputaciones;
	}



	public Congreso getCongreso() {
		return congreso;
	}



	public void setCongreso(Congreso congreso) {
		this.congreso = congreso;
	}



	public Integer getDiasLimiteCarga() {
		return diasLimiteCarga;
	}



	public void setDiasLimiteCarga(Integer diasLimiteCarga) {
		this.diasLimiteCarga = diasLimiteCarga;
	}



	public PresupuestoHabilitado getPresupuestoHabilitado() {
		return presupuestoHabilitado;
	}



	public void setPresupuestoHabilitado(PresupuestoHabilitado presupuestoHabilitado) {
		this.presupuestoHabilitado = presupuestoHabilitado;
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

	public BigDecimal getMontoInversion() {
		return montoInversion;
	}



	public void setMontoInversion(BigDecimal montoInversion) {
		this.montoInversion = montoInversion;
	}



	public String getContactoMedico1() {
		return contactoMedico1;
	}



	public void setContactoMedico1(String contactoMedico1) {
		this.contactoMedico1 = contactoMedico1;
	}



	public String getContactoMedico2() {
		return contactoMedico2;
	}



	public void setContactoMedico2(String contactoMedico2) {
		this.contactoMedico2 = contactoMedico2;
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
		InversionComercial other = (InversionComercial) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
