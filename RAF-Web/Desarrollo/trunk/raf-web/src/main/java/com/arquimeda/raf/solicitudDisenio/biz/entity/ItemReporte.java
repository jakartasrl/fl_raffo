package com.arquimeda.raf.solicitudDisenio.biz.entity;

import java.util.Date;

import com.arquimeda.raf.solicitudDisenio.biz.entity.SolicitudDisenio.State;

public class ItemReporte {

private Integer nroSolicitud; 
	
	private String title;
	private String changeReason;
	private State currentState;
	private Date creationDate;
	private String requestantName;
	private String userGroup;
	private String prActivos;
	private Date lastModificationDate;
	private String url;

	
	
	public Integer getNroSolicitud() {
		return nroSolicitud;
	}



	public void setNroSolicitud(Integer nroSolicitud) {
		this.nroSolicitud = nroSolicitud;
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



	public State getCurrentState() {
		return currentState;
	}



	public void setCurrentState(State currentState) {
		this.currentState = currentState;
	}



	public Date getCreationDate() {
		return creationDate;
	}



	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}



	public String getRequestantName() {
		return requestantName;
	}



	public void setRequestantName(String requestantName) {
		this.requestantName = requestantName;
	}



	public String getUserGroup() {
		return userGroup;
	}



	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}



	public String getPrActivos() {
		return prActivos;
	}



	public void setPrActivos(String prActivos) {
		this.prActivos = prActivos;
	}



	public Date getLastModificationDate() {
		return lastModificationDate;
	}



	public void setLastModificationDate(Date lastModificationDate) {
		this.lastModificationDate = lastModificationDate;
	}



	public String getUrl() {
		return url;
	}



	public void setUrl(String url) {
		this.url = url;
	}

	public ItemReporte(Integer nroSolicitud, String title, String changeReason, State currentState, Date creationDate,
			String requestantName, String userGroup, String prActivos, Date lastModificationDate, String url) {
		super();
		this.nroSolicitud = nroSolicitud;
		this.title = title;
		this.changeReason = changeReason;
		this.currentState = currentState;
		this.creationDate = creationDate;
		this.requestantName = requestantName;
		this.userGroup = userGroup;
		this.prActivos = prActivos;
		this.lastModificationDate = lastModificationDate;
		this.url = url;
	}



	public ItemReporte() {
		super();
	}
	
}
