package com.arquimeda.ic.report.rs;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.arquimeda.ic.report.boundary.ReporteCartaAcuerdoEJB;
import com.arquimeda.ic.report.boundary.dto.ReporteCartaAcuerdoDTO;
import com.arquimeda.ic.report.boundary.filter.ReporteCartaAcuerdoFilter;
import com.arquimeda.ic.report.entity.CartaAcuerdo.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;
import com.arquimeda.ic.rest.dto.ListResponseEntity;
import com.arquimeda.ic.rest.dto.ResponseEntity;
import com.arquimeda.ic.rest.portal.dto.DateParam;

@Path("reportes/reporteCartaAcuerdo")
public class ReporteCartaAcuerdoRS {

	@Inject
	ReporteCartaAcuerdoEJB reporteCartaAcuerdoEJB;
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
		
		try {
			
			ReporteCartaAcuerdoDTO dto = reporteCartaAcuerdoEJB.find(id);
			
			if(dto != null) {
				return Response.ok(ResponseEntity.of(dto)).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception e) {
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
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
    		@QueryParam("fechaSolicitudDesde") DateParam fechaSolicitudDesde,
    		@QueryParam("fechaSolicitudHasta") DateParam fechaSolicitudHasta,
    		@QueryParam("distritoCodigo") String distrito,
    		@QueryParam("areaCodigo") String area,
    		@QueryParam("nombre") String nombre,
    		@QueryParam("apellido") String apellido,
    		@QueryParam("nroInversionComercial") Integer nroInversionComercial,
    		@QueryParam("numeroSolicitud") Integer numeroSolicitud,
    		@QueryParam("estado") String estado,
    		@QueryParam("tipoInversion") String tipoInversion
    		) {
    	
    	if(itemsPerPage == -1) {
    		itemsPerPage = 50;
    	}
    	
       	Date fechaSolicitudDesdeAux = Optional.ofNullable(fechaSolicitudDesde).map(f->f.getDate()).orElse(null);
    	Date fechaSolicitudHastaAux = Optional.ofNullable(fechaSolicitudHasta).map(f->f.getDate()).orElse(null);
       	Estado estadoAux = Optional.ofNullable(estado).map(t->Estado.valueOf(estado)).orElse(null);
    	TipoInversion tipoInversionAux = Optional.ofNullable(tipoInversion).map(t->TipoInversion.valueOf(tipoInversion)).orElse(null);
    	
    	ReporteCartaAcuerdoFilter filter = new ReporteCartaAcuerdoFilter(fechaSolicitudDesdeAux, fechaSolicitudHastaAux, 
    			distrito, area, nombre, apellido, nroInversionComercial, numeroSolicitud, estadoAux, tipoInversionAux);
      	
    	Long count = reporteCartaAcuerdoEJB.count(filter);
    	
    	Integer firstResult = (page-1)*itemsPerPage; 
    	
    	List<ReporteCartaAcuerdoDTO> list = reporteCartaAcuerdoEJB.loadItems(firstResult, itemsPerPage, sortByArray, sortDescArray, filter);   	
    		
    	return Response.ok(ListResponseEntity.of(list, count)).build();
    	
    }
    
	@GET
	@Path("/export")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response export(@QueryParam("fechaSolicitudDesde") DateParam fechaSolicitudDesde,
    		@QueryParam("fechaSolicitudHasta") DateParam fechaSolicitudHasta,
    		@QueryParam("distritoCodigo") String distrito,
    		@QueryParam("areaCodigo") String area,
    		@QueryParam("nombre") String nombre,
    		@QueryParam("apellido") String apellido,
    		@QueryParam("nroInversionComercial") Integer nroInversionComercial,
    		@QueryParam("numeroSolicitud") Integer numeroSolicitud,
    		@QueryParam("estado") String estado,
    		@QueryParam("tipoInversion") String tipoInversion
    		) {
    	
       	Date fechaSolicitudDesdeAux = Optional.ofNullable(fechaSolicitudDesde).map(f->f.getDate()).orElse(null);
    	Date fechaSolicitudHastaAux = Optional.ofNullable(fechaSolicitudHasta).map(f->f.getDate()).orElse(null);
       	Estado estadoAux = Optional.ofNullable(estado).map(t->Estado.valueOf(estado)).orElse(null);
    	TipoInversion tipoInversionAux = Optional.ofNullable(tipoInversion).map(t->TipoInversion.valueOf(tipoInversion)).orElse(null);
    	
    	ReporteCartaAcuerdoFilter filter = new ReporteCartaAcuerdoFilter(fechaSolicitudDesdeAux, fechaSolicitudHastaAux, 
    			distrito, area, nombre, apellido, nroInversionComercial, numeroSolicitud, estadoAux, tipoInversionAux);


		File file = reporteCartaAcuerdoEJB.export(filter);
		
		return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
				.header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"" )
				.build();

	}

}
