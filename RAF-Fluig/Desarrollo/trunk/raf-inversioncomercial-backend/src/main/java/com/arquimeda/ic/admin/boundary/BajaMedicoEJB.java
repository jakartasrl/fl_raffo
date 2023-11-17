package com.arquimeda.ic.admin.boundary;

import java.util.Date;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;

import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.ic.admin.boundary.dto.BajaMedicoDTO;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.arquimeda.ic.report.entity.BajaMedico;
import com.arquimeda.ic.report.entity.BajaMedico.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;


@Stateless
public class BajaMedicoEJB {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;
	
	@Inject
	WorkflowEngineService workflowEngineService;
	
	public BajaMedicoDTO newBajaMedico(){
		return new BajaMedicoDTO();
	}
	
	public void save(BajaMedicoDTO dto, String estado){
		
		logger.info("################## Baja Medico save ..." + dto);
		
		BajaMedico bmExist = findBySolicitud(dto.getNumeroSolicitud());
		
		if(bmExist == null) {
			
			logger.info("################## Insertando en Baja Medico...");

			BajaMedico bm = new BajaMedico();
			
			bm.setNumeroSolicitud(dto.getNumeroSolicitud());
			bm.setEstado(Estado.valueOf(estado));
			bm.setTarea(dto.getTarea());
			bm.setMotivoBaja(dto.getMotivoBaja());
			bm.setFechaSolicitud(dto.getFechaSolicitud());
			bm.setMatriculaSolicitante(dto.getMatriculaSolicitante());
			bm.setAreaCodigo(dto.getAreaCodigo());
			bm.setAreaDescripcion(dto.getAreaDescripcion());
			bm.setDistritoCodigo(dto.getDistritoCodigo());
			bm.setDistritoDescripcion(dto.getDistritoDescripcion());
			bm.setCodGrupoGteArea(dto.getCodGrupoGteArea());
			bm.setCodGrupoGteDistrito(dto.getCodGrupoGteDistrito());   
			bm.setCodGrupoAsistenteDistrito(dto.getCodGrupoAsistenteDistrito());
			bm.setCodGrupoGtePromocion(dto.getCodGrupoGtePromocion());
			bm.setSolicitante(dto.getSolicitante());
			bm.setNombreAPM(dto.getNombreAPM());
			bm.setMatriculaAPM(dto.getMatriculaAPM());
			bm.setEmailAPM(dto.getEmailAPM());
			bm.setTipoInversion(TipoInversion.valueOf(dto.getTipoInversion()));
			bm.setApellido(dto.getApellido());
			bm.setNombre(dto.getNombre());
			bm.setCuit(dto.getCuit());
			bm.setNombreCongreso(dto.getNombreCongreso());
			bm.setLugarCongreso(dto.getLugarCongreso());
			bm.setFechaDesdeCongreso(dto.getFechaDesdeCongreso());
			bm.setFechaHastaCongreso(dto.getFechaHastaCongreso());
			bm.setMatriculaGteDistrito(dto.getMatriculaGteDistrito());
			bm.setMesInversion(dto.getMesInversion());
			bm.setIncluyeAlojamiento(dto.getIncluyeAlojamiento());
			bm.setIncluyeTraslado(dto.getIncluyeTraslado());
			bm.setIncluyeInscripcion(dto.getIncluyeInscripcion());
			bm.setSeleccionAlojamientoPresupuesto(!"".equals(dto.getSeleccionAlojamientoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionAlojamientoPresupuesto()) : null);
			bm.setSeleccionTrasladoPresupuesto(!"".equals(dto.getSeleccionTrasladoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionTrasladoPresupuesto()) : null);
			bm.setSeleccionInscripcionoPresupuesto(!"".equals(dto.getSeleccionInscripcionoPresupuesto())? PresupuestoHabilitado.valueOf(dto.getSeleccionInscripcionoPresupuesto()) : null);
			bm.setDelegado(dto.getDelegado());
			
			em.persist(bm);
			
			logger.info("################## Fin Insertando en Baja Medico con nro solicitud: " + dto.getNumeroSolicitud());

		}else {
			
			logger.info("################## Actualizar Baja Medico existente...");
			
			bmExist.setEstado(Estado.valueOf(estado));
			bmExist.setTarea(dto.getTarea());
			bmExist.setMotivoBaja(dto.getMotivoBaja());
			bmExist.setFechaUltimaModificacion(new Date());
			
			em.merge(bmExist);
			
			logger.info("################## Fin actualizar Baja Medico con nro solicitud: " + dto.getNumeroSolicitud());


		}

	}
	
	private BajaMedico findBySolicitud(Integer numeroSolicitud) {

		try{ 

			TypedQuery<BajaMedico> query = em.createQuery("SELECT b FROM BajaMedico b WHERE b.numeroSolicitud = :numeroSolicitud", BajaMedico.class);
			query.setParameter("numeroSolicitud", numeroSolicitud);

			return query.getSingleResult();

		}catch(NoResultException e){
			return null;
		}		
	}
	
	public void avanzarSolicitudIC(Integer processInstanceId, Integer tarea){
		
		logger.info("####### RAF11 - Avanzando solicitud: " + processInstanceId + " a tarea: " + tarea);
		
		String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
		String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
		String userId = parameterEjb.getParameter("fluig.workflowengineservice.userId");
		Integer companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
		
		try {

			
			StringArray colleagueIds = new StringArray();
	
			StringArrayArray rta = workflowEngineService.saveAndSendTask(username, password, companyId, processInstanceId, tarea, colleagueIds, "", 
					userId, true, new ProcessAttachmentDtoArray(), new StringArrayArray(), new ProcessTaskAppointmentDtoArray(), true, 0);
			
			if(rta.getItem().get(0).getItem().get(0).contains("ERROR")){
				logger.info("No se pudo mover la solicitud: " + processInstanceId + " desde RAF11 - Inversion Comercial");
				throw new RuntimeException("No se pudo mover la solicitud: " + processInstanceId + " desde RAF11 - Inversion Comercial" + ". Respuesta de Fluig: " + rta.getItem().get(0).getItem().get(1));
			}
		
		} catch (Exception e) {
			logger.error("Proceso con Fluig finalizado con error", e);
			throw new RuntimeException(e);
		} finally {

		}
	}
}
