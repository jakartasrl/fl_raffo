package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.Country;

public class CountryDTO {
	
	private Long id;
	private String description;
	private String code;
	private Boolean enabled;
	
	public CountryDTO() {}

	public CountryDTO(Long id, String code, String description, Boolean enabled) {

		this.id = id;
		this.code = code;
		this.description = description;
		this.enabled = enabled;
		
	}

	public CountryDTO(Country country) {
		
		this.id = country.getId();
		this.description = country.getDescription();
		this.code = country.getCode();
		this.enabled = country.getEnabled();
		
	}

	public static CountryDTO fromEntity(Country country) {
		return country != null? new CountryDTO(country) : null;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public String toString() {
		return "CountryDTO [id=" + id + ", description=" + description + ", code=" + code + ", enabled=" + enabled
				+ "]";
	}

}
