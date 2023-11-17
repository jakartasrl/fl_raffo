package com.arquimeda.ic.admin.boundary;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;

import com.arquimeda.ic.admin.boundary.dto.PetitorioCartaAcuerdoDTO;
import com.arquimeda.ic.report.entity.PetitorioCartaAcuerdo;
import com.arquimeda.ic.report.entity.PetitorioCartaAcuerdo.Estado;


@Stateless
public class PetitorioCartaAcuerdoEJB {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	public PetitorioCartaAcuerdoDTO newPetitorioCartaAcuerdo(){
		return new PetitorioCartaAcuerdoDTO();
	}
	
	public void save(PetitorioCartaAcuerdoDTO dto, String estado){
		
		PetitorioCartaAcuerdo petitorioCAExistente = findPetitorioBySolicitud(dto.getNumeroSolicitud());
		
		logger.info("################## Insertando nueva solicitud Petitorio CA...:" + petitorioCAExistente);
		
		if(petitorioCAExistente == null) {
			
			logger.info("################## Insertando nueva solicitud Petitorio CA...");
			
			PetitorioCartaAcuerdo newPetitorio = new PetitorioCartaAcuerdo();
			newPetitorio.setNumeroSolicitud(dto.getNumeroSolicitud());
			newPetitorio.setFechaSolicitud(dto.getFechaSolicitud());
			newPetitorio.setSolicitante(dto.getSolicitante());
			newPetitorio.setMatriculaSolicitante(dto.getMatriculaSolicitante() != null? dto.getMatriculaSolicitante() : "");
			newPetitorio.setMailSolicitante(dto.getMailSolicitante() != null? dto.getMailSolicitante() : "");
			newPetitorio.setNombreAPM(dto.getNombreAPM() != null? dto.getNombreAPM() : "");
			newPetitorio.setMatriculaAPM(dto.getMatriculaAPM() != null? dto.getMatriculaAPM() : "");
			newPetitorio.setLineaRegion(dto.getLineaRegion());	
			newPetitorio.setLineaRegionCodigo(dto.getLineaRegionCodigo());
			newPetitorio.setCodGrupoSolicitante(dto.getCodGrupoSolicitante() != null? dto.getCodGrupoSolicitante() : "");
			newPetitorio.setCodGrupoAsistDistrito(dto.getCodGrupoAsistDistrito() != null? dto.getCodGrupoAsistDistrito() : "");
			newPetitorio.setArea(dto.getArea() != null? dto.getArea() : "");
			newPetitorio.setAreaCodigo(dto.getAreaCodigo() != null? dto.getAreaCodigo() : "");
			newPetitorio.setCodGrupoGteArea(dto.getCodGrupoGteArea() != null? dto.getCodGrupoGteArea() : "");
			newPetitorio.setCodGrupoGtePromocion(dto.getCodGrupoGtePromocion() != null? dto.getCodGrupoGtePromocion() : "");
			newPetitorio.setGrupoGteMKT(dto.getGrupoGteMKT() != null? dto.getGrupoGteMKT() : "");
			newPetitorio.setCodGrupoGteMKT(dto.getCodGrupoGteMKT() != null? dto.getCodGrupoGteMKT() : "");
			newPetitorio.setFecha(dto.getFecha());
			newPetitorio.setApellido(dto.getApellido());
			newPetitorio.setNombre(dto.getNombre());
			newPetitorio.setTipoInversion(dto.getTipoInversion());
			newPetitorio.setTipoInversionCodigo(dto.getTipoInversionCodigo());
			newPetitorio.setDetalleInversion(dto.getDetalleInversion());
			newPetitorio.setMesInversion(dto.getMesInversion());
			newPetitorio.setTipoProducto(dto.getTipoProducto());
			newPetitorio.setTipoProductoCodigo(dto.getTipoProductoCodigo());
			newPetitorio.setGrupoDerivacion(dto.getGrupoDerivacion());
			newPetitorio.setCodGrupoDerivacion(dto.getCodGrupoDerivacion());
			newPetitorio.setMotivoRechazo(dto.getMotivoRechazo() != null? dto.getMotivoRechazo() : "");
			newPetitorio.setTarea(dto.getTarea());
			newPetitorio.setEsGteDistrito(dto.getEsGteDistrito());
			
			em.persist(newPetitorio);
			
			logger.info("################## Fin nueva solicitud Petitorio CA con nro solicitud: " + dto.getNumeroSolicitud());

		}else {
			
			logger.info("################## Actualizar Petitorio CA existente con nro solicitud: " + dto.getNumeroSolicitud());
			
			petitorioCAExistente.setNombreAPM(dto.getNombreAPM() != null? dto.getNombreAPM() : "");
			petitorioCAExistente.setMatriculaAPM(dto.getMatriculaAPM() != null? dto.getMatriculaAPM() : "");
			petitorioCAExistente.setFecha(dto.getFecha());
			petitorioCAExistente.setApellido(dto.getApellido());
			petitorioCAExistente.setNombre(dto.getNombre());
			petitorioCAExistente.setTipoInversion(dto.getTipoInversion());
			petitorioCAExistente.setTipoInversionCodigo(dto.getTipoInversionCodigo());
			petitorioCAExistente.setDetalleInversion(dto.getDetalleInversion());
			petitorioCAExistente.setMesInversion(dto.getMesInversion());
			petitorioCAExistente.setTipoProducto(dto.getTipoProducto());
			petitorioCAExistente.setTipoProductoCodigo(dto.getTipoProductoCodigo());
			petitorioCAExistente.setGrupoDerivacion(dto.getGrupoDerivacion());
			petitorioCAExistente.setCodGrupoDerivacion(dto.getCodGrupoDerivacion());
			petitorioCAExistente.setMotivoRechazo(dto.getMotivoRechazo() != null? dto.getMotivoRechazo() : "");
			petitorioCAExistente.setTarea(dto.getTarea());
			petitorioCAExistente.setEstado(Estado.valueOf(estado));
			
			em.merge(petitorioCAExistente);
			
			logger.info("################## Fin actualizar Petitorio CA existente con nro solicitud: " + dto.getNumeroSolicitud());
			
		}
		
	}
	
