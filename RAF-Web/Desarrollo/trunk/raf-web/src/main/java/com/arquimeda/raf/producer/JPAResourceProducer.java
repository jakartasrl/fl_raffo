package com.arquimeda.raf.producer;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.arquimeda.daffy.jpa.DefaultPU;

@ApplicationScoped
public class JPAResourceProducer {

	@Produces @DefaultPU @PersistenceContext(unitName="defaultPU") 
	private EntityManager defaultPU;
	
}
