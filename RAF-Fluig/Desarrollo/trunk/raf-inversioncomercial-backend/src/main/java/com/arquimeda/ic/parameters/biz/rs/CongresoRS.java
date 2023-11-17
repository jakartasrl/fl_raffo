package com.arquimeda.ic.parameters.biz.rs;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.ejb.EJBException;
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

import com.arquimeda.ic.parameters.biz.boundary.CongresoEJB;
import com.arquimeda.ic.parameters.biz.dto.CongresoDTO;
import com.arquimeda.ic.parameters.biz.entity.PresupuestoHabilitado;
import com.arquimeda.ic.parameters.biz.filter.CongresoFilter;
import com.arquimeda.ic.rest.dto.ListResponseEntity;
import com.arquimeda.ic.rest.dto.ResponseEntity;
import com.arquimeda.ic.rest.portal.dto.DateParam;

@Path("parametros/congreso")
public class CongresoRS {
	
	@Inject
	Logger logger;

	@Inject
	CongresoEJB ejb;
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
		
		try {
			
			CongresoDTO dto = ejb.find(id);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception e) {
			logger.error("Se produjo un error en el find de CongresoRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
    	}
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
    public Response add(CongresoDTO dto){

    	try {

    		logger.info("Nuevo Congreso: " + dto);
    		
    		dto = ejb.save(dto);
    		
    		return Response.ok(ResponseEntity.of(dto)).build();
    		
    	} catch (Exception e) {
			
			if(e instanceof EJBException) {
				Throwable cause1 = e.getCause();				
				if(cause1 != null && cause1 instanceof IllegalArgumentException) {	
					return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
							.entity(cause1.getMessage())
							.build();
				}
			}
			
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity(e.getMessage()).build();
	
		}		
     	
    }
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Integer id, CongresoDTO dto){
		
		try {
			logger.info("Actualizar Congreso: " + dto);
			
			dto.setId(id);			
			dto = ejb.update(dto);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception e) {
			
			if(e instanceof EJBException) {
				Throwable cause1 = e.getCause();				
				if(cause1 != null && cause1 instanceof IllegalArgumentException) {	
					return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
							.entity(cause1.getMessage())
							.build();
				}
			}
			
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity(e.getMessage()).build();
	
		}
		
	}	
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") Integer id) {
		
		try {
			
			CongresoDTO dto = ejb.delete(id);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
    	} catch (Exception e) {
    		logger.error("Se produjo un error en el delete de CongresoRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("El congreso que intenta eliminar esta siendo utilizado.")
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
    		@QueryParam("siglas") String siglas,
    		@QueryParam("nombre") String nombre,
       		@QueryParam("fechaInicioDesde") DateParam fechaInicioDesde,
    		@QueryParam("fechaInicioHasta") DateParam fechaInicioHasta,
       		@QueryParam("fechaFinDesde") DateParam fechaFinDesde,
    		@QueryParam("fechaFinHasta") DateParam fechaFinHasta,
    		@QueryParam("presupuestoHabilitado") String presupuestoHabilitado,
    		@QueryParam("codigo") String codigo
    		) {
        
    	if(itemsPerPage == -1) {
    		itemsPerPage = 50;
    	}
    	
       	Date fechaInicioDesdeAux = Optional.ofNullable(fechaInicioDesde).map(f->f.getDate()).orElse(null);
    	Date fechaInicioHastaAux = Optional.ofNullable(fechaInicioHasta).map(f->f.getDate()).orElse(null);
       	Date fechaFinDesdeAux = Optional.ofNullable(fechaFinDesde).map(f->f.getDate()).orElse(null);
    	Date fechaFinHastaAux = Optional.ofNullable(fechaFinHasta).map(f->f.getDate()).orElse(null);
    	PresupuestoHabilitado presupuestoHabilitadoAux = Optional.ofNullable(presupuestoHabilitado).map(t->PresupuestoHabilitado.valueOf(presupuestoHabilitado)).orElse(null);
    	
    	CongresoFilter filter = new CongresoFilter(siglas, nombre, fechaInicioDesdeAux, fechaInicioHastaAux, fechaFinDesdeAux, fechaFinHastaAux, presupuestoHabilitadoAux, codigo);
      	
    	Long count = ejb.count(filter);
    	
    	Integer firstResult = (page-1)*itemsPerPage; 
    	
    	List<CongresoDTO> list = ejb.loadItems(firstResult, itemsPerPage, sortByArray, sortDescArray, filter);   	
    		
    	return Response.ok(ListResponseEntity.of(list, count)).build();
    	
    }
    
	@GET
	@Path("/export")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response export(
    		@QueryParam("siglas") String siglas,
    		@QueryParam("nombre") String nombre,
       		@QueryParam("fechaInicioDesde") DateParam fechaInicioDesde,
    		@QueryParam("fechaInicioHasta") DateParam fechaInicioHasta,
       		@QueryParam("fechaFinDesde") DateParam fechaFinDesde,
    		@QueryParam("fechaFinHasta") DateParam fechaFinHasta,
    		@QueryParam("presupuestoHabilitado") String presupuestoHabilitado,
    		@QueryParam("codigo") String codigo
			) {

      	Date fechaInicioDesdeAux = Optional.ofNullable(fechaInicioDesde).map(f->f.getDate()).orElse(null);
    	Date fechaInicioHastaAux = Optional.ofNullable(fechaInicioHasta).map(f->f.getDate()).orElse(null);
       	Date fechaFinDesdeAux = Optional.ofNullable(fechaFinDesde).map(f->f.getDate()).orElse(null);
    	Date fechaFinHastaAux = Optional.ofNullable(fechaFinHasta).map(f->f.getDate()).orElse(null);
    	PresupuestoHabilitado presupuestoHabilitadoAux = Optional.ofNullable(presupuestoHabilitado).map(t->PresupuestoHabilitado.valueOf(presupuestoHabilitado)).orElse(null);
    	
    	CongresoFilter filter = new CongresoFilter(siglas, nombre, fechaInicioDesdeAux, fechaInicioHastaAux, fechaFinDesdeAux, fechaFinHastaAux, presupuestoHabilitadoAux, codigo);

		File file = ejb.export(filter);
		
		return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
				.header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"" )
				.build();

	}
	
    @GET
	@Path("/presupuestos")
    @Produces(MediaType.APPLICATION_JSON)
    public Response list() {
      	
    	List<PresupuestoHabilitado> list = ejb.getPresupuestos();   	
		
    	return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
    	
    }
    
	@GET
	@Path("/isReadonly")
	@Produces(MediaType.APPLICATION_JSON)
	public Response isReadonly(){
		
		try {
			
			Boolean apm = ejb.isReadonly();

			return Response.ok(ResponseEntity.of(apm)).build();
			
		} catch (Exception e) {
			logger.error("Se produjo un error en isReadonly de CongresoRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
    	}
	}
	
    @GET
	@Path("/congresos")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCongresos() {
      	
    	List<CongresoDTO> list = ejb.getCongresos();   	
		
    	return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
    	
    }

}
