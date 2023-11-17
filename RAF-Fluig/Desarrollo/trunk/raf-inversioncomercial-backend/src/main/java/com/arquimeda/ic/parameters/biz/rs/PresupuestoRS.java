package com.arquimeda.ic.parameters.biz.rs;

import java.io.File;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;

import com.arquimeda.ic.parameters.biz.boundary.PresupuestoEJB;
import com.arquimeda.ic.parameters.biz.dto.PresupuestoDTO;
import com.arquimeda.ic.parameters.biz.filter.PresupuestoFilter;
import com.arquimeda.ic.rest.config.ErrorResponse;
import com.arquimeda.ic.rest.config.ErrorResponse.PersistenceAction;
import com.arquimeda.ic.rest.dto.ListResponseEntity;
import com.arquimeda.ic.rest.dto.ResponseEntity;

@Path("parametros/presupuesto")
public class PresupuestoRS {
	
	@Inject
	Logger logger;

	@Inject
	PresupuestoEJB presupuestoEJB;
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
		
		try {
			
			PresupuestoDTO dto = presupuestoEJB.find(id);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception e) {
			logger.error("Se produjo un error en el find de PresupuestoRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
    	}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
    public Response add(PresupuestoDTO dto) {

    	try {

    		dto = presupuestoEJB.save(dto);
    		
    		return Response.ok(ResponseEntity.of(dto)).build();
    		
    	} catch (Exception e) {
    		logger.error("Se produjo un error en el add de PresupuestoRS.", e);
    		return ErrorResponse
    				.fromException(e)
    				.persistenceAction(PersistenceAction.SAVE)
    				.build();
    	}
     	
    }
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Integer id, PresupuestoDTO dto) {
		
		try {
			
			dto.setId(id);			
			dto = presupuestoEJB.update(dto);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
    	} catch (Exception e) {
    		logger.error("Se produjo un error en el update de PresupuestoRS.", e);
    		return ErrorResponse
    				.fromException(e)
    				.persistenceAction(PersistenceAction.SAVE)
    				.build();
    	}
		
	}	
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") Integer id) {
		
		try {
			
			PresupuestoDTO dto = presupuestoEJB.delete(id);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
    	} catch (Exception e) {
    		logger.error("Se produjo un error en el delete de PresupuestoRS.", e);
    		return ErrorResponse
    				.fromException(e)
    				.persistenceAction(PersistenceAction.DELETE)
    				.build();
    	}
		
	}
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(
    		@QueryParam("page") @DefaultValue("1") Integer page, 
    		@QueryParam("itemsPerPage") @DefaultValue("50") Integer itemsPerPage,
    		@QueryParam("sortBy[]") String[] sortByArray,
    		@QueryParam("sortDesc[]") Boolean[] sortDescArray,
    		@QueryParam("descGrupoGteDist") String codigoGrupoGteDist,
    		@QueryParam("codigoProducto") String codigoProducto,
    		@QueryParam("anio") Integer anio
    		) {
        
    	if(itemsPerPage == -1) {
    		itemsPerPage = 50;
    	}
    	
    	PresupuestoFilter filter = new PresupuestoFilter(codigoGrupoGteDist, codigoProducto, anio);
      	
    	Long count = presupuestoEJB.count(filter);
    	
    	Integer firstResult = (page-1)*itemsPerPage; 
    	
    	List<PresupuestoDTO> list = presupuestoEJB.loadItems(firstResult, itemsPerPage, sortByArray, sortDescArray, filter);   	
    		
    	return Response.ok(ListResponseEntity.of(list, count)).build();
    	
    }
    
	@GET
	@Path("/export")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response export(@QueryParam("descGrupoGteDist") String codigoGrupoGteDist,
    		@QueryParam("codigoProducto") String codigoProducto,
    		@QueryParam("anio") Integer anio
			) {

    	PresupuestoFilter filter = new PresupuestoFilter(codigoGrupoGteDist, codigoProducto, anio);

		File file = presupuestoEJB.export(filter);
		
		return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
				.header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"" )
				.build();

	}

}
