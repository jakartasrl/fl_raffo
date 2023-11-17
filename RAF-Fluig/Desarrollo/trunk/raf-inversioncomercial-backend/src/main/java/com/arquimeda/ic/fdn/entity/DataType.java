package com.arquimeda.ic.fdn.entity;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Al agregar un tipo nuevo:
 * 1)Agregalo al enum
 * 2)Creale un mapa en el ConfigProducer con el nombre produced${NuevoDataType}
 * 3)En el metodo init de ConfigProducer instanciar el mapa recien creado, darle una entrada en el conjunto de ifs para llenarlo con los valores.
 */
@SuppressWarnings({"unchecked","rawtypes"})
public enum DataType {	
	
	STRING(String.class) {
		@Override
		public <E> E parseValue(String value) {
			return (E) value;
		}
	},
	INTEGER(Integer.class) {
		@Override
		public <E> E parseValue(String value) {
			return (E) (value!=null? new Integer(value) : null);
		}
	},
	BOOLEAN(Boolean.class) {
		@Override
		public <E> E parseValue(String value) {
			if(value!=null){
				if(value.equals("0")){
					return (E) new Boolean("false");
				}else if(value.equals("1")){
					return (E) new Boolean("true");
				}
				return (E) (value!=null? new Boolean(value) : null);
			}else{
				return null;
			}
		}
	},
	DATE(Date.class) {
		@Override
		public <E> E parseValue(String value) {
			if(value.length() > 10){
				try{
					return (E) (value!=null? new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").parse(value) : null);
				}catch(ParseException e){
					logger.error("El formato de la fecha debe ser dd/MM/yyyy HH:mm:ss");
					throw new IllegalArgumentException("El formato de la fecha debe ser dd/MM/yyyy HH:mm:ss", e);
				}
			}
			try {
				return (E) (value!=null? new SimpleDateFormat("dd/MM/yyyy").parse(value) : null);
			} catch (ParseException e) {
				logger.error("El formato de la fecha debe ser dd/MM/yyyy");
				throw new IllegalArgumentException("El formato de la fecha debe ser dd/MM/yyyy", e);
			}
		}
	},
	BIGDECIMAL(BigDecimal.class) {
		@Override
		public <E> E parseValue(String value) {
			return (E) (value!=null? new BigDecimal(value.replace(",", ".")) : null);
		}
	};
	
	private final static Logger logger = LoggerFactory.getLogger(DataType.class);
	
	Class type=null;
	
	DataType(Class type){
		this.type=type;
	}

	public abstract <E> E parseValue(String value);
	
}
