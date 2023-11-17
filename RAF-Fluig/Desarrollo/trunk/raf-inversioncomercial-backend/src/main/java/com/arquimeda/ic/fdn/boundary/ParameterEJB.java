package com.arquimeda.ic.fdn.boundary;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;

import com.arquimeda.ic.fdn.entity.Parameter;

@Stateless
public class ParameterEJB {
	
	@Inject
	Logger logger;

	@PersistenceContext(name="defaultPU")
	EntityManager em;

	public ParameterEJB(){

	}

	public void delete(Parameter parameterEntity){
		if (!em.contains(parameterEntity)) {
			parameterEntity = em.merge(parameterEntity);
		}
		em.remove(parameterEntity);
	}

	public Parameter save(Parameter parameterEntity){
		return em.merge(parameterEntity);
	}

	@TransactionAttribute(TransactionAttributeType.NOT_SUPPORTED)
	public <E> E getParameter(String name){
		
		try {
			
			Parameter parameter = em.find(Parameter.class,name);
			
			return parameter.getConvertedValue();
			
		} catch (NoResultException ex){
			logger.error("No existe un valor por defecto para el parametro: " + name);
			return null;
		} catch (Exception ex){
			logger.error("Error convirtiendo valor del parametro: " + name, ex);
			return null;
		}
	} 


}
