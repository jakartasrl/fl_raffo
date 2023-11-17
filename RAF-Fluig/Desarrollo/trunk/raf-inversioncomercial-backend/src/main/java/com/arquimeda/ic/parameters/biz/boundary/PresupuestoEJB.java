package com.arquimeda.ic.parameters.biz.boundary;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.hibernate.Query;
import org.hibernate.ScrollMode;
import org.hibernate.ScrollableResults;
import org.hibernate.annotations.QueryHints;
import org.slf4j.Logger;

import com.arquimeda.elmer.exporter.DefaultXlsTemplate;
import com.arquimeda.elmer.exporter.XlsAlignment;
import com.arquimeda.elmer.exporter.XlsDataSource;
import com.arquimeda.elmer.exporter.XlsExporter;
import com.arquimeda.elmer.exporter.XlsSheet;
import com.arquimeda.ic.parameters.biz.dto.PresupuestoDTO;
import com.arquimeda.ic.parameters.biz.entity.Presupuesto;
import com.arquimeda.ic.parameters.biz.filter.PresupuestoFilter;
import com.arquimeda.ic.utils.ScrollableResultsIteratorImpl;

@Stateless
public class PresupuestoEJB {

	@PersistenceContext(name="defaultPU")
	EntityManager em;
	
	@Inject
	Logger logger;
	
	public Long count(PresupuestoFilter filter) {
		
		// Cuento el total
    	TypedQuery<Long> query = em.createQuery(
    			"SELECT COUNT(p) FROM Presupuesto p " + filter.getWhere(), Long.class);
    	
    	filter.addParameters(query);
        
    	Long count = query.getSingleResult();
		return count;
	}
	
	public List<PresupuestoDTO> loadItems(Integer firsResult, Integer maxResults, String[] sortByArray, Boolean[] sortDescArray, PresupuestoFilter filter) {
		
    	String sortBy = Optional.ofNullable(firstOrNull(sortByArray)).orElse("p.id ");

    	if (Optional.ofNullable(firstOrNull(sortDescArray)).orElse(true)) {
    		sortBy+=" desc";
    	} else {
    		sortBy+=" asc";
    	}
		
		// Busco la pagina
    	TypedQuery<Presupuesto> query = em.createQuery(
    			"SELECT p FROM Presupuesto p "  + filter.getWhere() +
    	        " ORDER BY " + sortBy, Presupuesto.class);
    	
    	filter.addParameters(query);
        
    	List<PresupuestoDTO> list =	query
        		.setFirstResult(firsResult)
        		.setMaxResults(maxResults)
        		.setHint(QueryHints.READ_ONLY, true)
        		.getResultList()    		
        		.stream()
        		.map(PresupuestoDTO::fromEntity)
        		.collect(Collectors.toCollection(ArrayList::new));  
    	
		return list;
		
	}	
	
	private <T> T firstOrNull(T[] array) {
    	T ret = null;
    	if (array != null && array.length > 0) {
    		ret = array[0];
    	}
		return ret;
	}
	
	public PresupuestoDTO save(PresupuestoDTO dto){
		
		Presupuesto entity = new Presupuesto();
		
		logger.info("################## getMontoPresupuestado: "   +  dto.getMontoPresupuestado());

		entity.setCodigoGrupoGteDist(dto.getCodigoGrupoGteDist());
		entity.setDescGrupoGteDist(dto.getDescGrupoGteDist());
		entity.setCodigoProducto(dto.getCodigoProducto());
		entity.setDescripcionProducto(dto.getDescripcionProducto());
		entity.setAnio(dto.getAnio());
		entity.setMontoPresupuestado(dto.getMontoPresupuestado());
		entity.setFechaAlta(new Date());
				
		em.persist(entity);
		
		return PresupuestoDTO.fromEntity(entity);	

	}
	
	public PresupuestoDTO delete(Integer id) {

		Presupuesto entity = em.find(Presupuesto.class, id);
		em.remove(entity);
		
		return PresupuestoDTO.fromEntity(entity);
	}
	
	public PresupuestoDTO update(PresupuestoDTO dto) {

		Presupuesto entity = em.find(Presupuesto.class, dto.getId());
		
		if(entity == null) {
			return null;
		}
		
		logger.info("################## getMontoPresupuestado: "   +  dto.getMontoPresupuestado());
		
		entity.setCodigoGrupoGteDist(dto.getCodigoGrupoGteDist());
		entity.setDescGrupoGteDist(dto.getDescGrupoGteDist());
		entity.setCodigoProducto(dto.getCodigoProducto());
		entity.setDescripcionProducto(dto.getDescripcionProducto());
		entity.setAnio(dto.getAnio());
		entity.setMontoPresupuestado(dto.getMontoPresupuestado());
		entity.setFechaUltimaModificacion(new Date());
		
		return PresupuestoDTO.fromEntity(entity);
	}
	