	private PetitorioCartaAcuerdo findPetitorioBySolicitud(Integer numeroSolicitud) {

		try{ 

			TypedQuery<PetitorioCartaAcuerdo> query = em.createQuery("SELECT p FROM PetitorioCartaAcuerdo p WHERE p.numeroSolicitud = :numeroSolicitud", PetitorioCartaAcuerdo.class);
			query.setParameter("numeroSolicitud", numeroSolicitud);

			return query.getSingleResult();

		}catch(NoResultException e){
			return null;
		}		
	}
	
	public void actualizarMotivoRechazo(Integer numeroSolicitud, String motivoRechazo){
		
		Query query = em.createQuery("UPDATE PetitorioCartaAcuerdo p SET " +
									" p.motivoRechazo = :motivoRechazo, " +
									" p.estado = :estado " +
									" WHERE p.numeroSolicitud = :numeroSolicitud");
		
		query.setParameter("motivoRechazo", motivoRechazo);
		query.setParameter("estado", Estado.valueOf("RECHAZADA"));
		query.setParameter("numeroSolicitud", numeroSolicitud);

		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Actualizado motivo rechazo del Petitorio CA con nro solicitud: " + numeroSolicitud);
		}
		
	}
	
	public void actualizarEstado(Integer numeroSolicitud, String tarea, String estado){
			
		Query query = em.createQuery("UPDATE PetitorioCartaAcuerdo c SET " +
									" c.estado = :estado, " +
									" c.tarea = :tarea " +
									" WHERE c.numeroSolicitud = :numeroSolicitud");

		query.setParameter("estado", Estado.valueOf(estado));
		query.setParameter("tarea", tarea);
		query.setParameter("numeroSolicitud", numeroSolicitud);
		
		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## Cancelando Petitorio carta acuerdo con nro solicitud: " + numeroSolicitud);
		}
			
	}
	
	public void saveCarpetaGED(Integer numeroSolicitud, String carpetaAdjuntosId){
		
		Query query = em.createQuery("UPDATE PetitorioCartaAcuerdo c SET " +
									" c.carpetaAdjuntosId = :carpetaAdjuntosId " +
									" WHERE c.numeroSolicitud = :numeroSolicitud");

		query.setParameter("carpetaAdjuntosId", carpetaAdjuntosId);
		query.setParameter("numeroSolicitud", numeroSolicitud);
		
		int executeUpdate = query.executeUpdate();
		
		if(executeUpdate > 0) {
			logger.info("################## No se pudo actuializar ID Carpeta GED Petitorio carta acuerdo de nro solicitud: " + numeroSolicitud);
		}
			
	}

}
