package com.arquimeda.ic.fdn.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Z_FDN_PARAMETER")
public class Parameter {

	@Id
	@Column(name="NAME")
	private String name;

	@NotNull
	@Column(name="VALUE")
	private String value;

	@NotNull
	@Column(nullable=false)
	@Enumerated(EnumType.STRING)
	private DataType dataType;

	@SuppressWarnings("unchecked")
	public <E> E getConvertedValue(){
		return (E)getDataType().parseValue(this.value);
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setDataType(DataType dataType) {
		this.dataType = dataType;
	}

	public DataType getDataType() {
		return dataType;
	}
	
	

}