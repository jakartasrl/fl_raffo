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

import org.slf4j.Logger;

import com.arquimeda.ic.report.boundary.ReporteInversionComercialEJB;
import com.arquimeda.ic.report.boundary.dto.ReporteInversionComercialDTO;
import com.arquimeda.ic.report.boundary.filter.ReporteExportInversionComercialFilter;
import com.arquimeda.ic.report.boundary.filter.ReporteInversionComercialFilter;
import com.arquimeda.ic.report.entity.InversionComercial.Estado;
import com.arquimeda.ic.report.entity.TipoInversion;
import com.arquimeda.ic.rest.dto.ListResponseEntity;
import com.arquimeda.ic.rest.dto.ResponseEntity;
import com.arquimeda.ic.rest.portal.dto.DateParam;

@Path("reportes/reporteInversionComercial")
public class ReporteInversionComercialRS {
	
	@Inject
	Logger logger;

	@Inject
	ReporteInversionComercialEJB reporteInversionComercialEJB;
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    public Response find(@PathParam("id") Integer id) {
		
		try {
			
			ReporteInversionComercialDTO dto = reporteInversionComercialEJB.find(id);
			
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
    		@QueryParam("tipoInversion") String tipoInversion,
    		@QueryParam("apellido") String apellido,
    		@QueryParam("numeroSolicitud") Integer numeroSolicitud,
    		@QueryParam("estado") String estado,
    		@QueryParam("congreso") Integer congreso
    		) {
    	
    	if(itemsPerPage == -1) {
    		itemsPerPage = 50;
    	}
    	
       	Date fechaSolicitudDesdeAux = Optional.ofNullable(fechaSolicitudDesde).map(f->f.getDate()).orElse(null);
    	Date fechaSolicitudHastaAux = Optional.ofNullable(fechaSolicitudHasta).map(f->f.getDate()).orElse(null);
       	Estado estadoAux = Optional.ofNullable(estado).map(t->Estado.valueOf(estado)).orElse(null);
    	TipoInversion tipoInversionAux = Optional.ofNullable(tipoInversion).map(t->TipoInversion.valueOf(tipoInversion)).orElse(null);

    	ReporteInversionComercialFilter filter = new ReporteInversionComercialFilter(fechaSolicitudDesdeAux, fechaSolicitudHastaAux, distrito, area, tipoInversionAux, apellido, numeroSolicitud, estadoAux, congreso);
      	
    	Long count = reporteInversionComercialEJB.count(filter);
    	
    	Integer firstResult = (page-1)*itemsPerPage; 
    	
    	List<ReporteInversionComercialDTO> list = reporteInversionComercialEJB.loadItems(firstResult, itemsPerPage, sortByArray, sortDescArray, filter);   	
    		
    	return Response.ok(ListResponseEntity.of(list, count)).build();
    	
    }
    
	@GET
	@Path("/export")
	@Produces(MediaType.APPLICATION_OCTET_STREAM)
	public Response export(
    		@QueryParam("fechaSolicitudDesde") DateParam fechaSolicitudDesde,
    		@QueryParam("fechaSolicitudHasta") DateParam fechaSolicitudHasta,
    		@QueryParam("distritoCodigo") String distrito,
    		@QueryParam("areaCodigo") String area,
    		@QueryParam("tipoInversion") String tipoInversion,
    		@QueryParam("apellido") String apellido,
    		@QueryParam("numeroSolicitud") Integer numeroSolicitud,
    		@QueryParam("estado") String estado,
    		@QueryParam("congreso") Integer congreso
    		) {
    	
       	Date fechaSolicitudDesdeAux = Optional.ofNullable(fechaSolicitudDesde).map(f->f.getDate()).orElse(null);
    	Date fechaSolicitudHastaAux = Optional.ofNullable(fechaSolicitudHasta).map(f->f.getDate()).orElse(null);
       	Estado estadoAux = Optional.ofNullable(estado).map(t->Estado.valueOf(estado)).orElse(null);
    	TipoInversion tipoInversionAux = Optional.ofNullable(tipoInversion).map(t->TipoInversion.valueOf(tipoInversion)).orElse(null);

    	ReporteExportInversionComercialFilter filter = new ReporteExportInversionComercialFilter(fechaSolicitudDesdeAux, fechaSolicitudHastaAux, distrito, area, tipoInversionAux, apellido, numeroSolicitud, estadoAux, congreso);
 

		File file = reporteInversionComercialEJB.export(filter);
		
		return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
				.header("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"" )
				.build();

	}

}
