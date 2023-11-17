package com.arquimeda.raf.solicitudDisenio.biz.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.arquimeda.daffy.i18n.Messages;
import com.arquimeda.raf.web.i18n.RafWebMessages;

@Entity
@Table(name="V_SOLICITUDES_DISENIO")
public class SolicitudDisenio {
		
	public enum State {
		GENERADA,
		ENVIADA,
		ACEPTADA,
		RETORNADA,
		CANCELADA,
		EN_PROCESO,
		IMPLEMENTADA,
		CERRADA;
		
		Messages messages;
		private State() {
			// CDI aun no soporta @injection on enums
			this.messages = RafWebMessages.getInstance(); 
			
		}
		public String toString() {
			return messages.getString(this.getClass(), this.name());
		};
	}
	
	@Id
	@NotNull
	@Column(name="codigoCompuesto", nullable=false)
	private String codigoCompuesto;
	
	@NotNull
	@Column(name="nroSolicitud", nullable=false)
	private Integer nroSolicitud;
	
	@NotNull
	@Column(name="title")
	private String title;
	
	@NotNull
	@Column(name="changeReason")
	private String changeReason;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(name="currentState")
	private State currentState;
	
	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="creationDate")
	private Date creationDate;
	
	@NotNull
	@Column(name="requestantName")
	private String requestantName;
	
	@NotNull
	@Column(name="requestantCode")
	private String requestantCode;
	
	@NotNull
	@Column(name="userGroup")
	private String userGroup;
	
	@NotNull
	@Column(name="grupoReporte")
	private String grupoReporte;
	
	@NotNull
	@Column(name="userGroupCode")
	private String userGroupCode;
	
	@NotNull
	@Column(name="prActivos")
	private String prActivos;

	@NotNull
	@Temporal(TemporalType.DATE)
	@Column(name="lastModificationDate")
	private Date lastModificationDate;

	@NotNull
	@Column(name="url")
	private String url;
	
	@NotNull
	@Column(name="implementationType")
	private String implementationType;
    
    @NotNull
	@Column(name="comments")
	private String comments;
    
    @NotNull
	@Column(name="breakDate")
	private String breakDate; 
    
    @NotNull
	@Column(name="changeDetail")
	private String changeDetail;
	
    @Column(name="marcaNewProd")
	private String marcaNewProd;
	
	@Column(name="formaFarmaceuticaNewProd")
	private String formaFarmaceuticaNewProd;
	
	@Column(name="unidadesMedidaNewProd")
	private String unidadesMedidaNewProd;
	
	@Column(name="concentracionesNewProd")
	private String concentracionesNewProd;
	
	@Column(name="grupoNewProd")
	private String grupoNewProd;
	
	@Column(name="codigoProd")
	private String codigoProd;
	
	@Column(name="descripcionProd")
	private String descripcionProd;
	
	@Column(name="grupoProd")
	private String grupoProd;
	
	@Column(name="tipoProd")
	private String tipoProd;
	
	@Column(name="prActivoProd")
	private String prActivoProd;
	
	@Column(name="paisProd")
	private String paisProd;
	
	@Column(name="prActivo1NewProd")
	private String prActivo1NewProd;
	
	@Column(name="prActivo2NewProd")
	private String prActivo2NewProd;
	
	@Column(name="prActivo3NewProd")
	private String prActivo3NewProd;
	
	@Column(name="prActivo4NewProd")
	private String prActivo4NewProd;
	
	@Column(name="unidadMedida1NewProd")
	private String unidadMedida1NewProd;
	
	@Column(name="unidadMedida2NewProd")
	private String unidadMedida2NewProd;
	
	@Column(name="unidadMedida3NewProd")
	private String unidadMedida3NewProd;
	
	@Column(name="unidadMedida4NewProd")
	private String unidadMedida4NewProd;
	
	@Column(name="concentracion1NewProd")
	private String concentracion1NewProd;
	
	@Column(name="concentracion2NewProd")
	private String concentracion2NewProd;
	
	@Column(name="concentracion3NewProd")
	private String concentracion3NewProd;
	
	@Column(name="concentracion4NewProd")
	private String concentracion4NewProd;
	
	@Column(name="TiposNewProd")
	private String TiposNewProd;
	
	@Column(name="presentacionNewProd")
	private String presentacionNewProd;
	
	@Column(name="paisNewProd")
	private String paisNewProd;
	
	@Column(name="titularidadNewProd")
	private String titularidadNewProd;
	
	@Column(name="elaboradorNewProd")
	private String elaboradorNewProd;
	
	@Column(name="acondicionadorNewProd")
	private String acondicionadorNewProd;
	
	@Column(name="fichaTecnicaNewProd")
	private String fichaTecnicaNewProd;
	

	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}

	public Integer getNroSolicitud() {
		return nroSolicitud;
	}

	public void setNroSolicitud(Integer nroSolicitud) {
		this.nroSolicitud = nroSolicitud;
	}
	
	public String getTiposNewProd() {
		return TiposNewProd;
	}

	public void setTiposNewProd(String TiposNewProd) {
		this.TiposNewProd = TiposNewProd;
	}

	public String getCodigoCompuesto() {
		return codigoCompuesto;
	}

	public void setCodigoCompuesto(String codigoCompuesto) {
		this.codigoCompuesto = codigoCompuesto;
	}

	public String getPrActivo1NewProd() {
		return prActivo1NewProd;
	}

	public void setPrActivo1NewProd(String prActivo1NewProd) {
		this.prActivo1NewProd = prActivo1NewProd;
	}

	public String getPrActivo2NewProd() {
		return prActivo2NewProd;
	}

	public void setPrActivo2NewProd(String prActivo2NewProd) {
		this.prActivo2NewProd = prActivo2NewProd;
	}

	public String getPrActivo3NewProd() {
		return prActivo3NewProd;
	}

	public void setPrActivo3NewProd(String prActivo3NewProd) {
		this.prActivo3NewProd = prActivo3NewProd;
	}

	public String getPrActivo4NewProd() {
		return prActivo4NewProd;
	}

	public void setPrActivo4NewProd(String prActivo4NewProd) {
		this.prActivo4NewProd = prActivo4NewProd;
	}

	public String getUnidadMedida1NewProd() {
		return unidadMedida1NewProd;
	}

	public void setUnidadMedida1NewProd(String unidadMedida1NewProd) {
		this.unidadMedida1NewProd = unidadMedida1NewProd;
	}

	public String getUnidadMedida2NewProd() {
		return unidadMedida2NewProd;
	}

	public void setUnidadMedida2NewProd(String unidadMedida2NewProd) {
		this.unidadMedida2NewProd = unidadMedida2NewProd;
	}

	public String getUnidadMedida3NewProd() {
		return unidadMedida3NewProd;
	}

	public void setUnidadMedida3NewProd(String unidadMedida3NewProd) {
		this.unidadMedida3NewProd = unidadMedida3NewProd;
	}

	public String getUnidadMedida4NewProd() {
		return unidadMedida4NewProd;
	}

	public void setUnidadMedida4NewProd(String unidadMedida4NewProd) {
		this.unidadMedida4NewProd = unidadMedida4NewProd;
	}

	public String getConcentracion1NewProd() {
		return concentracion1NewProd;
	}

	public void setConcentracion1NewProd(String concentracion1NewProd) {
		this.concentracion1NewProd = concentracion1NewProd;
	}

	public String getConcentracion2NewProd() {
		return concentracion2NewProd;
	}

	public void setConcentracion2NewProd(String concentracion2NewProd) {
		this.concentracion2NewProd = concentracion2NewProd;
	}

	public String getConcentracion3NewProd() {
		return concentracion3NewProd;
	}

	public void setConcentracion3NewProd(String concentracion3NewProd) {
		this.concentracion3NewProd = concentracion3NewProd;
	}

	public String getConcentracion4NewProd() {
		return concentracion4NewProd;
	}

	public void setConcentracion4NewProd(String concentracion4NewProd) {
		this.concentracion4NewProd = concentracion4NewProd;
	}

	public String getCodigoProd() {
		return codigoProd;
	}

	public void setCodigoProd(String codigoProd) {
		this.codigoProd = codigoProd;
	}

	public String getDescripcionProd() {
		return descripcionProd;
	}

	public void setDescripcionProd(String descripcionProd) {
		this.descripcionProd = descripcionProd;
	}

	public String getGrupoProd() {
		return grupoProd;
	}

	public void setGrupoProd(String grupoProd) {
		this.grupoProd = grupoProd;
	}

	public String getTipoProd() {
		return tipoProd;
	}

	public void setTipoProd(String tipoProd) {
		this.tipoProd = tipoProd;
	}

	public String getPrActivoProd() {
		return prActivoProd;
	}

	public void setPrActivoProd(String prActivoProd) {
		this.prActivoProd = prActivoProd;
	}

	public String getPaisProd() {
		return paisProd;
	}

	public void setPaisProd(String paisProd) {
		this.paisProd = paisProd;
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

	public String getRequestantCode() {
		return requestantCode;
	}

	public void setRequestantCode(String requestantCode) {
		this.requestantCode = requestantCode;
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	public String getUserGroupCode() {
		return userGroupCode;
	}

	public void setUserGroupCode(String userGroupCode) {
		this.userGroupCode = userGroupCode;
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

	public String getImplementationType() {
		return implementationType;
	}

	public void setImplementationType(String implementationType) {
		this.implementationType = implementationType;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getBreakDate() {
		return breakDate;
	}

	public void setBreakDate(String breakDate) {
		this.breakDate = breakDate;
	}

	public String getChangeDetail() {
		return changeDetail;
	}

	public void setChangeDetail(String changeDetail) {
		this.changeDetail = changeDetail;
	}

	public String getMarcaNewProd() {
		return marcaNewProd;
	}

	public void setMarcaNewProd(String marcaNewProd) {
		this.marcaNewProd = marcaNewProd;
	}

	public String getFormaFarmaceuticaNewProd() {
		return formaFarmaceuticaNewProd;
	}

	public void setFormaFarmaceuticaNewProd(String formaFarmaceuticaNewProd) {
		this.formaFarmaceuticaNewProd = formaFarmaceuticaNewProd;
	}

	public String getUnidadesMedidaNewProd() {
		return unidadesMedidaNewProd;
	}

	public void setUnidadesMedidaNewProd(String unidadesMedidaNewProd) {
		this.unidadesMedidaNewProd = unidadesMedidaNewProd;
	}

	public String getConcentracionesNewProd() {
		return concentracionesNewProd;
	}

	public void setConcentracionesNewProd(String concentracionesNewProd) {
		this.concentracionesNewProd = concentracionesNewProd;
	}

	public String getGrupoNewProd() {
		return grupoNewProd;
	}

	public void setGrupoNewProd(String grupoNewProd) {
		this.grupoNewProd = grupoNewProd;
	}

	public String getPresentacionNewProd() {
		return presentacionNewProd;
	}

	public void setPresentacionNewProd(String presentacionNewProd) {
		this.presentacionNewProd = presentacionNewProd;
	}

	public String getPaisNewProd() {
		return paisNewProd;
	}

	public void setPaisNewProd(String paisNewProd) {
		this.paisNewProd = paisNewProd;
	}

	public String getTitularidadNewProd() {
		return titularidadNewProd;
	}

	public void setTitularidadNewProd(String titularidadNewProd) {
		this.titularidadNewProd = titularidadNewProd;
	}

	public String getElaboradorNewProd() {
		return elaboradorNewProd;
	}

	public void setElaboradorNewProd(String elaboradorNewProd) {
		this.elaboradorNewProd = elaboradorNewProd;
	}

	public String getAcondicionadorNewProd() {
		return acondicionadorNewProd;
	}

	public void setAcondicionadorNewProd(String acondicionadorNewProd) {
		this.acondicionadorNewProd = acondicionadorNewProd;
	}

	public String getFichaTecnicaNewProd() {
		return fichaTecnicaNewProd;
	}

	public void setFichaTecnicaNewProd(String fichaTecnicaNewProd) {
		this.fichaTecnicaNewProd = fichaTecnicaNewProd;
	}

	public String getGrupoReporte() {
		return grupoReporte;
	}

	public void setGrupoReporte(String grupoReporte) {
		this.grupoReporte = grupoReporte;
	}
	
}
