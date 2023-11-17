package com.arquimeda.raf.solicitudDisenio.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="V_SOLICITUDES_DISENIO_PRODUCTOS")
public class ProductosSolicitudDisenio {
	
	@Id
	@Column(name="ID", nullable=false)
	private Integer ID;
	
	@NotNull
	@Column(name="nroSolicitud", nullable=false)
	private Integer nroSolicitud;
	
	@Column(name="codigoProd")
	private String codigoProd;
	
    @Column(name="descProd")
	private String descProd;
    
    @Column(name="grupoProd")
	private String grupoProd;
    
    @Column(name="tipoProd")
	private String tipoProd;
    
    @Column(name="marcaProd")
	private String marcaProd;
    
    @Column(name="prActivosProd")
	private String prActivosProd;
    
    @Column(name="paisProd")
	private String paisProd ;
	
	public Integer getNroSolicitud() {
		return nroSolicitud;
	}

	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}
	
	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public void setNroSolicitud(Integer nroSolicitud) {
		this.nroSolicitud = nroSolicitud;
	}

	public String getCodigoProd() {
		return codigoProd;
	}

	public void setCodigoProd(String codigoProd) {
		this.codigoProd = codigoProd;
	}

	public String getDescProd() {
		return descProd;
	}

	public void setDescProd(String descProd) {
		this.descProd = descProd;
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

	public String getMarcaProd() {
		return marcaProd;
	}

	public void setMarcaProd(String marcaProd) {
		this.marcaProd = marcaProd;
	}

	public String getPrActivosProd() {
		return prActivosProd;
	}

	public void setPrActivosProd(String prActivosProd) {
		this.prActivosProd = prActivosProd;
	}

	public String getPaisProd() {
		return paisProd;
	}

	public void setPaisProd(String paisProd) {
		this.paisProd = paisProd;
	}

	public ProductosSolicitudDisenio(Integer id, Integer nroSolicitud, String codigoProd, String descProd,
			String grupoProd, String tipoProd, String marcaProd, String prActivosProd, String paisProd) {
		super();
		this.ID = id ;
		this.nroSolicitud = nroSolicitud;
		this.codigoProd = codigoProd;
		this.descProd = descProd;
		this.grupoProd = grupoProd;
		this.tipoProd = tipoProd;
		this.marcaProd = marcaProd;
		this.prActivosProd = prActivosProd;
		this.paisProd = paisProd;
	}

	public ProductosSolicitudDisenio() {
		super();
	}
	
}
