package com.arquimeda.ic.admin.boundary;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.xml.ws.BindingProvider;

import org.slf4j.Logger;

import com.arquimeda.fluig.ws.documentservice.DocumentService;
import com.arquimeda.fluig.ws.documentservice.Exception_Exception;
import com.arquimeda.fluig.ws.workflowengineservice.Attachment;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDto;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.ic.admin.boundary.dto.ImputacionDTO;
import com.arquimeda.ic.admin.boundary.dto.InversionComercialDTO;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.parameters.biz.entity.Congreso;
import com.arquimeda.ic.parameters.biz.entity.Medico;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.arquimeda.ic.report.entity.CartaAcuerdo;
import com.arquimeda.ic.report.entity.Imputacion;
import com.arquimeda.ic.report.entity.InversionComercial;
import com.arquimeda.ic.report.entity.InversionComercial.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;
import com.arquimeda.ic.utils.Utils;


@Stateless
public class InversionComercialEJB {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;
	
	@Inject
	WorkflowEngineService workflowEngineService;
	
	@Inject
	DocumentService documentService;
	
	public InversionComercialDTO newInversionComercial(){
		return new InversionComercialDTO();
	}
	
	public void save(InversionComercialDTO dto, String estado){
		
		logger.info("################## IC save ..." + dto);
		
		InversionComercial icExistente = findInversionComercialBySolicitud(dto.getNumeroSolicitud());
		
		if(dto.getCuit() != null) {
			
			Medico medicoExistente = findMedicoByCuit(dto.getCuit());
			
			if(medicoExistente == null) {
				
				logger.info("################## Insertando nuevo Medico...");
				
				Medico medico = new Medico();
				medico.setOrigen("Fluig");
				medico.setApellido(dto.getApellido());
				medico.setNombre(dto.getNombre());
				medico.setCuit(dto.getCuit());
				medico.setTipoDocumento(dto.getTipoDocumento());
				medico.setDni(dto.getDni());
				medico.setNumeroDocumento(dto.getNumeroDocumento());
				medico.setNumeroPasaporte(dto.getNumeroPasaporte());
				medico.setFechaVtoPasaporte(dto.getFechaVtoPasaporte());
				medico.setSexo(dto.getSexo());
				medico.setFechaNacimiento(dto.getFechaNacimiento());
				medico.setNacionalidad(dto.getNacionalidad());
				medico.setDomicilio(dto.getDomicilio());
				medico.setLocalidad(dto.getLocalidad());
				medico.setProvincia(dto.getProvincia());
				medico.setPais(dto.getPais());
				medico.setCodigoPostal(dto.getCodigoPostal());
				medico.setTelefonoContacto(dto.getTelefonoContacto());
				medico.setCelular(dto.getCelular());
				medico.setMailContacto(dto.getMailContacto());
				medico.setEspecialidadProfesional(dto.getEspecialidadProfesional());
				medico.setTituloGrado(dto.getTituloGrado());
				medico.setInstitucionDondeObtuvo(dto.getInstitucionDondeObtuvo());
				medico.setAnioEgreso(dto.getAnioEgreso());
				medico.setMatricula(dto.getMatricula());
				medico.setInstitucionQueTrabaja(dto.getInstitucionQueTrabaja());
				medico.setCargoPosicion(dto.getCargoPosicion());
				medico.setCiudad(dto.getCiudad());
				em.persist(medico);
				
			}else {
				
				logger.info("################## Actualizando Medico...");
				
				medicoExistente.setApellido(dto.getApellido() != null && !"".equals(dto.getApellido())? dto.getApellido() : medicoExistente.getApellido());
				medicoExistente.setNombre(dto.getNombre() != null && !"".equals(dto.getNombre())? dto.getNombre() : medicoExistente.getNombre());
				medicoExistente.setCuit(dto.getCuit() != null && !"".equals(dto.getCuit())? dto.getCuit() : medicoExistente.getCuit());
				medicoExistente.setTipoDocumento(dto.getTipoDocumento() != null && !"".equals(dto.getTipoDocumento())? dto.getTipoDocumento() : medicoExistente.getTipoDocumento());
				medicoExistente.setDni(dto.getDni() != null && !"".equals(dto.getDni())? dto.getDni() : medicoExistente.getDni());
				medicoExistente.setNumeroDocumento(dto.getNumeroDocumento() != null && !"".equals(dto.getNumeroDocumento())? dto.getNumeroDocumento() : medicoExistente.getNumeroDocumento());
				medicoExistente.setNumeroPasaporte(dto.getNumeroPasaporte() != null && !"".equals(dto.getNumeroPasaporte())? dto.getNumeroPasaporte() : medicoExistente.getNumeroPasaporte());
				medicoExistente.setFechaVtoPasaporte(dto.getFechaVtoPasaporte() != null? dto.getFechaVtoPasaporte() : medicoExistente.getFechaVtoPasaporte());
				medicoExistente.setSexo(dto.getSexo() != null && !"".equals(dto.getSexo())? dto.getSexo() : medicoExistente.getSexo());
				medicoExistente.setFechaNacimiento(dto.getFechaNacimiento() != null? dto.getFechaNacimiento() : medicoExistente.getFechaNacimiento());
				medicoExistente.setNacionalidad(dto.getNacionalidad() != null && !"".equals(dto.getNacionalidad())? dto.getNacionalidad() : medicoExistente.getNacionalidad());
				medicoExistente.setDomicilio(dto.getDomicilio() != null && !"".equals(dto.getDomicilio())? dto.getDomicilio() : medicoExistente.getDomicilio());
				medicoExistente.setLocalidad(dto.getLocalidad() != null && !"".equals(dto.getLocalidad())? dto.getLocalidad() : medicoExistente.getLocalidad());
				medicoExistente.setProvincia(dto.getProvincia() != null && !"".equals(dto.getProvincia())? dto.getProvincia() : medicoExistente.getProvincia());
				medicoExistente.setPais(dto.getPais() != null && !"".equals(dto.getPais())? dto.getPais() : medicoExistente.getPais());
				medicoExistente.setCodigoPostal(dto.getCodigoPostal() != null && !"".equals(dto.getCodigoPostal())? dto.getCodigoPostal() : medicoExistente.getCodigoPostal());
				medicoExistente.setTelefonoContacto(dto.getTelefonoContacto() != null && !"".equals(dto.getTelefonoContacto())? dto.getTelefonoContacto() : medicoExistente.getTelefonoContacto());
				medicoExistente.setCelular(dto.getCelular() != null && !"".equals(dto.getCelular())? dto.getCelular() : medicoExistente.getCelular());
				medicoExistente.setMailContacto(dto.getMailContacto() != null && !"".equals(dto.getMailContacto())? dto.getMailContacto() : medicoExistente.getMailContacto());
				medicoExistente.setEspecialidadProfesional(dto.getEspecialidadProfesional() != null && !"".equals(dto.getEspecialidadProfesional())? dto.getEspecialidadProfesional() : medicoExistente.getEspecialidadProfesional());
				medicoExistente.setTituloGrado(dto.getTituloGrado() != null && !"".equals(dto.getTituloGrado())? dto.getTituloGrado() : medicoExistente.getTituloGrado());
				medicoExistente.setInstitucionDondeObtuvo(dto.getInstitucionDondeObtuvo() != null && !"".equals(dto.getInstitucionDondeObtuvo())? dto.getInstitucionDondeObtuvo() : medicoExistente.getInstitucionDondeObtuvo());
				medicoExistente.setAnioEgreso(dto.getAnioEgreso() != null && !"".equals(dto.getAnioEgreso())? dto.getAnioEgreso() : medicoExistente.getAnioEgreso());
				medicoExistente.setMatricula(dto.getMatricula() != null && !"".equals(dto.getMatricula())? dto.getMatricula() : medicoExistente.getMatricula());
				medicoExistente.setInstitucionQueTrabaja(dto.getInstitucionQueTrabaja() != null && !"".equals(dto.getInstitucionQueTrabaja())? dto.getInstitucionQueTrabaja() : medicoExistente.getInstitucionQueTrabaja());
				medicoExistente.setCargoPosicion(dto.getCargoPosicion() != null && !"".equals(dto.getCargoPosicion())? dto.getCargoPosicion() : medicoExistente.getCargoPosicion());
				medicoExistente.setCiudad(dto.getCiudad() != null && !"".equals(dto.getCiudad())? dto.getCiudad() : medicoExistente.getCiudad());
				
				em.merge(medicoExistente);
			}
		}
		
		
		if(icExistente == null) {
			
			logger.info("################## Insertando nueva Inversion Comercial...");

			List<Imputacion> imputaciones = new ArrayList<Imputacion>();
	
			for (ImputacionDTO imputacionDTO : dto.getImputacionesDTO()) {
	
				Imputacion imputacion = new Imputacion();
				imputacion.setCodigoProducto(imputacionDTO.getCodigoProducto());
				imputacion.setProducto(imputacionDTO.getProducto());
				imputacion.setPorcentaje(imputacionDTO.getPorcentaje());
				imputacion.setPresupuestoARS(imputacionDTO.getPresupuestoARS());
				imputacion.setConsumidoARS(imputacionDTO.getConsumidoARS());
				imputaciones.add(imputacion);
			}
			
			InversionComercial ic = new InversionComercial();
			ic.setImputaciones(imputaciones);
			ic.setNumeroSolicitud(dto.getNumeroSolicitud());
			ic.setFechaSolicitud(dto.getFechaSolicitud());
			ic.setMatriculaSolicitante(dto.getMatriculaSolicitante());
			ic.setEsAPM(dto.getEsAPM());
			ic.setCodGrupoGteArea(dto.getCodGrupoGteArea());
			ic.setDistritoCodigo(dto.getDistritoCodigo());
			ic.setCodGrupoGteDistrito(dto.getCodGrupoGteDistrito());
			ic.setCodGrupoAsistenteDistrito(dto.getCodGrupoAsistenteDistrito());
			ic.setCodGrupoGtePromocion(dto.getCodGrupoGtePromocion());
			ic.setLimiteAprGtePromo(dto.getLimiteAprGtePromo());
			ic.setNotificacionGte(dto.getNotificacionGte());
			ic.setSolicitante(dto.getSolicitante());
			ic.setAreaCodigo(dto.getAreaCodigo());
			ic.setAreaDescripcion(dto.getAreaDescripcion());
			ic.setDistritoDescripcion(dto.getDistritoDescripcion());
			//ic.setGrupoGteDistrito(dto.getGrupoGteDistrito());
			ic.setNombreAPM(dto.getNombreAPM());
			ic.setMatriculaAPM(dto.getMatriculaAPM());
			ic.setEmailAPM(dto.getEmailAPM());
			ic.setTipoInversion(TipoInversion.valueOf(dto.getTipoInversion()));
			ic.setCiudad(dto.getCiudad());
			ic.setApellido(dto.getApellido());
			ic.setNombre(dto.getNombre());
			ic.setDni(dto.getDni());
			ic.setTipoDocumento(dto.getTipoDocumento());
			ic.setNumeroDocumento(dto.getNumeroDocumento());
			ic.setNumeroPasaporte(dto.getNumeroPasaporte());
			ic.setFechaVtoPasaporte(dto.getFechaVtoPasaporte());
			ic.setSexo(dto.getSexo());
			ic.setFechaNacimiento(dto.getFechaNacimiento());
			ic.setNacionalidad(dto.getNacionalidad());
			ic.setDomicilio(dto.getDomicilio());
			ic.setLocalidad(dto.getLocalidad());
			ic.setProvincia(dto.getProvincia());
			ic.setPais(dto.getPais());
			ic.setCodigoPostal(dto.getCodigoPostal());
			ic.setTelefonoContacto(dto.getTelefonoContacto());
			ic.setCelular(dto.getCelular());
			ic.setMailContacto(dto.getMailContacto());
			ic.setMotivoViaje(dto.getMotivoViaje());
			ic.setEspecialidadProfesional(dto.getEspecialidadProfesional());
			ic.setNombreCongreso(dto.getNombreCongreso());
			ic.setLugarCongreso(dto.getLugarCongreso());
			ic.setFechaDesdeCongreso(dto.getFechaDesdeCongreso());
			ic.setFechaHastaCongreso(dto.getFechaHastaCongreso());
			ic.setCongreso(dto.getIdCongreso() != null? em.find(Congreso.class, dto.getIdCongreso()) : null);
			ic.setNombreHotel(dto.getNombreHotel());
			ic.setContactoHotel(dto.getContactoHotel());
			ic.setTelefonoHotel(dto.getTelefonoHotel());
			ic.setCheckinHotel(dto.getCheckinHotel());
			ic.setCheckoutHotel(dto.getCheckoutHotel());
			ic.setTipoHabitacion(dto.getTipoHabitacion());
			ic.setCantidadNoche(dto.getCantidadNoche());
			ic.setCochera(dto.getCochera());
			ic.setItinerarioIda(dto.getItinerarioIda());
			ic.setFechaIda(dto.getFechaIda());
			ic.setNroVueloIda(dto.getNroVueloIda());
			ic.setHoraSalidaIda(dto.getHoraSalidaIda());
			ic.setItinerarioRegreso(dto.getItinerarioRegreso());
			ic.setFechaRegreso(dto.getFechaRegreso());
			ic.setNroVueloRegreso(dto.getNroVueloRegreso());
			ic.setHoraSalidaRegreso(dto.getHoraSalidaRegreso());
			ic.setTituloGrado(dto.getTituloGrado());
			ic.setInstitucionDondeObtuvo(dto.getInstitucionDondeObtuvo());
			ic.setAnioEgreso(dto.getAnioEgreso());
			ic.setMatricula(dto.getMatricula());
			ic.setInstitucionQueTrabaja(dto.getInstitucionQueTrabaja());
			ic.setCargoPosicion(dto.getCargoPosicion());
			ic.setTipoInscripcion(dto.getTipoInscripcion());
			ic.setNombreSociedad(dto.getNombreSociedad());
			ic.setNumeroSocio(dto.getNumeroSocio());
			ic.setEquipamiento(dto.getEquipamiento());
			ic.setImporte(dto.getImporte());
			ic.setImporteARS(dto.getImporteARS());
			ic.setImporteUSD(dto.getImporteUSD());
			ic.setMoneda(dto.getMoneda());
			ic.setCodMoneda(dto.getCodMoneda());
			ic.setTipoCambioARS(dto.getTipoCambioARS());
			ic.setTipoCambioUSD(dto.getTipoCambioUSD());
			ic.setFormaPago(dto.getFormaPago());
			ic.setCodFormaPago(dto.getCodFormaPago());
			ic.setMotivoRechazo(dto.getMotivoRechazo());
			ic.setTarea(dto.getTarea());
			ic.setMatriculaGteDistrito(dto.getMatriculaGteDistrito());
			ic.setMembresia(dto.getMembresia());
			ic.setComentariosAlojamiento(dto.getComentariosAlojamiento());
			ic.setNombreMedico1(dto.getNombreMedico1());
			ic.setNombreMedico2(dto.getNombreMedico2());
			ic.setComparteHabitacion(dto.getComparteHabitacion());
			ic.setTipoTrasladoIda(dto.getTipoTrasladoIda());
			ic.setTipoTrasladoRegreso(dto.getTipoTrasladoRegreso());
			ic.setCuit(dto.getCuit());
			ic.setDiasLimiteCarga(dto.getDiasLimiteCarga());
			ic.setPresupuestoHabilitado(dto.getPresupuestoHabilitado() != null && !"".equals(dto.getPresupuestoHabilitado())? PresupuestoHabilitado.valueOf(dto.getPresupuestoHabilitado()): null);
			ic.setIncluyeAlojamiento(dto.getIncluyeAlojamiento());
			ic.setIncluyeTraslado(dto.getIncluyeTraslado());
			ic.setIncluyeInscripcion(dto.getIncluyeInscripcion());
			ic.setSeleccionAlojamientoPresupuesto(dto.getSeleccionAlojamientoPresupuesto() != null && !"".equals(dto.getSeleccionAlojamientoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionAlojamientoPresupuesto()) : null);
			ic.setSeleccionTrasladoPresupuesto(dto.getSeleccionTrasladoPresupuesto() != null && !"".equals(dto.getSeleccionTrasladoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionTrasladoPresupuesto()) : null);
			ic.setSeleccionInscripcionoPresupuesto(dto.getSeleccionInscripcionoPresupuesto() != null && !"".equals(dto.getSeleccionInscripcionoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionInscripcionoPresupuesto()) : null);
			ic.setComentariosCongreso(dto.getComentariosCongreso());
			ic.setCartaPetitorioDescripcion(dto.getCartaPetitorioDescripcion());
			ic.setCartaPetitorioDocumentId(dto.getCartaPetitorioDocumentId());
			ic.setCartaAcuerdoDescripcion(dto.getCartaAcuerdoDescripcion());
			ic.setCartaAcuerdoDocumentId(dto.getCartaAcuerdoDocumentId());
			ic.setFlyerDescripcion(dto.getFlyerDescripcion());
			ic.setFlyerDocumentId(dto.getFlyerDocumentId());
			ic.setWeb(dto.getWeb());
			ic.setMesInversion(dto.getMesInversion());
			ic.setDelegado(dto.getDelegado());
			ic.setMontoInversion(dto.getMontoInversion());
			ic.setContactoMedico1(dto.getContactoMedico1());
			ic.setContactoMedico2(dto.getContactoMedico2());
			
			em.persist(ic);
			
			logger.info("################## Fin nueva Inversion Comercial con nro solicitud: " + dto.getNumeroSolicitud());
			
		}else {
	
			logger.info("################## Actualizar Inversion Comercial existente...");
			
			List<Imputacion> imputaciones = icExistente.getImputaciones();
			imputaciones.clear();
	
			for (ImputacionDTO imputacionDTO : dto.getImputacionesDTO()) {
				
				Imputacion imputacion = new Imputacion();
				imputacion.setCodigoProducto(imputacionDTO.getCodigoProducto());
				imputacion.setProducto(imputacionDTO.getProducto());
				imputacion.setPorcentaje(imputacionDTO.getPorcentaje());
				imputacion.setPresupuestoARS(imputacionDTO.getPresupuestoARS());
				imputacion.setConsumidoARS(imputacionDTO.getConsumidoARS());
				imputaciones.add(imputacion);		
				
			}
			
			logger.info("############ PRESUPUESTO HABILITADO: " + dto.getPresupuestoHabilitado() + ", SOLICITUD: " + dto.getNumeroSolicitud());

			icExistente.setFechaSolicitud(dto.getFechaSolicitud());
			icExistente.setEsAPM(dto.getEsAPM());
			icExistente.setAreaCodigo(dto.getAreaCodigo());
			icExistente.setAreaDescripcion(dto.getAreaDescripcion());
			icExistente.setNotificacionGte(dto.getNotificacionGte());
			icExistente.setNombreAPM(dto.getNombreAPM());
			icExistente.setMatriculaAPM(dto.getMatriculaAPM());
			icExistente.setEmailAPM(dto.getEmailAPM());
			icExistente.setTipoInversion(TipoInversion.valueOf(dto.getTipoInversion()));
			icExistente.setCiudad(dto.getCiudad());
			icExistente.setApellido(dto.getApellido());
			icExistente.setNombre(dto.getNombre());
			icExistente.setDni(dto.getDni());
			icExistente.setTipoDocumento(dto.getTipoDocumento());
			icExistente.setNumeroDocumento(dto.getNumeroDocumento());
			icExistente.setNumeroPasaporte(dto.getNumeroPasaporte());
			icExistente.setFechaVtoPasaporte(dto.getFechaVtoPasaporte());
			icExistente.setSexo(dto.getSexo());
			icExistente.setFechaNacimiento(dto.getFechaNacimiento());
			icExistente.setNacionalidad(dto.getNacionalidad());
			icExistente.setDomicilio(dto.getDomicilio());
			icExistente.setLocalidad(dto.getLocalidad());
			icExistente.setProvincia(dto.getProvincia());
			icExistente.setPais(dto.getPais());
			icExistente.setCodigoPostal(dto.getCodigoPostal());
			icExistente.setTelefonoContacto(dto.getTelefonoContacto());
			icExistente.setCelular(dto.getCelular());
			icExistente.setMailContacto(dto.getMailContacto());
			icExistente.setMotivoViaje(dto.getMotivoViaje());
			icExistente.setEspecialidadProfesional(dto.getEspecialidadProfesional());
			icExistente.setNombreCongreso(dto.getNombreCongreso());
			icExistente.setLugarCongreso(dto.getLugarCongreso());
			icExistente.setFechaDesdeCongreso(dto.getFechaDesdeCongreso());
			icExistente.setFechaHastaCongreso(dto.getFechaHastaCongreso());
			icExistente.setCongreso(dto.getIdCongreso() != null? em.find(Congreso.class, dto.getIdCongreso()) : null);
			icExistente.setNombreHotel(dto.getNombreHotel());
			icExistente.setContactoHotel(dto.getContactoHotel());
			icExistente.setTelefonoHotel(dto.getTelefonoHotel());
			icExistente.setCheckinHotel(dto.getCheckinHotel());
			icExistente.setCheckoutHotel(dto.getCheckoutHotel());
			icExistente.setTipoHabitacion(dto.getTipoHabitacion());
			icExistente.setCantidadNoche(dto.getCantidadNoche());
			icExistente.setCochera(dto.getCochera());
			icExistente.setItinerarioIda(dto.getItinerarioIda());
			icExistente.setFechaIda(dto.getFechaIda());
			icExistente.setNroVueloIda(dto.getNroVueloIda());
			icExistente.setHoraSalidaIda(dto.getHoraSalidaIda());
			icExistente.setItinerarioRegreso(dto.getItinerarioRegreso());
			icExistente.setFechaRegreso(dto.getFechaRegreso());
			icExistente.setNroVueloRegreso(dto.getNroVueloRegreso());
			icExistente.setHoraSalidaRegreso(dto.getHoraSalidaRegreso());
			icExistente.setTituloGrado(dto.getTituloGrado());
			icExistente.setInstitucionDondeObtuvo(dto.getInstitucionDondeObtuvo());
			icExistente.setAnioEgreso(dto.getAnioEgreso());
			icExistente.setMatricula(dto.getMatricula());
			icExistente.setInstitucionQueTrabaja(dto.getInstitucionQueTrabaja());
			icExistente.setCargoPosicion(dto.getCargoPosicion());
			icExistente.setTipoInscripcion(dto.getTipoInscripcion());
			icExistente.setNombreSociedad(dto.getNombreSociedad());
			icExistente.setNumeroSocio(dto.getNumeroSocio());
			icExistente.setEquipamiento(dto.getEquipamiento());
			icExistente.setImporte(dto.getImporte());
			icExistente.setImporteARS(dto.getImporteARS());
			icExistente.setImporteUSD(dto.getImporteUSD());
			icExistente.setMoneda(dto.getMoneda());
			icExistente.setCodMoneda(dto.getCodMoneda());
			icExistente.setTipoCambioARS(dto.getTipoCambioARS());
			icExistente.setTipoCambioUSD(dto.getTipoCambioUSD());
			icExistente.setFormaPago(dto.getFormaPago());
			icExistente.setCodFormaPago(dto.getCodFormaPago());
			icExistente.setMotivoRechazo(dto.getMotivoRechazo());
			icExistente.setTarea(dto.getTarea());
			icExistente.setMatriculaGteDistrito(dto.getMatriculaGteDistrito());
			icExistente.setMembresia(dto.getMembresia());
			icExistente.setComentariosAlojamiento(dto.getComentariosAlojamiento());
			icExistente.setNombreMedico1(dto.getNombreMedico1());
			icExistente.setNombreMedico2(dto.getNombreMedico2());
			icExistente.setComparteHabitacion(dto.getComparteHabitacion());
			icExistente.setTipoTrasladoIda(dto.getTipoTrasladoIda());
			icExistente.setTipoTrasladoRegreso(dto.getTipoTrasladoRegreso());
			icExistente.setCuit(dto.getCuit());
			icExistente.setDiasLimiteCarga(dto.getDiasLimiteCarga());
			icExistente.setPresupuestoHabilitado(dto.getPresupuestoHabilitado() != null && !"".equals(dto.getPresupuestoHabilitado())? PresupuestoHabilitado.valueOf(dto.getPresupuestoHabilitado()): null);
			icExistente.setIncluyeAlojamiento(dto.getIncluyeAlojamiento());
			icExistente.setIncluyeTraslado(dto.getIncluyeTraslado());
			icExistente.setIncluyeInscripcion(dto.getIncluyeInscripcion());
			icExistente.setSeleccionAlojamientoPresupuesto(dto.getSeleccionAlojamientoPresupuesto() != null && !"".equals(dto.getSeleccionAlojamientoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionAlojamientoPresupuesto()) : null);
			icExistente.setSeleccionTrasladoPresupuesto(dto.getSeleccionTrasladoPresupuesto() != null && !"".equals(dto.getSeleccionTrasladoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionTrasladoPresupuesto()) : null);
			icExistente.setSeleccionInscripcionoPresupuesto(dto.getSeleccionInscripcionoPresupuesto() != null && !"".equals(dto.getSeleccionInscripcionoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionInscripcionoPresupuesto()) : null);
			icExistente.setComentariosCongreso(dto.getComentariosCongreso());
			icExistente.setCartaPetitorioDescripcion(dto.getCartaPetitorioDescripcion());
			icExistente.setCartaPetitorioDocumentId(dto.getCartaPetitorioDocumentId());
			icExistente.setCartaAcuerdoDescripcion(dto.getCartaAcuerdoDescripcion());
			icExistente.setCartaAcuerdoDocumentId(dto.getCartaAcuerdoDocumentId());
			icExistente.setFlyerDescripcion(dto.getFlyerDescripcion());
			icExistente.setFlyerDocumentId(dto.getFlyerDocumentId());
			icExistente.setWeb(dto.getWeb());
			icExistente.setMesInversion(dto.getMesInversion());
			icExistente.setDelegado(dto.getDelegado());
			icExistente.setMontoInversion(dto.getMontoInversion());
			icExistente.setContactoMedico1(dto.getContactoMedico1());
			icExistente.setContactoMedico2(dto.getContactoMedico2());
			icExistente.setEstado(Estado.valueOf(estado));
			
			em.merge(icExistente);
			
			logger.info("################## Fin actualizar Inversion Comercial con nro solicitud: " + dto.getNumeroSolicitud());
		
		}
		
	}
	
