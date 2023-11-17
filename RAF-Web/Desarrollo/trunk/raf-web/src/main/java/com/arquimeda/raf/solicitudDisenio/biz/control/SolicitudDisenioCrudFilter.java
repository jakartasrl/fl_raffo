package com.arquimeda.raf.solicitudDisenio.biz.control;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Query;

import com.arquimeda.daffy.crud.ui.CrudFilter;
import com.arquimeda.raf.solicitudDisenio.biz.entity.IniciadoresSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.GruposIiniciadoresSolicitudDisenio;
import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio;

public class SolicitudDisenioCrudFilter implements CrudFilter{
	
	private Integer nroSolicitudDesde;
	private Integer nroSolicitudHasta;
	private String title;
	private String changeReason;
	private SolicitudDisenio.State currentState;
	private Date creationDateDesde;
	private Date creationDateHasta;
	private IniciadoresSolicitudDisenio requestant;
	private GruposIiniciadoresSolicitudDisenio userGroup;
	private String prActivos;
	private Date lastModificationDateDesde;
	private Date lastModificationDateHasta;

	public Integer getNroSolicitudDesde() {
		return nroSolicitudDesde;
	}

	public void setNroSolicitudDesde(Integer nroSolicitudDesde) {
		this.nroSolicitudDesde = nroSolicitudDesde;
	}

	public Integer getNroSolicitudHasta() {
		return nroSolicitudHasta;
	}

	public void setNroSolicitudHasta(Integer nroSolicitudHasta) {
		this.nroSolicitudHasta = nroSolicitudHasta;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getChangeReason() {
		return changeReason;
	}

	public void setChangeReason(String changeReason) {
		this.changeReason = changeReason;
	}

	public SolicitudDisenio.State getCurrentState() {
		return currentState;
	}

	public void setCurrentState(SolicitudDisenio.State currentState) {
		this.currentState = currentState;
	}

	public Date getCreationDateDesde() {
		return creationDateDesde;
	}

	public void setCreationDateDesde(Date creationDateDesde) {
		this.creationDateDesde = creationDateDesde;
	}

	public Date getCreationDateHasta() {
		return creationDateHasta;
	}

	public void setCreationDateHasta(Date creationDateHasta) {
		this.creationDateHasta = creationDateHasta;
	}

	public IniciadoresSolicitudDisenio getRequestant() {
		return requestant;
	}

	public void setRequestant(IniciadoresSolicitudDisenio requestant) {
		this.requestant = requestant;
	}

	public GruposIiniciadoresSolicitudDisenio getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(GruposIiniciadoresSolicitudDisenio userGroup) {
		this.userGroup = userGroup;
	}

	public String getPrActivos() {
		return prActivos;
	}

	public void setPrActivos(String prActivos) {
		this.prActivos = prActivos;
	}

	public Date getLastModificationDateDesde() {
		return lastModificationDateDesde;
	}

	public void setLastModificationDateDesde(Date lastModificationDateDesde) {
		this.lastModificationDateDesde = lastModificationDateDesde;
	}

	public Date getLastModificationDateHasta() {
		return lastModificationDateHasta;
	}

	public void setLastModificationDateHasta(Date lastModificationDateHasta) {
		this.lastModificationDateHasta = lastModificationDateHasta;
	}

	public void addParameters(Query query) {
		
		if(nroSolicitudDesde != null){
			addParameter(query, "nroSolicitudDesde", nroSolicitudDesde);			
		}
		
		if(nroSolicitudHasta != null){
			addParameter(query, "nroSolicitudHasta", nroSolicitudHasta);			
		}
		
		if(title != null){
			addParameter(query, "title",  "%" + title + "%");			
		}
		
		if(changeReason != null){
			addParameter(query, "changeReason",  "%" + changeReason + "%");			
		}
		
		if(currentState != null){
			addParameter(query, "currentState", currentState);			
		}
		
		if(creationDateDesde != null){

			Calendar calendar = Calendar.getInstance();
			calendar.setTime(creationDateDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "creationDateDesde", calendar.getTime());	
			
		}
		
		if(creationDateHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(creationDateHasta);
			calendar.set(Calendar.HOUR_OF_DAY,23);
			calendar.set(Calendar.MINUTE,59);
			calendar.set(Calendar.SECOND,59);
			calendar.set(Calendar.MILLISECOND,999);
			
			addParameter(query, "creationDateHasta", calendar.getTime());			
		}
		
		if(requestant != null){
			addParameter(query, "requestantName", requestant.getColleagueName());			
		}
		
		if(userGroup != null){
			addParameter(query, "userGroup", userGroup.getGroupDescription());			
		}
		
		if(prActivos != null){
			addParameter(query, "prActivos",  "%" + prActivos + "%");			
		}
		
		if(lastModificationDateDesde != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(lastModificationDateDesde);
			calendar.set(Calendar.HOUR_OF_DAY,0);
			calendar.set(Calendar.MINUTE,0);
			calendar.set(Calendar.SECOND,0);
			calendar.set(Calendar.MILLISECOND,0);
			
			addParameter(query, "lastModificationDateDesde", calendar.getTime());	
			
		}
		
		if(lastModificationDateHasta != null){
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(lastModificationDateHasta);
			calendar.set(Calendar.HOUR_OF_DAY,23);
			calendar.set(Calendar.MINUTE,59);
			calendar.set(Calendar.SECOND,59);
			calendar.set(Calendar.MILLISECOND,999);
			
			addParameter(query, "lastModificationDateHasta", calendar.getTime());			
		}
		
	}

	private void addParameter(Query query, String name, Object value) {		
		if(value != null){
			query.setParameter(name, value);
		}		
	}
	
	public String getWhere() {
		
		String filtro = "";
		
		if(nroSolicitudDesde != null){
			filtro += " AND sd.nroSolicitud >= :nroSolicitudDesde ";
		}

		if(nroSolicitudHasta != null){
			filtro += " AND sd.nroSolicitud <= :nroSolicitudHasta ";
		}
		
		if(title != null){
			filtro += " AND sd.title LIKE :title ";
		}
		
		if(changeReason != null){
			filtro += " AND sd.changeReason LIKE :changeReason ";
		}
		
		if(currentState != null){
			filtro += " AND sd.currentState LIKE :currentState ";
		}
		
		if(creationDateDesde != null){
			filtro += " AND sd.creationDate >= :creationDateDesde ";
		}

		if(creationDateHasta != null){
			filtro += " AND sd.creationDate <= :creationDateHasta ";
		}
		
		if(requestant != null){
			filtro += " AND sd.requestantName LIKE :requestantName ";
		}
		
		if(userGroup != null){
			filtro += " AND sd.userGroup LIKE :userGroup ";
		}
		
		if(prActivos != null){
			filtro += " AND sd.prActivos LIKE :prActivos ";
		}
		
		if(lastModificationDateDesde != null){
			filtro += " AND sd.lastModificationDate >= :lastModificationDateDesde ";
		}
		
		if(lastModificationDateHasta != null){
			filtro += " AND sd.lastModificationDate <= :lastModificationDateHasta ";
		}

		if(!filtro.isEmpty()){			
			filtro = filtro.substring(4);
			filtro = " WHERE " + filtro;
		}
		
		return filtro;
	}
	
}
