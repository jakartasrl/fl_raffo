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
import com.arquimeda.ic.parameters.biz.dto.DistritoDTO;
import com.arquimeda.ic.parameters.biz.entity.AreaDistrito;
import com.arquimeda.ic.producer.LoggedUser;


@Stateless
public class DistritoEJB {
	
	@Inject @LoggedUser
	Usuario usuario;

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;

	public List<DistritoDTO> getDistritos(){

		if(usuario.isEnGrupo("RAF08-GTE-AREA-")){
			
			TypedQuery<AreaDistrito> query = em.createQuery("SELECT a FROM AreaDistrito a WHERE a.codigoGrupoGteArea IN :codigosGrupoGteArea ORDER BY a.descripcionDistrito", AreaDistrito.class);
			List<DistritoDTO> list = query
					.setHint(QueryHints.READ_ONLY, true)
					.setParameter("codigosGrupoGteArea", usuario.getCodigosGrupo("RAF08-GTE-AREA-"))
					.getResultList()    		
					.stream()
					.map(DistritoDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new));
			
			logger.info("Distritos del Gerente de Area: " + list);
				
			return list;
			
		} else if(usuario.isEnGrupo("RAF08-GTE-DIST-")){
			
			TypedQuery<AreaDistrito> query = em.createQuery("SELECT a FROM AreaDistrito a WHERE a.codigoGrupoGteDistrito IN :codigoGrupoGteDistrito ORDER BY a.descripcionDistrito", AreaDistrito.class);
			List<DistritoDTO> list = query
					.setHint(QueryHints.READ_ONLY, true)
					.setParameter("codigoGrupoGteDistrito", usuario.getCodigosGrupo("RAF08-GTE-DIST-"))
					.getResultList()    		
					.stream()
					.map(DistritoDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new));
			
			logger.info("Distritos del Gerente de Distrito: " + list);
				
			return list;
			
		} else if(usuario.isEnGrupo("RAF08-ASIST-DIST-")){
			
			TypedQuery<AreaDistrito> query = em.createQuery("SELECT a FROM AreaDistrito a WHERE a.codigoGrupoAsistDistrito IN :codigoGrupoAsistDistrito ORDER BY a.descripcionDistrito", AreaDistrito.class);
			List<DistritoDTO> list = query
					.setHint(QueryHints.READ_ONLY, true)
					.setParameter("codigoGrupoAsistDistrito", usuario.getCodigosGrupo("RAF08-ASIST-DIST-"))
					.getResultList()    		
					.stream()
					.map(DistritoDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new)); 			
			
			logger.info("Distritos del Asistente de Distrito: " + list);
			
			return list;
			
		}else{
			
			// Si no soy ni gerente de area, gerente de distrito o asistente de distrito trae todas las areas.
			TypedQuery<AreaDistrito> query = em.createQuery("SELECT a FROM AreaDistrito a ORDER BY a.descripcionDistrito", AreaDistrito.class);
			List<DistritoDTO> list = query
					.setHint(QueryHints.READ_ONLY, true)
					.getResultList()    		
					.stream()
					.map(DistritoDTO::fromEntity)
					.collect(Collectors.toCollection(ArrayList::new)); 			
			
			logger.info("Distritos del Usuario: " + list);
			
			return list;
			
		}
			
		
	}

}
