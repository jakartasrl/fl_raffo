package com.arquimeda.ic.parameters.biz.rs;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;

import com.arquimeda.ic.parameters.biz.boundary.CountryEJB;
import com.arquimeda.ic.parameters.biz.dto.CountryDTO;
import com.arquimeda.ic.parameters.biz.dto.StateDTO;

@Path("parametros/countries")
public class CountryRS {

	@Inject
	Logger logger;
    
    @Inject
    CountryEJB ejb;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
    public List<CountryDTO> listCountries() {

    	logger.info("Listing countries");

        List<CountryDTO> countriesDTO = ejb.listEnabledCountries();

        return countriesDTO;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}/states")
    public List<StateDTO> listStates(
    		@PathParam("id") Long countryId) {

    	logger.info("Listing states");

    	List<StateDTO> statesDTO = ejb.listEnabledStatesFromCountry(countryId);

        return statesDTO;
    }

	@GET
	@Path("/{country}")
    public CountryDTO findCountry(
    		@PathParam("country") Long countryId) {
    	
    	CountryDTO countryDTO = ejb.getExistingCountryById(countryId);
    	
        return countryDTO;

    }
}
