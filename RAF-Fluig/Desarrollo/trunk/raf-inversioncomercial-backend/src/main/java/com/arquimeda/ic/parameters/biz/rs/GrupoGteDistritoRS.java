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

import com.arquimeda.fluig.ws.datasetservice.DatasetDto;
import com.arquimeda.fluig.ws.datasetservice.DatasetService;
import com.arquimeda.fluig.ws.datasetservice.Exception_Exception;
import com.arquimeda.fluig.ws.datasetservice.SearchConstraintDtoArray;
import com.arquimeda.fluig.ws.datasetservice.StringArray;
import com.arquimeda.fluig.ws.datasetservice.ValuesDto;
import com.arquimeda.ic.fdn.boundary.ParameterEJB;
import com.arquimeda.ic.parameters.biz.dto.GrupoGteDistritoDTO;
import com.arquimeda.ic.rest.dto.ListResponseEntity;

@Path("parametros/gruposGteDistrito")
public class GrupoGteDistritoRS {

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
    		@QueryParam("codigoGrupoGteDist") String codigoGrupoGteDist
    		) {
      
    	try {
    		
			// Obtengo parametros
	    	int companyId = parameterEjb.getParameter("fluig.workflowengineservice.companyId");
			String username = parameterEjb.getParameter("fluig.workflowengineservice.username");
			String password = parameterEjb.getParameter("fluig.workflowengineservice.password");
			
			StringArray fields = new StringArray();
			fields.getItem().add("grupoGteDistrito");
			fields.getItem().add("codGrupoGteDistrito");
			
//			SearchConstraintDto c1 = new SearchConstraintDto();
//			c1.setContraintType("1");
//			c1.setFieldName("codGrupoGteDistrito");
//			c1.setInitialValue(codigoGrupoGteDist);
//			c1.setFinalValue(codigoGrupoGteDist);
//			
//			SearchConstraintDtoArray constraints = new SearchConstraintDtoArray();
//			constraints.getItem().add(c1);
			
			SearchConstraintDtoArray constraints = new SearchConstraintDtoArray();
			constraints.getItem().contains("grupoGteDistrito");
			
			StringArray order = new StringArray();
			order.getItem().add("grupoGteDistrito");
			
	    	DatasetDto dataset;
		
			dataset = datasetService.getDataset(companyId, username, password, "RAF08-Distrito", fields, constraints, order);
			
			if(dataset != null) {
				List<GrupoGteDistritoDTO> list = new ArrayList<GrupoGteDistritoDTO>();
				List<ValuesDto> values = dataset.getValues();
				for (ValuesDto valuesDto : values) {
					GrupoGteDistritoDTO dto = new GrupoGteDistritoDTO();
					dto.setCodigoGrupoGteDist(valuesDto.getValue().get(6).toString());
					dto.setDescGrupoGteDist(valuesDto.getValue().get(8).toString());
					list.add(dto);
				}
				return Response.ok(ListResponseEntity.of(list, Long.valueOf(list.size()))).build();
			}else {
				return Response.status(Response.Status.NOT_FOUND).build();
			}
			
		} catch (Exception_Exception e) {
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
    				.entity(e.getMessage())
    				.build();
		}
     	
    }
	
}