	public void actualizarMotivoRechazo(Integer numeroSolicitud, String motivoRechazo){
		
		Query query = em.createQuery("UPDATE InversionComercial i SET " +
									" i.motivoRechazo = :motivoRechazo " +
									" WHERE i.numeroSolicitud = :numeroSolicitud");
		
		query.setParameter("motivoRechazo", motivoRechazo);
		query.setParameter("numeroSolicitud", numeroSolicitud);

		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Actualizado motivo rechazo de Inversion Comercial con nro solicitud: " + numeroSolicitud);
		}
		
	}
	
	public void actualizarFormaPago(Integer numeroSolicitud, String formaPago, String codFormaPago){
		
		Query query = em.createQuery("UPDATE InversionComercial i SET " +
									" i.formaPago = :formaPago, " +
									" i.codFormaPago = :codFormaPago " +
									" WHERE i.numeroSolicitud = :numeroSolicitud");
		
		query.setParameter("formaPago", formaPago);
		query.setParameter("codFormaPago", codFormaPago);
		query.setParameter("numeroSolicitud", numeroSolicitud);

		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Actualizado forma de pago de Inversion Comercial con nro solicitud: " + numeroSolicitud);
		}
		
	}
	
	
	public void actualizarEstado(Integer numeroSolicitud, String tarea, String estado){
	
		Query query = em.createQuery("UPDATE InversionComercial i SET " +
									" i.estado = :estado, " +
									" i.tarea = :tarea " +
									" WHERE i.numeroSolicitud = :numeroSolicitud");

		query.setParameter("estado", Estado.valueOf(estado));
		query.setParameter("tarea", tarea);
		query.setParameter("numeroSolicitud", numeroSolicitud);
		
		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Actualizado estado de Inversion Comercial con nro solicitud: " + numeroSolicitud);
		}
			
	}

	private InversionComercial findInversionComercialBySolicitud(Integer numeroSolicitud) {

		try{ 

			TypedQuery<InversionComercial> query = em.createQuery("SELECT i FROM InversionComercial i WHERE i.numeroSolicitud = :numeroSolicitud", InversionComercial.class);
			query.setParameter("numeroSolicitud", numeroSolicitud);

			return query.getSingleResult();

		}catch(NoResultException e){
			return null;
		}		
	}
	
	private Medico findMedicoByCuit(String cuit) {

		try{ 

			TypedQuery<Medico> query = em.createQuery("SELECT m FROM Medico m WHERE m.cuit = :cuit", Medico.class);
			query.setParameter("cuit", cuit);

			return query.getSingleResult();

		}catch(NoResultException e){
			return null;
		}		
	}
	
	public void iniciarBPM(Integer numeroSolicitud){
		
		InversionComercial ic = findInversionComercialBySolicitud(numeroSolicitud);
		
		logger.error("Iniciando el proceso en Fluig de Carta Acuerdo para solicitud : " + numeroSolicitud);
		
		// Obtengo parametros
		String endpoint = parameterEjb.getParameter("fluig.workflowengineservice.endpoint");
		String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
		String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
		//String userId = parameterEjb.getParameter("fluig.workflowengineservice.userId");
		String userId = ic.getMatriculaGteDistrito();
		Integer companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
		String processId = parameterEjb.getParameter("fluig.workflowengineservice.processId");

		String error = null;
		
		try {
			
			// Re-seteo la url (para poder modificarla dinamicamente)
			BindingProvider bp = (BindingProvider) workflowEngineService;
			bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpoint);
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			
			Object[] object = getSolicitante(ic.getMatriculaGteDistrito());
			
			StringArrayArray cardData = new StringArrayArray();
			cardData.getItem().add(createField("__error", "SUCCESS"));
			cardData.getItem().add(createField("solicitante", (String)object[0]));
			cardData.getItem().add(createField("fechaSolicitud", sdf.format(new Date())));
			cardData.getItem().add(createField("matriculaSolicitante", ic.getMatriculaGteDistrito()));
			cardData.getItem().add(createField("mailGteDistrito", (String)object[1]));
			cardData.getItem().add(createField("nroInversionComercial", ic.getNumeroSolicitud().toString()));		
			cardData.getItem().add(createField("areaCodigo", ic.getAreaCodigo()));
			cardData.getItem().add(createField("area", ic.getAreaDescripcion()));
			cardData.getItem().add(createField("distritoCodigo", ic.getDistritoCodigo()));
			cardData.getItem().add(createField("distrito", ic.getDistritoDescripcion()));
			cardData.getItem().add(createField("codGrupoGteDistrito", ic.getCodGrupoGteDistrito()));
			cardData.getItem().add(createField("nombreAPM", ic.getNombreAPM()));
			cardData.getItem().add(createField("matriculaAPM", ic.getMatriculaAPM()));
			cardData.getItem().add(createField("emailAPM", ic.getEmailAPM()));
			cardData.getItem().add(createField("apellido", ic.getApellido()));
			cardData.getItem().add(createField("nombre", ic.getNombre()));
			cardData.getItem().add(createField("tipoInversion", ic.getTipoInversion().toString()));
			cardData.getItem().add(createField("formaPago", ic.getFormaPago()));
			cardData.getItem().add(createField("codFormaPago", ic.getCodFormaPago()));
			cardData.getItem().add(createField("gteDistrito", (String)object[0]));
			cardData.getItem().add(createField("codGrupoGteArea", ic.getCodGrupoGteArea()));
			cardData.getItem().add(createField("codGrupoGtePromocion", ic.getCodGrupoGtePromocion()));
			cardData.getItem().add(createField("codGrupoAsistDistrito", ic.getCodGrupoAsistenteDistrito()));
			cardData.getItem().add(createField("comentariosCongreso", ic.getComentariosCongreso() != null? ic.getComentariosCongreso() :  ""));
			cardData.getItem().add(createField("cartaPetitorio", ic.getCartaPetitorioDescripcion() != null? ic.getCartaPetitorioDescripcion() : ""));
			cardData.getItem().add(createField("cartaPetitorioDocumentId", ic.getCartaPetitorioDocumentId() != null? ic.getCartaPetitorioDocumentId() : ""));
			cardData.getItem().add(createField("cartaAcuerdo", ic.getCartaAcuerdoDescripcion() != null? ic.getCartaAcuerdoDescripcion() : ""));
			cardData.getItem().add(createField("cartaAcuerdoDocumentId", ic.getCartaAcuerdoDocumentId() != null? ic.getCartaAcuerdoDocumentId() : ""));
			cardData.getItem().add(createField("flyer", ic.getFlyerDescripcion() != null? ic.getFlyerDescripcion() : ""));
			cardData.getItem().add(createField("flyerDocumentId", ic.getFlyerDocumentId() != null? ic.getFlyerDocumentId() : ""));
			cardData.getItem().add(createField("web", ic.getWeb() != null? ic.getWeb() : ""));
			cardData.getItem().add(createField("mesInversion", ic.getMesInversion() != null? sdf.format(ic.getMesInversion()) : ""));
			cardData.getItem().add(createField("delegado", ic.getDelegado() != null ? ic.getDelegado().toString() : ""));
			cardData.getItem().add(createField("fecha", sdf.format(new Date())));
			
			cardData.getItem().add(createField("incluyeAlojamiento", ic.getIncluyeAlojamiento()));
			cardData.getItem().add(createField("incluyeTraslado", ic.getIncluyeTraslado()));
			cardData.getItem().add(createField("incluyeInscripcion", ic.getIncluyeInscripcion()));
			cardData.getItem().add(createField("selAlojamientoPresupuesto", ic.getSeleccionAlojamientoPresupuesto() != null ? ic.getSeleccionAlojamientoPresupuesto().toString() : null));
			cardData.getItem().add(createField("selTrasladoPresupuesto", ic.getSeleccionTrasladoPresupuesto() != null ? ic.getSeleccionTrasladoPresupuesto().toString() : null));
			cardData.getItem().add(createField("selInscripcionPresupuesto", ic.getSeleccionInscripcionoPresupuesto() != null ? ic.getSeleccionInscripcionoPresupuesto().toString(): null));
			
			if(TipoInversion.becaNac.equals(ic.getTipoInversion()) || TipoInversion.becaInt.equals(ic.getTipoInversion())) 
					cardData.getItem().add(createField("nombreCongreso", ic.getNombreCongreso()));
			
			ProcessAttachmentDtoArray processAttachmentDtoArray = new ProcessAttachmentDtoArray();
			
			if(ic.getCartaPetitorioDocumentId() != null && !ic.getCartaPetitorioDocumentId().equals("")) {
				
				byte[] documentContent = documentService.getDocumentContent(username, password, companyId, Integer.valueOf(ic.getCartaPetitorioDocumentId()), userId, 1000, ic.getCartaPetitorioDescripcion());
				addAttachment(processAttachmentDtoArray, documentContent, ic.getCartaPetitorioDescripcion());
				
			}
			
			if(ic.getCartaAcuerdoDocumentId() != null && !ic.getCartaAcuerdoDocumentId().equals("")) {
				
				byte[] documentContent = documentService.getDocumentContent(username, password, companyId, Integer.valueOf(ic.getCartaAcuerdoDocumentId()), userId, 1000, ic.getCartaAcuerdoDescripcion());
				addAttachment(processAttachmentDtoArray, documentContent, ic.getCartaAcuerdoDescripcion());
				
			}
			
			if(ic.getFlyerDocumentId() != null && !ic.getFlyerDocumentId().equals("")) {
				
				byte[] documentContent = documentService.getDocumentContent(username, password, companyId, Integer.valueOf(ic.getFlyerDocumentId()), userId, 1000, ic.getFlyerDescripcion());
				addAttachment(processAttachmentDtoArray, documentContent, ic.getFlyerDescripcion());
				
			}
			
			ProcessTaskAppointmentDtoArray processTaskAppointmentDtoArray = new ProcessTaskAppointmentDtoArray();
			boolean managerMode = true;
			StringArray stringArray = new StringArray();
			//stringArray.getItem().add(userId);
			
			StringArrayArray result = workflowEngineService.startProcess(
					username, password, companyId, processId, 5, stringArray,
					"", userId, true, processAttachmentDtoArray, cardData, 
					processTaskAppointmentDtoArray, managerMode);

			boolean ok = false;
			List<StringArray> stringArrays = result.getItem();
			for (StringArray array : stringArrays) {
				List<String> list = array.getItem();
				if (list.contains("iProcess")) {
					String iProcessNumber = list.get(1);
					CartaAcuerdo cartaAcuerdo = new CartaAcuerdo();
					cartaAcuerdo.setNumeroSolicitud(new Integer(iProcessNumber));
					cartaAcuerdo.setFechaSolicitud(new Date());
					cartaAcuerdo.setSolicitante((String)object[0]);
					cartaAcuerdo.setMatriculaSolicitante(ic.getMatriculaGteDistrito());
					cartaAcuerdo.setMailGteDistrito((String)object[1]);
					cartaAcuerdo.setNroInversionComercial(ic.getNumeroSolicitud());		
					cartaAcuerdo.setAreaCodigo(ic.getAreaCodigo());
					cartaAcuerdo.setAreaDescripcion(ic.getAreaDescripcion());
					cartaAcuerdo.setDistritoCodigo(ic.getDistritoCodigo());
					cartaAcuerdo.setDistritoDescripcion(ic.getDistritoDescripcion());
					cartaAcuerdo.setCodGrupoGteDistrito(ic.getCodGrupoGteDistrito());
					cartaAcuerdo.setNombreAPM(ic.getNombreAPM());
					cartaAcuerdo.setMatriculaAPM(ic.getMatriculaAPM());
					cartaAcuerdo.setEmailAPM(ic.getEmailAPM());
					cartaAcuerdo.setApellido(ic.getApellido());
					cartaAcuerdo.setNombre(ic.getNombre());
					cartaAcuerdo.setTipoInversion(ic.getTipoInversion());
					cartaAcuerdo.setFormaPago(ic.getFormaPago());
					cartaAcuerdo.setCodFormaPago(ic.getCodFormaPago());
					cartaAcuerdo.setGteDistrito((String)object[0]);
					cartaAcuerdo.setTarea("INICIAR SOLICITUD");
					cartaAcuerdo.setCodGrupoGteArea(ic.getCodGrupoGteArea());
					cartaAcuerdo.setCodGrupoGtePromocion(ic.getCodGrupoGtePromocion());
					cartaAcuerdo.setCodGrupoAsistenteDistrito(ic.getCodGrupoAsistenteDistrito());
					cartaAcuerdo.setComentariosCongreso(ic.getComentariosCongreso());
					cartaAcuerdo.setCartaPetitorioDescripcion(ic.getCartaPetitorioDescripcion());
					cartaAcuerdo.setCartaPetitorioDocumentId(ic.getCartaPetitorioDocumentId());
					cartaAcuerdo.setCartaAcuerdoDescripcion(ic.getCartaAcuerdoDescripcion());
					cartaAcuerdo.setCartaAcuerdoDocumentId(ic.getCartaAcuerdoDocumentId());
					cartaAcuerdo.setFlyerDescripcion(ic.getFlyerDescripcion());
					cartaAcuerdo.setFlyerDocumentId(ic.getFlyerDocumentId());
					cartaAcuerdo.setWeb(ic.getWeb());
					cartaAcuerdo.setMesInversion(ic.getMesInversion());
					cartaAcuerdo.setDelegado(ic.getDelegado());
					cartaAcuerdo.setFecha(new Date());
					cartaAcuerdo.setIncluyeAlojamiento(ic.getIncluyeAlojamiento());
					cartaAcuerdo.setIncluyeTraslado(ic.getIncluyeTraslado());
					cartaAcuerdo.setIncluyeInscripcion(ic.getIncluyeInscripcion());
					cartaAcuerdo.setSeleccionAlojamientoPresupuesto(ic.getSeleccionAlojamientoPresupuesto() != null ? ic.getSeleccionAlojamientoPresupuesto() : null);
					cartaAcuerdo.setSeleccionTrasladoPresupuesto(ic.getSeleccionTrasladoPresupuesto() != null ? ic.getSeleccionTrasladoPresupuesto() : null);
					cartaAcuerdo.setSeleccionInscripcionoPresupuesto(ic.getSeleccionInscripcionoPresupuesto() != null ? ic.getSeleccionInscripcionoPresupuesto() : null);

					
					if(TipoInversion.becaNac.equals(ic.getTipoInversion()) || TipoInversion.becaInt.equals(ic.getTipoInversion())) 
						cartaAcuerdo.setNombreCongreso(ic.getNombreCongreso());
					
					em.persist(cartaAcuerdo);
					ok = true;
				}
			}
			
			if (!ok) {
				throw new RuntimeException("Respuesta de Fluig recibida incorrecta.\n");
			}
			
			logger.debug("Proceso con Fluig finalizado correctamente");
			
		} catch (Exception e) {
			logger.error("Proceso con Fluig finalizado con error", e);
			error = Utils.getStackTrace(e);
			throw new RuntimeException(e);
		}
	}

	private void addAttachment(ProcessAttachmentDtoArray processAttachmentDtoArray, byte[] documentContent,
			String description) {
		Attachment attachment = new Attachment();
		attachment.setFilecontent(documentContent);
		attachment.setFileName(description);
		
		ProcessAttachmentDto processAttachmentDto = new ProcessAttachmentDto();
		processAttachmentDto.setDescription(description);
		processAttachmentDto.setNewAttach(true);
		processAttachmentDto.getAttachments().add(attachment);
						
		processAttachmentDtoArray.getItem().add(processAttachmentDto);
	}
	
	private StringArray createField(String name, String value) {
		StringArray field = new StringArray();
		field.getItem().add(name);
		field.getItem().add(value);
		return field;
	}
	
	private Object[] getSolicitante(String matriculaGteDistrito) {
		
		try{ 

			TypedQuery<Object[]> query = em.createQuery("SELECT u1.fullName, u2.email " +
					" FROM User u1, Usuario u2  " +
					"  WHERE u1.id = u2.userId" +
					"   AND u2.codigo = :codigo ", Object[].class);
			
			query.setParameter("codigo", matriculaGteDistrito);

			return (Object[])query.getSingleResult();

		}catch(NoResultException e){
			return null;
		}
	}
	
	public void finalizarInversionComercialPorEventoIniciado(Integer processInstanceId){
		
		logger.info("####### RAF08 - Finalizadon solicitud: " + processInstanceId + " por evento iniciado.");
		
		String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
		String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
		String userId = parameterEjb.getParameter("fluig.workflowengineservice.userId");
		Integer companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
		
		try {

			
			StringArray colleagueIds = new StringArray();
	
			StringArrayArray rta = workflowEngineService.saveAndSendTask(username, password, companyId, processInstanceId, 44, colleagueIds, "", 
					userId, true, new ProcessAttachmentDtoArray(), new StringArrayArray(), new ProcessTaskAppointmentDtoArray(), true, 0);
			
			if(rta.getItem().get(0).getItem().get(0).contains("ERROR")){
				logger.info("No se pudo finalizar la solicitud: " + processInstanceId + " por evento iniciado.");
				throw new RuntimeException("No se pudo finalizar la solicitud: " + processInstanceId + " por evento iniciado. Respuesta de Fluig: " + rta.getItem().get(0).getItem().get(1));
			}
		
		} catch (Exception e) {
			logger.error("Proceso con Fluig finalizado con error", e);
			throw new RuntimeException(e);
		}
	}
	
	public void validarDocumentosSeleccionados(Integer processInstanceId, String cartaPetitorio, String cartaAcuerdo, String flyer, 
			String cartaPetitorioDocumentId, String cartaAcuerdoDocumentId, String flyerDocumentId) {
		
		logger.info("####### RAF08 - Validar documentos seleccionados - solicitud: " + processInstanceId);

		String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
		String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
		String userId = parameterEjb.getParameter("fluig.workflowengineservice.userId");
		Integer companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
		
		try {
			
			if(cartaPetitorio != null && !cartaPetitorio.equals("")) {
				if(cartaPetitorio.contains(",")) {
					throw new RuntimeException("La carta petirotio contiene una coma");
				}
				documentService.getDocumentContent(username, password, companyId, Integer.valueOf(cartaPetitorioDocumentId), userId, 1000, cartaPetitorio);
			}
			
			if(cartaAcuerdo != null && !cartaAcuerdo.equals("")) {
				if(cartaAcuerdo.contains(",")) {
					throw new RuntimeException("La carta acuerdo contiene una coma");
				}
				documentService.getDocumentContent(username, password, companyId, Integer.valueOf(cartaAcuerdoDocumentId), userId, 1000, cartaAcuerdo);
			}
			
			if(flyer != null && !flyer.equals("")) {
				if(flyer.contains(",")) {
					throw new RuntimeException("El flyer contiene una coma");
				}
				documentService.getDocumentContent(username, password, companyId, Integer.valueOf(flyerDocumentId), userId, 1000, flyer);
			}
		
		} catch (Exception_Exception e) {
			logger.error("Error en la validacion de documentos adjuntos a la solicitud " + processInstanceId, e);
			throw new RuntimeException(e);
		} 
	}
		
}
