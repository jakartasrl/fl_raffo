package com.arquimeda.raf.solicitudDisenio.biz.boundary;

import java.util.Iterator;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;

import com.arquimeda.daffy.container.FiltrableDataBatchLoader;
import com.arquimeda.daffy.crud.ui.CrudFilter;
import com.arquimeda.fluig.Fluig;
import com.arquimeda.raf.solicitudDisenio.biz.control.SolicitudDisenioCrudFilter;
import com.arquimeda.raf.solicitudDisenio.biz.entity.ProductosSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.TiposNuevosProductosSolicitudDisenio;

@Stateless
@LocalBean
public class SolicitudDisenioEJB implements FiltrableDataBatchLoader<SolicitudDisenioCrudFilter> {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject 
	Fluig fluig;
	
	@Inject
	Logger logger;

	public int size(SolicitudDisenioCrudFilter filtro) {

		TypedQuery<Long> query = em.createQuery("SELECT COUNT(sd) " +
				" FROM SolicitudDisenio sd " + getSecuredWhere(filtro), Long.class);

		filtro.addParameters(query);
		query.setParameter("grupoReporte", getUserGroups());

		int size = query.getSingleResult().intValue();
		return size;
	}

	public List<SolicitudDisenio> loadItems(SolicitudDisenioCrudFilter filtro, int startIndex, int count, Object[] sortPropertyIds, boolean[] sortStates) {

		String select = "SELECT sd FROM SolicitudDisenio sd " + getSecuredWhere(filtro);
		String orderBy = "";

		if(sortPropertyIds.length > 0){
			orderBy = "ORDER BY sd." + sortPropertyIds[0] + " " + (sortStates[0] ? "ASC" : "DESC");			
		}else{
			orderBy = "ORDER BY sd.nroSolicitud ASC";
		}

		TypedQuery<SolicitudDisenio> query = em.createQuery(select + orderBy, SolicitudDisenio.class);
		filtro.addParameters(query);
		query.setParameter("grupoReporte", getUserGroups());
		query.setFirstResult(startIndex);
		query.setMaxResults(count);

		List<SolicitudDisenio> sds = query.getResultList();

		return sds;

	}
	
	public List<ProductosSolicitudDisenio> obtenerDetallesProductosSolicitudDisenio(Integer nroSolicitud){
		String query = "SELECT p FROM ProductosSolicitudDisenio p where p.nroSolicitud = :nroSolicitud  ";
		TypedQuery<ProductosSolicitudDisenio> qry = em.createQuery(query, ProductosSolicitudDisenio.class);
		qry.setParameter("nroSolicitud", nroSolicitud);
		List<ProductosSolicitudDisenio> productos = qry.getResultList();
		return productos;
		
	}
	
	public List<TiposNuevosProductosSolicitudDisenio> obtenerTiposDeNuevosProductosSolicitudDisenio(Integer nroSolicitud) {
		String query = "SELECT t FROM TiposNuevosProductosSolicitudDisenio t where t.nroSolicitud = :nroSolicitud  ";
		TypedQuery<TiposNuevosProductosSolicitudDisenio> qry = em.createQuery(query, TiposNuevosProductosSolicitudDisenio.class);
		qry.setParameter("nroSolicitud", nroSolicitud);
		List<TiposNuevosProductosSolicitudDisenio> tiposProductos = qry.getResultList();
		return tiposProductos;
	}
	
	public Iterator<SolicitudDisenio> export(SolicitudDisenioCrudFilter filtro) {
		
		String jpql = "SELECT sd FROM SolicitudDisenio sd " + getSecuredWhere(filtro);
		jpql = jpql + " ORDER BY sd.nroSolicitud ASC";
		
		TypedQuery<SolicitudDisenio> query = em.createQuery(jpql, SolicitudDisenio.class);
		
		filtro.addParameters(query);
		query.setParameter("grupoReporte", getUserGroups());

		return query.getResultList().iterator();
	}
	
	private List<String> getUserGroups() {
		String userLogin = fluig.getCurrentUser().getLogin();
		return fluig.findAllGroupsOfUser(userLogin);
	}
	
	private String getSecuredWhere(CrudFilter filtro) {
		String filterWhere = filtro.getWhere();
		return ("".equals(filterWhere) ? " WHERE" : filterWhere+" AND") + " sd.grupoReporte IN (:grupoReporte)"; 
	}


}
