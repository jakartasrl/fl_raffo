package com.arquimeda.ic.fdn.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="Z_FDN_EMPRESA")
@NamedQuery(name="Empresa.findByCodigo", query="SELECT e FROM Empresa e WHERE e.codigo = :codigo") 
public class Empresa extends BaseEntity {

	public enum Origen {
		Nacional,
		Extranjera;
	}
	
	@Id
	@Column(nullable=false, name="ID_EMPRESA")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Size(max=13)
	@Column(name="RFC",nullable=false, length=13)
	private String rfc;	
	
	@Size(max=50)
	@Column(name="NOMBRE",nullable=false, length=50)
	private String nombre;

	@Column(name="ORIGEN", length=15)
	@Enumerated(EnumType.STRING)
	private Origen origen;
	
	@Size(max=100)
	@Column(name="DOMICILIO",nullable=true, length=100)
	private String domicilio;
	
	@Size(max=6)
	@Column(name="CODIGO",nullable=false, length=6, unique=true)
	private String codigo;
	
	@NotNull
	@Column(name="ACTIVO",nullable=false, length=255)
	private Boolean activo;
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public String getRfc() {
		return rfc;
	}

	public void setRfc(String rfc) {
		this.rfc = rfc;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Origen getOrigen() {
		return origen;
	}

	public void setOrigen(Origen origen) {
		this.origen = origen;
	}

	public String getDomicilio() {
		return domicilio;
	}

	public void setDomicilio(String domicilio) {
		this.domicilio = domicilio;
	}
	
	public Boolean getActivo() {
		return activo;
	}

	public void setActivo(Boolean activo) {
		this.activo = activo;
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
		Empresa other = (Empresa) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	public boolean esNacional() {
		return origen.Nacional.equals(this.origen);
	}

}