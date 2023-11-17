package com.arquimeda.ic.parameters.biz.dto;

import com.arquimeda.ic.parameters.biz.entity.State;

public class StateDTO {

	private Long id;
	private String description;
	private String code;
	private Boolean enabled;
	private CountryDTO country;
	
	public StateDTO() {
		
	}

	public StateDTO(State state) {	
		this.id = state.getId();
		this.description = state.getDescription();
		this.code = state.getCode();
		this.enabled = state.getEnabled();	
		this.country = CountryDTO.fromEntity(state.getCountry());		
	}

	public StateDTO(Long id, String code, String description) {
		
		this.id = id; 
		this.code = code;
		this.description = description;
	
	}

	public CountryDTO getCountry() {
		return country;
	}

	public void setCountry(CountryDTO country) {
		this.country = country;
	}

	public static StateDTO fromEntity(State state) {		
		return state != null? new StateDTO(state) : null;		
	}

	public static StateDTO fromEntityWithoutCountry(State state) {
		return state != null? new StateDTO(state.getId(), state.getCode(), state.getDescription()) : null;
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
		return "StateDTO [id=" + id + ", description=" + description + ", code=" + code + ", enabled=" + enabled
				+ ", country=" + country + "]";
	}
	
}
