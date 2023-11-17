package com.arquimeda.ic.parameters.biz.rs;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.slf4j.Logger;

import com.arquimeda.fluig.ws.datasetservice.DatasetDto;
import com.arquimeda.fluig.ws.datasetservice.DatasetService;
import com.arquimeda.fluig.ws.datasetservice.Exception_Exception;
import com.arquimeda.fluig.ws.datasetservice.SearchConstraintDtoArray;
import com.arquimeda.fluig.ws.datasetservice.StringArray;
import com.arquimeda.fluig.ws.datasetservice.ValuesDto;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.parameters.biz.dto.ProductoDTO;
import com.arquimeda.ic.rest.dto.ListResponseEntity;

@Path("parametros/productos")
public class ProductoRS {
	
	@Inject
	Logger logger;

	@Inject
	DatasetService datasetService;
	
	@Inject
	ParameterEJB parameterEjb;
	
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response list(
    		@QueryParam("page") @DefaultValue("1") Integer page, 
    		@QueryParam("itemsPerPage") @DefaultValue("50") Integer itemsPerPage,
    		@QueryParam("sortBy[]") String[] sortByArray,
    		@QueryParam("sortDesc[]") Boolean[] sortDescArray,
    		@QueryParam("descripcionProducto") String descripcionProducto
    		) {
      
    	try {
    		
			// Obtengo parametros
	    	int companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
			String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
			String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
			
			StringArray fields = new StringArray();
			fields.getItem().add("codigoProducto");
			fields.getItem().add("descripcionProducto");
			
			SearchConstraintDtoArray constraints = new SearchConstraintDtoArray();
			
			StringArray order = new StringArray();
			order.getItem().add("descripcionProducto");
			
	    	DatasetDto dataset;
		
			dataset = datasetService.getDataset(companyId, username, password, "RAF08-Productos", fields, constraints, order);
			
			if(dataset != null) {
				List<ProductoDTO> list = new ArrayList<ProductoDTO>();
				List<ValuesDto> values = dataset.getValues();
				for (ValuesDto valuesDto : values) {
					ProductoDTO dto = new ProductoDTO();
					dto.setCodigoProducto(valuesDto.getValue().get(0).toString());
					dto.setDescripcionProducto(valuesDto.getValue().get(1).toString());
					list.add(dto);
				}
				return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception_Exception e) {
			logger.error("Se produjo un error en el list de ProductoRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
		}
     	
    }
	
}
