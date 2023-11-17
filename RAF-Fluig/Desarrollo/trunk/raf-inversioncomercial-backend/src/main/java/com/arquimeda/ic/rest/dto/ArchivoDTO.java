package com.arquimeda.ic.rest.dto;

import com.arquimeda.ic.fdn.entity.Archivo;

public class ArchivoDTO {

	private Integer id;
	private String nombre;
	private String hash;
	
	
	public static ArchivoDTO fromEntity(Archivo archivo) {
		ArchivoDTO dto = new ArchivoDTO();
		dto.setId(archivo.getId());
		dto.setNombre(archivo.getNombre());
		dto.setHash(archivo.getHashContenido());
		
		return dto;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getHash() {
		return hash;
	}

	public void setHash(String hash) {
		this.hash = hash;
	}
	
	
	
}
