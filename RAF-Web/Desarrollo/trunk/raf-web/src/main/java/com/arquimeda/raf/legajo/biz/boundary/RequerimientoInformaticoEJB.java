package com.arquimeda.raf.legajo.biz.boundary;

import java.util.Iterator;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import com.arquimeda.daffy.container.FiltrableDataBatchLoader;
import com.arquimeda.raf.legajo.biz.control.RequerimientoInformaticoCrudFilter;
import com.arquimeda.raf.legajo.biz.entity.RequerimientoInformatico;

@Stateless
@LocalBean
public class RequerimientoInformaticoEJB implements FiltrableDataBatchLoader<RequerimientoInformaticoCrudFilter> {

	@PersistenceContext(name="defaultPU")
	EntityManager em;

	public int size(RequerimientoInformaticoCrudFilter filtro) {

		TypedQuery<Long> query = em.createQuery("SELECT COUNT(ri) " +
				" FROM RequerimientoInformatico ri " + filtro.getWhere(), Long.class);

		filtro.addParameters(query);			

		int size = query.getSingleResult().intValue();
		return size;
	}

	public List<RequerimientoInformatico> loadItems(RequerimientoInformaticoCrudFilter filtro, int startIndex, int count, Object[] sortPropertyIds, boolean[] sortStates) {

		String select = "SELECT ri FROM RequerimientoInformatico ri " + filtro.getWhere();
		String orderBy = "";

		if(sortPropertyIds.length > 0){
			orderBy = "ORDER BY ri." + sortPropertyIds[0] + " " + (sortStates[0] ? "ASC" : "DESC");			
		}else{
			orderBy = "ORDER BY ri.nroSolicitud ASC";
		}

		TypedQuery<RequerimientoInformatico> query = em.createQuery(select + orderBy, RequerimientoInformatico.class);
		filtro.addParameters(query);
		query.setFirstResult(startIndex);
		query.setMaxResults(count);

		List<RequerimientoInformatico> ris = query.getResultList();

		return ris;

	}
	
	public Iterator<RequerimientoInformatico> export(RequerimientoInformaticoCrudFilter filtro) {
		
		String jpql = "SELECT ri FROM RequerimientoInformatico ri " + filtro.getWhere();
		jpql = jpql + " ORDER BY ri.nroSolicitud ASC";
		
		TypedQuery<RequerimientoInformatico> query = em.createQuery(jpql, RequerimientoInformatico.class);
		
		filtro.addParameters(query);

		return query.getResultList().iterator();
	}

}
