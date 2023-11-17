package com.arquimeda.ic.parameters.biz.rs;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.arquimeda.ic.parameters.biz.boundary.LineaEJB;
import com.arquimeda.ic.parameters.biz.dto.LineaDTO;
import com.arquimeda.ic.rest.dto.ListResponseEntity;

@Path("parametros/lineas")
public class LineaRS {

	@Inject
	LineaEJB ejb;
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(
    		@QueryParam("page") @DefaultValue("1") Integer page, 
    		@QueryParam("itemsPerPage") @DefaultValue("50") Integer itemsPerPage,
    		@QueryParam("sortBy[]") String[] sortByArray,
    		@QueryParam("sortDesc[]") Boolean[] sortDescArray,
    		@QueryParam("lineaCodigo") String lineaCodigo
    		) {
      	
    	List<LineaDTO> list = ejb.getLineas();   	
		
    	return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
    	
    }
	
}
