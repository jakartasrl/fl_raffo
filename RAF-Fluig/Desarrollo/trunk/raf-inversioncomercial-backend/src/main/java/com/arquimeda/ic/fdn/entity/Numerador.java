package com.arquimeda.ic.fdn.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Z_FDN_NUMERADOR")
public class Numerador extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(nullable=false, name="ID_NUMERADOR")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Column(name="CODIGO", nullable=false, length=256, unique=true)
	private String codigo;

	@Column(name="ULTIMO_NUMERO")
	private Integer ultimoNumero;

	public Numerador() {
		if (ultimoNumero == null) {
			ultimoNumero = 0;
		}
	}
	
	/**
     * Incrementa el contador
     * @return el valor incrementado
     */
    public Integer siguienteNumero() {
    	setUltimoNumero(getUltimoNumero() + 1);
    	return getUltimoNumero();
    }
    
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUltimoNumero() {
		return this.ultimoNumero;
	}

	public void setUltimoNumero(Integer ultimoNumero) {
		this.ultimoNumero = ultimoNumero;
	}
	
    public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


}