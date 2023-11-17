package com.arquimeda.raf.legajo.biz.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="V_SEDE")
public class Sede {

	@Id
	private String descripcion;

	@Override
	public String toString() {
		return descripcion;
	}
	
	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
			
}
