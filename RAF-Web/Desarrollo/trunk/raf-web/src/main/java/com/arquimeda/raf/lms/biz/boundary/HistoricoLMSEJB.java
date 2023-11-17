package com.arquimeda.raf.lms.biz.boundary;

import java.util.Iterator;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.arquimeda.daffy.container.FiltrableDataBatchLoader;
import com.arquimeda.raf.lms.biz.control.HistoricoLMSCrudFilter;
import com.arquimeda.raf.lms.biz.entity.HistoricoLMS;

@Stateless
@LocalBean
public class HistoricoLMSEJB implements FiltrableDataBatchLoader<HistoricoLMSCrudFilter> {

	@PersistenceContext(name="defaultPU")
	EntityManager em;

	public int size(HistoricoLMSCrudFilter filtro) {

		TypedQuery<Long> query = em.createQuery("SELECT COUNT(lms) " +
				" FROM HistoricoLMS lms " + filtro.getWhere(), Long.class);

		filtro.addParameters(query);			

		int size = query.getSingleResult().intValue();
		return size;
	}

	public List<HistoricoLMS> loadItems(HistoricoLMSCrudFilter filtro, int startIndex, int count, Object[] sortPropertyIds, boolean[] sortStates) {

		String select = "SELECT lms FROM HistoricoLMS lms " + filtro.getWhere();
		String orderBy = "";

		if(sortPropertyIds.length > 0){
			orderBy = "ORDER BY lms." + sortPropertyIds[0] + " " + (sortStates[0] ? "ASC" : "DESC");			
		}else{
			orderBy = "ORDER BY lms.matricula ASC";
		}

		TypedQuery<HistoricoLMS> query = em.createQuery(select + orderBy, HistoricoLMS.class);
		filtro.addParameters(query);
		query.setFirstResult(startIndex);
		query.setMaxResults(count);

		List<HistoricoLMS> lms = query.getResultList();

		return lms;

	}
	
	public Iterator<HistoricoLMS> export(HistoricoLMSCrudFilter filtro) {
		
		String jpql = "SELECT lms FROM HistoricoLMS lms " + filtro.getWhere();
		jpql = jpql + " ORDER BY lms.matricula ASC";
		
		TypedQuery<HistoricoLMS> query = em.createQuery(jpql, HistoricoLMS.class);
		
		filtro.addParameters(query);

		return query.getResultList().iterator();
	}

}
