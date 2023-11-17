package com.arquimeda.ic.report.boundary.dto;

import java.math.BigDecimal;
import java.util.Date;

import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.arquimeda.ic.report.entity.Imputacion;
import com.arquimeda.ic.report.entity.InversionComercial;
import com.arquimeda.ic.report.entity.InversionComercial.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;

public class ReporteExportInversionComercialDTO {
	
	private Integer id;
	private Integer numeroSolicitud;
	private Date fechaSolicitud;
	private String matriculaSolicitante;
	private Boolean esAPM;
	private String areaCodigo;
	private String areaDescripcion;
	private String codGrupoGteArea;
	private String distritoCodigo;
	private String distritoDescripcion;
	private String codGrupoGteDistrito;
	private String codGrupoAsistenteDistrito;
	private String codGrupoGtePromocion;
	private BigDecimal limiteAprGtePromo;
	private String notificacionGte;
	private String solicitante;
	private String grupoGteDistrito;
	private String nombreAPM;
	private String matriculaAPM;
	private String emailAPM;
	private TipoInversion tipoInversion;
	private String ciudad;
	private String apellido;
	private String nombre;
	private String dni;
	private String tipoDocumento;
	private String numeroDocumento;
	private String numeroPasaporte;
	private Date fechaVtoPasaporte;
	private String sexo;
	private Date fechaNacimiento;
	private String nacionalidad;
	private String domicilio;
	private String localidad;
	private String provincia;
	private String pais;
	private String codigoPostal;
	private String telefonoContacto;
	private String celular;
	private String mailContacto;
	private String motivoViaje;
	private String especialidadProfesional;
	private String nombreCongreso;
	private String lugarCongreso;
	private Date fechaDesdeCongreso;
	private Date fechaHastaCongreso;
	private String nombreHotel;
	private String contactoHotel;
	private String telefonoHotel;	
	private String checkinHotel;	
	private String checkoutHotel;	
	private String tipoHabitacion;	
	private Integer cantidadNoche;	
	private String cochera;
	private String itinerarioIda;	
	private Date fechaIda;	
	private String nroVueloIda;	
	private String horaSalidaIda;	
	private String itinerarioRegreso;	
	private Date fechaRegreso;	
	private String nroVueloRegreso;	
	private String horaSalidaRegreso;
	private String tituloGrado;
	private String institucionDondeObtuvo;
	private String anioEgreso;
	private String matricula;
	private String institucionQueTrabaja;
	private String cargoPosicion;
	private String tipoInscripcion;
	private String nombreSociedad;
	private String numeroSocio;
	private String equipamiento;
	private BigDecimal importe;
	private BigDecimal importeARS;
	private BigDecimal importeUSD;
	private String moneda;
	private String codMoneda;
	private BigDecimal tipoCambioARS;
	private BigDecimal tipoCambioUSD;
	private String formaPago;
	private String codFormaPago;
	private String motivoRechazo;
	private String tarea;
	private Estado estado;
	private String membresia;
	private String comentariosAlojamiento;
	private String nombreMedico1;
	private String nombreMedico2;
	private String comparteHabitacion;
	private String comentariosIda;
	private String comentariosRegreso;
	private String tipoTrasladoIda;
	private String tipoTrasladoRegreso;
	private String cuit;
	private String contactoMedico1;
	private String contactoMedico2;
	private String incluyeAlojamiento;
	private String incluyeTraslado;
	private String incluyeInscripcion;
	private PresupuestoHabilitado seleccionAlojamientoPresupuesto;
	private PresupuestoHabilitado seleccionTrasladoPresupuesto;
	private PresupuestoHabilitado seleccionInscripcionoPresupuesto;
	
	private String comentariosCongreso;
	private String cartaPetitorioDescripcion;
	private String cartaPetitorioDocumentId;
	private String cartaAcuerdoDescripcion;
	private String cartaAcuerdoDocumentId;
	private String flyerDescripcion;
	private String flyerDocumentId;
	private String web;
	private Date mesInversion;
	private BigDecimal montoInversion;
	
	private String codigoProducto;
	private String producto;
	private BigDecimal porcentaje;
	private BigDecimal presupuestoARS;
	private BigDecimal consumidoARS;
	
	public ReporteExportInversionComercialDTO(){
	}
	
