package com.arquimeda.ic.parameters.biz.boundary;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.annotations.QueryHints;
import org.slf4j.Logger;

import com.arquimeda.ic.fdn.entity.Usuario;
import com.arquimeda.ic.parameters.biz.dto.CountryDTO;
import com.arquimeda.ic.parameters.biz.dto.StateDTO;
import com.arquimeda.ic.parameters.biz.entity.Country;
import com.arquimeda.ic.parameters.biz.entity.State;
import com.arquimeda.ic.producer.LoggedUser;

@Stateless
public class CountryEJB {
	
	@Inject @LoggedUser
	Usuario usuario;

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	public List<CountryDTO> listEnabledCountries(){
		
		TypedQuery<Country> query = em.createQuery("SELECT c " + 
													" FROM Country c " + 
													" WHERE c.enabled = :enabled " + 
													" AND c.code <> 'AR'" +
													" ORDER BY c.description", Country.class)
				.setParameter("enabled", true);
		
		List<CountryDTO> list = query
				.setHint(QueryHints.READ_ONLY, true)
				.getResultList()    		
				.stream()
				.map(CountryDTO::fromEntity)
				.collect(Collectors.toCollection(ArrayList::new)); 			
													
		logger.info("Countries del Usuario: " + list);
		
		return list;
		
	}
	
	public CountryDTO getExistingCountryById(Long countryId){

		Country country = em.find(Country.class, countryId);		
		return CountryDTO.fromEntity(country);
	
	}
	
	public List<StateDTO> listEnabledStatesFromCountry(Long countryId){
		
		TypedQuery<State> query = em.createQuery("SELECT s " + 
													" FROM State s " + 
													" WHERE s.enabled = :enabled " + 
													" AND s.country.id = :countryId " +
													" ORDER BY s.description", State.class)
				.setParameter("enabled", true)
				.setParameter("countryId", countryId);
		
		List<StateDTO> list = query
				.setHint(QueryHints.READ_ONLY, true)
				.getResultList()    		
				.stream()
				.map(StateDTO::fromEntity)
				.collect(Collectors.toCollection(ArrayList::new)); 			
		
		logger.info("States del Usuario: " + list);
		
		return list;

	}

}