	public PresupuestoDTO find(Integer id) {
		
		Presupuesto entity = em.find(Presupuesto.class, id);
		return PresupuestoDTO.fromEntity(entity);
	
	}
	
	public Iterator<PresupuestoDTO> getIterator(PresupuestoFilter filter) {

		TypedQuery<PresupuestoDTO> query = em.createQuery("SELECT NEW com.arquimeda.ic.parameters.biz.dto.PresupuestoDTO(p) FROM Presupuesto p "  + filter.getWhere() + " ORDER BY p.id", PresupuestoDTO.class);
		filter.addParameters(query);

		Query hquery = query.unwrap(Query.class);
		final ScrollableResults results = hquery.scroll(ScrollMode.FORWARD_ONLY);

		return new ScrollableResultsIteratorImpl<PresupuestoDTO>(results);

	}
	
	public File export(PresupuestoFilter filter) {
		
		File file = null;
		FileOutputStream fileOutputStream = null;
		XlsExporter exporter = null;

		try {

			file = File.createTempFile("Presupuestos_", ".xlsx");			
			fileOutputStream = new FileOutputStream(file);

			exporter = new XlsExporter(new DefaultXlsTemplate());

			XlsSheet sheet1 = exporter.addSheet("Presupuestos");	
			sheet1.setDataSource(new XlsDataSource() {

				@Override
				public Integer rowsCount() {
					return count(filter).intValue();
				}

				@Override
				public Iterator<?> iterator() {
					return getIterator(filter);
				}

			});

			List<String> columnNames = new ArrayList<String>();
			List<String> columnHeaders = new ArrayList<String>();		

			columnNames.add("codigoGrupoGteDist");
			columnNames.add("descGrupoGteDist");
			columnNames.add("codigoProducto");
			columnNames.add("descripcionProducto");
			columnNames.add("anio");
			columnNames.add("montoPresupuestado");
			columnNames.add("fechaAlta");
			columnNames.add("fechaUltimaModificacion");
			
			columnHeaders.add("GRUPO GTE DISTRITO");
			columnHeaders.add("DESCRIPCION GTE DISTRITO");
			columnHeaders.add("CODIGO PRODUCTO");
			columnHeaders.add("DESCRIPCION PRODUCTO");
			columnHeaders.add("AÑO");
			columnHeaders.add("MONTO PRESUPUESTADO");
			columnHeaders.add("FECHA ALTA");
			columnHeaders.add("FECHA ULTIMA MODIFICACION");
			
			sheet1.setColumnWidth("codigoGrupoGteDist", 40);
			sheet1.setColumnWidth("descGrupoGteDist", 40);
			sheet1.setColumnWidth("codigoProducto", 20);
			sheet1.setColumnWidth("descripcionProducto", 60);
			sheet1.setColumnWidth("anio", 20);
			sheet1.setColumnWidth("montoPresupuestado", 40);
			sheet1.setColumnWidth("fechaAlta", 20);
			sheet1.setColumnWidth("fechaUltimaModificacion", 30);
						
			sheet1.setColumnFormat("fechaAlta", "m/d/yy");
			sheet1.setColumnFormat("fechaUltimaModificacion", "m/d/yy");
			sheet1.setColumnFormat("montoPresupuestado", "##,##0.00");	

			sheet1.setColumnAlignment("codigoGrupoGteDist", XlsAlignment.left);
			sheet1.setColumnAlignment("descGrupoGteDist", XlsAlignment.left);
			sheet1.setColumnAlignment("descripcionProducto", XlsAlignment.left);
			sheet1.setColumnAlignment("codigoProducto", XlsAlignment.left);
			sheet1.setColumnAlignment("anio", XlsAlignment.center);
			sheet1.setColumnAlignment("montoPresupuestado", XlsAlignment.right);
			sheet1.setColumnAlignment("fechaAlta", XlsAlignment.center);
			sheet1.setColumnAlignment("fechaUltimaModificacion", XlsAlignment.center);
			
			sheet1.setColumNames(columnNames.toArray(new String[0]));
			sheet1.setColumHeaders(columnHeaders.toArray(new String[0]));

			exporter.export(fileOutputStream);
			
		} catch (Exception e) {
			
			logger.error("Se produjo un error al exportar reporte a xlsx.", e);
			throw new RuntimeException(e);

		}finally {

			try {

				if(exporter != null){
					exporter.clear();					
				}

				if(fileOutputStream != null){
					fileOutputStream.close();				
				}

				if(file != null){
					file.deleteOnExit();				
				}				

			} catch (IOException e) {
				logger.error("Se produjo un error al cerrar exportador.", e);
			}

		}
		
		return file;
	
	}	

}