	public ReporteExportInversionComercialDTO (InversionComercial cabecera, Imputacion detalle) {
		
		setId(cabecera.getId());
		setNumeroSolicitud(cabecera.getNumeroSolicitud());
		setFechaSolicitud(cabecera.getFechaSolicitud());
		setMatriculaSolicitante(cabecera.getMatriculaSolicitante());
		setEsAPM(cabecera.getEsAPM());
		setCodGrupoGteArea(cabecera.getCodGrupoGteArea());
		setDistritoCodigo(cabecera.getDistritoCodigo());
		setCodGrupoGteDistrito(cabecera.getCodGrupoGteDistrito());
		setCodGrupoAsistenteDistrito(cabecera.getCodGrupoAsistenteDistrito());
		setCodGrupoGtePromocion(cabecera.getCodGrupoGtePromocion());
		setLimiteAprGtePromo(cabecera.getLimiteAprGtePromo());
		setNotificacionGte(cabecera.getNotificacionGte());
		setSolicitante(cabecera.getSolicitante());
		setAreaCodigo(cabecera.getAreaCodigo());
		setAreaDescripcion(cabecera.getAreaDescripcion());
		setDistritoCodigo(cabecera.getDistritoCodigo());
		setDistritoDescripcion(cabecera.getDistritoDescripcion());
		setGrupoGteDistrito(cabecera.getGrupoGteDistrito());
		setNombreAPM(cabecera.getNombreAPM());
		setMatriculaAPM(cabecera.getMatriculaAPM());
		setEmailAPM(cabecera.getEmailAPM());
		setTipoInversion(cabecera.getTipoInversion());
		setCiudad(cabecera.getCiudad());
		setApellido(cabecera.getApellido());
		setNombre(cabecera.getNombre());
		setDni(cabecera.getDni());
		setTipoDocumento(cabecera.getTipoDocumento());
		setNumeroDocumento(cabecera.getNumeroDocumento());
		setNumeroPasaporte(cabecera.getNumeroPasaporte());
		setFechaVtoPasaporte(cabecera.getFechaVtoPasaporte());
		setSexo(cabecera.getSexo());
		setFechaNacimiento(cabecera.getFechaNacimiento());
		setNacionalidad(cabecera.getNacionalidad());
		setDomicilio(cabecera.getDomicilio());
		setLocalidad(cabecera.getLocalidad());
		setProvincia(cabecera.getProvincia());
		setPais(cabecera.getPais());
		setCodigoPostal(cabecera.getCodigoPostal());
		setTelefonoContacto(cabecera.getTelefonoContacto());
		setCelular(cabecera.getCelular());
		setMailContacto(cabecera.getMailContacto());
		setMotivoViaje(cabecera.getMotivoViaje());
		setEspecialidadProfesional(cabecera.getEspecialidadProfesional());
		setNombreCongreso(cabecera.getNombreCongreso());
		setLugarCongreso(cabecera.getLugarCongreso());
		setFechaDesdeCongreso(cabecera.getFechaDesdeCongreso());
		setFechaHastaCongreso(cabecera.getFechaHastaCongreso());
		setNombreHotel(cabecera.getNombreHotel());
		setContactoHotel(cabecera.getContactoHotel());
		setTelefonoHotel(cabecera.getTelefonoHotel());
		setCheckinHotel(cabecera.getCheckinHotel());
		setCheckoutHotel(cabecera.getCheckoutHotel());
		setTipoHabitacion(cabecera.getTipoHabitacion());
		setCantidadNoche(cabecera.getCantidadNoche());
		setCochera(cabecera.getCochera());
		setItinerarioIda(cabecera.getItinerarioIda());
		setFechaIda(cabecera.getFechaIda());
		setNroVueloIda(cabecera.getNroVueloIda());
		setHoraSalidaIda(cabecera.getHoraSalidaIda());
		setItinerarioRegreso(cabecera.getItinerarioRegreso());
		setFechaRegreso(cabecera.getFechaRegreso());
		setNroVueloRegreso(cabecera.getNroVueloRegreso());
		setHoraSalidaRegreso(cabecera.getHoraSalidaRegreso());
		setTituloGrado(cabecera.getTituloGrado());
		setInstitucionDondeObtuvo(cabecera.getInstitucionDondeObtuvo());
		setAnioEgreso(cabecera.getAnioEgreso());
		setMatricula(cabecera.getMatricula());
		setInstitucionQueTrabaja(cabecera.getInstitucionQueTrabaja());
		setCargoPosicion(cabecera.getCargoPosicion());
		setTipoInscripcion(cabecera.getTipoInscripcion());
		setNombreSociedad(cabecera.getNombreSociedad());
		setNumeroSocio(cabecera.getNumeroSocio());
		setEquipamiento(cabecera.getEquipamiento());
		setImporte(cabecera.getImporte());
		setImporteARS(cabecera.getImporteARS());
		setImporteUSD(cabecera.getImporteUSD());
		setMoneda(cabecera.getMoneda());
		setCodMoneda(cabecera.getCodMoneda());
		setTipoCambioARS(cabecera.getTipoCambioARS());
		setTipoCambioUSD(cabecera.getTipoCambioUSD());
		setFormaPago(cabecera.getFormaPago());
		setCodFormaPago(cabecera.getCodFormaPago());
		setMotivoRechazo(cabecera.getMotivoRechazo());
		setTarea(cabecera.getTarea());
		setEstado(cabecera.getEstado());
		setMembresia(cabecera.getMembresia());
		setComentariosAlojamiento(cabecera.getComentariosAlojamiento());
		setNombreMedico1(cabecera.getNombreMedico1());
		setNombreMedico2(cabecera.getNombreMedico2());
		setComparteHabitacion(cabecera.getComparteHabitacion());
		setComentariosIda(cabecera.getComentariosIda());
		setComentariosRegreso(cabecera.getComentariosRegreso());
		setTipoTrasladoIda(cabecera.getTipoTrasladoIda());
		setTipoTrasladoRegreso(cabecera.getTipoTrasladoRegreso());
		setCuit(cabecera.getCuit());
		setIncluyeAlojamiento(cabecera.getIncluyeAlojamiento());
		setIncluyeTraslado(cabecera.getIncluyeTraslado());
		setIncluyeInscripcion(cabecera.getIncluyeInscripcion());
		setSeleccionAlojamientoPresupuesto(cabecera.getSeleccionAlojamientoPresupuesto());
		setSeleccionTrasladoPresupuesto(cabecera.getSeleccionTrasladoPresupuesto());
		setSeleccionInscripcionoPresupuesto(cabecera.getSeleccionTrasladoPresupuesto());
		setComentariosCongreso(cabecera.getComentariosCongreso());
		setCartaPetitorioDescripcion(cabecera.getCartaPetitorioDescripcion());
		setCartaPetitorioDocumentId(cabecera.getCartaPetitorioDocumentId());
		setCartaAcuerdoDescripcion(cabecera.getCartaAcuerdoDescripcion());
		setCartaAcuerdoDocumentId(cabecera.getCartaAcuerdoDocumentId());
		setFlyerDescripcion(cabecera.getFlyerDescripcion());
		setFlyerDocumentId(cabecera.getFlyerDocumentId());
		setWeb(cabecera.getWeb());
		setMesInversion(cabecera.getMesInversion());
		setMontoInversion(cabecera.getMontoInversion());
		setContactoMedico1(cabecera.getContactoMedico1());
		setContactoMedico2(cabecera.getContactoMedico2());
		
		if(!cabecera.getImputaciones().isEmpty()) {
			setCodigoProducto(detalle.getCodigoProducto());
			setProducto(detalle.getProducto());
			setPorcentaje(detalle.getPorcentaje());
			setPresupuestoARS(detalle.getPresupuestoARS());
			setConsumidoARS(detalle.getConsumidoARS());
		}
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

	public BigDecimal getMontoInversion() {
		return montoInversion;
	}

	public void setMontoInversion(BigDecimal montoInversion) {
		this.montoInversion = montoInversion;
	}

	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	public String getProducto() {
		return producto;
	}

	public void setProducto(String producto) {
		this.producto = producto;
	}

	public BigDecimal getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(BigDecimal porcentaje) {
		this.porcentaje = porcentaje;
	}

	public BigDecimal getPresupuestoARS() {
		return presupuestoARS;
	}

	public void setPresupuestoARS(BigDecimal presupuestoARS) {
		this.presupuestoARS = presupuestoARS;
	}

	public BigDecimal getConsumidoARS() {
		return consumidoARS;
	}

	public void setConsumidoARS(BigDecimal consumidoARS) {
		this.consumidoARS = consumidoARS;
	}

}
