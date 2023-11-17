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
import com.arquimeda.fluig.ws.datasetservice.SearchConstraintDtoArray;
import com.arquimeda.fluig.ws.datasetservice.StringArray;
import com.arquimeda.fluig.ws.datasetservice.ValuesDto;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.parameters.biz.dto.TipoInversionDTO;
import com.arquimeda.ic.rest.dto.ListResponseEntity;

@Path("parametros/tipoInversiones")
public class TipoInversionRS {
	
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
    		@QueryParam("tipoInversionCodigo") String tipoInversionCodigo
    		) {
      
    	try {
    		
			// Obtengo parametros
	    	int companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
			String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
			String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
			
			StringArray fields = new StringArray();
			fields.getItem().add("codigo");
			fields.getItem().add("descripcion");
			
			SearchConstraintDtoArray constraints = new SearchConstraintDtoArray();
			
			StringArray order = new StringArray();
			order.getItem().add("descripcion");
			
	    	DatasetDto dataset;
		
			dataset = datasetService.getDataset(companyId, username, password, "RAF10-TipoInversion", fields, constraints, order);
			
			if(dataset != null) {
				List<TipoInversionDTO> list = new ArrayList<TipoInversionDTO>();
				List<ValuesDto> values = dataset.getValues();

				for (ValuesDto valuesDto : values) {
					
					//## list de TipoInversionRS. i: 0, [14681, 14676, 1000, 14676, 3000, 1, 02, Tipo de InversiÃ³n 02, 14681, 2, 1000]

					TipoInversionDTO dto = new TipoInversionDTO();
					dto.setCodigo(valuesDto.getValue().get(6).toString());
					dto.setDescripcion(valuesDto.getValue().get(7).toString());
					list.add(dto);

				}
				return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception e) {
			logger.error("Se produjo un error en el list de TipoInversionRS.", e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
		}
     	
    }
	
}
