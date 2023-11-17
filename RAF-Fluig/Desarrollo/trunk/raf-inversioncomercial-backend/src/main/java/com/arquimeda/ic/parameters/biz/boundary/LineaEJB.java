package com.arquimeda.ic.parameters.biz.boundary;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.annotations.QueryHints;
import org.slf4j.Logger;

import com.arquimeda.ic.fdn.entity.Usuario;
import com.arquimeda.ic.parameters.biz.dto.LineaDTO;
import com.arquimeda.ic.parameters.biz.entity.Linea;
import com.arquimeda.ic.producer.LoggedUser;

@Stateless
public class LineaEJB {
	
	@Inject @LoggedUser
	Usuario usuario;

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;

	public List<LineaDTO> getLineas(){
		
		List<LineaDTO> list = new ArrayList<LineaDTO>();

		if(usuario.isEnGrupo("RAF10-SOL-LINEA-")){
			
			TypedQuery<Linea> query = em.createQuery("SELECT l FROM Linea l WHERE l.codGrupoSolicitante IN :codGrupoSolicitante ORDER BY l.descripcion", Linea.class);
			list = query
					.setHint(QueryHints.READ_ONLY, true)
					.setParameter("codGrupoSolicitante", usuario.getCodigosGrupo("RAF10-SOL-LINEA-"))
					.getResultList()    		
					.stream()
					.map(LineaDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new));
			
		}else {
			
			TypedQuery<Linea> query = em.createQuery("SELECT l FROM Linea l ORDER BY l.descripcion", Linea.class);
			list = query
					.setHint(QueryHints.READ_ONLY, true)
					.getResultList()    		
					.stream()
					.map(LineaDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new));
			
		}

		logger.info("Lineas del solicitante de linea: " + list);
		
		return list;
		
	}

}
