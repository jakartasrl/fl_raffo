package com.arquimeda.ic.report.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.arquimeda.ic.fdn.entity.BaseEntity;

@Entity
@Table(name="Z_RAF_IMPUTACION")
public class Imputacion extends BaseEntity {
	
	@Id
	@Column(nullable=false, name="ID")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="CODIGO_PRODUCTO")
	private String codigoProducto;
	
	@Column(name="PRODUCTO")
	private String producto;
	
	@Column(name="PORCENTAJE", precision=6,scale=2)
	private BigDecimal porcentaje;
	
	@Column(name="PRESUPUESTO_ARS", precision=18,scale=2)
	private BigDecimal presupuestoARS;
	
	@Column(name="CONSUMIDO_ARS", precision=18,scale=2)
	private BigDecimal consumidoARS;
	
	@ManyToOne
	@JoinColumn(name="INVERSION_COMERCIAL_ID")
	private InversionComercial inversionComercial;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	public String getProducto() {
		return producto;
	}

	public void setProducto(String producto) {
		this.producto = producto;
	}

	public BigDecimal getPorcentaje() {
		return porcentaje;
	}

	public void setPorcentaje(BigDecimal porcentaje) {
		this.porcentaje = porcentaje;
	}

	public BigDecimal getPresupuestoARS() {
		return presupuestoARS;
	}

	public void setPresupuestoARS(BigDecimal presupuestoARS) {
		this.presupuestoARS = presupuestoARS;
	}

	public BigDecimal getConsumidoARS() {
		return consumidoARS;
	}

	public void setConsumidoARS(BigDecimal consumidoARS) {
		this.consumidoARS = consumidoARS;
	}
	
	public synchronized InversionComercial getInversionComercial() {
		return inversionComercial;
	}

	public synchronized void setInversionComercial(InversionComercial inversionComercial) {
		this.inversionComercial = inversionComercial;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Imputacion other = (Imputacion) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
