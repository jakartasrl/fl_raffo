package com.arquimeda.ic.parameters.biz.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Z_RAF_STATE")
public class State{
	
	@PrePersist
	@PreRemove
	@PreUpdate
	public void onNonReadOnlyOperation() {
		throw new RuntimeException("Entity read-only.");
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Column(name = "CODE", nullable = false, length=50)
	@Size(max = 50)
	private String code;
	
	@NotNull
	@Column(name = "DESCRIPTION", nullable = false, length=255)
	@Size(max = 300)
	private String description;
	
	@NotNull
	@Column(name = "ENABLED", nullable = false)
	private Boolean enabled;

	@NotNull
	@ManyToOne
    @JoinColumn(name="COUNTRY_ID", nullable = false)
	private Country country;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

}
