package com.arquimeda.ic.fdn.entity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name="Z_FDN_ARCHIVO")
public class Archivo extends BaseEntity {

	@Id
	@Column(nullable=false, name="ID_ARCHIVO")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	@Basic(fetch=FetchType.LAZY)
	@Lob
	@Column(name = "CONTENIDO")
	private byte[] contenido;

	@Size(max=255)
	@Column(name="NOMBRE",nullable=true, length=255)
	private String nombre;

	
	@Size(max=255)
	@Column(name="HASH_CONTENIDO",nullable=true, length=255)
	private String hashContenido;
	

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
		Archivo other = (Archivo) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public byte[] getContenido() {
		return contenido;
	}

	public void setContenido(byte[] contenido) {
		this.contenido = contenido;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getHashContenido() {
		return hashContenido;
	}

	public void setHashContenido(String hashContenido) {
		this.hashContenido = hashContenido;
	}

}