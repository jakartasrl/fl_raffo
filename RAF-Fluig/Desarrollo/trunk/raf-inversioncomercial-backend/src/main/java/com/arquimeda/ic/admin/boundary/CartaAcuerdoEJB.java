package com.arquimeda.ic.admin.boundary;

import java.util.Date;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;

import com.arquimeda.fluig.ws.workflowengineservice.ProcessAttachmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.ProcessTaskAppointmentDtoArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArray;
import com.arquimeda.fluig.ws.workflowengineservice.StringArrayArray;
import com.arquimeda.fluig.ws.workflowengineservice.WorkflowEngineService;
import com.arquimeda.ic.admin.boundary.dto.CartaAcuerdoDTO;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.report.entity.CartaAcuerdo.Estado;


@Stateless
public class CartaAcuerdoEJB {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	@Inject
	ParameterEJB parameterEjb;
	
	@Inject
	WorkflowEngineService workflowEngineService;
	
	public CartaAcuerdoDTO newCartaAcuerdo(){
		return new CartaAcuerdoDTO();
	}
	
	public void actualizarCartaAcuerdo(CartaAcuerdoDTO dto, String estado){
		
		logger.info("################## Actualizar Carta Acuerdo existente...");
		
		Query query = em.createQuery("UPDATE CartaAcuerdo c SET " +
									" c.motivoRechazo = :motivoRechazo " +
									" ,c.tarea = :tarea " +
									" ,c.estado = :estado " +
									" ,c.gteDistrito = :gteDistrito " +
									" WHERE c.numeroSolicitud = :numeroSolicitud");
		
		query.setParameter("motivoRechazo", dto.getMotivoRechazo());
		query.setParameter("tarea", dto.getTarea());
		query.setParameter("estado", Estado.valueOf(estado));
		query.setParameter("gteDistrito", dto.getGteDistrito());
		query.setParameter("numeroSolicitud", dto.getNumeroSolicitud());

		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Fin nueva Carta Acuerdo con nro solicitud: " + dto.getNumeroSolicitud());
		}
		
	}
	
	public void actualizarEstado(Integer numeroSolicitud, String tarea, String estado){
			
		Query query = em.createQuery("UPDATE CartaAcuerdo c SET " +
									" c.estado = :estado, " +
									" c.tarea = :tarea " +
									" WHERE c.numeroSolicitud = :numeroSolicitud");

		query.setParameter("estado", Estado.valueOf(estado));
		query.setParameter("tarea", tarea);
		query.setParameter("numeroSolicitud", numeroSolicitud);
		
		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Cancelando carta acuerdo con nro solicitud: " + numeroSolicitud);
		}
			
	}
	
	public void persistirFechaFinSolicitud(Integer processInstanceId, Date fechaFinSolicitud){
		
		logger.info("##################  Persistir FechaFinSolicitud al finalizar Carta Acuerdo...");
		
		Query query = em.createQuery("UPDATE CartaAcuerdo c SET " +
									" c.fechaFinSolicitud = :fechaFinSolicitud " +
									" WHERE c.numeroSolicitud = :numeroSolicitud");
		
		query.setParameter("numeroSolicitud", processInstanceId);
		query.setParameter("fechaFinSolicitud", fechaFinSolicitud);

		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## FechaFinSolicitud persistida en Carta Acuerdo con nro solicitud: " + processInstanceId);
		}
		
	}
	
	public void avanzarSolicitudIC(Integer processInstanceId, Integer tarea){
		
		logger.info("####### RAF09 - Avanzando solicitud: " + processInstanceId + " a tarea: " + tarea);
		
		String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
		String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
		String userId = parameterEjb.getParameter("fluig.workflowengineservice.userId");
		Integer companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
		
		try {

			
			StringArray colleagueIds = new StringArray();
	
			StringArrayArray rta = workflowEngineService.saveAndSendTask(username, password, companyId, processInstanceId, tarea, colleagueIds, "", 
					userId, true, new ProcessAttachmentDtoArray(), new StringArrayArray(), new ProcessTaskAppointmentDtoArray(), true, 0);
			
			if(rta.getItem().get(0).getItem().get(0).contains("ERROR")){
				logger.info("No se pudo mover la solicitud: " + processInstanceId + " desde RAF09 - Carta Acuerdo");
				throw new RuntimeException("No se pudo mover la solicitud: " + processInstanceId + " desde RAF09 - Carta Acuerdo" + ". Respuesta de Fluig: " + rta.getItem().get(0).getItem().get(1));
			}
		
		} catch (Exception e) {
			logger.error("Proceso con Fluig finalizado con error", e);
			throw new RuntimeException(e);
		} finally {

		}
	}
}
